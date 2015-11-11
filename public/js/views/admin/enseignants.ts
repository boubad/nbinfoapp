//enseignants.ts
//
import {InfoUserInfo} from '../infouserinfo';
import {PersonViewModel} from '../../model/admin/personmodel';
import {IEnseignant} from 'infodata';
//
export class Enseignants extends PersonViewModel<IEnseignant> {
	//
	static inject() { return [InfoUserInfo]; }
	//
    constructor(info: InfoUserInfo) {
        super(info);
        this.title = 'Enseignants';
    }// constructor
    protected create_item(): IEnseignant {
        return this.itemFactory.create_enseignant({
			departementid:this.departementid
		});
    }
    
}// class DepartementModel
