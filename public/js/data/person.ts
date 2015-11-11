//person.ts
//
import {IPerson} from 'infodata';
import {BaseItem} from './baseitem';
import {MyCrypto} from './mycrypto';
import {InfoRoot} from '../inforoot';
import {PERSON_KEY, PERSON_PREFIX} from '../infoconstants';
//
//
var cc = new MyCrypto();
//
export class Person extends BaseItem implements IPerson {
    //
    private _email: string;
    private _phone: string;
    private _password: string;
    private _username: string;
    private _firstname: string;
    private _lastname: string;
    //
    private _departementids: string[];
    private _anneeids: string[];
    private _semestreids: string[];
    private _matiereids: string[];
    private _uniteids: string[];
    private _groupeids: string[];
    private _affectationids: string[];
    private _eventids: string[];
	private _etudiantids: string[];
	private _enseignantids: string[];
	private _administratorids: string[];
	//
	private _dossier: string;
	private _sexe: string;
	private _date: Date;
	private _ville: string;
	private _etablissement: string;
	private _serieBac: string;
	private _optionBac: string;
	private _mentionBac: string;
	private _etudesSuperieures: string;
	private _apb: string;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.username !== undefined) {
                this._username = oMap.username;
            }
            if (oMap.password !== undefined) {
                this._password = oMap.password;
            }
            if (oMap.firstname !== undefined) {
                this._firstname = oMap.firstname;
            }
            if (oMap.lastname !== undefined) {
                this._lastname = oMap.lastname;
            }
            if (oMap.email !== undefined) {
                this._email = oMap.email;
            }
            if (oMap.phone !== undefined) {
                this._phone = oMap.phone;
            }
            if (oMap.departementids !== undefined) {
                this._departementids = oMap.departementids;
            } //
            if (oMap.anneeids !== undefined) {
                this._anneeids = oMap.anneeids;
            } //
            if (oMap.semestreids !== undefined) {
                this._semestreids = oMap.semestreids;
            } //
            if (oMap.uniteids !== undefined) {
                this._uniteids = oMap.uniteids;
            } //
            if (oMap.matiereids !== undefined) {
                this._matiereids = oMap.matiereids;
            } //
            if (oMap.groupeids !== undefined) {
                this._groupeids = oMap.groupeids;
            } //
			if (oMap.etudiantids !== undefined) {
				this._etudiantids = oMap.etudiantids;
			}
			if (oMap.enseignantids !== undefined) {
				this._enseignantids = oMap.enseignantids;
			}
			if (oMap.administratorids !== undefined) {
				this._administratorids = oMap.administratorids;
			}
			if (oMap.dossier !== undefined) {
				this._dossier = oMap.dossier;
			}
			if (oMap.sexe !== undefined) {
				this._sexe = oMap.sexe;
			}
			if (oMap.birthDate !== undefined) {
				this.birthDate = oMap.birthDate;
			}
			if (oMap.etablissement !== undefined) {
				this._etablissement = oMap.etablissement;
			}
			if (oMap.ville !== undefined) {
				this._ville = oMap.ville;
			}
			if (oMap.serieBac !== undefined) {
				this._serieBac = oMap.serieBac;
			}
			if (oMap.optionBac !== undefined) {
				this._optionBac = oMap.optionBac;
			}
			if (oMap.mentionBac != undefined) {
				this._mentionBac = oMap.mentionBac;
			}
			if (oMap.etudesSuperieures !== undefined) {
				this._etudesSuperieures = oMap.etudesSuperieures;
			}
			if (oMap.apb !== undefined) {
				this._apb = oMap.apb;
			}
			if (oMap.affectationids !== undefined){
				this._affectationids = oMap.affectationids;
			}
			if (oMap.eventids !== undefined){
				this._eventids = oMap.eventids;
			}
        } // oMap
    } // constructor
	//
	public get dossier(): string {
		return (this._dossier !== undefined) ? this._dossier : null;
	}
	public set dossier(s: string) {
		this._dossier = ((s !== undefined) && (s !== null)) ? s.trim().toUpperCase() : null;
	}
	public get sexe(): string {
		return (this._sexe !== undefined) ? this._sexe : null;
	}
	public set sexe(s: string) {
		this._sexe = ((s !== undefined) && (s !== null)) ? s.trim().toUpperCase() : null;
	}
	public get birtDate(): Date {
		return (this._date !== undefined) ? this._date : null;
	}
	public set birthDate(s: Date) {
		this._date = InfoRoot.check_date(s);
	}
	public get ville(): string {
		return (this._ville !== undefined) ? this._ville : null;
	}
	public set ville(s: string) {
		this._ville = ((s !== undefined) && (s !== null)) ? s.trim().toUpperCase() : null;
	}
	public get etablissement(): string {
		return (this._etablissement !== undefined) ? this._etablissement : null;
	}
	public set etablissement(s: string) {
		this._etablissement = ((s !== undefined) && (s !== null)) ? s.trim().toUpperCase() : null;
	}
	public get serieBac(): string {
		return (this._serieBac !== undefined) ? this._serieBac : null;
	}
	public set serieBac(s: string) {
		this._serieBac = ((s !== undefined) && (s !== null)) ? s.trim().toUpperCase() : null;
	}
	public get optionBac(): string {
		return (this._optionBac !== undefined) ? this._optionBac : null;
	}
	public set optionBac(s: string) {
		this._optionBac = ((s !== undefined) && (s !== null)) ? s.trim().toUpperCase() : null;
	}
	public get mentionBac(): string {
		return (this._mentionBac !== undefined) ? this._mentionBac : null;
	}
	public set mentionBac(s: string) {
		this._mentionBac = ((s !== undefined) && (s !== null)) ? s.trim().toUpperCase() : null;
	}
	public get etudesSuperieures(): string {
		return (this._etudesSuperieures !== undefined) ? this._etudesSuperieures : null;
	}
	public set etudesSuperieures(s: string) {
		this._etudesSuperieures = ((s !== undefined) && (s !== null)) ? s.trim().toUpperCase() : null;
	}
	public get apb(): string {
		return (this._apb !== undefined) ? this._apb : null;
	}
	public set apb(s: string) {
		this._apb = ((s !== undefined) && (s !== null)) ? s.trim().toUpperCase() : null;
	}
	//
	public from_map(oMap?: any): void {
		super.from_map(oMap);
		this._email = null;
		this._phone = null;
		this._password = null;
		this._username = null;
		this._firstname = null;
		this._lastname = null;
		this._departementids = null;
		this._anneeids = null;
		this._semestreids = null;
		this._matiereids = null;
		this._uniteids = null;
		this._groupeids = null;
		this._affectationids = null;
		this._eventids = null;
		this._etudiantids = null;
		this._enseignantids = null;
		this._administratorids = null;
		if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.username !== undefined) {
                this._username = oMap.username;
            }
            if (oMap.password !== undefined) {
                this._password = oMap.password;
            }
            if (oMap.firstname !== undefined) {
                this._firstname = oMap.firstname;
            }
            if (oMap.lastname !== undefined) {
                this._lastname = oMap.lastname;
            }
            if (oMap.email !== undefined) {
                this._email = oMap.email;
            }
            if (oMap.phone !== undefined) {
                this._phone = oMap.phone;
            }
            if (oMap.departementids !== undefined) {
                this._departementids = oMap.departementids;
            } //
            if (oMap.anneeids !== undefined) {
                this._anneeids = oMap.anneeids;
            } //
            if (oMap.semestreids !== undefined) {
                this._semestreids = oMap.semestreids;
            } //
            if (oMap.uniteids !== undefined) {
                this._uniteids = oMap.uniteids;
            } //
            if (oMap.matiereids !== undefined) {
                this._matiereids = oMap.matiereids;
            } //
            if (oMap.groupeids !== undefined) {
                this._groupeids = oMap.groupeids;
            } //
			if (oMap.etudiantids !== undefined) {
				this._etudiantids = oMap.etudiantids;
			}
			if (oMap.enseignantids !== undefined) {
				this._enseignantids = oMap.enseignantids;
			}
			if (oMap.administratorids !== undefined) {
				this._administratorids = oMap.administratorids;
			}
			if (oMap.dossier !== undefined) {
				this._dossier = oMap.dossier;
			}
			if (oMap.sexe !== undefined) {
				this._sexe = oMap.sexe;
			}
			if (oMap.birthDate !== undefined) {
				this.birthDate = oMap.birthDate;
			}
			if (oMap.etablissement !== undefined) {
				this._etablissement = oMap.etablissement;
			}
			if (oMap.ville !== undefined) {
				this._ville = oMap.ville;
			}
			if (oMap.serieBac !== undefined) {
				this._serieBac = oMap.serieBac;
			}
			if (oMap.optionBac !== undefined) {
				this._optionBac = oMap.optionBac;
			}
			if (oMap.mentionBac != undefined) {
				this._mentionBac = oMap.mentionBac;
			}
			if (oMap.etudesSuperieures !== undefined) {
				this._etudesSuperieures = oMap.etudesSuperieures;
			}
			if (oMap.apb !== undefined) {
				this._apb = oMap.apb;
			}
			if (oMap.affectationids !== undefined){
				this._affectationids = oMap.affectationids;
			}
			if (oMap.eventids !== undefined){
				this._eventids = oMap.eventids;
			}
        } // oMap
	}// from_map
	//
	public get username(): string {
		return ((this._username !== undefined) && (this._username !== null) && (this._username.length > 0)) ?
			this._username : null;
	}
	public set username(s: string) {
		this._username = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
			s.trim().toLowerCase() : null;
	}
	public get password(): string {
		return ((this._password !== undefined) && (this._password !== null)) ?
			this._password : null;
	}
	public set password(s: string) {
		this._password = ((s !== undefined) && (s !== null)) ? s : null;
	}
	public get firstname(): string {
		return ((this._firstname !== undefined) && (this._firstname !== null) && (this._firstname.length > 0)) ?
			this._firstname : null;
	}
	public set firstname(s: string) {
		let ss: string = ((s !== undefined) && (s !== null)) ? s.trim() : "";
		let n: number = ss.length;
		if (n > 1) {
			ss = ss.substr(0, 1).toUpperCase() + ss.substr(1);
		} else {
			ss = ss.toUpperCase();
		}
		this._firstname = (ss.length > 0) ? ss : null;
	}
	public get lastname(): string {
		return ((this._lastname !== undefined) && (this._lastname !== null)) ?
			this._lastname : null;
	}
	public set lastname(s: string) {
		let ss: string = ((s !== undefined) && (s !== null)) ? s.trim().toUpperCase() : "";
		this._lastname = (ss.length > 0) ? ss : null;
	}
	public get email(): string {
		return ((this._email !== undefined) && (this._email !== null) && (this._email.length > 0)) ?
			this._email : null;
	}
	public set email(s: string) {
		this._email = ((s !== undefined) && (s !== null)) ? s.trim() : null;
	}
	public get phone(): string {
		return ((this._phone !== undefined) && (this._phone !== null) && (this._phone.length > 0)) ?
			this._phone : null;
	}
	public set phone(s: string) {
		this._phone = ((s !== undefined) && (s !== null)) ? s.trim() : null;
	}
	public get departementids(): string[] {
		return ((this._departementids !== undefined) && (this._departementids !== null)) ?
			this._departementids : [];
	}
	public set departementids(dd: string[]) {
		this._departementids = ((dd !== undefined) && (dd !== null)) ? dd : [];
	}
	public get groupeids(): string[] {
		return ((this._groupeids !== undefined) && (this._groupeids !== null)) ?
			this._groupeids : [];
	}
	public set groupeids(dd: string[]) {
		this._groupeids = ((dd !== undefined) && (dd !== null)) ? dd : [];
	}
	public get anneeids(): string[] {
		return ((this._anneeids !== undefined) && (this._anneeids !== null)) ?
			this._anneeids : [];
	}
	public set anneeids(dd: string[]) {
		this._anneeids = ((dd !== undefined) && (dd !== null)) ? dd : [];
	}
	public get semestreids(): string[] {
		return ((this._semestreids !== undefined) && (this._semestreids !== null)) ?
			this._semestreids : [];
	}
	public set semestreids(dd: string[]) {
		this._semestreids = ((dd !== undefined) && (dd !== null)) ? dd : [];
	}
	public get uniteids(): string[] {
		return ((this._uniteids !== undefined) && (this._uniteids !== null)) ?
			this._uniteids : [];
	}
	public set uniteids(dd: string[]) {
		this._uniteids = ((dd !== undefined) && (dd !== null)) ? dd : [];
	}
	public get matiereids(): string[] {
		return ((this._matiereids !== undefined) && (this._matiereids !== null)) ?
			this._matiereids : [];
	}
	public set matiereids(dd: string[]) {
		this._matiereids = ((dd !== undefined) && (dd !== null)) ? dd : [];
	}
	public get etudiantids(): string[] {
		return ((this._etudiantids !== undefined) && (this._etudiantids !== null)) ?
			this._etudiantids : [];
	}
	public set etudiantids(dd: string[]) {
		this._etudiantids = ((dd !== undefined) && (dd !== null)) ? dd : [];
	}
	public get enseignantids(): string[] {
		return ((this._enseignantids !== undefined) && (this._enseignantids !== null)) ?
			this._enseignantids : [];
	}
	public set enseignantids(dd: string[]) {
		this._enseignantids = ((dd !== undefined) && (dd !== null)) ? dd : [];
	}
	public get administratorids(): string[] {
		return ((this._administratorids !== undefined) && (this._administratorids !== null)) ?
			this._administratorids : [];
	}
	public set administratorids(dd: string[]) {
		this._administratorids = ((dd !== undefined) && (dd !== null)) ? dd : [];
	}
	public get affectationids(): string[] {
		return ((this._affectationids !== undefined) && (this._affectationids !== null)) ?
			this._affectationids : [];
	}
	public set affectationids(dd: string[]) {
		this._affectationids = ((dd !== undefined) && (dd !== null)) ? dd : [];
	}
	public get eventids(): string[] {
		return ((this._eventids !== undefined) && (this._eventids !== null)) ?
			this._eventids : [];
	}
	public set eventids(dd: string[]) {
		this._eventids = ((dd !== undefined) && (dd !== null)) ? dd : [];
	}
	//
	public to_map(oMap: any): void {
        super.to_map(oMap);
		if ((oMap !== undefined) && (oMap !== null)) {
			if (this.username !== null) {
				oMap.username = this.username;
			}
			if (this.password !== null) {
				oMap.password = this.password;
			}
			if (this.firstname !== null) {
				oMap.firstname = this.firstname;
			}
			if (this.lastname !== null) {
				oMap.lastname = this.lastname;
			}
			if (this.email !== null) {
				oMap.email = this.email;
			}
			if (this.phone !== null) {
				oMap.phone = this.phone;
			}
			if ((this.departementids !== undefined) && (this.departementids !== null)
				&& (this.departementids.length > 0)) {
				oMap.departementids = this.departementids;
			}
			if ((this.uniteids !== undefined) && (this.uniteids !== null) &&
				(this.uniteids.length > 0)) {
				oMap.uniteids = this.uniteids;
			}
			if ((this.matiereids !== undefined) && (this.matiereids !== null) &&
				(this.matiereids.length > 0)) {
				oMap.matiereids = this.matiereids;
			}
			if ((this.anneeids !== undefined) && (this.anneeids !== null) &&
				(this.anneeids.length > 0)) {
				oMap.anneeids = this.anneeids;
			}
			if ((this.semestreids !== undefined) && (this.semestreids !== null) &&
				(this.semestreids.length > 0)) {
				oMap.semestreids = this.semestreids;
			}
			if ((this.groupeids !== undefined) && (this.groupeids !== null) &&
				(this.groupeids.length > 0)) {
				oMap.groupeids = this.groupeids;
			}
			if ((this.etudiantids !== undefined) && (this.etudiantids !== null) &&
				(this.etudiantids.length > 0)) {
				oMap.etudiantids = this.etudiantids;
			}
			if ((this.enseignantids !== undefined) && (this.enseignantids !== null) &&
				(this.enseignantids.length > 0)) {
				oMap.enseignantids = this.enseignantids;
			}
			if ((this.administratorids !== undefined) && (this.administratorids !== null) &&
				(this.administratorids.length > 0)) {
				oMap.administratorids = this.administratorids;
			}
			if (this.dossier !== null) {
				oMap.dossier = this.dossier;
			}
			if (this.sexe !== null) {
				oMap.sexe = this.sexe;
			}
			if (this.birthDate !== null) {
				oMap.birthDate = this.birthDate;
			}
			if (this.ville !== null) {
				oMap.ville = this.ville;
			}
			if (this.etablissement !== null) {
				oMap.etablissement = this.etablissement;
			}
			if (this.serieBac !== null) {
				oMap.serieBac = this.serieBac;
			}
			if (this.optionBac !== null) {
				oMap.optionBac = this.optionBac;
			}
			if (this.mentionBac !== null) {
				oMap.mentionBac = this.mentionBac;
			}
			if (this.etudesSuperieures !== null) {
				oMap.etudesSuperieures = this.etudesSuperieures;
			}
			if (this.apb !== null) {
				oMap.apb = this.apb;
			}
			if ((this.affectationids !== undefined) && (this.affectationids !== null) &&
				(this.affectationids.length > 0)) {
				oMap.affectationids = this.affectationids;
			}
			if ((this.eventids !== undefined) && (this.eventids !== null) &&
				(this.eventids.length > 0)) {
				oMap.eventids = this.eventids;
			}
		}// oMap
    } // to_map
    //
    public store_prefix(): string {
        return PERSON_PREFIX;
    }
    public create_id(): string {
        let s = this.start_key();
        if ((s !== null) && (this.username !== null)) {
            s = s + this.username.trim().toUpperCase();
        }
        return s;
    }// create_id
    //
    public reset_password(): void {
        if (this.username !== null) {
            this.password = cc.md5(this.username);
        } else {
            this.password = null;
        }
    }
    public change_password(ct: string): void {
        if ((ct === undefined) || (ct === null)) {
            this.password = null;
        } else {
            var v = null;
            var x = ct.trim();
            if (x.length > 0) {
                v = cc.md5(ct);
            }
            this.password = v;
        }
    }
    public check_password(ct: string): boolean {
        if ((ct === undefined) || (ct === null)) {
            if (this.password === null) {
                return true;
            } else {
                return false;
            }
        }
        var v = cc.md5(ct);
        return (this.password == v);
    } // check_password
    //
    public type(): string {
        return PERSON_KEY;
    }
    //
    public get fullname(): string {
        return ((this.lastname !== null) && (this.firstname !== null)) ?
			(this.lastname + ' ' + this.firstname) : "";
    } // fullname
    //
    public toString(): string {
        return this.fullname;
    }
    public is_storeable(): boolean {
        return super.is_storeable() &&
            (this.username !== null) && (this.firstname !== null) &&
            (this.lastname !== null);
    }
    public sort_func(p1: Person, p2: Person): number {
        let s1 = p1.fullname;
        let s2 = p2.fullname;
        if ((s1 !== null) && (s2 !== null)) {
            return s1.localeCompare(s2);
        } else if ((s1 === null) && (s2 !== null)) {
            return 1;
        } else if ((s1 !== null) && (s2 === null)) {
            return -1;
        } else {
            return 0;
        }
    } // sort_func
	public get_all_ids() : string[]{
		let oRet:string[] = [];
		this.check_id;
		InfoRoot.add_id_to_array(oRet,this.id);
		InfoRoot.add_array_to_array(oRet,this.departementids);
		InfoRoot.add_array_to_array(oRet,this.anneeids);
		InfoRoot.add_array_to_array(oRet,this.semestreids);
		InfoRoot.add_array_to_array(oRet,this.groupeids);
		InfoRoot.add_array_to_array(oRet,this.uniteids);
		InfoRoot.add_array_to_array(oRet,this.matiereids);
		InfoRoot.add_array_to_array(oRet,this.affectationids);
		InfoRoot.add_array_to_array(oRet,this.eventids);
		InfoRoot.add_array_to_array(oRet,this.etudiantids);
		InfoRoot.add_array_to_array(oRet,this.enseignantids);
		InfoRoot.add_array_to_array(oRet,this.administratorids);
		return oRet;
	}// get_all_ids
} // class Person
