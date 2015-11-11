//personitem.ts
import {IPersonItem} from 'infodata';
import {BaseItem} from './baseitem';
import {Person} from './person';
//
export class PersonItem extends BaseItem implements IPersonItem {
    public personid: string = null;
    public firstname: string = null;
    public lastname: string = null;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.personid !== undefined) {
                this.personid = oMap.personid;
            }
            if (oMap.firstname !== undefined) {
                this.firstname = oMap.firstname;
            }
            if (oMap.lastname !== undefined) {
                this.lastname = oMap.lastname;
            }
        }// oMap
    }// constructor
    public from_map(oMap?: any): void {
        super.from_map(oMap);
        this.personid = null;
        this.firstname = null;
        this.lastname = null;
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.personid !== undefined) {
                this.personid = oMap.personid;
            }
            if (oMap.firstname !== undefined) {
                this.firstname = oMap.firstname;
            }
            if (oMap.lastname !== undefined) {
                this.lastname = oMap.lastname;
            }
        }// oMap
    }// from map
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if ((this.personid !== undefined) && (this.personid !== null)) {
                oMap.personid = this.personid;
            }
            if ((this.firstname !== undefined) && (this.firstname !== null)) {
                oMap.firstname = this.firstname;
            }
            if ((this.lastname !== undefined) && (this.lastname !== null)) {
                oMap.lastname = this.lastname;
            }
        }// oMap
    }// to_map
    public is_storeable(): boolean {
        return (this.personid !== null) &&
            (this.firstname !== null) && (this.lastname !== null) &&
            super.is_storeable();
    }
    public avatardocid(): string {
        return this.personid;
    }
    public get fullname(): string {
        return ((this.lastname !== null) && (this.firstname !== null)) ?
            (this.lastname + ' ' + this.firstname) : "";
    } // fullname
	 public toString(): string {
        return this.fullname;
    }
    public sort_func(p1: IPersonItem, p2: IPersonItem): number {
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
    //
    public check_person(oPers: Person): boolean {
        let bRet: boolean = false;
        if ((oPers === undefined) || (oPers === null)) {
            return bRet;
        }
        oPers.check_id();
        if (this.personid != oPers.id) {
            this.personid = oPers.id;
        }
        this.check_id();
        if (this.lastname != oPers.lastname) {
            this.lastname = oPers.lastname;
        }
        if (this.firstname != oPers.firstname) {
            this.firstname = oPers.firstname;
        }
        this.avatarid = oPers.avatarid;
        return bRet;
    }// check_person
    //
}// class PersonItem
