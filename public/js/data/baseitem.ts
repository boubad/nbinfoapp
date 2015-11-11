//baseitem.ts
////
import {IBaseItem, IAttachedDoc, ISigleNamedItem, IDepartementSigleNamedItem, IIntervalledSigleItem} from 'infodata';
import {InfoRoot} from '../inforoot';
import {ElementDesc} from './elementdesc';
//
export class BaseItem extends ElementDesc implements IBaseItem {
    //
    public attachments: any = null;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if ((oMap._attachments !== undefined) && (oMap._attachments !== null)) {
                this.attachments = oMap._attachments;
            }
        }// oMap
    }// constructor
    public from_map(oMap: any): void {
        this.attachments = null;
        super.from_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if ((oMap._attachments !== undefined) && (oMap._attachments !== null)) {
                this.attachments = oMap._attachments;
            }
        }// oMap
    }
    //
    public check_id() {
        if ((this.id === undefined) || (this.id === null)) {
            this.id = this.create_id();
        }
    }
    //
    public is_storeable(): boolean {
        return (this.type() !== null) && (this.store_prefix() !== null);
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            oMap.type = this.type();
            if ((this.attachments !== undefined) && (this.attachments !== null)) {
                oMap._attachments = this.attachments;
            }
        }
    }// toMap
    //
    public type(): string {
        return null;
    }
    public store_prefix(): string {
        return null;
    }
    public start_key(): string {
        return this.store_prefix();
    }
    public end_key(): string {
        let s = this.start_key();
        if (s !== null) {
            s = s + '\uffff';
        }
        return s;
    }
    public create_id(): string {
        return null;
    }
    //
    public avatardocid(): string {
        return this.id;
    }
}// class IBaseItem
//
export class SigleNamedItem extends BaseItem implements ISigleNamedItem {
    private _sigle: string = null;
    private _name: string = null;
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.sigle !== undefined) {
                this._sigle = oMap.sigle;
            }
            if (oMap.name !== undefined) {
                this._name = oMap.name;
            }
        }// oMap
    }// constructor
    public from_map(oMap: any): void {
        super.from_map(oMap);
        this._sigle = null;
        this._name = null;
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.sigle !== undefined) {
                this._sigle = oMap.sigle;
            }
            if (oMap.name !== undefined) {
                this._name = oMap.name;
            }
        }// oMap
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if ((this._sigle !== undefined) && (this._sigle !== null)) {
                oMap.sigle = this._sigle;
            }
            if ((this._name !== undefined) && (this._name !== null)) {
                oMap.name = this._name;
            }
        }
    }// toMap
    public get sigle(): string {
        return (this._sigle !== undefined) ? this._sigle : null;
    }
    public set sigle(s: string) {
        this._sigle = ((s !== undefined) && (s !== null)) ? s.trim().toUpperCase() : null;
    }
    public get name(): string {
        return (this._name !== undefined) ? this._name : null;
    }
    public set name(s: string) {
        var ss: string = ((s !== undefined) && (s !== null)) ? s.trim() : null;
        if ((ss !== null) && (ss.length > 0)) {
            if (ss.length > 1) {
                ss = ss.substr(0, 1).toUpperCase() + ss.substr(1);
            } else {
                ss = ss.toUpperCase();
            }
        }// ss
        this._name = ss;
    }
    public is_storeable(): boolean {
        return (this.sigle != null) && (this.sigle.length > 0) &&
            (this.name != null) && (this.name.length > 0) && super.is_storeable();
    }
    public create_id(): string {
        let s1: string = this.store_prefix();
        let s2: string = this.sigle;
        if (s1 == null) {
            s1 = "";
        }
        if (s2 == null) {
            s2 = "";
        }
        return (s1 + s2);
    }
    public sort_func(p1: SigleNamedItem, p2: SigleNamedItem): number {
        let s1 = p1.sigle;
        let s2 = p2.sigle;
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
	public toString(): string {
        return ((this.name !== null) && (this.name.length > 0)) ? this.name : this.sigle;
    }
}// class SigleNamedItem
//
export class DepartementSigleNamedItem extends SigleNamedItem implements IDepartementSigleNamedItem {
    public departementid: string = null;
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.departementid !== undefined) {
                this.departementid = oMap.departementid;
            }
        }// oMap
    }
    public from_map(oMap: any): void {
        super.from_map(oMap);
        this.departementid = null;
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.departementid !== undefined) {
                this.departementid = oMap.departementid;
            }
        }// oMap
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if ((this.departementid !== undefined) && (this.departementid !== null)) {
                oMap.departementid = this.departementid;
            }
        }
    }// toMap
    public is_storeable(): boolean {
        return (this.departementid !== undefined) && (this.departementid !== null) &&
            (this.departementid.length > 0) && super.is_storeable();
    }
    public start_key(): string {
        let s1: string = this.store_prefix();
        let s2: string = this.departementid;
        if ((s1 === undefined) || (s1 == null)) {
            s1 = "";
        }
        if ((s2 === undefined) || (s2 === null)) {
            s2 = "";
        }
        return (s1 + s2);
    }
    public create_id(): string {
        let s1: string = this.start_key();
        let s2: string = this.sigle;
        if ((s1 === undefined) || (s1 == null)) {
            s1 = "";
        }
        if ((s2 === undefined) || (s2 === null)) {
            s2 = "";
        }
        return (s1 + s2);
    }
}// class DepartementSigleNamedItem
//
export class IntervalledSigleItem extends SigleNamedItem implements IIntervalledSigleItem {
    private _start: Date = null;
    private _end: Date = null;
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.startDate !== undefined) {
                this.startDate = oMap.startDate;
            }
            if (oMap.endDate !== undefined) {
                this.endDate = oMap.endDate;
            }
        } // oMap
    } // constructor
    public from_map(oMap: any): void {
        super.from_map(oMap);
        this._start = null;
        this._end = null;
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.startDate !== undefined) {
                this.startDate = oMap.startDate;
            }
            if (oMap.endDate !== undefined) {
                this.endDate = oMap.endDate;
            }
        }// oMap
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (this.startDate !== null) {
                oMap.startDate = this.startDate;
            }
            if (this.endDate !== null) {
                oMap.endDate = this.endDate;
            }
        }
    }// toMap
    public get startDate(): Date {
        return this._start;
    }
    public set startDate(d: Date) {
        this._start = InfoRoot.check_date(d);
    }
    public get endDate(): Date {
        return this._end;
    }
    public set endDate(d: Date) {
        this._end = InfoRoot.check_date(d);
    }
    public create_id(): string {
        let s = this.start_key();
        if ((s !== null) && (this.startDate !== null)) {
            s = s + '-' + this.startDate.toISOString().substr(0, 10);
        }
        return s;
    } // create_id
    public is_storeable(): boolean {
        if ((!super.is_storeable()) || (this.startDate === null)
            || (this.endDate === null)) {
            return false;
        }
        var t1 = Date.parse(this.startDate.toString());
        var t2 = Date.parse(this.endDate.toString());
        if (isNaN(t1) || isNaN(t2)) {
            return false;
        }
        return (t1 <= t2);
    }

    public sort_func(p1: IntervalledSigleItem, p2: IntervalledSigleItem): number {
        let d1 = p1.startDate;
        let d2 = p2.startDate;
        if ((d1 !== null) && (d2 !== null)) {
            let t1 = Date.parse(d1.toString());
            let t2 = Date.parse(d2.toString());
            if (t1 > t2) {
                return -1;
            } else if (t1 < t2) {
                return 1;
            } else {
                return 0;
            }
        } else if ((d1 === null) && (d2 !== null)) {
            return 1;
        } else if ((d1 !== null) && (d2 === null)) {
            return -1;
        } else {
            return 0;
        }
    } // sort_func
} // class IntervalledSigleItem
