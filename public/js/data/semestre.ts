//semestre.ts
import {ISemestre} from 'infodata';
import {IntervalledSigleItem} from './baseitem';
import {SEMESTRE_TYPE, SEMESTRE_PREFIX} from '../infoconstants';
//
export class Semestre extends IntervalledSigleItem implements ISemestre {
	public anneeid: string = null;
	//
	constructor(oMap?: any) {
		super(oMap);
		if ((oMap !== undefined) && (oMap !== null)) {
			if (oMap.anneeid !== undefined) {
				this.anneeid = oMap.anneeid;
			}
		}// oMap
	}
	public from_map(oMap: any): void {
		super.from_map(oMap);
		this.anneeid = null;
		if ((oMap !== undefined) && (oMap !== null)) {
			if (oMap.anneeid !== undefined) {
				this.anneeid = oMap.anneeid;
			}
		}// oMap
	}
	public to_map(oMap: any): void {
		super.to_map(oMap);
		if ((oMap !== undefined) && (oMap !== null)) {
			if ((this.anneeid !== undefined) && (this.anneeid !== null)) {
				oMap.anneeid = this.anneeid;
			}
		}
    }// toMap
	public is_storeable(): boolean {
		return (this.anneeid !== undefined) && (this.anneeid !== null) &&
			(this.anneeid.length > 0) && super.is_storeable();
    }
	public start_key(): string {
		let s1: string = this.store_prefix();
		let s2: string = this.anneeid;
		if ((s1 === undefined) || (s1 == null)) {
            s1 = "";
        }
        if ((s2 === undefined) || (s2 === null)) {
            s2 = "";
        }
        return (s1 + s2);
    }
	public type(): string {
        return SEMESTRE_TYPE;
    }
    public store_prefix(): string {
        return SEMESTRE_PREFIX;
    }
}// class Semestre