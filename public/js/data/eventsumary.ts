//eventsumary.ts
//
import {IEtudiantEvent} from 'infodata';
import {MyMap} from './mymap';
import {SummaryItem, SummaryItemMap} from './sumaryitem';
import {BaseEtudiantSumary} from './baseetudsumary';
import {EVT_NOTE} from '../infoconstants';
//
//
export class EtudiantEventsSummary extends BaseEtudiantSumary {
	//
	private _semestreEvents: MyMap<string, SummaryItemMap>;
	private _detailEvts: MyMap<string, IEtudiantEvent[]>;
	private _allevts: IEtudiantEvent[];
	private _sumevts: SummaryItem[];
	//
	constructor() {
		super();
	}// constructor
	//
	protected post_change_semestre(): void {
		let semid = (this.currentSemestre !== null) ? this.currentSemestre.id : null;
		this._allevts = this.get_semestre_all_evts(semid);
		this._sumevts = this.get_semestre_sum_evts(semid);
	}// post_change_semestre
	//
	public reset(): void {
		super.reset();
		this._semestreEvents = null;
		this._detailEvts = null;
		this._allevts = null;
		this._sumevts = null;
	}// reset
	//
	public get allEvts(): IEtudiantEvent[] {
		return ((this._allevts !== undefined) && (this._allevts !== null)) ? this._allevts : [];
	}
	public get sumEvts(): SummaryItem[] {
		return ((this._sumevts !== undefined) && (this._sumevts !== null)) ? this._sumevts : [];
	}
	public get has_allEvts(): boolean {
		return (this.allEvts.length > 0);
	}
	public get has_sumEvts(): boolean {
		return (this.sumEvts.length > 0);
	}
	//
	public add_event(evt: IEtudiantEvent): boolean {
		if (!super.add_event(evt)) {
			return false;
		}
		if (evt.genre == EVT_NOTE) {
			return false;
		}
		let semid = evt.semestreid;
		if ((this._detailEvts === undefined) || (this._detailEvts === null)) {
			this._detailEvts = new MyMap<string, IEtudiantEvent[]>();
		}
		if (!this._detailEvts.has(semid)) {
			this._detailEvts.set(semid, []);
		}
		let ae = this._detailEvts.get_val(semid);
		ae.push(evt);
		if ((this._semestreEvents === undefined) || (this._semestreEvents === null)) {
			this._semestreEvents = new MyMap<string, SummaryItemMap>();
		}
		let m: SummaryItemMap = null;
		if (!this._semestreEvents.has(semid)) {
			m = new SummaryItemMap(evt.semestreSigle);
			this._semestreEvents.set(semid, m);
		} else {
			m = this._semestreEvents.get_val(semid);
		}
		m.add(evt.genre, null, null, evt.description);
		return true;
	}// add_event
	public get_semestre_all_evts(semestreid: string): IEtudiantEvent[] {
		let oRet: IEtudiantEvent[] = [];
		if ((semestreid === undefined) || (semestreid === null)) {
			return oRet;
		}
		if ((this._detailEvts === undefined) || (this._detailEvts === null)) {
			return oRet;
		}
		if (this._detailEvts.has(semestreid)) {
			oRet = this._detailEvts.get_val(semestreid);
		}
		if (oRet.length > 1) {
			let x = oRet[0];
			let pf = x.sort_func;
			if ((pf !== undefined) && (pf !== null)) {
				oRet.sort(pf);
			}
		}
		return oRet;
	}// get_devoirs_notes
	public get_semestre_sum_evts(semestreid: string): SummaryItem[] {
		let oRet: SummaryItem[] = [];
		if ((semestreid === undefined) || (semestreid === null)) {
			return oRet;
		}
		if ((this._semestreEvents === undefined) || (this._semestreEvents === null)) {
			return oRet;
		}
		if (this._semestreEvents.has(semestreid)) {
			let v = this._semestreEvents.get_val(semestreid);
			oRet = v.values;
		}
		return oRet;
	}// get_matieres_notes
	
}// class EtudiantEventsSummary
