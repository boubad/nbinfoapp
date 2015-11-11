//depsiglenamemodel.ts
//
import {UserInfo} from '../userinfo';
import {SigleNameViewModel} from './siglenamemodel';
import {IDepartementSigleNamedItem} from 'infodata';
//
export class DepSigleNameViewModel<T extends IDepartementSigleNamedItem>
	extends SigleNameViewModel<T> {
    //
    constructor(info: UserInfo) {
        super(info);
    }// constructor
    //
    protected is_refresh(): boolean {
        return (this.departementid !== null);
    }
    public post_change_departement(): Promise<any> {
        this.modelItem.departementid = this.departementid;
        this.currentItem = this.create_item();
		if (!this.is_in_activate) {
			return this.refreshAll();
		} else {
			return Promise.resolve(true);
		}
    }
}// class BaseEditViewModel
