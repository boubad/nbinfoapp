//etudiantserachmodel.ts
//
import {BaseConsultViewModel} from '../baseconsultmodel';
import {UserInfo} from './userinfo';
import {InfoRoot} from '../../inforoot';
import {IPerson, IEtudiant} from 'infodata';
//
export class EtudiantSearchModel extends BaseConsultViewModel<IEtudiant> {
	//
	//
	private _date: string = null;
    private _current_person: IPerson = null;
	public canFetch:boolean = true;
	//
	//
	constructor(info: UserInfo) {
		super(info);
		this.canFetch = true;
	}// constructor
	protected get_template():any {
		let p = this.currentPerson;
		let oRet:any = {type: p.type()};
		if (p.birthDate !== null){
			oRet.birthDate = p.birthDate;
		}
		if ((p.lastname !== null) && (p.lastname.length > 0)){
			oRet.lastname = {$in: p.lastname};
		}
		if ((p.firstname !== null) && (p.firstname.length > 0)){
			oRet.firstname = {$in: p.firstname};
		}
		if ((p.sexe !== null) && (p.sexe.length > 0)){
			oRet.sexe = {$in: p.sexe};
		}
		if ((p.dossier !== null) && (p.dossier.length > 0)) {
			oRet.dossier = {$in: p.dossier};
		}
		if ((p.ville !== null) && (p.ville.length > 0)) {
			oRet.ville = {$in: p.ville};
		}
		if ((p.etablissement !== null) && (p.etablissement.length > 0)) {
			oRet.etablissement = {$in: p.etablissement};
		}
		if ((p.serieBac !== null) && (p.serieBac.length > 0)) {
			oRet.serieBac = {$in: p.serieBac};
		}
		if ((p.optionBac !== null) && (p.optionBac.length > 0)) {
			oRet.optionBac = {$in: p.optionBac};
		}
		if ((p.mentionBac !== null) && (p.mentionBac.length > 0)) {
			oRet.mentionBac = {$in: p.mentionBac};
		}
		if ((p.etudesSuperieures !== null) && (p.etudesSuperieures.length > 0)) {
			oRet.etudesSuperieures = {$in: p.etudesSuperieures};
		}
		if ((p.apb !== null) && (p.apb.length > 0)) {
			oRet.apb = {$in: p.apb};
		}
		return oRet;
	}//
	protected get_all_ids(): Promise<string[]> {
		this.canFetch = false;
		let model = this.currentPerson;
		let selector: any = {};
		model.to_map(selector);
		return this.dataService.query_ids(selector).then((rr)=>{
			this.canFetch = true;
			return rr;
		}).catch((e)=>{
			this.canFetch = true;
			return [];
		})
	}// get_all_ids
	protected filter_persons(init:IPerson[]) : IPerson[]{
		let oRet:IPerson[] = [];
		if ((init !== undefined) && (init !== null)){
			let nGroupeid = (this.groupeid !== undefined) ? this.groupeid : null;
			let nDepartementid = (this.departementid !== undefined) ? this.departementid : null;
			if ((nGroupeid !== null) && (nGroupeid.trim().length < 1)){
				nGroupeid = null;
			}
			if ((nDepartementid !== null) && (nDepartementid.trim().length < 1)){
				nDepartementid = null;
			}
			for (let p of init){
				let bDep:boolean = true;
				let bGroupe:boolean = true;
				if (nDepartementid !== null){
					bDep = false;
					let ids:string[] = ((p.departementids !== undefined) && (p.departementids !== null)) ? p.departementids : [];
					for (let id of ids){
						if (id == nDepartementid){
							bDep = true;
							break;
						}
					}//id					
				}// dep
				if (nGroupeid !== null){
					bGroupe = false;
					let ids:string[] = ((p.groupeids !== undefined) && (p.groupeids !== null)) ? p.groupeids : [];
					for (let id of ids){
						if (id == nGroupeid){
							bGroupe = true;
							break;
						}
					}//id					
				}// dep
				if (bGroupe && bDep){
					this.add_to_array(oRet, p);
				}
			}// p
		}// init
		return oRet;
	}// filter_persons
	public refresh(): Promise<any> {
		this.canFetch = false;
		this.clear_error();
		let model = this.modelItem;
		if (this.items.length > 0) {
			for (let elem of this.items) {
				let x = elem.url;
				if (x !== null) {
					this.revokeUrl(x);
					elem.url = null;
				}
			}// elem
		}
		this.items = [];
		let startKey = null;
		let endKey = null;
		let nbItems = this.allIds.length;
		let nc = this.itemsPerPage;
		let istart = (this.currentPage - 1) * nc;
		if ((istart >= 0) && (istart < nbItems)) {
			startKey = this.allIds[istart];
		}
		let iend = istart + nc - 1;
		if (iend >= nbItems) {
			iend = nbItems - 1;
		}
		if ((iend >= 0) && (iend < nbItems)) {
			endKey = this.allIds[iend];
		}
		if ((startKey === null) || (endKey === null)) {
			return Promise.resolve(true);
		}
		let ids: string[] = [];
		for (let i = istart; i <= iend; ++i) {
			ids.push(this.allIds[i]);
		}
		this.clear_error();
		return this.dataService.get_items_array(ids).then((rrr: IPerson[]) => {
			let rr = this.filter_persons(rrr);
			let xids:string[] = [];
			for (let y of rr){
				let yc = y.etudiantids;
				if ((yc !== undefined) && (yc !== null) && (yc.length > 0)){
					for (let yx of yc) {
						xids.push(yx);
					}//yx
				}
			}// y
			return this.dataService.get_items_array(xids);
		}).then((zz:IEtudiant[])=>{
			return this.retrieve_avatars(zz);
		}).then((xx: IEtudiant[]) => {
			this.items = [];
			if ((xx !== undefined) && (xx !== null)){
				for (let x of xx){
					this.add_to_array(this.items, x);
				}
			}
			this.sort_array(this.items);
			this.canFetch = true;
			return true;
		}).catch((e)=>{
			this.canFetch = true;
			return false;
		});
	}// refresh
	protected create_person(): IPerson {
        return this.itemFactory.create_person();
    }
	protected create_item(): IEtudiant {
        return this.itemFactory.create_etudiant();
    }
	public get currentPerson(): IPerson {
		if ((this._current_person === undefined) || (this._current_person === null)) {
			this._current_person = this.create_person();
		}
        return this._current_person;
    }
    public set currentPerson(s: IPerson) {
        this._current_person = ((s !== undefined) && (s !== null)) ?
			s : this.create_person();
    }
	protected perform_activate(): Promise<any> {
		return super.perform_activate().then((r) => {
			if (this._current_person === null) {
				this._current_person = this.create_person();
			}
			return true;
		});
	}// perform_activate
	public get firstname(): string {
        return this.currentPerson.firstname;
    }
    public set firstname(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.firstname = s;
        }
    }
    public get lastname(): string {
        return this.currentPerson.lastname;
    }
    public set lastname(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.lastname = s;
        }
    }
	public get dossier(): string {
        return this.currentPerson.dossier;
    }
    public set dossier(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.dossier = s;
        }
    }
    public get sexe(): string {
        return this.currentPerson.sexe;
    }
    public set sexe(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.sexe = s;
        }
    }
    public get birthDate(): string {
        return this._date;
    }
    public set birthDate(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.birthDate = InfoRoot.string_to_date(s);
            this._date = InfoRoot.date_to_string(x.birthDate);
        }
    }
    public get ville(): string {
        return this.currentPerson.ville;
    }
    public set ville(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.ville = s;
        }
    }
    public get etablissement(): string {
        return this.currentPerson.etablissement;
    }
    public set etablissement(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.etablissement = s;
        }
    }
    public get serieBac(): string {
        return this.currentPerson.serieBac;
    }
    public set serieBac(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.serieBac = s;
        }
    }
    public get optionBac(): string {
        return this.currentPerson.optionBac;
    }
    public set optionBac(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.optionBac = s;
        }
    }
    public get mentionBac(): string {
        return this.currentPerson.mentionBac;
    }
    public set mentionBac(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.mentionBac = s;
        }
    }
    public get etudesSuperieures(): string {
        return this.currentPerson.etudesSuperieures;
    }
    public set etudesSuperieures(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.etudesSuperieures = s;
        }
    }
	public get apb(): string {
        return this.currentPerson.apb;
    }
    public set apb(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.apb = s;
        }
    }
}// class EtudiantSearchModel