//infouserinfo.ts
//
import {UserInfo} from '../model/userinfo';
import {IMessageManager, ILogManager,IDataService} from 'infodata';
import {DataService} from '../data/dataservice'
import {InfoMessageManager} from './infomessagemanager';
import {InfoLogger} from './infologger';
//
export class InfoUserInfo extends UserInfo {
	//
	public static inject():any {return [DataService,InfoMessageManager,InfoLogger];}
    //
    constructor(service:DataService,mess:InfoMessageManager,logm:InfoLogger) {
        super(service,mess,logm);
    }
}// class InfoUserInfo
