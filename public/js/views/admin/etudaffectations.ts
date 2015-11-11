//etudaffectations.ts
//
import {InfoUserInfo} from '../infouserinfo';
import {AffectationViewModel} from '../../model/admin/affectationmodel';
import {IEtudiantAffectation, IEtudiant, IGroupe} from 'infodata';
import {GENRE_TP} from '../../infoconstants';
//
export class Etudaffectations extends AffectationViewModel<IEtudiantAffectation, IEtudiant> {
	//
	static inject() { return [InfoUserInfo]; }
	private _groupes: IGroupe[] = null;
	//
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
        this.title = 'Affectations Etudiants';
    }// constructor
    //
    protected create_person(): IEtudiant {
        return this.itemFactory.create_etudiant({ departementid: this.departementid });
    }
    protected create_item(): IEtudiantAffectation {
        let p = this.itemFactory.create_etudiantaffectation({
            departementid: this.departementid,
            anneeid: this.anneeid,
            semestreid: this.semestreid,
            groupeid: this.groupeid,
            startDate: this._start,
            endDate: this._end,
			groupeName: (this.groupe !== null) ? this.groupe.text : null
        });
        return p;
    }
	protected post_change_departement(): Promise<any> {
        return super.post_change_departement().then((r) => {
			this._groupes = null;
			return this.get_groupes();
		});
    }
	protected perform_activate(): Promise<any> {
		return super.perform_activate().then((r) => {
			this._groupes = null;
			return this.get_groupes();
		});
	}
	protected get_groupes(): IGroupe[] {
		if ((this._groupes !== undefined) && (this._groupes !== null)) {
			return this._groupes;
		}
		let oRet: IGroupe[] = [];
		let info = this.userInfo;
		let gg = ((info !== undefined) && (info !== null)) ? info.groupes : [];
		if ((gg !== undefined) && (gg !== null)) {
			for (let g of gg) {
				if (g.genre == GENRE_TP) {
					oRet.push(g);
				}
			}// g
		}// gg
		this._groupes = oRet;
		return this._groupes;
	}
	public is_storeable(): boolean {
		return (this.groupe !== null) &&
			(this.groupe.genre == GENRE_TP) && super.is_storeable();
	}
    protected retrieve_add_items(): IEtudiantAffectation[] {
        let oRet: IEtudiantAffectation[] = [];
        if ((this.currentPersons !== null) && (this.currentPersons.length > 0)) {
            for (let p of this.currentPersons) {
                let a = this.create_item();
                a.personid = p.personid;
                a.firstname = p.firstname;
                a.lastname = p.lastname;
                a.avatarid = p.avatarid;
                a.etudiantid = p.id;
				a.check_id();
                oRet.push(a);
            }// p
        }// persons
        return oRet;
    }// retrieve_add_items
}// class EtudAffViewModel
