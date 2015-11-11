//siglename-bar.ts
//
import {ISigleNamedItem} from 'infodata';
import {BaseComponent} from './basecomponent';
import {BaseDetailComponent} from './basedetailcomponent';
import {SigleNameViewModel} from '../model/admin/siglenamemodel';
//
export class SiglenameBar<T extends ISigleNamedItem > extends BaseComponent<SigleNameViewModel<T>>  {
    //
    constructor() {
		super();
    }
    public get isReadOnly():boolean {
      return (this.parent !== null) ? this.parent.isReadOnly : true;
    }
    public set isReadOnly(s:boolean){}
    public get sigle(): string {
        return (this.parent !== null) ? this.parent.sigle : null;
    }
    public set sigle(s: string) {
        if (this.parent !== null) {
            this.parent.sigle = s;
        }
    }
    public get name(): string {
        return (this.parent !== null) ? this.parent.name : null;
    }
    public set name(s: string) {
        if (this.parent !== null) {
            this.parent.name = s;
        }
    }
    public get description(): string {
        return (this.parent !== null) ? this.parent.description : null;
    }
    public set description(s: string) {
        if (this.parent !== null) {
            this.parent.description = s;
        }
    }
	public get status(): string {
        return (this.parent !== null) ? this.parent.status : null;
    }
    public set status(s: string) {
        if (this.parent !== null) {
            this.parent.status = s;
        }
    }
}
