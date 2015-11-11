//profaffectations.ts
//
import {InfoUserInfo} from '../infouserinfo';
import {AffectationViewModel} from '../../model/admin/affectationmodel';
import {IEnseignant,IEnseignantAffectation} from 'infodata';
//
export class Profaffectations extends AffectationViewModel<IEnseignantAffectation, IEnseignant> {
    //
	static inject() { return [InfoUserInfo]; }
	//
    constructor(info: InfoUserInfo) {
        super(info);
        this.title = 'Affectations enseignants';
    }// constructor
    //
    protected create_person(): IEnseignant {
		return this.itemFactory.create_enseignant({departementid:this.departementid});
    }
    protected is_storeable(): boolean {
        return super.is_storeable() && (this.uniteid !== null)
            && (this.matiereid !== null);
    }
    public get canSave(): boolean {
       return this.is_storeable();
  }
  public set canSave(b: boolean) { }
    protected create_item(): IEnseignantAffectation {
        let p = this.itemFactory.create_enseignantaffectation({
            departementid: this.departementid,
            anneeid: this.anneeid,
            semestreid: this.semestreid,
            groupeid: this.groupeid,
            uniteid: this.uniteid,
            matiereid: this.matiereid,
            startDate: this._start,
            endDate: this._end,
			groupeName: (this.groupe !== null) ? this.groupe.text : null
        });
        return p;
    }
    protected retrieve_add_items(): IEnseignantAffectation[] {
        let oRet: IEnseignantAffectation[] = [];
        if ((this.currentPersons !== null) && (this.currentPersons.length > 0)) {
            for (let p of this.currentPersons) {
                let a = this.create_item();
                a.personid = p.personid;
                a.firstname = p.firstname;
                a.lastname = p.lastname;
                a.avatarid = p.avatarid;
                a.enseignantid = p.id;
				a.check_id();
                oRet.push(a);
            }// p
        }// persons
        return oRet;
    }// retrieve_add_items
    public post_change_matiere(): Promise<any> {
        this.modelItem.matiereid = this.matiereid;
        this.currentAffectations = [];
        return this.refreshAll();
    }
    protected is_refresh(): boolean {
        return super.is_refresh() && (this.modelItem.matiereid !== null);
    }
    //
}// class ProfAffectationModel
