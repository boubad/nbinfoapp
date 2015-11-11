//etudsearch.ts
import {InfoUserInfo} from '../infouserinfo';
import {EtudiantSearchModel} from '../../model/consult/etudiantsearchmodel';
//
export class EtudSearch extends EtudiantSearchModel {
	static inject() { return [InfoUserInfo]; }
	//
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
        this.title = "Recherche Etudiants";
    }
}