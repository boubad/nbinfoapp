//infoevent.ts
import {IInfoEvent,IGroupeEvent,IEtudiantEvent} from 'infodata';
import {InfoRoot} from '../inforoot';
import {PersonItem} from './personitem';
import {Person} from './person';
import {GROUPEEVENT_TYPE, GROUPEEVENT_PREFIX, ETUDEVENT_TYPE, ETUDEVENT_PREFIX} from '../infoconstants';
//
export class InfoEvent extends PersonItem implements IInfoEvent {
	public semestreid: string = null;
	public matiereid: string = null;
	public groupeid:string = null;
	public genre: string = null;
	private _date: Date = null;
	public matiereName: string = null;
	public groupeName: string = null;
	private _coef: number = 1.0;
	public semestreSigle:string = null;
	public anneeSigle:string = null;
	public anneeid:string = null;
	public matiereCoefficient:number=1.0;
	public uniteid:string = null;
	public uniteCoefficient:number = 1.0;
	public uniteSigle:string = null;
	//
	constructor(oMap?: any) {
		super(oMap);
		if ((oMap !== undefined) && (oMap !== null)) {
			if (oMap.matiereCoefficient !== undefined){
				this.matiereCoefficient = oMap.matiereCoefficient;
			}
			if (oMap.uniteid !== undefined){
				this.uniteid = oMap.uniteid;
			}
			if (oMap.uniteCoefficient !== undefined){
				this.uniteCoefficient = oMap.uniteCoefficient;
			}
			if (oMap.uniteSigle !== undefined){
				this.uniteSigle = oMap.uniteSigle;
			}
			if (oMap.semestreid !== undefined) {
                this.semestreid = oMap.semestreid;
            }
			if (oMap.matiereid !== undefined) {
                this.matiereid = oMap.matiereid;
            }
			if (oMap.groupeid !== undefined) {
                this.groupeid = oMap.groupeid;
            }
			if (oMap.matiereName !== undefined) {
                this.matiereName = oMap.matiereName;
            }
			if (oMap.groupeName !== undefined) {
                this.groupeName = oMap.groupeName;
            }
			 if (oMap.coefficient !== undefined) {
                this.coefficient = oMap.coefficient;
            }
			if (oMap.semestreSigle !== undefined) {
                this.semestreSigle = oMap.semestreSigle;
            }
			if (oMap.anneeSigle !== undefined) {
                this.anneeSigle = oMap.anneeSigle;
            }
			if (oMap.anneeid !== undefined) {
                this.anneeid = oMap.anneeid;
            }
			if (oMap.eventDate !== undefined){
				this.eventDate = oMap.eventDate;
			}
			if (oMap.genre !== undefined){
				this.genre = oMap.genre;
			}
		} // oMap
	}
	public from_map(oMap: any): void {
		super.from_map(oMap);
		this.semestreid = null;
		this.matiereid = null;
		this.groupeid = null;
		this.genre = null;
		this._date = null;
		this.matiereName = null;
		this.groupeName = null;
		this._coef = null;
		this.matiereCoefficient = null;
		this.uniteCoefficient = null;
		this.uniteid = null;
		this.uniteSigle = null;
		this.semestreSigle = null;
		this.anneeSigle = null;
	    this.anneeid = null;
		if ((oMap !== undefined) && (oMap !== null)) {
			if (oMap.matiereCoefficient !== undefined){
				this.matiereCoefficient = oMap.matiereCoefficient;
			}
			if (oMap.uniteid !== undefined){
				this.uniteid = oMap.uniteid;
			}
			if (oMap.uniteCoefficient !== undefined){
				this.uniteCoefficient = oMap.uniteCoefficient;
			}
			if (oMap.uniteSigle !== undefined){
				this.uniteSigle = oMap.uniteSigle;
			}
			if (oMap.semestreid !== undefined) {
                this.semestreid = oMap.semestreid;
            }
			if (oMap.groupeid !== undefined) {
                this.groupeid = oMap.groupeid;
            }
			if (oMap.matiereid !== undefined) {
                this.matiereid = oMap.matiereid;
            }
			if (oMap.matiereName !== undefined) {
                this.matiereName = oMap.matiereName;
            }
			if (oMap.groupeName !== undefined) {
                this.groupeName = oMap.groupeName;
            }
			if (oMap.coefficient !== undefined) {
                this.coefficient = oMap.coefficient;
            }
			if (oMap.semestreSigle !== undefined) {
                this.semestreSigle = oMap.semestreSigle;
            }
			if (oMap.anneeSigle !== undefined) {
                this.anneeSigle = oMap.anneeSigle;
            }
			if (oMap.anneeid !== undefined) {
                this.anneeid = oMap.anneeid;
            }
			if (oMap.eventDate !== undefined){
				this.eventDate = oMap.eventDate;
			}
			if (oMap.genre !== undefined){
				this.genre = oMap.genre;
			}
        } // oMap
	}// from_map
	public to_map(oMap: any): void {
        super.to_map(oMap);
		if ((oMap !== undefined) && (oMap !== null)) {
			if (this.semestreid !== null) {
				oMap.semestreid = this.semestreid;
			}
			if (this.matiereid !== null) {
				oMap.matiereid = this.matiereid;
			}
			if (this.groupeid !== null) {
				oMap.groupeid = this.groupeid;
			}
			if (this.matiereName !== null) {
				oMap.matiereName = this.matiereName;
			}
			if (this.groupeName !== null) {
				oMap.groupeName = this.groupeName;
			}
			if (this.coefficient !== null) {
				oMap.coefficient = this.coefficient;
			}
			if (this.anneeid !== null){
				oMap.anneeid = this.anneeid;
			}
			if (this.anneeSigle !== null){
				oMap.anneeSigle = this.anneeSigle;
			}
			if (this.semestreSigle !== null){
				oMap.semestreSigle = this.semestreSigle;
			}
			if (this.matiereCoefficient !== null){
				oMap.matiereCoefficient = this.matiereCoefficient;
			}
			if (this.uniteid !== null){
				oMap.uniteid = this.uniteid;
			}
			if (this.uniteCoefficient !== null){
				oMap.uniteCoefficient = this.uniteCoefficient;
			}
			if (this.uniteSigle !== null){
				oMap.uniteSigle = this.uniteSigle;
			}
			if (this.eventDate !== null){
				oMap.eventDate = this.eventDate;
			}
			if (this.genre !== null){
				oMap.genre = this.genre;
			}
		}// oMap
    } // to_map
	//
   public get coefficient(): number {
        return ((this._coef !== undefined) && (this._coef !== null) && (this._coef > 0)) ? this._coef : 1.0;
    }
    public set coefficient(s: number) {
        let d = InfoRoot.check_number(s);
        if ((d !== null) && (d > 0)) {
            this._coef = d;
        } else {
            this._coef = null;
        }
    }
	public get eventDate(): Date {
        return this._date;
    }
    public set eventDate(d: Date) {
        this._date = InfoRoot.check_date(d);
    }
    public get dateString(): string {
		return InfoRoot.date_to_string(this.eventDate);
    }
    public set dateString(s: string) {
		this._date = InfoRoot.string_to_date(s);
    }
	public is_storeable(): boolean {
        let bRet = super.is_storeable() && (this.semestreid !== null) && (this.matiereid !== null) &&
            (this.genre !== null);
        return bRet;
    }
	public start_key(): string {
        let s = this.store_prefix();
        if ((s !== null) && (this.semestreid !== null)) {
            s = s + this.semestreid;
        }
        if ((s !== null) && (this.matiereid !== null)) {
            s = s + this.matiereid;
        }
		if ((s !== null) && (this.groupeid !== null)) {
            s = s + this.groupeid;
        }
        return s;
    }
	public check_person(oPers: Person): boolean {
        let bRet: boolean = super.check_person(oPers);
        if ((oPers === undefined) || (oPers === null)) {
            return bRet;
        }
        let xid: string = this.id;
        if ((xid !== undefined) && (xid !== null)) {
            let oAr: string[] = oPers.eventids;
            if ((oAr === undefined) || (oAr === null)) {
                oAr = [];
            }
            if (InfoRoot.add_id_to_array(oAr, xid)) {
                oPers.eventids = oAr;
                bRet = true;
            }
        }// xid
        return bRet;
    }// check_person
	public sort_func(p1: IGroupeEvent, p2: IGroupeEvent): number {
        let d1 = p1.eventDate;
        let d2 = p2.eventDate;
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
}// class InfoEvent
//
export class GroupeEvent extends InfoEvent implements IGroupeEvent {
	public profaffectationid: string = null;
    public name: string = null;
    public location: string = null;
    public startTime:string = null;
    public endTime:string = null;
	private _minnote: number = 0.0;
	private _maxnote: number = 20.0;
	//
	constructor(oMap?: any) {
		super(oMap);
		if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.profaffectationid !== undefined) {
                this.profaffectationid = oMap.profaffectationid;
            }
            if (oMap.name !== undefined) {
                this.name = oMap.name;
            }
            if (oMap.location !== undefined) {
                this.location = oMap.location;
            }
            if (oMap.startTime !== undefined) {
                this.startTime = oMap.startTime;
            }
            if (oMap.endTime !== undefined) {
                this.endTime = oMap.endTime;
            }
			if (oMap.minnote !== undefined) {
                this.minnote = oMap.minnote;
            }
			if (oMap.maxnote !== undefined) {
                this.maxnote = oMap.maxnote;
            }
        } // oMap
	}
	public from_map(oMap: any): void {
		super.from_map(oMap);
		this.profaffectationid = null;
		this.name = null;
        this.location = null;
		this.startTime = null;
        this.endTime = null;
		this._minnote = null;
		this._maxnote = null;
		if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.profaffectationid !== undefined) {
                this.profaffectationid = oMap.profaffectationid;
            }
            if (oMap.name !== undefined) {
                this.name = oMap.name;
            }
            if (oMap.location !== undefined) {
                this.location = oMap.location;
            }
            if (oMap.startTime !== undefined) {
                this.startTime = oMap.startTime;
            }
            if (oMap.endTime !== undefined) {
                this.endTime = oMap.endTime;
            }
			if (oMap.minnote !== undefined) {
				this.minnote = oMap.minnote;
			}
			if (oMap.maxnote !== undefined) {
				this.maxnote = oMap.maxnote;
			}
        } // oMap
	}// from_map
	public to_map(oMap: any): void {
        super.to_map(oMap);
		if ((oMap !== undefined) && (oMap !== null)) {
			if (this.minnote !== null) {
				oMap.minnote = this.minnote;
			}
			if (this.maxnote !== null) {
				oMap.maxnote = this.maxnote;
			}
			if (this.profaffectationid !== null) {
				oMap.profaffectationid = this.profaffectationid;
			}
			if (this.name !== null) {
				oMap.name = this.name;
			}
			if (this.location !== null) {
				oMap.location = this.location;
			}
			if (this.startTime !== null) {
				oMap.startTime = this.startTime;
			}
			if (this.endTime !== null) {
				oMap.endTime = this.endTime;
			}
			if (this.minnote !== null){
				oMap.minnote = this.minnote;
			}
			if (this.maxnote !== null){
				oMap.maxnote = this.maxnote;
			}
		}// oMap
    } // to_map
	//
	public get minnote(): number {
        return ((this._minnote !== undefined) && (this._minnote !== null)) ? this._minnote : 0.0;
    }
    public set minnote(s: number) {
        let d = InfoRoot.check_number(s);
        if (d !== null) {
            this._minnote = d;
        } else {
            this._minnote = null;
        }
    }
	public get maxnote(): number {
        return ((this._maxnote !== undefined) && (this._maxnote !== null)) ? this._maxnote : 0.0;
    }
    public set maxnote(s: number) {
        let d = InfoRoot.check_number(s);
        if (d !== null) {
            this._maxnote = d;
        } else {
            this._maxnote = null;
        }
    }
	public is_storeable(): boolean {
        let bRet = super.is_storeable() && (this.profaffectationid !== null) &&
			(this.eventDate !== null) && (this.name !== null);
        if (!bRet) {
            return false;
        }
       return true;
    }
    public toString(): string {
        return this.name;
    }
    public create_id(): string {
        let s = this.start_key();
        if ((s !== null) && (this.profaffectationid !== null)) {
            s = s + this.profaffectationid;
        }
        if ((s !== null) && (this.genre !== null)) {
            s = s + this.genre.trim().toUpperCase();
        }
        if ((s !== null) && (this.eventDate !== null)) {
            s = s +  this.eventDate.toISOString().substr(0, 10);
        }
        return s;
    } // create_id
    public type(): string {
        return GROUPEEVENT_TYPE;
    }
    public store_prefix(): string {
        return GROUPEEVENT_PREFIX;
    }
}// class GroupeEvent
//
//
export class EtudiantEvent extends InfoEvent implements IEtudiantEvent {
	public groupeeventid: string = null;
    public etudiantaffectationid: string = null;
	public etudiantid:string = null;
    private _note: number = null;
	public groupeEventName:string = null;
	//
	constructor(oMap?: any) {
		super(oMap);
		if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.groupeeventid !== undefined) {
                this.groupeeventid = oMap.groupeeventid;
            }
            if (oMap.etudiantaffectationid !== undefined) {
                this.etudiantaffectationid = oMap.etudiantaffectationid;
            }
            if (oMap.note !== undefined) {
                this.note = oMap.note;
            }
			 if (oMap.groupeEventName !== undefined) {
                this.groupeEventName = oMap.groupeEventName;
            }
			if (oMap.etudiantid !== undefined) {
                this.etudiantid = oMap.etudiantid;
            }
			
        } // oMap
	}
	public from_map(oMap: any): void {
		super.from_map(oMap);
		this.groupeeventid = null;
		this.etudiantaffectationid = null;
		this._note = null;
		if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.groupeeventid !== undefined) {
                this.groupeeventid = oMap.groupeeventid;
            }
            if (oMap.etudiantaffectationid !== undefined) {
                this.etudiantaffectationid = oMap.etudiantaffectationid;
            }
            if (oMap.note !== undefined) {
                this.note = oMap.note;
            }
			if (this.groupeEventName !== null) {
                oMap.groupeEventName = this.groupeEventName;
            }
			if (oMap.etudiantid !== undefined) {
                this.etudiantid = oMap.etudiantid;
            }
        } // oMap
	}// from_map
	public to_map(oMap: any): void {
        super.to_map(oMap);
		if ((oMap !== undefined) && (oMap !== null)) {
			if (this.note !== null) {
				oMap.note = this.note;
			}
			if (this.groupeeventid !== null) {
				oMap.groupeeventid = this.groupeeventid
			}
			if (this.etudiantaffectationid !== null) {
				oMap.etudiantaffectationid = this.etudiantaffectationid;
			}
			if (this.etudiantid !== null) {
				oMap.etudiantid = this.etudiantid;
			}
			if (this.groupeEventName !== null) {
				oMap.groupeEventName = this.groupeEventName;
			}
			
		}// oMap
    } // to_map
	//
	public get note(): number {
        return ((this._note !== undefined) && (this._note !== null)) ? this._note : null;
    }
    public set note(s: number) {
        let d = InfoRoot.check_number(s);
        if (d !== null) {
            this._note = d;
        } else {
            this._note = null;
        }
    }
	public is_storeable(): boolean {
        return super.is_storeable() && (this.groupeeventid !== null) &&
			(this.etudiantaffectationid !== null);
    }
	public start_key(): string {
        let s = this.store_prefix();
        if ((s !== null) && (this.groupeeventid !== null)) {
            s = s + this.groupeeventid;
        }
        return s;
    }
    public create_id(): string {
        let s = this.start_key();
        if ((s !== null) && (this.etudiantaffectationid  !== null)) {
            s = s + this.etudiantaffectationid ;
        }
		if ((s !== null) && (this.genre !== null)){
			s = s + this.genre;
		}
        return s;
    } // create_id
    public type(): string {
        return ETUDEVENT_TYPE;
    }
    public store_prefix(): string {
        return ETUDEVENT_PREFIX;
    }
}// class GroupeEvent
