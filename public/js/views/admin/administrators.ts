//administrators.ts
//
import {InfoUserInfo} from '../infouserinfo';
import {PersonViewModel} from '../../model/admin/personmodel';
import {IAdministrator} from 'infodata';
//
export class Administrators extends PersonViewModel<IAdministrator> {
	//
	static inject() { return [InfoUserInfo]; }
	//
    constructor(info: InfoUserInfo) {
        super(info);
        this.title = 'Opérateurs';
    }// constructor
    protected create_item(): IAdministrator {
        return this.itemFactory.create_administrator({
			departementid:this.departementid
		});
    }
    
}// class DepartementModel
