//siglenamemodel.ts
//
import {UserInfo} from '../userinfo';
import {BaseEditViewModel} from '../baseeditmodel';
import {ISigleNamedItem,IUIManager} from 'infodata';
//
export class SigleNameViewModel<T extends ISigleNamedItem> extends BaseEditViewModel<T> {
    //
    constructor(info: UserInfo) {
        super(info);
    }// constructor
    //
    public get sigle(): string {
        return (this.currentItem !== null) ? this.currentItem.sigle : "";
    }
    public set sigle(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.sigle = s;
        }
    }
    public get name(): string {
        return (this.currentItem !== null) ? this.currentItem.name : "";
    }
    public set name(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.name = s;
        }
    }

}// class BaseEditViewModel
