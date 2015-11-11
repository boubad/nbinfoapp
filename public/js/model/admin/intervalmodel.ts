// intervalmodel.ts
import {UserInfo} from '../userinfo';
import {SigleNameViewModel} from './siglenamemodel';
import {IIntervalledSigleItem} from 'infodata';
import {InfoRoot} from '../../inforoot';
//
export class IntervalledViewModel<T extends IIntervalledSigleItem> extends SigleNameViewModel<T> {
	//
    constructor(userinfo: UserInfo) {
        super(userinfo);
    }// constructor
    //
    public get startDate(): string {
      return (this.currentItem !== null) ?
      InfoRoot.date_to_string(this.currentItem.startDate) : null;
    }
    public set startDate(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.startDate=InfoRoot.string_to_date(s);
        }
    }
    public get endDate(): string {
      return (this.currentItem !== null) ?
      InfoRoot.date_to_string(this.currentItem.endDate) : null;
    }
    public set endDate(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.endDate=InfoRoot.string_to_date(s);
        }
    }
}