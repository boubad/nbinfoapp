//groupe.ts
import {IGroupe} from 'infodata';
import {DepartementSigleNamedItem} from './baseitem';
import {GROUPE_TYPE, GROUPE_PREFIX} from '../infoconstants';
//
export class Groupe extends DepartementSigleNamedItem implements IGroupe {
	private _genre:string = null;
	public _children:string[] = [];
	//
	constructor(oMap?: any) {
		super(oMap);
		if ((oMap !== undefined) && (oMap !== null)){
			if (oMap.genre !== undefined){
				this._genre = oMap.genre;
			}
			if ((oMap.children_ids !== undefined) && (oMap.children_ids !== null)){
				this._children = oMap.children_ids;
			}
		}// oMap
	}
	public from_map(oMap: any): void {
		super.from_map(oMap);
		this._genre = null;
		this._children = [];
		if ((oMap !== undefined) && (oMap !== null)){
			if (oMap.genre !== undefined){
				this._genre = oMap.genre;
			}
			if ((oMap.children_ids !== undefined) && (oMap.children_ids !== null)){
				this._children = oMap.children_ids;
			}
		}// oMap
	}
	public to_map(oMap: any): void {
		super.to_map(oMap);
		if ((oMap !== undefined) && (oMap !== null)) {
			if ((this._genre !== undefined) && (this._genre !== null)) {
				oMap.genre = this._genre;
			}
			if ((this._children !== undefined) && (this._children !== null)) {
				oMap.children_ids = this._children;
			}
		}
    }// toMap
	public get genre():string {
		return ((this._genre !== undefined) && (this._genre !== null)) ?this._genre : "";
	}
	public set genre(s:string){
		this._genre = ((s !== undefined) && (s !== null)) ? s.trim().toUpperCase() : "";
	}
	public get children_ids():string[]{
		return ((this._children !== undefined) && (this._children !== null)) ? this._children : [];
	}
	public set children_ids(ss:string[]){
		this._children = ((ss !== undefined) && (ss !== null)) ? ss : [];
	}
	public type(): string {
        return GROUPE_TYPE;
    }
    public store_prefix(): string {
        return GROUPE_PREFIX;
    }
}// class Groupe