import {EtudEventReportModel} from '../../model/consult/etudeventreportmodel';
import {InfoUserInfo} from '../infouserinfo';
//
export class SemestreEvents extends EtudEventReportModel {
     //
	static inject() { return [InfoUserInfo]; }
    //
	constructor(userinfo: InfoUserInfo) {
        super(userinfo);
    }
}
