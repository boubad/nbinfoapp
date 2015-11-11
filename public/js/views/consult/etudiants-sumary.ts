//etudiantsumary.ts
import {InfoUserInfo} from '../infouserinfo';
import {EtudiantSumaryModel} from '../../model/consult/etudiantsumarymodel';
//
export class EtudiantSumary extends EtudiantSumaryModel {
    //
	static inject() { return [InfoUserInfo]; }
  //
	constructor(userinfo: InfoUserInfo) {
        super(userinfo);
    }
}

