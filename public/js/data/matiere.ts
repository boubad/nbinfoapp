//
import {SigleNamedItem} from './baseitem';
import {InfoRoot} from '../inforoot';
import {MATIERE_TYPE, MATIERE_PREFIX} from '../infoconstants';
//
export class Matiere extends SigleNamedItem {
    //
    private _uniteid: string = null;
    private _genre: string = null;
    private _mat_module: string = null;
    private _coef: number = null;
    private _ecs: number = null;
	private _order: number = null;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.uniteid !== undefined) {
                this.uniteid = oMap.uniteid;
            }
            if (oMap.coefficient !== undefined) {
                this.coefficient = oMap.coefficient;
            }
            if (oMap.ecs !== undefined) {
                this.ecs = oMap.ecs;
            }
            if (oMap.genre !== undefined) {
                this.genre = oMap.genre;
            }
            if (oMap.mat_module !== undefined) {
                this.mat_module = oMap.mat_module;
            }
			if (oMap.order !== undefined) {
				this.order = oMap.order;
			}
        }// oMap
    } // constructor
	public from_map(oMap?:any) : void {
		super.from_map(oMap);
		this._uniteid = null;
		this._genre = null;
		this._mat_module = null;
		this._coef = null;
		this._ecs = null;
		this._order = null;
		 if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.uniteid !== undefined) {
                this.uniteid = oMap.uniteid;
            }
            if (oMap.coefficient !== undefined) {
                this.coefficient = oMap.coefficient;
            }
            if (oMap.ecs !== undefined) {
                this.ecs = oMap.ecs;
            }
            if (oMap.genre !== undefined) {
                this.genre = oMap.genre;
            }
            if (oMap.mat_module !== undefined) {
                this.mat_module = oMap.mat_module;
            }
			if (oMap.order !== undefined) {
				this.order = oMap.order;
			}
        }// oMap
	}// from_map
	public to_map(oMap: any): void {
        super.to_map(oMap);
		if ((oMap !== undefined) && (oMap !== null)) {
			if (this.uniteid !== null) {
				oMap.uniteid = this.uniteid;
			}
			if (this.genre !== null) {
				oMap.genre = this.genre;
			}
			if (this.mat_module !== null) {
				oMap.mat_module = this.mat_module;
			}
			if (this.coefficient !== null) {
				oMap.coefficient = this.coefficient;
			}
			if (this.ecs !== null) {
				oMap.ecs = this.ecs;
			}
			if (this.order !== null){
				oMap.order = this.order;
			}
		}
    }// to_map
    public get uniteid(): string {
        return this._uniteid;
    }
    public set uniteid(s: string) {
        this._uniteid = InfoRoot.check_string(s);
    }
    public get genre(): string {
        return this._genre;
    }
    public set genre(s: string) {
        this._genre = InfoRoot.check_upper_string(s);
    }
    public get mat_module(): string {
        return this._mat_module;
    }
    public set mat_module(s: string) {
        this._mat_module = InfoRoot.check_upper_string(s);
    }
    public store_prefix(): string {
        return MATIERE_PREFIX;
    }
    public type(): string {
        return MATIERE_TYPE;
    }
    public start_key(): string {
        let s = this.store_prefix();
        if ((s !== null) && (this.uniteid !== null)) {
            s = s  + this.uniteid;
        }
        return s;
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
	public get order(): number {
        return this._order;
    }
    public set order(d: number) {
        let v = InfoRoot.check_number(d);
        if ((v != undefined) && (v != null) && (v >= 0)) {
            this._order = v;
        } else {
            this._order = null;
        }
    }
    public get ecs(): number {
        return this._ecs;
    }
    public set ecs(d: number) {
        let v = InfoRoot.check_number(d);
        if ((v != undefined) && (v != null) && (v > 0)) {
            this._ecs = v;
        } else {
            this._ecs = null;
        }
    }
    public get coefficient(): number {
        return this._coef;
    }
    public set coefficient(d: number) {
        let v = InfoRoot.check_number(d);
        if ((v != undefined) && (v != null) && (v > 0)) {
            this._coef = v;
        } else {
            this._coef = null;
        }
    }
    public is_storeable(): boolean {
        return super.is_storeable() && (this.uniteid !== null);
    }

} // class Matiere
