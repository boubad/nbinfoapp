//departement.ts
import {IDepartement} from 'infodata';
import {SigleNamedItem} from './baseitem';
import {DEPARTEMENT_TYPE, DEPARTEMENT_PREFIX} from '../infoconstants';
//
export class Departement extends SigleNamedItem implements IDepartement {
	constructor(oMap?: any) {
		super(oMap);
	}
	public type(): string {
        return DEPARTEMENT_TYPE;
    }
    public store_prefix(): string {
        return DEPARTEMENT_PREFIX;
    }
}// class Departement