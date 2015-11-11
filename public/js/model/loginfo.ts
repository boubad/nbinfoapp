//logininfo.ts
//
import {IPerson, IDataService, IDepartement, IAnnee, IUnite, IGroupe, ISemestre,
IMatiere, IEtudiant, IEnseignant, IAdministrator} from 'infodata';
import {SUPER_USERNAME} from '../infoconstants';
import {InfoRoot} from '../inforoot';
//
export class LoginInfo {
	private _person: IPerson = null;
	private _departements: IDepartement[] = null;
    private _annees: IAnnee[] = null;
    private _semestres: ISemestre[] = null;
    private _unites: IUnite[] = null;
    private _matieres: IMatiere[] = null;
    private _groupes: IGroupe[] = null;
    private _administrators: IAdministrator[] = null;
    private _enseignants: IEnseignant[] = null;
    private _etudiants: IEtudiant[] = null;
	private _departement: IDepartement = null;
	//
	constructor() {

	}// constructor	
	public get is_super(): boolean {
		return (this.person != null) && (this.person.username == SUPER_USERNAME);
	}
	public get is_admin(): boolean {
		let bRet: boolean = false;
		if ((this._departement !== undefined) && (this._departement !== null)) {
			let id = this._departement.id;
			let aa = this.all_administrators;
			for (let i = 0; i < aa.length; ++i) {
				let a = aa[i];
				if (a.departementid == id) {
					bRet = true;
					break;
				}
			}// i
		}// dep
		return bRet;
	}
	public get is_prof(): boolean {
		let bRet: boolean = false;
		if (this.departement !== null) {
			let id = this.departement.id;
			let aa = this.all_enseignants;
			for (let i = 0; i < aa.length; ++i) {
				let a = aa[i];
				if (a.departementid == id) {
					bRet = true;
					break;
				}
			}// i
		}// dep
		return bRet;
	}
	public get is_etud(): boolean {
		let bRet: boolean = false;
		if (this.departement !== null) {
			let id = this.departement.id;
			let aa = this.all_etudiants;
			for (let i = 0; i < aa.length; ++i) {
				let a = aa[i];
				if (a.departementid == id) {
					bRet = true;
					break;
				}
			}// i
		}// dep
		return bRet;
	}
	public get departement(): IDepartement {
		return (this._departement !== undefined) ? this._departement : null;
	}
	public set departement(p: IDepartement) {
		if ((p === undefined) || (p === null)) {
			this._departement = null;
		} else {
			let aa = this.all_departements;
			let id = p.id;
			for (let i = 0; i < aa.length; ++i) {
				let d = aa[i];
				if (d.id == id) {
					this._departement = d;
					break;
				}
			}// i
		}
	}
	public get person(): IPerson {
		return (this._person !== undefined) ? this._person : null;
	}
	public get connected(): boolean {
		return ((this._person !== undefined) && (this._person !== null));
	}
	public get all_departements(): IDepartement[] {
		return ((this._departements !== undefined) && (this._departements !== null)) ? this._departements : [];
	}
	public get all_annees(): IAnnee[] {
		return ((this._annees !== undefined) && (this._annees !== null)) ? this._annees : [];
	}
	public get all_semestres(): ISemestre[] {
		return ((this._semestres !== undefined) && (this._semestres !== null)) ? this._semestres : [];
	}
	public get all_unites(): IUnite[] {
		return ((this._unites !== undefined) && (this._unites !== null)) ? this._unites : [];
	}
	public get all_matieres(): IMatiere[] {
		return ((this._matieres !== undefined) && (this._matieres !== null)) ? this._matieres : [];
	}
	public get all_groupes(): IGroupe[] {
		return ((this._groupes !== undefined) && (this._groupes !== null)) ? this._groupes : [];
	}
	public get all_etudiants(): IEtudiant[] {
		return ((this._etudiants !== undefined) && (this._etudiants !== null)) ? this._etudiants : [];
	}
	public get all_enseignants(): IEnseignant[] {
		return ((this._enseignants !== undefined) && (this._enseignants !== null)) ? this._enseignants : [];
	}
	public get all_administrators(): IAdministrator[] {
		return ((this._administrators !== undefined) && (this._administrators !== null)) ? this._administrators : [];
	}
	public disconnect(): void {
		this._person = null;
		this._departement = null;
		this._departements = null;
		this._annees = null;
		this._groupes = null;
		this._unites = null;
		this._matieres = null;
		this._semestres = null;
		this._etudiants = null;
		this._enseignants = null;
		this._administrators = null;
	}// disconnect
	public refresh_departements(service: IDataService): Promise<any> {
		let pPers: IPerson = this.person;
		if (pPers == null) {
			return Promise.resolve(false);
		}
		if (pPers.username != SUPER_USERNAME) {
			return Promise.resolve(false);
		}
		return service.get_departements(0, 100).then((dd: IDepartement[]) => {
			let oldid:string = (this._departement !== null) ? this._departement.id : null;
			this._departements = ((dd !== undefined) && (dd !== null)) ? dd : [];
			this._departement = InfoRoot.sync_array(this._departements,oldid);
			return true;
		});
	}//refresh_departements
	public refresh_data(service:IDataService) : Promise<any> 
	{
		let pPers:IPerson = this._person;
		if ((pPers === undefined)|| (pPers === null)){
			return Promise.resolve(false);
		}
		let old = this._departement;
		this._departement = null;
		this._departements = null;
		this._annees = null;
		this._groupes = null;
		this._unites = null;
		this._matieres = null;
		this._semestres = null;
		this._etudiants = null;
		this._enseignants = null;
		this._administrators = null;
		let dids = (pPers !== null) ? pPers.departementids : [];
		return service.get_items_array(dids).then((dd: IDepartement[]) => {
			this._departements = ((dd !== undefined) && (dd !== null)) ? dd : [];
			let xold = ((old !== undefined) && (old !== null)) ? old.id : null;
			this._departement = InfoRoot.sync_array(this._departements,xold);
			let ids = (pPers !== null) ? pPers.anneeids : [];
			return service.get_items_array(ids);
		}).then((aa: IAnnee[]) => {
			this._annees = ((aa !== undefined) && (aa !== null)) ? aa : [];
			let ids = (pPers !== null) ? pPers.uniteids : [];
			return service.get_items_array(ids);
		}).then((uu: IUnite[]) => {
			this._unites = ((uu !== undefined) && (uu !== null)) ? uu : [];
			let ids = (pPers !== null) ? pPers.groupeids : [];
			return service.get_items_array(ids);
		}).then((gg: IGroupe[]) => {
			this._groupes = ((gg !== undefined) && (gg !== null)) ? gg : [];
			let ids = (pPers !== null) ? pPers.semestreids : [];
			return service.get_items_array(ids);
		}).then((ss: ISemestre[]) => {
			this._semestres = ((ss !== undefined) && (ss !== null)) ? ss : [];
			let ids = (pPers !== null) ? pPers.matiereids : [];
			return service.get_items_array(ids);
		}).then((mm: IMatiere[]) => {
			this._matieres = ((mm !== undefined) && (mm !== null)) ? mm : [];
			let ids = (pPers !== null) ? pPers.etudiantids : [];
			return service.get_items_array(ids);
		}).then((ee: IEtudiant[]) => {
			this._etudiants = ((ee !== undefined) && (ee !== null)) ? ee : [];
			let ids = (pPers !== null) ? pPers.enseignantids : [];
			return service.get_items_array(ids);
		}).then((pp: IEnseignant[]) => {
			this._enseignants = ((pp !== undefined) && (pp !== null)) ? pp : [];
			let ids = (pPers !== null) ? pPers.administratorids : [];
			return service.get_items_array(ids);
		}).then((gx: IAdministrator[]) => {
			this._administrators = ((gx !== undefined) && (gx !== null)) ? gx : [];
			return (pPers !== null);
		}).catch((err) => {
			return false;
		});
	}// refresh_data
	public login(service: IDataService, user: string, cpass: string): Promise<boolean> {
		this.disconnect();
		let pPers: IPerson = null;
		return service.get_person_by_username(user).then((p) => {
			if ((p !== undefined) && (p !== null) && (p.id !== undefined)) {
				if (p.check_password(cpass)) {
					this._person = p;
					pPers = p;
				}
			}
			if ((pPers !== null) && (pPers.username == SUPER_USERNAME)) {
				return service.get_departements();
			} else {
				let ids = (pPers !== null) ? pPers.departementids : [];
				return service.get_items_array(ids);
			}
		}).then((dd: IDepartement[]) => {
			this._departements = ((dd !== undefined) && (dd !== null)) ? dd : [];
			if (this._departements.length > 0) {
				this._departement = this._departements[0];
			}
			let ids = (pPers !== null) ? pPers.anneeids : [];
			return service.get_items_array(ids);
		}).then((aa: IAnnee[]) => {
			this._annees = ((aa !== undefined) && (aa !== null)) ? aa : [];
			let ids = (pPers !== null) ? pPers.uniteids : [];
			return service.get_items_array(ids);
		}).then((uu: IUnite[]) => {
			this._unites = ((uu !== undefined) && (uu !== null)) ? uu : [];
			let ids = (pPers !== null) ? pPers.groupeids : [];
			return service.get_items_array(ids);
		}).then((gg: IGroupe[]) => {
			this._groupes = ((gg !== undefined) && (gg !== null)) ? gg : [];
			let ids = (pPers !== null) ? pPers.semestreids : [];
			return service.get_items_array(ids);
		}).then((ss: ISemestre[]) => {
			this._semestres = ((ss !== undefined) && (ss !== null)) ? ss : [];
			let ids = (pPers !== null) ? pPers.matiereids : [];
			return service.get_items_array(ids);
		}).then((mm: IMatiere[]) => {
			this._matieres = ((mm !== undefined) && (mm !== null)) ? mm : [];
			let ids = (pPers !== null) ? pPers.etudiantids : [];
			return service.get_items_array(ids);
		}).then((ee: IEtudiant[]) => {
			this._etudiants = ((ee !== undefined) && (ee !== null)) ? ee : [];
			let ids = (pPers !== null) ? pPers.enseignantids : [];
			return service.get_items_array(ids);
		}).then((pp: IEnseignant[]) => {
			this._enseignants = ((pp !== undefined) && (pp !== null)) ? pp : [];
			let ids = (pPers !== null) ? pPers.administratorids : [];
			return service.get_items_array(ids);
		}).then((gx: IAdministrator[]) => {
			this._administrators = ((gx !== undefined) && (gx !== null)) ? gx : [];
			return (pPers !== null);
		}).catch((err) => {
			return false;
		});
	}// login
}// class LoginInfo
