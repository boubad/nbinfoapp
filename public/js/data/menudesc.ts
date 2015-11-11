// menudesc.ts
//
import {InfoElement} from './infoelement';
import {IMenuDesc} from 'infodata';
//
export class MenuDesc extends InfoElement implements IMenuDesc {
    //
    private _id: string;
    private _url: string;
    private _selected: boolean;
    private _desc: string;
	private _text: string;
    //
    constructor(oMap?: any) {
		super();
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap._id !== undefined) {
                this._id = oMap._id;
            }
            if (oMap.description !== undefined) {
                this._desc = oMap.description;
            }
			if (oMap._url !== undefined) {
				this._url = oMap._url;
			}
			if (oMap._text !== undefined) {
				this._text = oMap._text;
			}
        }// oMap
    }// constructor
    //
    public to_map(oMap: any): void {
        if ((oMap !== undefined) && (oMap !== null)) {
            oMap._id = this.id;
            oMap.description = this.description;
        }
    }
    public from_map(oMap: any): void {
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap._id !== undefined) {
                this._id = oMap._id;
            }
            if (oMap.description !== undefined) {
                this._desc = oMap.description;
            }
			if (oMap._url !== undefined) {
				this._url = oMap._url;
			}
			if (oMap._text !== undefined) {
				this._text = oMap._text;
			}
        }// oMap
    }
    //
    protected get_text(): string {
        return (this._text !== undefined) ? this._text : null;
    }
	public get display():string{
		return this.get_text();
	}
    //
    public get id(): string {
        return (this._id !== undefined) ? this._id : null;
    }
    public get description(): string {
        return (this._desc !== undefined) ? this._desc : null;
    }
    public set description(s: string) {
        this._desc = ((s !== undefined) && (s !== null)) ? s.trim() : null;
    }
    public get text(): string {
        return this.get_text();
    }
    public get url(): string {
        return (this._url !== undefined) ? this._url : null;
    }
    public set url(s: string) {
        this._url = (s !== undefined) ? s : null;
    }
    public get has_url(): boolean {
        return (this.url !== null) && (this.url.trim().length > 0);
    }
    public get selected(): boolean {
        return ((this._selected !== undefined) && (this._selected !== null)) ?
            this._selected : false;
    }
    public set selected(s: boolean) {
        this._selected = ((s !== undefined) && (s !== null)) ? s : false;
    }
    //
    public get sort_func(): (p1: IMenuDesc, p2: IMenuDesc) => number {
        return MenuDesc.g_sort_func;
    }
	protected set_id_rev(id: string, rev: string) {
        this._id = id;
    }
    public toString(): string {
        return this.text;
    } // toString
    public static g_sort_func(p1: IMenuDesc, p2: IMenuDesc): number {
        let nRet = -1;
        if ((p1 !== undefined) && (p1 !== null)) {
            if ((p2 !== undefined) && p2 !== null) {
                let s1 = p1.text;
                let s2 = p2.text;
                if ((s1 !== null) && (s2 !== null)) {
                    return s1.localeCompare(s2);
                } else if (s1 === null) {
                    nRet = 1;
                }
            }// p2
        } else {
            nRet = 1;
        }
        return nRet;
    }// sort_func
} // class MenuDesc
//
