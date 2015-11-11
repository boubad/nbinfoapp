//basebean.ts
//
import {IPerson, IDepartement, IAnnee,IBaseItem,
IUnite, IGroupe, IMatiere,
ISemestre, IItemFactory} from 'infodata';
//
import {UserInfo} from './userinfo';
import {BaseModel} from './basemodel';
import {InfoRoot} from '../inforoot';
//
export class BaseBean extends BaseModel {
	//
	public _info: UserInfo;
	private _minDate: Date = null;
	private _maxDate: Date = null;
	public is_in_activate: boolean = false;
	//
	constructor(info: UserInfo) {
		super(info.dataService, info.messageManager, info.logger);
		this._info = info;
		this.is_in_activate = false;
	}
	public sort_array(pp:IBaseItem[]):void {
		if ((pp !== undefined) && (pp !== null) && (pp.length > 1)){
			let p = pp[0];
			if ((p !== undefined) && (p !== null)){
				let pf = p.sort_func;
				if ((pf !== undefined) && (pf !== null)){
					pp.sort(pf);
				}// pf
			}//p
		}// pp
	}
	public get userInfo(): UserInfo {
		return (this._info !== undefined) ? this._info : null;
	}
	public get semestreMinDate(): Date {
		return this._minDate;
	}
	protected post_change_semestre(): Promise<any> {
        return super.post_change_semestre().then((r) => {
			this._minDate = null;
			this._maxDate = null;
			if (this.semestre !== null) {
				this._minDate = this.semestre.startDate;
				this._maxDate = this.semestre.endDate;
			}
			return true;
		});
    }
	public get semestreMaxDate(): Date {
		return this._maxDate;
	}
	public refresh_departements(): Promise<any> {
		if (this.userInfo !== null) {
			return this.userInfo.refresh_departements();
		} else {
			return Promise.resolve(false);
		}
	}
	public get itemFactory(): IItemFactory {
		return this.dataService.itemFactory;
	}
	protected get_departements():IDepartement[]{
		return (this.userInfo !== null) ? this.userInfo.departements : [];
	}
	public get departements(): IDepartement[] {
		return this.get_departements();
	}
	public get departement(): IDepartement {
		return (this.userInfo !== null) ? this.userInfo.departement : null;
	}
	public set departement(p: IDepartement) {
		if (this.userInfo !== null) {
			this.userInfo.departement = p;
			if (!this.is_in_activate) {
				this.post_change_departement();
			}
		}
	}
	//
	protected get_annees():IAnnee[]{
		return (this.userInfo !== null) ? this.userInfo.annees : [];
	}
	public get annees(): IAnnee[] {
		return this.get_annees();
	}
	public get annee(): IAnnee {
		return (this.userInfo !== null) ? this.userInfo.annee : null;
	}
	public set annee(p: IAnnee) {
		if (this.userInfo !== null) {
			this.userInfo.annee = p;
			if (!this.is_in_activate) {
				this.post_change_annee();
			}
		}
	}
	//
	protected get_unites():IUnite[]{
		return (this.userInfo !== null) ? this.userInfo.unites : [];
	}
	public get unites(): IUnite[] {
		return this.get_unites();
	}
	public get unite(): IUnite {
		return (this.userInfo !== null) ? this.userInfo.unite : null;
	}
	public set unite(p: IUnite) {
		if (this.userInfo !== null) {
			this.userInfo.unite = p;
			if (!this.is_in_activate) {
				this.post_change_unite();
			}
		}
	}
	//
	protected get_groupes():IGroupe[]{
		return (this.userInfo !== null) ? this.userInfo.groupes : [];
	}
	public get groupes(): IGroupe[] {
		return this.get_groupes();
	}
	public get groupe(): IGroupe {
		return (this.userInfo !== null) ? this.userInfo.groupe : null;
	}
	public set groupe(p: IGroupe) {
		if (this.userInfo !== null) {
			this.userInfo.groupe = p;
			if (!this.is_in_activate) {
				this.post_change_groupe();
			}
		}
	}
	//
	protected get_semestres():ISemestre[]{
		return (this.userInfo !== null) ? this.userInfo.semestres : [];
	}
	public get semestres(): ISemestre[] {
		return this.get_semestres();
	}
	public get semestre(): ISemestre {
		return (this.userInfo !== null) ? this.userInfo.semestre : null;
	}
	public set semestre(p: ISemestre) {
		if (this.userInfo !== null) {
			this.userInfo.semestre = p;
			if (!this.is_in_activate) {
				this.post_change_semestre();
			}
		}
	}
	//
	protected get_matieres():IMatiere[]{
		return (this.userInfo !== null) ? this.userInfo.matieres : [];
	}
	public get matieres(): IMatiere[] {
		return this.get_matieres();
	}
	public get matiere(): IMatiere {
		return (this.userInfo !== null) ? this.userInfo.matiere : null;
	}
	public set matiere(p: IMatiere) {
		if (this.userInfo !== null) {
			this.userInfo.matiere = p;
			if (!this.is_in_activate) {
				this.post_change_matiere();
			}
		}
	}
	//
	public get departementid(): string {
        return (this.departement !== null) ? this.departement.id : null;
    }
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
        return (this.userInfo !== null) ? this.userInfo.person : null;
    }// get person
    public get photoUrl(): string {
        return ((this.person !== undefined) && (this.person !== null)) ? this.person.url : null;
    }
    public get hasPhotoUrl(): boolean {
        return (this.photoUrl !== null);
    }
	public login(username: string, password: string): Promise<boolean> {
		if (this.userInfo !== null) {
			return this.userInfo.login(username, password);
		} else {
			return Promise.resolve(false);
		}
	}
	public logout(): void {
        if (this.userInfo !== null) {
			this.userInfo.logout();
		}
    }// logout
    public get is_super(): boolean {
		return (this.userInfo !== null) ? this.userInfo.is_super : false;
    }
    public get is_admin(): boolean {
		return (this.userInfo !== null) ? this.userInfo.is_admin : false;
    }
	public get isAdmin(): boolean {
		return this.is_super || this.is_admin;
	}
    public get is_prof(): boolean {
        return (this.userInfo !== null) ? this.userInfo.is_prof : false;
    }
    public get is_etud(): boolean {
		return (this.userInfo !== null) ? this.userInfo.is_etud : false;
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
        return (this.userInfo !== null) ? this.userInfo.is_connected : false;
    }
    public get is_notconnected(): boolean {
        return (!this.is_connected);
    }
	public refresh_data(): Promise<any> {
		let info = this.userInfo;
		if (info !== null) {
			return info.loginInfo.refresh_data(this.dataService);
		} else {
			return Promise.resolve(false);
		}
	}
	protected get_minDate(): string {
		return (this.semestre !== null) ? InfoRoot.date_to_string(this.semestre.startDate) : null;
	}
	protected get_maxDate(): string {
		return (this.semestre !== null) ? InfoRoot.date_to_string(this.semestre.endDate) : null;
	}
	public get minDate(): string {
		return this.get_minDate();
	}
	public get maxDate(): string {
		return this.get_maxDate();
	}
	public refreshAll(): Promise<any> {
		return Promise.resolve(true);
	}
	protected perform_activate(): Promise<any> {
		let self = this;
		return super.perform_activate().then((x) => {
			if ((self.departement === null) && (self.departements.length > 0)) {
				self.departement = self.departements[0];
			}
			if ((self.annee === null) && (self.annees.length > 0)) {
				self.annee = self.annees[0];
			}
			if ((self.unite === null) && (self.unites.length > 0)) {
				self.unite = self.unites[0];
			}
			if ((self.matiere === null) && (self.matieres.length > 0)) {
				self.matiere = self.matieres[0];
			}
			if ((self.semestre === null) && (self.semestres.length > 0)) {
				self.semestre = self.semestres[0];
			}
			if ((self.groupe === null) && (self.groupes.length > 0)) {
				self.groupe = self.groupes[0];
			}
			return true;
		});
	}
	public activate(params?: any, config?: any, instruction?: any): any {
		this.is_in_activate = true;
		return this.perform_activate().then((x) => {
			return this.refreshAll();
		}).then((x) => {
			this.is_in_activate = false;
			return true;
		}).catch((err) => {
			this.set_error(err);
			this.is_in_activate = false;
			return false;
		});
	}// activate
}// class BaseBean
