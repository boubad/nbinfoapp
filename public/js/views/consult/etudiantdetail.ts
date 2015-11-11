//etudiantdetailmodel.ts
//
//
import {InfoUserInfo} from '../infouserinfo';
import {BaseDetailModel} from '../../model/consult/basedetailmodel';
import {IPerson, IEtudiantEvent, IUIManager, IBaseItem,IEtudiant} from 'infodata';
import {InfoRoot} from '../../inforoot';
//
export class EtudDetailModel extends BaseDetailModel {
    //
	static inject() { return [InfoUserInfo]; }
	//
    public currentPerson: IPerson = null;
    public evts: IEtudiantEvent[] = [];
    public etudiantUrl: string = null;
    public birthDate: string = null;
	public etudiant:IEtudiant = null;
    //
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
        this.title = "Détails Etudiant";
    }
    public get current_etudiantid():string {
      return (this.currentPerson !== null) ? this.currentPerson.id : '';
    }
    public activate(params?: any, config?: any, instruction?: any): any {
        let self = this;
        this.currentPerson = this.itemFactory.create_person();
        this.birthDate = null;
        this.evts = [];
        this.etudiantUrl = null;
		this.etudiant = null;
        let service = this.dataService;
        let pPers: IPerson = null;
        let xvts: IEtudiantEvent[] = [];
        let xBlob: Blob = null;
        return super.activate(params, config, instruction).then((r) => {
            let id = (params.id !== undefined) ? params.id : null;
            if (id !== null) {
                return service.find_item_by_id(id);
            } else {
                return Promise.resolve(null);
            }
		}).then((pe:IEtudiant)=>{
			this.etudiant = (pe !== undefined) ? pe : null;
			let id = (this.etudiant !== null) ? this.etudiant.personid : null;
			 return service.find_item_by_id(id);
        }).then((p: IPerson) => {
            if ((p !== undefined) && (p !== null)) {
                self.currentPerson = p;
                self.birthDate = InfoRoot.date_to_string(p.birthDate);
                self.title = p.fullname;
                return service.get_etudiant_events(this.etudiant);
            } else {
                return Promise.resolve(xvts);
            }
        }).then((xx: IEtudiantEvent[]) => {
            self.evts = xx;
            let x = self.currentPerson;
            if ((x.id !== null) && (x.avatarid !== null)) {
                return service.find_attachment(x.id, x.avatarid);
            } else {
                return Promise.resolve(xBlob);
            }
        }).then((blob) => {
            if ((blob !== undefined) && (blob !== null)) {
                self.etudiantUrl = self.createUrl(blob);
            }
			return true;
        });
    }// activate
    public deactivate(): any {
        if (this.etudiantUrl !== null) {
            this.revokeUrl(this.etudiantUrl);
            this.etudiantUrl = null;
        }
        return super.deactivate();
    }
    public get hasEtudiantUrl(): boolean {
        return (this.etudiantUrl !== null);
    }
    public set hasEtudiantUrl(s: boolean) { }
    public get fullname(): string {
        return this.currentPerson.fullname;
    }
    public set fullname(s: string) { }
    public get username(): string {
        return this.currentPerson.username;
    }
    public set username(s: string) {
    }
    public get firstname(): string {
        return this.currentPerson.firstname;
    }
    public set firstname(s: string) {
    }
    public get lastname(): string {
        return this.currentPerson.lastname;
    }
    public set lastname(s: string) {
    }
    public get email(): string {
        return this.currentPerson.email;
    }
    public set email(s: string) {
    }
    public get phone(): string {
        return this.currentPerson.phone;
    }
    public set phone(s: string) {
    }
    public get dossier(): string {
        return this.currentPerson.dossier;
    }
    public set dossier(s: string) {
    }
    public get sexe(): string {
        return this.currentPerson.sexe;
    }
    public set sexe(s: string) {
    }
    public get ville(): string {
        return this.currentPerson.ville;
    }
    public set ville(s: string) {
    }
    public get etablissement(): string {
        return this.currentPerson.etablissement;
    }
    public set etablissement(s: string) {
    }
    public get serieBac(): string {
        return this.currentPerson.serieBac;
    }
    public set serieBac(s: string) {
    }
    public get optionBac(): string {
        return this.currentPerson.optionBac;
    }
    public set optionBac(s: string) {
    }
    public get mentionBac(): string {
        return this.currentPerson.mentionBac;
    }
    public set mentionBac(s: string) {
    }
    public get etudesSuperieures(): string {
        return this.currentPerson.etudesSuperieures;
    }
    public set etudesSuperieures(s: string) {
    }
}// class EtudDetail
