//annee.ts
import {IAnnee} from 'infodata';
import {IntervalledSigleItem} from './baseitem';
import {ANNEE_TYPE, ANNEE_PREFIX} from '../infoconstants';
//
export class Annee extends IntervalledSigleItem implements IAnnee {
	public departementid: string = null;
	//
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
	public type(): string {
        return ANNEE_TYPE;
    }
    public store_prefix(): string {
        return ANNEE_PREFIX;
    }
}// class Annee