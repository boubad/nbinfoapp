//departementperson.ts
import {IDepartementPerson,IEtudiant,IEnseignant,IAdministrator} from 'infodata';
import {PersonItem} from './personitem';
import {Person} from './person';
import {InfoRoot} from '../inforoot';
import {ETUDIANT_TYPE, ETUDIANT_PREFIX, ENSEIGNANT_TYPE, ENSEIGNANT_PREFIX, ADMINISTRATOR_TYPE, ADMINISTRATOR_PREFIX} from '../infoconstants';
//
export class DepartementPerson extends PersonItem implements IDepartementPerson {
    public departementid: string = null;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.departementid !== undefined) {
                this.departementid = oMap.departementid;
            }
        }// oMap
    }// constructor
    public from_map(oMap?: any): void {
        super.from_map(oMap);
        this.departementid = null;
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.departementid !== undefined) {
                this.departementid = oMap.departementid;
            }
        }// oMap
    }// from map
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if ((this.departementid !== undefined) && (this.departementid !== null)) {
                oMap.departementid = this.departementid;
            }
        }// oMap
    }// to_map
    public is_storeable(): boolean {
        return (this.departementid !== null) && super.is_storeable();
    }
    public start_key(): string {
        let s1: string = this.store_prefix();
        let s2: string = this.departementid;
        if (s1 == null) {
            s1 = "";
        }
        if ((s2 === undefined) || (s2 === null)) {
            s2 = "";
        }
        return (s1 + s2);
    }
    public create_id(): string {
        let s1: string = this.start_key();
        let s2: string = this.personid;
        if (s1 == null) {
            s1 = "";
        }
        if (s2 == null) {
            s2 = "";
        }
        return (s1 + s2);
    }
   
    //
    public check_person(oPers: Person): boolean {
        let bRet: boolean = super.check_person(oPers);
        if ((oPers === undefined) || (oPers === null)) {
            return bRet;
        }
        let xid: string = this.departementid;
        if ((xid !== undefined) && (xid !== null)) {
            let oAr: string[] = oPers.departementids;
            if ((oAr === undefined) || (oAr === null)) {
                oAr = [];
            }
            if (InfoRoot.add_id_to_array(oAr, xid)) {
                oPers.departementids = oAr;
                bRet = true;
            }
        }// xid
        return bRet;
    }// check_person
    //
	public toString(): string {
        return this.fullname;
    }
}// class DepartementPerson
//
export class Etudiant extends DepartementPerson implements IEtudiant {
    constructor(oMap?: any) {
        super(oMap);
    }
    public type(): string {
        return ETUDIANT_TYPE;
    }
    public store_prefix(): string {
        return ETUDIANT_PREFIX;
    }
    public check_person(oPers: Person): boolean {
        let bRet: boolean = super.check_person(oPers);
        if ((oPers === undefined) || (oPers === null)) {
            return false;
        }
        let xid: string = this.id;
        if ((xid !== undefined) && (xid !== null)) {
            let oAr: string[] = oPers.etudiantids;
            if ((oAr === undefined) || (oAr === null)) {
                oAr = [];
            }
            if (InfoRoot.add_id_to_array(oAr, xid)) {
                oPers.etudiantids = oAr;
                bRet = true;
            }
        }// xid
        return bRet;
    }// check_person
}// class Etudiant
//
export class Enseignant extends DepartementPerson implements IEnseignant {
    constructor(oMap?: any) {
        super(oMap);
    }
    public type(): string {
        return ENSEIGNANT_TYPE;
    }
    public store_prefix(): string {
        return ENSEIGNANT_PREFIX;
    }
    public check_person(oPers: Person): boolean {
        let bRet: boolean = super.check_person(oPers);
        if ((oPers === undefined) || (oPers === null)) {
            return false;
        }
        let xid: string = this.id;
        if ((xid !== undefined) && (xid !== null)) {
            let oAr: string[] = oPers.enseignantids;
            if ((oAr === undefined) || (oAr === null)) {
                oAr = [];
            }
            if (InfoRoot.add_id_to_array(oAr, xid)) {
                oPers.enseignantids = oAr;
                bRet = true;
            }
        }// xid
        return bRet;
    }// check_person
}// class Enseignant
//
export class Administrator extends DepartementPerson implements IAdministrator {
    constructor(oMap?: any) {
        super(oMap);
    }
    public type(): string {
        return ADMINISTRATOR_TYPE;
    }
    public store_prefix(): string {
        return ADMINISTRATOR_PREFIX;
    }
    public check_person(oPers: Person): boolean {
        let bRet: boolean = super.check_person(oPers);
        if ((oPers === undefined) || (oPers === null)) {
            return false;
        }
        let xid: string = this.id;
        if ((xid !== undefined) && (xid !== null)) {
            let oAr: string[] = oPers.administratorids;
            if ((oAr === undefined) || (oAr === null)) {
                oAr = [];
            }
            if (InfoRoot.add_id_to_array(oAr, xid)) {
                oPers.administratorids = oAr;
                bRet = true;
            }
        }// xid
        return bRet;
    }// check_person
}// class Administrator
