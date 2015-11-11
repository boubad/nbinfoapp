//aaffectation.ts
import {IAffectation, IEtudiantAffectation, IEnseignantAffectation} from 'infodata';
import {InfoRoot} from '../inforoot';
import {PersonItem} from './personitem';
import {Person} from './person';
import {ETUDAFFECTATION_TYPE, ETUDAFFECTATION_PREFIX, PROFAFFECTATION_TYPE, PROFAFFECTATION_PREFIX} from '../infoconstants';
//
export class Affectation extends PersonItem implements IAffectation {
	public anneeid: string = null;
	public semestreid: string = null;
	public groupeid: string = null;
	private _start: Date = null;
	private _end: Date = null;
	public groupeName: string = null;
	//
	constructor(oMap?: any) {
		super(oMap);
		if ((oMap !== undefined) && (oMap !== null)) {
			if (oMap.anneeid !== undefined) {
				this.anneeid = oMap.anneeid;
			}
			if (oMap.semestreid !== undefined) {
				this.semestreid = oMap.semestreid;
			}
			if (oMap.groupeid !== undefined) {
				this.groupeid = oMap.groupeid;
			}
			if (oMap.startDate !== undefined) {
				this.startDate = oMap.startDate;
			}
            if (oMap.endDate !== undefined) {
                this.endDate = oMap.endDate;
            }
			if (oMap.groupeName !== undefined) {
				this.groupeName = oMap.groupeName;
			}
        } // oMap
	}
	public from_map(oMap: any): void {
        super.from_map(oMap);
		this.anneeid = null;
		this.semestreid = null;
		this.groupeid = null;
        this._start = null;
        this._end = null;
        if ((oMap !== undefined) && (oMap !== null)) {
			if (oMap.anneeid !== undefined) {
				this.anneeid = oMap.anneeid;
			}
			if (oMap.semestreid !== undefined) {
				this.semestreid = oMap.semestreid;
			}
			if (oMap.groupeid !== undefined) {
				this.groupeid = oMap.groupeid;
			}
			if (oMap.startDate !== undefined) {
                this.startDate = oMap.startDate;
            }
            if (oMap.endDate !== undefined) {
                this.endDate = oMap.endDate;
            }
			if (oMap.groupeName !== undefined) {
				this.groupeName = oMap.groupeName;
			}
        }// oMap
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
			if (this.anneeid !== null) {
				oMap.anneeid = this.anneeid;
			}
            if (this.semestreid !== null) {
				oMap.semestreid = this.semestreid;
			}
			if (this.groupeid !== null) {
				oMap.groupeid = this.groupeid;
			}
			if (this.startDate !== null) {
                oMap.startDate = this.startDate;
            }
            if (this.endDate !== null) {
                oMap.endDate = this.endDate;
            }
			if (this.groupeName !== null) {
				oMap.groupeName = this.groupeName;
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
	public start_key(): string {
        let s1: string = this.store_prefix();
        let s2: string = this.semestreid;
        if (s1 == null) {
            s1 = "";
        }
        if ((s2 === undefined) || (s2 === null)) {
            s2 = "";
        }
        return (s1 + s2);
    }
	public is_storeable(): boolean {
        if ((!super.is_storeable()) || (this.semestreid === null)
            || (this.groupeid === null)) {
            return false;
        }
		if ((this.startDate === null) || (this.endDate == null)) {
			return false;
		}
        var t1 = Date.parse(this.startDate.toString());
        var t2 = Date.parse(this.endDate.toString());
        if (isNaN(t1) || isNaN(t2)) {
            return false;
        }
        return (t1 <= t2);
    }
	public check_person(oPers: Person): boolean {
        let bRet: boolean = super.check_person(oPers);
        if ((oPers === undefined) || (oPers === null)) {
            return bRet;
        }
        let xid: string = this.anneeid;
        if ((xid !== undefined) && (xid !== null)) {
            let oAr: string[] = oPers.anneeids;
            if ((oAr === undefined) || (oAr === null)) {
                oAr = [];
            }
            if (InfoRoot.add_id_to_array(oAr, xid)) {
                oPers.anneeids = oAr;
                bRet = true;
            }
        }// xid
        xid = this.semestreid;
        if ((xid !== undefined) && (xid !== null)) {
            let oAr: string[] = oPers.semestreids;
            if ((oAr === undefined) || (oAr === null)) {
                oAr = [];
            }
            if (InfoRoot.add_id_to_array(oAr, xid)) {
                oPers.semestreids = oAr;
                bRet = true;
            }
        }// xid
		xid = this.groupeid;
        if ((xid !== undefined) && (xid !== null)) {
            let oAr: string[] = oPers.groupeids;
            if ((oAr === undefined) || (oAr === null)) {
                oAr = [];
            }
            if (InfoRoot.add_id_to_array(oAr, xid)) {
                oPers.groupeids = oAr;
                bRet = true;
            }
        }// xid
		xid = this.id;
        if ((xid !== undefined) && (xid !== null)) {
            let oAr: string[] = oPers.affectationids;
            if ((oAr === undefined) || (oAr === null)) {
                oAr = [];
            }
            if (InfoRoot.add_id_to_array(oAr, xid)) {
                oPers.affectationids = oAr;
                bRet = true;
            }
        }// xid
        return bRet;
    }// check_person
	public toString(): string {
		let s: string = super.toString();
		if ((s !== null) && (this.groupeName != null)) {
			s = s + ' ' + this.groupeName;
		}
		return s;
	}
}// class Affectation
//
export class EtudiantAffectation extends Affectation implements IEtudiantAffectation {
	public etudiantid: string = null;
	//
    constructor(oMap?: any) {
        super(oMap);
		if ((oMap !== undefined) && (oMap !== null)) {
			if (oMap.etudiantid !== undefined) {
				this.etudiantid = oMap.etudiantid;
			}
		}// oMap
    }
	public from_map(oMap: any): void {
        super.from_map(oMap);
		this.etudiantid = null;
        if ((oMap !== undefined) && (oMap !== null)) {
			if (oMap.etudiantid !== undefined) {
				this.etudiantid = oMap.etudiantid;
			}
        }// oMap
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
			if (this.etudiantid !== null) {
				oMap.etudiantid = this.etudiantid;
			}
        }
    }// toMap
	public is_storeable(): boolean {
		return (this.etudiantid !== null) && super.is_storeable();
	}
    public type(): string {
        return ETUDAFFECTATION_TYPE;
    }
    public store_prefix(): string {
        return ETUDAFFECTATION_PREFIX;
    }
    public create_id(): string {
        let s1: string = this.start_key();
		let s2: string = this.groupeid;
        let s3: string = this.personid;
        if (s1 == null) {
            s1 = "";
        }
        if (s2 == null) {
            s2 = "";
        }
		if (s3 == null) {
			s3 = "";
		}
        return (s1 + s2 + s3);
    }
}// class EtudiantAffectation
//
export class EnseignantAffectation extends Affectation implements IEnseignantAffectation {
	public enseignantid: string = null;
	public uniteid: string = null;
	public matiereid: string = null;
	//
    constructor(oMap?: any) {
        super(oMap);
		if ((oMap !== undefined) && (oMap !== null)) {
			if (oMap.enseignantid !== undefined) {
				this.enseignantid = oMap.enseignantid;
			}
			if (oMap.uniteid !== undefined) {
				this.uniteid = oMap.uniteid;
			}
			if (oMap.matiereid !== undefined) {
				this.matiereid = oMap.matiereid;
			}
		}// oMap
    }
	public from_map(oMap: any): void {
        super.from_map(oMap);
		this.enseignantid = null;
		this.uniteid = null;
		this.matiereid = null;
        if ((oMap !== undefined) && (oMap !== null)) {
			if (oMap.enseignantid !== undefined) {
				this.enseignantid = oMap.enseignantid;
			}
			if (oMap.uniteid !== undefined) {
				this.uniteid = oMap.uniteid;
			}
			if (oMap.matiereid !== undefined) {
				this.matiereid = oMap.matiereid;
			}
		}// oMap
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
			if (this.enseignantid !== null) {
				oMap.enseignantid = this.enseignantid;
			}
			if (this.uniteid !== null) {
				oMap.uniteid = this.uniteid;
			}
			if (this.matiereid !== null) {
				oMap.matiereid = this.matiereid;
			}
        }
    }// toMap
	public is_storeable(): boolean {
		return (this.enseignantid !== null) &&
			(this.matiereid !== null) && super.is_storeable();
	}
    public type(): string {
        return PROFAFFECTATION_TYPE;
    }
    public store_prefix(): string {
        return PROFAFFECTATION_PREFIX;
    }
    public create_id(): string {
        let s1: string = this.start_key();
		let s3: string = this.groupeid;
		let s2: string = this.matiereid;
        let s4: string = this.personid;
        if (s1 == null) {
            s1 = "";
        }
        if (s2 == null) {
            s2 = "";
        }
		if (s3 == null) {
			s3 = "";
		}
		if (s4 == null) {
			s4 = "";
		}
        return (s1 + s2 + s3 + s4);
    }
	public check_person(oPers: Person): boolean {
        let bRet: boolean = super.check_person(oPers);
        if ((oPers === undefined) || (oPers === null)) {
            return bRet;
        }
        let xid: string = this.uniteid;
        if ((xid !== undefined) && (xid !== null)) {
            let oAr: string[] = oPers.uniteids;
            if ((oAr === undefined) || (oAr === null)) {
                oAr = [];
            }
            if (InfoRoot.add_id_to_array(oAr, xid)) {
                oPers.uniteids = oAr;
                bRet = true;
            }
        }// xid
        xid = this.matiereid;
        if ((xid !== undefined) && (xid !== null)) {
            let oAr: string[] = oPers.matiereids;
            if ((oAr === undefined) || (oAr === null)) {
                oAr = [];
            }
            if (InfoRoot.add_id_to_array(oAr, xid)) {
                oPers.matiereids = oAr;
                bRet = true;
            }
        }// xid
		xid = this.enseignantid;
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
}// class EtudiantAffectation
//
