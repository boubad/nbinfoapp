//basedetailmodel.ts
//
import {BaseBean} from '../basebean';
import {UserInfo} from '../userinfo';
import {IDepartement, IAnnee, ISemestre, IUnite, IMatiere, IGroupe, IGroupeEvent, IEtudiant, IEnseignant,
IEtudiantEvent, IEnseignantAffectation, IPerson, IEtudiantAffectation} from 'infodata';
import {InfoRoot} from '../../inforoot';	
//
export class BaseDetailModel extends BaseBean {
    //
    private _dep: IDepartement = null;
    private _annee: IAnnee = null;
    private _semestre: ISemestre = null;
    private _unite: IUnite = null;
    private _matiere: IMatiere = null;
    private _groupe: IGroupe = null;
	private _affprof: IEnseignantAffectation = null;
	private _pers: IPerson = null;
	private _gvt: IGroupeEvent = null;
	private _evt: IEtudiantEvent = null;
	private _affetud: IEtudiantAffectation = null;
	private _etudiant: IEtudiant = null;
	private _enseignant: IEnseignant = null;
    //
    constructor(userinfo: UserInfo) {
        super(userinfo);
    }
    private clear_data(): void {
		this._dep = null;
		this._annee = null;
		this._semestre = null;
		this._unite = null;
		this._matiere = null;
		this._groupe = null;
		this._affprof = null;
		this._pers = null;
	}
	protected initialize_groupeevent(p: IGroupeEvent): Promise<any> {
		this.clear_data();
		this._gvt = null;
		if ((p === undefined) || (p === null)) {
			return Promise.resolve(true);
		}
		this._gvt = p;
		let self = this;
		let service = this.dataService;
		return service.find_item_by_id(p.profaffectationid).then((a: IEnseignantAffectation) => {
			self._affprof = a;
			return service.find_item_by_id(p.semestreid);
		}).then((ss: ISemestre) => {
			self._semestre = ss;
			return service.find_item_by_id(p.personid);
		}).then((pers: IPerson) => {
			self._pers = pers;
			let id = (this._affprof !== null) ? this._affprof.groupeid : null;
			return service.find_item_by_id(id);
		}).then((g: IGroupe) => {
			self._groupe = g;
			let id = (this._affprof !== null) ? this._affprof.enseignantid : null;
			return service.find_item_by_id(id);
		}).then((pf: IEnseignant) => {
			self._enseignant = pf;
			let id = (this._affprof !== null) ? this._affprof.matiereid : null;
			return service.find_item_by_id(id);
		}).then((mat: IMatiere) => {
			self._matiere = mat;
			let id = (this._semestre !== null) ? this._semestre.anneeid : null;
			return service.find_item_by_id(id);
		}).then((an: IAnnee) => {
			self._annee = an;
			let id = (this._annee !== null) ? this._annee.departementid : null;
			return service.find_item_by_id(id);
		}).then((d: IDepartement) => {
			self._dep = d;
			return true;
		});
	}// initialize_groupeevent
	protected initialize_etudevent(p: IEtudiantEvent): Promise<any> {
		this.clear_data();
		this._evt = null;
		if ((p === undefined) || (p === null)) {
			return Promise.resolve(true);
		}
		this._evt = p;
		let self = this;
		let service = this.dataService;
		return service.find_item_by_id(p.etudiantaffectationid).then((a: IEtudiantAffectation) => {
			self._affetud = a;
			return service.find_item_by_id(p.semestreid);
		}).then((ss: ISemestre) => {
			self._semestre = ss;
			return service.find_item_by_id(p.personid);
		}).then((pers: IPerson) => {
			self._pers = pers;
			let id = (this._affetud !== null) ? this._affetud.groupeid : null;
			return service.find_item_by_id(id);
		}).then((g: IGroupe) => {
			self._groupe = g;
			let id = (this._affetud !== null) ? this._affetud.etudiantid : null;
			return service.find_item_by_id(id);
		}).then((pf: IEtudiant) => {
			self._etudiant = pf;
			return service.find_item_by_id(p.groupeeventid);
		}).then((mat: IGroupeEvent) => {
			self._gvt = mat;
			let id = (this._gvt !== null) ? this._gvt.profaffectationid : null;
			return service.find_item_by_id(id);
		}).then((af: IEnseignantAffectation) => {
			self._affprof = af;
			let id = (this._affprof !== null) ? this._affprof.matiereid : null;
			return service.find_item_by_id(id);
		}).then((m: IMatiere) => {
			self._matiere = m;
			let id = (this._matiere !== null) ? this._matiere.uniteid : null;
			return service.find_item_by_id(id);
		}).then((un: IUnite) => {
			self._unite = un;
			let id = (this._semestre !== null) ? this._semestre.anneeid : null;
			return service.find_item_by_id(id);
		}).then((an: IAnnee) => {
			self._annee = an;
			let id = (this._annee !== null) ? this._annee.departementid : null;
			return service.find_item_by_id(id);
		}).then((d: IDepartement) => {
			self._dep = d;
			return true;
		});
	}// initialize_groupeevent

	public get maxDate(): string {
		return InfoRoot.date_to_string(this._semestre.endDate);
	}
	public get semestreName(): string {
		return (this._semestre !== null) ? this._semestre.text : null;
	}
	public set semestreName(s: string) { }
	public get departementName(): string {
		return (this._dep !== null) ? this._dep.text : null;
	}
	public set departementName(s: string) { }
	public get anneeName(): string {
		return (this._annee !== null) ? this._annee.text : null;
	}
	public set anneeName(s: string) { }
	public get groupeName(): string {
		return (this._groupe !== null) ? this._groupe.text : null;
	}
	public set groupeName(s: string) { }
	public get uniteName(): string {
		return (this._unite !== null) ? this._unite.text : null;
	}
	public set uniteName(s: string) { }
	public get matiereName(): string {
		return (this._matiere !== null) ? this._matiere.text : null;
	}
	public set matiereName(s: string) { }
}
