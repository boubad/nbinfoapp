//baseetudsumary.ts
//
import {IMenuDesc,  IEtudiantEvent} from 'infodata';
import {MyMap} from './mymap';
import {MenuDesc} from './menudesc';
//
import {SummaryItem, SummaryItemMap} from './sumaryitem';
//
export class BaseEtudiantSumary {
	//
	protected _anneesIds: MyMap<string, string>;
	protected _anneesSigles: MyMap<string, string>;
	private _semestreids: MyMap<string, string>;
	//
	private _menuAnnees: IMenuDesc[];
	private _menuSemestres: IMenuDesc[];
	//
	private _currentAnnee: IMenuDesc;
	private _currentSemestre: IMenuDesc;
	
	//
	constructor() {
		this._currentAnnee = null;
		this._currentSemestre = null;
		this._anneesIds = new MyMap<string,string>();
		this._anneesSigles = new MyMap<string,string>();
		this._semestreids = new MyMap<string,string>();
	}// constructor
	public reset(): void {
		this._semestreids = null;
		this._anneesIds = null;
		this._anneesSigles = null;
		this._menuAnnees = null;
		this._menuSemestres = null;
		this._currentAnnee = null;
		this._currentSemestre = null;
	}// reset
	//
	public start_processing(): void {
		this.reset();
	}
	public end_processing(): void {
	}
	//
	protected post_change_semestre(): void {
	}// post_change_semestre
	//
	public get anneesMenu(): IMenuDesc[] {
		if ((this._menuAnnees === undefined) || (this._menuAnnees === null)) {
			this._menuAnnees = [];
			if ((this._anneesIds !== undefined) && (this._anneesIds !== null)) {
				this._anneesIds.forEach((anneeid, semid) => {
					let xlabel = this._anneesSigles.get_val(anneeid);
					this._menuAnnees.push(new MenuDesc({ _id: anneeid, _text: xlabel }));
				});
			}//
			if (this._menuAnnees.length > 0) {
				this._currentAnnee = this._menuAnnees[0];
			}
		}
		return this._menuAnnees;
	}
	public get currentAnnee(): IMenuDesc {
		return (this._currentAnnee !== undefined) ? this._currentAnnee : null;
	}
	public set currentAnnee(s: IMenuDesc) {
		if ((this._anneesIds === undefined) || (this._anneesIds === null)){
			this._anneesIds = new MyMap<string,string>();
		}
		this._currentAnnee = (s !== undefined) ? s : null;
		this._currentSemestre = null;
		this._menuSemestres = [];
		let self = this;
		if (this._currentAnnee !== null) {
			let p: IMenuDesc = null;
			let id = this._currentAnnee.id;
			this._anneesIds.forEach((anneeid, semid) => {
				if (anneeid == id) {
					let xlabel = self._semestreids.get_val(semid);
					self._menuSemestres.push(new MenuDesc({ _id: semid, _text: xlabel }));
				}// id
			});
		}
		if (this._menuSemestres.length > 0) {
			this._currentSemestre = this._menuSemestres[0];
		}
	}
	public get semestresMenu(): IMenuDesc[] {
		return ((this._menuSemestres !== undefined) && (this._menuSemestres !== null)) ?
			this._menuSemestres : [];
	}
	public get currentSemestre(): IMenuDesc {
		return (this._currentSemestre !== undefined) ? this._currentSemestre : null;
	}
	public set currentSemestre(s: IMenuDesc) {
		this._currentSemestre = (s !== undefined) ? s : null;
		this.post_change_semestre();
	}
	//
	public add_events(evts: IEtudiantEvent[]): void {
		if ((evts !== undefined) && (evts !== null)) {
			for (let x of evts) {
				this.add_event(x);
			}
		}
	}
	//
	public add_event(evt: IEtudiantEvent): boolean {
		if ((evt === undefined) || (evt === null)) {
			return false;
		}
		let semid = evt.semestreid;
		let semestreSigle = evt.semestreSigle;
		let anneeid = evt.anneeid;
		let anneeSigle = evt.anneeSigle;
		if ((anneeid === undefined) || (anneeid === null) || (anneeSigle === undefined) ||
			(anneeSigle === null) || (semid === undefined) || (semid === null) ||
			(semestreSigle === undefined) || (semestreSigle === null)) {
			return false;
		}
		if ((evt.genre === undefined) || (evt.genre === null)) {
			return false;
		}
		if ((this._semestreids === undefined) || (this._semestreids === null)) {
			this._semestreids = new MyMap<string, string>();
		}
		if (!this._semestreids.has(semid)) {
			this._semestreids.set(semid, evt.semestreSigle);
		}
		if ((this._anneesIds === undefined) || (this._anneesIds === null)) {
			this._anneesIds = new MyMap<string, string>();
		}
		if (!this._anneesIds.has(semid)) {
			this._anneesIds.set(semid, anneeid);
		}
		if ((this._anneesSigles === undefined) || (this._anneesSigles === null)) {
			this._anneesSigles = new MyMap<string, string>();
		}
		if (!this._anneesSigles.has(anneeid)) {
			this._anneesSigles.set(anneeid, anneeSigle);
		}
		return true;
	}// add_event
}// class EtudiantEventsSummary