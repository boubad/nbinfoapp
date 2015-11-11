//unite.ts
import {IUnite} from 'infodata';
import {DepartementSigleNamedItem} from './baseitem';
import {UNITE_TYPE, UNITE_PREFIX} from '../infoconstants';
//
export class Unite extends DepartementSigleNamedItem {
	public order:number = 0;
	public coefficient:number = 1;
	//
	constructor(oMap?: any) {
		super(oMap);
		if ((oMap !== undefined) && (oMap !== null)){
			if (oMap.order !== undefined){
				this.order = oMap.order;
			}
			if (oMap.coefficient !== undefined){
				this.coefficient = oMap.coefficient;
			}
		}
	}
	public from_map(oMap: any): void {
		super.from_map(oMap);
		this.order = null;
		if ((oMap !== undefined) && (oMap !== null)) {
			if (oMap.order !== undefined) {
				this.order = oMap.order;
			}
			if (oMap.coefficient !== undefined){
				this.coefficient = oMap.coefficient;
			}
		}// oMap
	}
	public to_map(oMap: any): void {
		super.to_map(oMap);
		if ((oMap !== undefined) && (oMap !== null)) {
			if ((this.order !== undefined) && (this.order !== null)) {
				oMap.order = this.order;
			}
			if ((this.coefficient !== undefined) && (this.coefficient !== null)) {
				oMap.coefficient = this.coefficient;
			}
		}
    }// toMap
	public type(): string {
        return UNITE_TYPE;
    }
    public store_prefix(): string {
        return UNITE_PREFIX;
    }
}// class Unite