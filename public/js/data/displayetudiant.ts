// displayetudiant.ts
//
import {MyMap} from './mymap';
import {IDisplayEtudiant, IEtudiantEvent} from 'infodata';
import {BaseItem} from './baseitem';
import {EVT_NOTE,EVT_ABSENCE,EVT_MISC,EVT_RETARD} from '../infoconstants';
import {InfoRoot} from '../inforoot';
//
export class DisplayEtudiant extends BaseItem implements IDisplayEtudiant {
    //
    public personid: string = null;
    public etudiantid: string = null;
    public uniteid: string = null;
    public matiereid: string = null;
    public groupeid: string = null;
    public firstname: string = null;
    public lastname: string = null;
    public coefficient: number = null;
    public note: number = null;
    public groupeSigle: string = null;
    public description: string = null;
    public matiereSigle: string = null;
    public uniteSigle: string = null;
    public matiereCoefficient: number = null;
    public uniteCoefficient: number = null;
    public order: number = 0;
    //
    public absencesCount: number = 0;
    public retardsCount: number = 0;
    public miscCount: number = 0;
    //
    _count: number = 0;
    _sumcoefs: number = 0;
    _sumdata: number = 0;
    //
    constructor(oMap?: any) {
        super(oMap);
    }
    public avatardocid(): string {
        return this.personid;
    }
    public get id(): string {
        return this.personid;
    }
    public fillEvent(p: IEtudiantEvent): void {
        if (this.personid == null) {
			this.etudiantid = p.etudiantid;
            this.personid = p.personid;
            this.firstname = p.firstname;
            this.lastname = p.lastname;
            this.avatarid = p.avatarid;
			this.groupeid = p.groupeName;
			this.matiereSigle = p.matiereName;
			this.groupeSigle = p.groupeName;
            this.coefficient = null;
            this.note = null;
            this.absencesCount = 0;
            this.retardsCount = 0;
            this.miscCount = 0;
            this._count = 0;
            this._sumdata = 0;
            this._sumcoefs = 0;
        }
    }// fillEvent
    public fillDisplayEtudiant(p: IDisplayEtudiant): void {
        if (this.personid == null) {
            this.personid = p.personid;
            this.etudiantid = p.etudiantid;
            this.uniteid = p.uniteid;
            this.matiereid = p.matiereid;
            this.groupeid = p.groupeid;
            this.firstname = p.firstname;
            this.lastname = p.lastname;
            this.avatarid = p.avatarid;
            this.groupeSigle = p.groupeSigle;
            this.matiereSigle = p.matiereSigle;
            this.uniteSigle = p.uniteSigle;
            this.matiereCoefficient = p.matiereCoefficient;
            this.uniteCoefficient = p.uniteCoefficient;
            this.order = p.order;
            this.coefficient = null;
            this.note = null;
            this.absencesCount = 0;
            this.retardsCount = 0;
            this.miscCount = 0;
            this._count = 0;
            this._sumdata = 0;
            this._sumcoefs = 0;
        }
    }// fillEvent
    public get sortCriteria(): number {
        return ((1000.0 * this.miscCount) + (100.0 * this.absencesCount) +
            (10.0 * this.retardsCount));
    }
    public get absenceString(): string {
        return (this.absencesCount > 0) ? "" + this.absencesCount : "";
    }
    public get retardString(): string {
        return (this.retardsCount > 0) ? "" + this.retardsCount : "";
    }
    public get miscString(): string {
        return (this.miscCount > 0) ? "" + this.miscCount : "";
    }
    public get notesCount(): number {
        return this._count;
    }
    public get coefficientString(): string {
        return InfoRoot.number_to_string(this.coefficient);
    }
    public get noteString(): string {
        return InfoRoot.number_to_string(this.note);
    }
    public add_event(p: IEtudiantEvent): void {
        if ((p !== undefined) && (p !== null) && (p.genre !== undefined) && (p.genre !== null)) {
            let s: string = ((p.description !== undefined) && (p.description !== null) &&
                (p.description.trim().length > 0)) ? p.description.trim() : null;
            if (s !== null) {
                let old = ((this.description !== undefined) && (this.description !== null) &&
                    (this.description.trim().length > 0)) ? this.description.trim().length : null;
                if (old !== null) {
                    s = old + "\r\n" + s;
                }
                this.description = s;
            }
            if (p.genre == EVT_NOTE) {
                this.add_note(p.note, p.coefficient);
            } else {
                this.add_event_misc(p.genre);
            }
        }
    }
    public add_event_misc(sGenre: string): void {
        if (sGenre.indexOf('ABS') >= 0) {
            this.absencesCount = this.absencesCount + 1;
        } else if (sGenre.indexOf('RET') >= 0) {
            this.retardsCount = this.retardsCount + 1;
        } else {
            this.miscCount = this.miscCount + 1;
        }
    }// sGenre
    public add_note(val: number, coef?: number): void {
        if ((val !== undefined) && (val !== null) && (val >= 0)) {
            if ((this._count === undefined) || (this._count === null)) {
                this._count = 0;
            }
            if ((this._sumdata === undefined) || (this._sumdata === null)) {
                this._sumdata = 0;
            }
            if ((this._sumcoefs === undefined) || (this._sumcoefs === null)) {
                this._sumcoefs = 0;
            }
            let c: number = ((coef !== undefined) && (coef !== null) && (coef > 0)) ? coef : 1.0;
            this._count = this._count + 1;
            this._sumdata = this._sumdata + (val * c);
            this._sumcoefs = this._sumcoefs + c;
            this.note = InfoRoot.format_note(this._sumdata / this._sumcoefs);
        }// val
    }//add_note
    public get fullname(): string {
        return ((this.lastname !== null) && (this.firstname !== null)) ?
            (this.lastname + ' ' + this.firstname) : null;
    } // fullname
    public static sort_func(p1: IDisplayEtudiant, p2: IDisplayEtudiant): number {
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
    public static evt_sort_func(p1: IDisplayEtudiant, p2: IDisplayEtudiant): number {
        let nRet: number = 0;
        if (p1.sortCriteria > p2.sortCriteria) {
            nRet = -1;
        } else if (p1.sortCriteria < p2.sortCriteria) {
            nRet = 1;
        }
        return nRet;
    } // sort_func
    public static evt_sort_matiere_func(p1: IDisplayEtudiant, p2: IDisplayEtudiant): number {
        if (p1.order < p2.order) {
            return -1;
        } else if (p1.order > p2.order) {
            return 1;
        } else {
            return 0;
        }
    } // sort_func
    public static evt_sort_unite_func(p1: IDisplayEtudiant, p2: IDisplayEtudiant): number {
        let s1 = ((p1.uniteSigle !== undefined) && (p1.uniteSigle !== null)) ? p1.uniteSigle.trim().toUpperCase() : '';
        let s2 = ((p2.uniteSigle !== undefined) && (p2.uniteSigle !== null)) ? p2.uniteSigle.trim().toUpperCase() : '';
        return s1.localeCompare(s2);
    } // sort_func
}// class DisplayEtudiant
//
//
export class DisplayEtudiantsArray {
    private _data: MyMap<string, DisplayEtudiant> = new MyMap<string, DisplayEtudiant>();
    //
    public constructor() {
    }
    public add_event(p: IEtudiantEvent): void {
        if ((p !== undefined) && (p !== null) && (p.personid !== null)) {
            let id: string = p.personid;
            if (this._data.has(id)) {
                let v: DisplayEtudiant = this._data.get_val(id);
                v.add_event(p);
            } else {
                let v: DisplayEtudiant = new DisplayEtudiant();
                v.fillEvent(p);
                v.add_event(p);
                this._data.set(id, v);
            }
        }
    }// add_event
    public get_etudiantdisplays(): IDisplayEtudiant[] {
        let oRet: DisplayEtudiant[] = [];
        this._data.forEach((val, key) => {
            oRet.push(val);
        });
        return oRet;
    }//
    public get_sorted_etudiantdisplays(): IDisplayEtudiant[] {
        let oRet: DisplayEtudiant[] = [];
        this._data.forEach((val, key) => {
            if (val.sortCriteria > 0) {
                oRet.push(val);
            }
        });
        if (oRet.length > 2) {
            let pf = DisplayEtudiant.evt_sort_func;
            if ((pf !== undefined) && (pf !== null)) {
                oRet.sort(pf);
            }
        }
        return oRet;
    }//
}//

//
export class MatiereDisplayEtudiantsArray {
    private _data: MyMap<string, DisplayEtudiant> = new MyMap<string, DisplayEtudiant>();
    constructor() {
    }
    public add_event(p: IEtudiantEvent): void {
        if ((p === undefined) || (p === null)) {
            return;
        }
        let matiereid = p.matiereid;
        if ((p.genre !== EVT_NOTE) || (matiereid === undefined) || (matiereid === null)) {
            return;
        }
        if (this._data.has(matiereid)) {
            let v: DisplayEtudiant = this._data.get_val(matiereid);
            v.add_note(p.note, p.coefficient);
        } else {
            let v: DisplayEtudiant = new DisplayEtudiant();
            v.fillEvent(p);
            v.add_note(p.note, p.coefficient);
            this._data.set(matiereid, v);
        }
    }// add_event
    public get_etudiantdisplays(): IDisplayEtudiant[] {
        let oRet: DisplayEtudiant[] = [];
        this._data.forEach((val, key) => {
            oRet.push(val);
        });
        if (oRet.length > 2) {
            let pf = DisplayEtudiant.evt_sort_matiere_func;
            if ((pf !== undefined) && (pf !== null)) {
                oRet.sort(pf);
            }
        }
        return oRet;
    }//
}
//
//
export class UniteDisplayEtudiantsArray {
    private _data: MyMap<string, DisplayEtudiant> = new MyMap<string, DisplayEtudiant>();
    constructor() {
    }
    public add_event(p: IDisplayEtudiant): void {
        if ((p === undefined) || (p === null)) {
            return;
        }
        let uniteid = p.uniteid;
        if ((uniteid === undefined) || (uniteid === null)) {
            return;
        }
        if (this._data.has(uniteid)) {
            let v: DisplayEtudiant = this._data.get_val(uniteid);
            v.add_note(p.note, p.matiereCoefficient);
        } else {
            let v: DisplayEtudiant = new DisplayEtudiant();
            v.fillDisplayEtudiant(p);
            v.add_note(p.note, p.matiereCoefficient);
            this._data.set(uniteid, v);
        }
    }// add_event
    public get_etudiantdisplays(): IDisplayEtudiant[] {
        let oRet: DisplayEtudiant[] = [];
        this._data.forEach((val, key) => {
            oRet.push(val);
        });
        if (oRet.length > 2) {
            let pf = DisplayEtudiant.evt_sort_unite_func;
            if ((pf !== undefined) && (pf !== null)) {
                oRet.sort(pf);
            }
        }
        return oRet;
    }//
}// class  MatiereDisplayEtudiantsArray
