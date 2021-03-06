//affectationmodel.ts
//
import {UserInfo} from '../userinfo';
import {InfoRoot} from '../../inforoot';
import {BaseEditViewModel} from '../baseeditmodel';
import {IAffectation, IDepartementPerson,IGroupe} from 'infodata';
//
export class AffectationViewModel<T extends IAffectation, P extends IDepartementPerson> extends BaseEditViewModel<T> {
    //
    public persons: P[] = [];
    public currentPersons: P[] = [];
    public currentAffectations: T[] = [];
    private _person_model: P = null;
    protected _start: Date = null;
    protected _end: Date = null;
	protected _xgroupes:IGroupe[] = [];
    //
    constructor(info: UserInfo) {
        super(info);
    }// constructor
    public canActivate(params?: any, config?: any, instruction?: any): any {
		return this.isAdmin;
    }// activate
    //
    protected create_person(): P {
        return null;
    }
    protected is_refresh(): boolean {
        return (this.modelItem.semestreid !== null)
			&& (this.modelItem.groupeid !== null);
    }
    protected is_storeable(): boolean {
        let bRet = (this.departementid !== null) && (this.anneeid !== null) &&
            (this.semestreid !== null) && (this.groupeid !== null) &&
            (this._start !== null) && (this._end !== null);
        if (!bRet) {
            return false;
        }
        if (this.currentPersons === null) {
            return false;
        }
        if (this.currentPersons.length < 1) {
            return false;
        }
        let t1 = Date.parse(this._start.toString());
        let t2 = Date.parse(this._end.toString());
        return (!isNaN(t1)) && (!isNaN(t2)) && (t1 <= t2);
    }
	public get canSave(): boolean {
		return this.is_storeable();
	}
	public set canSave(b: boolean) { }
    protected retrieve_add_items(): T[] {
        return [];
    }// retrieve_add_items
    //
    public get allStartDate(): string {
        return InfoRoot.date_to_string(this._start);
    }
    public set allStartDate(s: string) {
        this._start = null;
        let d1 = this.semestreMinDate;
        let d2 = this.semestreMaxDate;
        if ((d1 === null) || (d2 === null)) {
            return;
        }
        let d = InfoRoot.string_to_date(s);
        if (d !== null) {
            let t = Date.parse(d.toString());
            if (isNaN(t)) {
                return;
            }
            let t1 = Date.parse(d1.toString());
            let t2 = Date.parse(d2.toString());
            if ((!isNaN(t1)) && (!isNaN(t2)) && (t >= t1) && (t <= t2)) {
                this._start = d;
            }
        }
    }
    public get allEndDate(): string {
        return InfoRoot.date_to_string(this._end);
    }
    public set allEndDate(s: string) {
        this._end = null;
        let d1 = this.semestreMinDate;
        let d2 = this.semestreMaxDate;
        if ((d1 === null) || (d2 === null)) {
            return;
        }
        let d = InfoRoot.string_to_date(s);
        if (d !== null) {
            let t = Date.parse(d.toString());
            if (isNaN(t)) {
                return;
            }
            let t1 = Date.parse(d1.toString());
            let t2 = Date.parse(d2.toString());
            if ((!isNaN(t1)) && (!isNaN(t2)) && (t >= t1) && (t <= t2)) {
                this._end = d;
            }
        }
    }
    //
    public get personModel(): P {
        if (this._person_model === null) {
            this._person_model = this.create_person();
        }
        return this._person_model;
    }
    public post_change_groupe(): Promise<any> {
		return super.post_change_groupe().then((r) => {
			this.modelItem.groupeid = this.groupeid;
			this.currentAffectations = [];
			return this.refreshAll();
		});
    }
    public post_change_semestre(): Promise<any> {
		return super.post_change_semestre().then((r) => {
			this.modelItem.semestreid = this.semestreid;
			this.currentAffectations = [];
			this._start = null;
			this._end = null;
			let sem = this.semestre;
			if (sem !== null) {
				this._start = sem.startDate;
				this._end = sem.endDate;
			}
			return this.refreshAll();
		});
    }
	protected perform_get_groupes():IGroupe[]{
		return this.groupes;
	}
	public get xgroupes():IGroupe[]{
		if ((this._xgroupes === undefined)|| (this._xgroupes === null)){
			this._xgroupes = this.perform_get_groupes();
		}
		return this._xgroupes;
	}
    protected post_change_departement(): Promise<any> {
        let self = this;
        this.currentPersons = [];
        this.persons = [];
		this._xgroupes = null;
        return super.post_change_departement().then((r) => {
            let id = self.departementid;
            self.personModel.departementid = id;
            if (id === null) {
                return Promise.resolve([]);
            } else {
				let gg = this.xgroupes;
				let start = self.personModel.start_key();
				let end = self.personModel.end_key();
                return self.dataService.get_items_range(start,end);
            }
        }).then((pp: P[]) => {
            self.persons = ((pp !== undefined) && (pp !== null)) ? pp : [];
            return true;
        });
    }// post_change_departement
    public get canRemove(): boolean {
        return ((this.currentAffectations !== null) && (this.currentAffectations.length > 0));
    }// canRemove
    public get cannotRemove(): boolean {
        return (!this.canRemove);
    }
    public get cannotSave(): boolean {
        return (!this.canSave);
    }
    public remove(): Promise<any> {
        if (this.currentAffectations === null) {
            return Promise.resolve(false);
        }
        if (this.currentAffectations.length < 1) {
             return Promise.resolve(false);
        }
        if (!this.confirm('Voulez-vous vraiment supprimer?')) {
             return Promise.resolve(false);
        }
        this.clear_error();
        let pp: Promise<any>[] = [];
        let service = this.dataService;
        for (let x of this.currentAffectations) {
            let p = service.remove_item(x);
            pp.push(p);
        }
        let self = this;
        return Promise.all(pp).then((r) => {
            self.currentAffectations = [];
            return self.refreshAll();
        }).catch((err) => {
            self.set_error(err);
			return false;
        });
    }// remove
    public save(): Promise<any> {
        if (!this.is_storeable()) {
            return Promise.resolve(false);
        }
        let oItems = this.retrieve_add_items();
        if (oItems === null) {
             return Promise.resolve(false);
        }
        if (oItems.length < 1) {
             return Promise.resolve(false);
        }
        let self = this;
        this.clear_error();
        return this.dataService.maintains_personitems(oItems).then((r) => {
            self.currentPersons = [];
            return self.refreshAll();
        }).catch((err) => {
            self.set_error(err);
			return false;
        });
    }// save
    public refreshAll(): Promise<any> {
        this.prepare_refresh();
        if ((this.semestreid === null) || (this.groupeid === null)) {
            return Promise.resolve(false);
        }
        return super.refreshAll();
    }// refreshAll
	protected perform_activate():Promise<any> {
		return super.perform_activate().then((r)=>{
			this._xgroupes = null;
			let old = this.departement;
			let id = (old !== null) ? old.id : null;
			this.departement = null;
			this.departement = this.sync_array(this.departements,id);
			let gg = this.xgroupes;
			return true;
		});
	}// perform_activate
}// class AffectationViewModel
