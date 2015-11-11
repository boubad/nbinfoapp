//SummaryItem.ts
//
import { IEtudiantEvent} from 'infodata';
import {MyMap} from './mymap';
import {SummaryItem, SummaryItemMap} from './sumaryitem';
import {BaseEtudiantSumary} from './baseetudsumary';
import {EVT_NOTE} from '../infoconstants';
//
export class EtudiantNotesSummary extends BaseEtudiantSumary {
	//
	private _matieresCoefs: MyMap<string, MyMap<string, number>>;
	private _unitesCoefs: MyMap<string, MyMap<string, number>>;
	private _matieresSigles: MyMap<string, MyMap<string, string>>;
	private _unitesSigles: MyMap<string, MyMap<string, string>>;
	private _matieresUnites:MyMap<string,string>;
	//
	private _detailNotes: MyMap<string, SummaryItemMap>;
	private _matieresNotes: MyMap<string, SummaryItemMap>;
	private _unitesNotes: MyMap<string, SummaryItemMap>;
	private _totalNotes: MyMap<string, SummaryItem>;
	//
	private _devoirNotes: SummaryItem[];
	private _matNotes: SummaryItem[];
	private _unNotes: SummaryItem[];
	private _totNotes: SummaryItem[];
	//
	constructor() {
		super();
	}// constructor
	protected post_change_semestre(): void {
		let semid = (this.currentSemestre !== null) ? this.currentSemestre.id : null;
		this._devoirNotes = this.get_devoirs_notes(semid);
		this._matNotes = this.get_matieres_notes(semid);
		this._unNotes = this.get_unites_notes(semid);
	}// post_change_semestre
	//
	public get devoirsNotes(): SummaryItem[] {
		return ((this._devoirNotes !== undefined) && (this._devoirNotes !== null)) ? this._devoirNotes : [];
	}
	public get matieresNotes(): SummaryItem[] {
		return ((this._matNotes !== undefined) && (this._matNotes !== null)) ? this._matNotes : [];
	}
	public get unitesNotes(): SummaryItem[] {
		return ((this._unNotes !== undefined) && (this._unNotes !== null)) ? this._unNotes : [];
	}
	public get totalNotes(): SummaryItem[] {
		return ((this._totNotes !== undefined) && (this._totNotes !== null)) ? this._totNotes : [];
	}
	//
	public reset(): void {
		super.reset();
		this._matieresUnites = null;
		this._matieresCoefs = null;
		this._unitesCoefs = null;
		this._matieresSigles = null;
		this._unitesSigles = null;
		this._detailNotes = null;
		this._matieresNotes = null;
		this._unitesNotes = null;
		this._totalNotes = null;
	}// reset
	public end_processing(): void {
		this.compute_total_notes();
	}
	//
	public add_event(evt: IEtudiantEvent): boolean {
		if (!super.add_event(evt)) {
			return false;
		}
		if (evt.genre != EVT_NOTE) {
			return false;
		}
		let n = evt.note;
		if ((n === undefined) || (n === null) || (n < 0.0)) {
			return false;
		}
		let anneeid = evt.anneeid;
		let anneeSigle = evt.anneeSigle;
		let semid = evt.semestreid;
		let matiereid = evt.matiereid;
		if ((matiereid === undefined) || (matiereid === null)) {
			return false;
		}
		let matierecoef = evt.matiereCoefficient;
		if ((matierecoef === undefined) || (matierecoef === null) || (matierecoef <= 0.0)) {
			return false;
		}
		let uniteid = evt.uniteid;
		if ((uniteid === undefined) || (uniteid === null)) {
			return false;
		}
		let unitecoef = evt.uniteCoefficient;
		if ((unitecoef === undefined) || (unitecoef === null) || (unitecoef <= 0.0)) {
			return false;
		}
		let matiereSigle = evt.matiereName;
		if ((matiereSigle === undefined) || (matiereSigle === null)) {
			return false;
		}
		let uniteSigle = evt.uniteSigle;
		if ((uniteSigle === undefined) || (uniteSigle === null)) {
			return false;
		}
		let grpid = evt.groupeeventid;
		if ((grpid === undefined) || (grpid === null)) {
			return false;
		}
		let grpName = evt.groupeEventName;
		if ((grpName === undefined) || (grpName === null)) {
			return false;
		}
		let c: number = (evt.coefficient !== null) ? evt.coefficient : 1.0;
		//
		if ((this._matieresUnites === undefined) || (this._matieresUnites === null)){
			this._matieresUnites = new MyMap<string,string>();
		}
		if (!this._matieresUnites.has(matiereid)){
			this._matieresUnites.set(matiereid, uniteid);
		}
		//
		if ((this._matieresCoefs === undefined) || (this._matieresCoefs == null)) {
			this._matieresCoefs = new MyMap<string, MyMap<string, number>>();
		}
		if ((this._matieresSigles === undefined) || (this._matieresSigles == null)) {
			this._matieresSigles = new MyMap<string, MyMap<string, string>>();
		}
		let mc1: MyMap<string, number> = null;
		if (this._matieresCoefs.has(semid)) {
			mc1 = this._matieresCoefs.get_val(semid);
			if (!mc1.has(matiereid)) {
				mc1.set(matiereid, matierecoef);
			}
		} else {
			mc1 = new MyMap<string, number>();
			mc1.set(matiereid, matierecoef);
			this._matieresCoefs.set(semid, mc1);
		}
		if (this._matieresSigles.has(semid)) {
			let mx = this._matieresSigles.get_val(semid);
			if (!mx.has(matiereid)) {
				mx.set(matiereid, matiereSigle);
			}
		} else {
			let mx = new MyMap<string, string>();
			mx.set(matiereid, matiereSigle);
			this._matieresSigles.set(semid, mx);
		}
		//
		if ((this._unitesCoefs === undefined) || (this._unitesCoefs == null)) {
			this._unitesCoefs = new MyMap<string, MyMap<string, number>>();
		}
		if ((this._unitesSigles === undefined) || (this._unitesSigles == null)) {
			this._unitesSigles = new MyMap<string, MyMap<string, string>>();
		}
		let mc2: MyMap<string, number> = null;
		if (this._unitesCoefs.has(semid)) {
			mc2 = this._unitesCoefs.get_val(semid);
			if (!mc2.has(uniteid)) {
				mc2.set(uniteid, unitecoef);
			}
		} else {
			mc2 = new MyMap<string, number>();
			mc2.set(uniteid, unitecoef);
			this._unitesCoefs.set(semid, mc2);
		}
		if (this._unitesSigles.has(semid)) {
			let mx = this._unitesSigles.get_val(semid);
			if (!mx.has(uniteid)) {
				mx.set(uniteid, uniteSigle);
			}
		} else {
			let mx = new MyMap<string, string>();
			mx.set(uniteid, uniteSigle);
			this._unitesSigles.set(semid, mx);
		}
		//
		if ((this._detailNotes === undefined) || (this._detailNotes === null)) {
			this._detailNotes = new MyMap<string, SummaryItemMap>();
		}
		if (this._detailNotes.has(semid)) {
			let v = this._detailNotes.get_val(semid);
			v.add(grpName, n, c, evt.description,grpid);
		} else {
			let v = new SummaryItemMap(evt.semestreSigle);
			this._detailNotes.set(semid, v);
			v.add(grpName, n, c, evt.description,grpid);
		}
		//
		if ((this._matieresNotes === undefined) || (this._matieresNotes === null)) {
			this._matieresNotes = new MyMap<string, SummaryItemMap>();
		}
		if (this._matieresNotes.has(semid)) {
			let v = this._matieresNotes.get_val(semid);
			v.add(matiereSigle, n, c, evt.description, matiereid);
		} else {
			let v = new SummaryItemMap(evt.semestreSigle);
			this._matieresNotes.set(semid, v);
			v.add(matiereSigle, n, c, evt.description, matiereid);
		}
		return true;
	}// add_event
	public compute_unites_notes(): void {
		this._unitesNotes = new MyMap<string, SummaryItemMap>();
		if ((this._matieresNotes === undefined) || (this._matieresNotes === null)) {
			return;
		}
		let self = this;
		this._matieresNotes.forEach((map: SummaryItemMap, semestreid: string) => {
			let ss = self._unitesSigles.get_val(semestreid);
			let sc = self._matieresCoefs.get_val(semestreid);
			let su = self._unitesSigles.get_val(semestreid);
			let mm = new SummaryItemMap(semestreid);
			self._unitesNotes.set(semestreid, mm);
			let mx = map.get_values();
			for (let nx of mx) {
				let matiereid = nx.refer;
				let matierecoef = sc.get_val(matiereid);
				let uniteid = self._matieresUnites.get_val(matiereid);
				let uniteSigle = ss.get_val(uniteid);
				let n = nx.note;
				mm.add(uniteSigle, n, matierecoef, null,uniteid);
			}// nx
		});
	}// compute_unites_notes
	public compute_total_notes(): void {
		this._totalNotes = new MyMap<string, SummaryItem>();
		if ((this._unitesNotes === undefined) || (this._unitesNotes === null)) {
			this.compute_unites_notes();
		}
		let self = this;
		this._unitesNotes.forEach((map: SummaryItemMap, semestreid: string) => {
			let sc = self._unitesCoefs.get_val(semestreid);
			let anneeid = self._anneesIds.get_val(semestreid);
			let anneeSigle = self._anneesSigles.get_val(anneeid);
			let mm = new SummaryItem(anneeSigle);
			self._totalNotes.set(anneeid, mm);
			let mx = map.get_values();
			for (let nx of mx) {
				let uniteid = nx.refer;
				let coef = sc.get_val(uniteid);
				let n = nx.note;
				mm.add(n, coef);
			}// nx
		});
		this._totNotes = this.get_total_notes();
	}// compute_unites_notes
	public get_devoirs_notes(semestreid: string): SummaryItem[] {
		let oRet: SummaryItem[]= [];
		if ((semestreid === undefined) || (semestreid === null)) {
			return oRet;
		}
		if ((this._detailNotes === undefined) || (this._detailNotes === null)) {
			return oRet;
		}
		if (this._detailNotes.has(semestreid)) {
			let v = this._detailNotes.get_val(semestreid);
			oRet = v.get_values();
		}
		return oRet;
	}// get_devoirs_notes
	public get_matieres_notes(semestreid: string): SummaryItem[] {
		let oRet: SummaryItem[]= [];
		if ((semestreid === undefined) || (semestreid === null)) {
			return oRet;
		}
		if ((this._matieresNotes === undefined) || (this._matieresNotes === null)) {
			return oRet;
		}
		if (this._matieresNotes.has(semestreid)) {
			let v = this._matieresNotes.get_val(semestreid);
			oRet = v.get_values();
		}
		return oRet;
	}// get_matieres_notes
	public get_unites_notes(semestreid: string): SummaryItem[] {
		let oRet: SummaryItem[]= [];
		if ((semestreid === undefined) || (semestreid === null)) {
			return oRet;
		}
		if ((this._unitesNotes === undefined) || (this._unitesNotes === null)) {
			this.compute_unites_notes();
		}
		if (this._unitesNotes.has(semestreid)) {
			let v = this._unitesNotes.get_val(semestreid);
			oRet = v.get_values();
		}
		return oRet;
	}// get_unites_notes
	public get_total_notes(): SummaryItem[] {
		let oRet: SummaryItem[] = [];
		if ((this._totalNotes === undefined) || (this._totalNotes === null)) {
			this.compute_total_notes();
		}
		this._totalNotes.forEach((val, index) => {
            oRet.push(val);
        });
		return oRet;
	}// get_unites_notes
}// class EtudiantSummary
