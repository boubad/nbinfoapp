//sumaryitem.ts
//
import {MyMap} from './mymap';
import {MenuDesc} from './menudesc';
//
export class SummaryItem {
	private _name: string;
	private _route: string;
	private _ref: string;
	private _count: number;
	private _desc: string;
	private _sumdata: number;
	private _sumcoef: number;
	private _note: number;
	//
	constructor(xname?: string, xroute?: string, xref?: string, xdesc?: string) {
		if ((xname !== undefined) && (xname !== null) && (xname.trim().length > 0)) {
            this._name = xname;
        }
		if ((xroute !== undefined) && (xroute !== null) && (xroute.trim().length > 0)) {
            this._route = xroute;
        }
		if ((xref !== undefined) && (xref !== null) && (xref.trim().length > 0)) {
            this._ref = xref;
        }
		if ((xdesc !== undefined) && (xdesc !== null) && (xdesc.trim().length > 0)) {
            this._desc = xdesc;
        }
	}// constructor
	public reset(): void {
		this._count = null;
		this._desc = null;
		this._sumcoef = null;
		this._sumdata = null;
		this._note = null;
	}
	public get note(): number {
		if ((this._note === undefined) || (this._note === null)) {
			if ((this._sumdata !== undefined) && (this._sumdata !== null) &&
				(this._sumcoef !== undefined) && (this._sumcoef !== null) &&
				(this._sumcoef > 0.0)) {
				let n = this._sumdata / this._sumcoef;
				let nn = Math.round(100.0 * n);
				this._note = nn / 100;
			}
		}
		return ((this._note !== undefined) && (this._note !== null)) ? this._note : null;
	}
	public get has_note(): boolean {
		return (this.note !== null);
	}
	public get coefficient(): number {
		return ((this._sumcoef !== undefined) && (this._sumcoef !== null) && (this._sumcoef > 0.0)) ? this._sumcoef : null;
	}
	public get name(): string {
        return ((this._name !== undefined) && (this._name !== null) &&
            (this._name.trim().length > 0)) ? this._name : null;
    }
	public get route(): string {
        return ((this._route !== undefined) && (this._route !== null) &&
            (this._route.trim().length > 0)) ? this._route : null;
    }
	public get refer(): string {
        return ((this._ref !== undefined) && (this._ref !== null) &&
            (this._ref.trim().length > 0)) ? this._ref : null;
    }
	public get description(): string {
        return ((this._desc !== undefined) && (this._desc !== null) &&
            (this._desc.trim().length > 0)) ? this._desc : null;
    }
	public get count(): number {
        return ((this._count !== undefined) && (this._count !== null) && (this._count > 0)) ? this._count : null;
    }
	public get has_count(): boolean {
		return (this.count !== null) && (this.count > 0);
	}
	public get has_refer(): boolean {
		return (this.route !== null) && (this.refer !== null);
	}
	public add_number(n: number, c?: number): boolean {
		if ((n !== undefined) && (n !== null) && (n >= 0.0)) {
			let cc: number = ((c !== undefined) && (c !== null) && (c > 0.0)) ? c : 1.0;
			if ((this._sumdata === undefined) || (this._sumdata === null)) {
				this._sumdata = 0.0;
			}
			if ((this._sumcoef === undefined) || (this._sumcoef === null)) {
				this._sumcoef = 0.0;
			}
			this._sumcoef = this._sumcoef + cc;
			this._sumdata = this._sumdata + (cc * n);
			return true;
		}// n
		return false;
	}// add_number
	public add_desc(s: string): boolean {
		let ss = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
			s.trim() : null;
		if (ss === null) {
			return false;
		}
		if ((this._desc === undefined) || (this._desc == null)) {
			this._desc = ss;
		} else {
			this._desc = this._desc + '\r\n' + ss;
		}
		return true;
	}// add_desc
	public add(n: number, c?: number, desc?: string): boolean {
		let bRet = false;
		if ((n !== undefined) && (n !== null) && (n >= 0.0)) {
			bRet = this.add_number(n, c);
		}
		if ((desc !== undefined) && (desc !== null) && (desc.trim().length > 0)) {
			bRet = bRet || this.add_desc(desc);
		}
		if (bRet) {
			if ((this._count === undefined) || (this._count === null)) {
				this._count = 0;
			}
			this._count = this._count + 1;
		}
		return bRet;
	}
}// class SummaryItem 
//
export class SummaryItemMap {
	private _name: string;
	private _route: string;
    private _notesMap: MyMap<string, SummaryItem>;
	private _vals: SummaryItem[];
    //
    constructor(xname?: string, xroute?: string) {
		if ((xname !== undefined) && (xname !== null) && (xname.trim().length > 0)) {
            this._name = xname;
        }
		if ((xroute !== undefined) && (xroute !== null) && (xroute.trim().length > 0)) {
            this._route = xroute;
        }
        this._notesMap = new MyMap<string, SummaryItem>();
    }// constructor
	public get name(): string {
        return ((this._name !== undefined) && (this._name !== null) &&
            (this._name.trim().length > 0)) ? this._name.trim() : null;
    }
	public get values(): SummaryItem[] {
		if ((this._vals === undefined) || (this._vals === null)) {
			this._vals = this.get_values();
		}
		return this._vals;
	}
    public get_values(): SummaryItem[] {
        let oRet: SummaryItem[] = [];
        this._notesMap.forEach((val, index) => {
            oRet.push(val);
        });
        return oRet;
    }// get_values
    public add(item: string, n?: number, c?: number, desc?: string, xref?: string): void {
        if ((item !== undefined) && (item !== null)) {
            let xi: SummaryItem = null;
            if (!this._notesMap.has(item)) {
                xi = new SummaryItem(item, this._route, xref);
                this._notesMap.set(item, xi);
            } else {
                xi = this._notesMap.get_val(item);
            }
            xi.add(n, c, desc);
        }// item
    }// add
}// EventItemMap
//