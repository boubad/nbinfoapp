//userinfo.ts
import {BaseModel} from './basemodel';
import {LoginInfo} from './loginfo';
import {IPerson, IDepartement, IAnnee, ISemestre, IUnite, IMatiere, IGroupe,
IMessageManager, ILogManager, IItemFactory,
IObjectStore, IInfoMessage, IEnseignant, IDataService} from 'infodata';

import {DATABASE_NAME, PERSON_KEY, ETUDIANTPERSON_KEY, ENSEIGNANTPERSON_KEY,
DEPARTEMENT_TYPE, ANNEE_TYPE, SEMESTRE_TYPE, UNITE_TYPE, MATIERE_TYPE, GROUPE_TYPE}
from '../infoconstants';
import {InfoMessage} from './infomessage';
//
export class UserInfo extends BaseModel {
    public loginInfo: LoginInfo = null;
    public annees: IAnnee[] = [];
    public semestres: ISemestre[] = [];
    public unites: IUnite[] = [];
    public matieres: IMatiere[] = [];
    public groupes: IGroupe[] = [];
    //
    private _annee: IAnnee = null;
    private _unite: IUnite = null;
    private _semestre: ISemestre = null;
    private _matiere: IMatiere = null;
    private _groupe: IGroupe = null;
    //
    private _m_busy: boolean = false;
    //
    constructor(service?: IDataService, mess?: IMessageManager, logm?: ILogManager) {
        super(service, mess, logm);
        this.loginInfo = new LoginInfo();
        this._m_busy = false;
    }// constructor
	public refresh_departements(): Promise<any> {
		return this.loginInfo.refresh_departements(this.dataService);
	}
    //
    public get itemFactory(): IItemFactory {
        return this.dataService.itemFactory;
    }
    //
    private notify_change(message: string): void {
        if ((!this._m_busy) && (!this.is_in_message)) {
            this._m_busy = true;
            this.publish_string_message(message);
            this._m_busy = false;
        }
    }
    //
    public get departements(): IDepartement[] {
        return this.loginInfo.all_departements;
    }
	public get departement(): IDepartement {
		return this.loginInfo.departement;
    }
    public set departement(s: IDepartement) {
        let cur = (s !== undefined) ? s : null;
		this.loginInfo.departement = cur;
		this.post_update_departement().then((r) => {
			this.notify_change(DEPARTEMENT_TYPE);
		});
	}
    public get departementid(): string {
        return (this.departement !== null) ? this.departement.id : null;
    }
    //
    public get semestre(): ISemestre {
        return (this._semestre !== undefined) ? this._semestre : null;
    }
    public set semestre(s: ISemestre) {
        let old = (this._semestre !== undefined) ? this._semestre : null;
        let cur = (s !== undefined) ? s : null;
        if (cur !== old) {
            this._semestre = cur;
            this.notify_change(SEMESTRE_TYPE);
        }
    }
    public get groupe(): IGroupe {
        return (this._groupe !== undefined) ? this._groupe : null;
    }
    public set groupe(s: IGroupe) {
        let old = (this._groupe !== undefined) ? this._groupe : null;
        let cur = (s !== undefined) ? s : null;
        if (cur !== old) {
            this._groupe = cur;
            this.notify_change(GROUPE_TYPE);
        }
    }
    //
    public get matiere(): IMatiere {
        return (this._matiere !== undefined) ? this._matiere : null;
    }
    public set matiere(s: IMatiere) {
        let old = (this._matiere !== undefined) ? this._matiere : null;
        let cur = (s !== undefined) ? s : null;
        if (cur !== old) {
            this._matiere = cur;
            this.notify_change(MATIERE_TYPE);
        }
    }
    public get annee(): IAnnee {
        return (this._annee !== undefined) ? this._annee : null;
    }
    public set annee(s: IAnnee) {
        let old = (this._annee !== undefined) ? this._annee : null;
        let cur = (s !== undefined) ? s : null;
        if (cur !== old) {
            this._annee = cur;
            let self = this;
            this.post_update_annee().then((r) => {
                self.notify_change(ANNEE_TYPE);
                if (self.semestres.length > 0) {
                    self.semestre = self.semestres[0];
                } else {
                    self.semestre = null;
                }
            });
        }
    }
    public get unite(): IUnite {
        return this._unite;
    }
    public set unite(s: IUnite) {
        let old = (this._unite !== undefined) ? this._unite : null;
        let cur = (s !== undefined) ? s : null;
        if (cur !== old) {
            this._unite = cur;
            let self = this;
            this.post_update_unite().then((r) => {
                self.notify_change(UNITE_TYPE);
                if (self.matieres.length > 0) {
                    self.matiere = self.matieres[0];
                } else {
                    self.matiere = null;
                }
            });
        }
    }
    //
    public get anneeid(): string {
        return (this.annee !== null) ? this.annee.id : null;
    }
    public get uniteid(): string {
        return (this.unite !== null) ? this.unite.id : null;
    }
    public get semestreid(): string {
        return (this.semestre !== null) ? this.semestre.id : null;
    }
    public get matiereid(): string {
        return (this.matiere !== null) ? this.matiere.id : null;
    }
    public get groupeid(): string {
        return (this.groupe !== null) ? this.groupe.id : null;
    }
    public get person(): IPerson {
        return this.loginInfo.person;
    }// get person
    public get photoUrl(): string {
        return ((this.person !== undefined) && (this.person !== null)) ? this.person.url : null;
    }
    public get hasPhotoUrl(): boolean {
        return (this.photoUrl !== null);
    }
	private clear_data(): void {
        if ((this.person !== undefined) && (this.person !== null) && (this.person.url !== null)) {
            this.revokeUrl(this.person.url);
        }
        this.loginInfo.disconnect();
        this.annees = [];
        this.semestres = [];
        this.unites = [];
        this.matieres = [];
        this.groupes = [];
    }// clear_data
    public login(username: string, spass: string): Promise<boolean> {
        this.clear_data();
        let bRet: boolean = false;
        let self = this;
		return this.loginInfo.login(this.dataService, username, spass).then((b) => {
			let pPers: IPerson = null;
			if ((b !== undefined) && (b !== null) && (b == true)) {
				bRet = true;
				pPers = this.loginInfo.person;
			}
			return this.retrieve_one_avatar(pPers);
		}).then((px) => {
			return bRet;
		}).catch((err) => {
			return bRet;
		});
    }// login
    public logout(): void {
        this.clear_data();
    }// logout
    public get is_super(): boolean {
		return this.loginInfo.is_super;
    }
    public get is_admin(): boolean {
		return this.loginInfo.is_admin;
    }
    public get is_prof(): boolean {
        return this.loginInfo.is_prof;
    }
    public get is_etud(): boolean {
        return this.loginInfo.is_etud;
    }
    public get url(): string {
        return (this.person !== null) ? this.person.url : null;
    }
    public get has_url(): boolean {
        return (this.url !== null);
    }
    public get personid(): string {
        return (this.person !== null) ? this.person.id : null;
    }
    public get fullname(): string {
        return (this.person !== null) ? this.person.fullname : null;
    }
    public get is_connected(): boolean {
        return this.loginInfo.connected;
    }
    public get is_notconnected(): boolean {
        return (!this.is_connected);
    }
    //
    private post_update_departement(): Promise<any> {
        //
        let xannees: IAnnee[] = [];
        let xunites: IUnite[] = [];
        let xgroupes: IGroupe[] = [];
        //
		let dep = this.departement;
        if (dep === null) {
            this.annees = xannees;
            this.unites = xunites;
            this.groupes = xgroupes;
            return Promise.resolve(true);
        }
        let pPers: IPerson = this.person;
        if (pPers === null) {
            this.annees = xannees;
            this.unites = xunites;
            this.groupes = xgroupes;
            return Promise.resolve(true);
        }
        if (this.is_admin || this.is_super) {
            let service = this.dataService;
            return service.get_departement_annees(dep).then((dd) => {
                xannees = ((dd !== undefined) && (dd !== null)) ? dd : [];
                return service.get_departement_groupes(dep);
            }).then((gg) => {
                xgroupes = ((gg !== undefined) && (gg !== null)) ? gg : [];
                return service.get_departement_unites(dep);
            }).then((uu) => {
                xunites = ((uu !== undefined) && (uu !== null)) ? uu : [];
                return true;
            }).then((ss) => {
                this.annees = xannees;
                this.unites = xunites;
                this.groupes = xgroupes;
				if (this.annees.length > 0) {
				this.annee = this.annees[0];
			} else {
				this.annee = null;
			}
			if (this.unites.length > 0) {
				this.unite = this.unites[0];
			} else {
				this.unite = null;
			}
			if (this.groupes.length > 0) {
				this.groupe = this.groupe[0];
			} else {
				this.groupe = null;
			}
                return true;
            });
        } else {
			let depid: string = dep.id;
            if (this.loginInfo.all_annees !== null) {
                for (let x of this.loginInfo.all_annees) {
                    if (x.departementid == depid) {
                        xannees.push(x);
                    }
                }//x
            }
            if (this.loginInfo.all_unites !== null) {
                for (let x of this.loginInfo.all_unites) {
                    if (x.departementid == depid) {
                        xunites.push(x);
                    }
                }//x
            }
            if (this.loginInfo.all_groupes !== null) {
                for (let x of this.loginInfo.all_groupes) {
                    if (x.departementid == depid) {
                        xgroupes.push(x);
                    }
                }//x
            }
            this.unites = xunites;
            this.annees = xannees;
            this.groupes = xgroupes;
			if (this.annees.length > 0) {
				this.annee = this.annees[0];
			} else {
				this.annee = null;
			}
			if (this.unites.length > 0) {
				this.unite = this.unites[0];
			} else {
				this.unite = null;
			}
			if (this.groupes.length > 0) {
				this.groupe = this.groupes[0];
			} else {
				this.groupe = null;
			}
			return Promise.resolve(true);
        }
    }// post_update_departement
    private post_update_annee(): Promise<any> {
        let xsemestres: ISemestre[] = [];
		let an = this.annee;
		if (an === null) {
            this.semestres = xsemestres;
            return Promise.resolve(true);
        }
        let anneeid = an.id;
        let pPers: IPerson = this.person;
        if (pPers === null) {
            this.semestres = xsemestres;
            return Promise.resolve(true);
        }
        if (this.is_admin || this.is_super) {
            return this.dataService.get_annee_semestres(an).then((dd) => {
                this.semestres = ((dd !== undefined) && (dd !== null)) ? dd : [];
                return true;
            });
        } else if (this.loginInfo.all_semestres !== null) {
            for (let x of this.loginInfo.all_semestres) {
                if (x.anneeid == anneeid) {
                    xsemestres.push(x);
                }
            }//x
            this.semestres = xsemestres;
            return Promise.resolve(true);
        }
    }// post_change_annee
    private post_update_unite(): Promise<any> {
        let xmatieres: IMatiere[] = [];
		let un = this.unite;
		if (un === null) {
            this.matieres = xmatieres;
            return Promise.resolve(true);
        }
        let uniteid = un.id;
        let pPers: IPerson = this.person;
        if (pPers === null) {
            this.matieres = xmatieres;
            return Promise.resolve(true);
        }
        if (this.is_admin || this.is_super) {
            return this.dataService.get_unite_matieres(un).then((dd) => {
                this.matieres = ((dd !== undefined) && (dd !== null)) ? dd : [];
                return true;
            });
        } else if (this.loginInfo.all_matieres !== null) {
            for (let x of this.loginInfo.all_matieres) {
                if (x.uniteid == uniteid) {
                    xmatieres.push(x);
                }
            }//x
            this.matieres = xmatieres;
            return Promise.resolve(true);
        }
    }// post_change_unite
}// class UserInfo
