// app.ts
///
import {InfoUserInfo} from './infouserinfo';
import {Router, RouterConfiguration} from 'aurelia-router';
import {UserInfo} from '../model/userinfo';
import {ETUDDETAIL_ROUTE,GRPEVTDETAIL_ROUTE,ETUDEVTDETAIL_ROUTE,
	ETUDNOTES_ROUTE} from '../infoconstants';
//
export class App {
    public router: Router = null;
	public userInfo: UserInfo = null;
	//
	static inject() { return [InfoUserInfo] };
    //
    constructor(user: InfoUserInfo) {
		this.userInfo = user;
    }
    //
    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'InfoApp';
        config.map([
            { route: ['', 'home'], name: 'home', moduleId: './home', nav: true, title: 'Accueil' },
			{ route: 'profil', name: 'profil', moduleId: './profil', nav: true, title: 'Profil' },
			{ route: 'admin', name: 'admin', moduleId: './admin/admin-router', nav: true, title: 'Admin' },
			{ route: 'consult', name: 'consult', moduleId: './consult/consult-router', nav: true, title: 'Consultation' },
			{ route: 'synchro', name: 'synchro', moduleId: './synchro-view', nav: true, title: 'Synchro' },
			{ route: 'etudnotes/:id', name: 'etudnotes', moduleId: './consult/etudiant-notes', nav: false },
			{ route: 'etudevt/:id', name: ETUDEVTDETAIL_ROUTE, moduleId: './consult/etudeventdetail', nav: false },
			{ route: 'etud/:id', name: ETUDDETAIL_ROUTE, moduleId:'./consult/etudiants-sumary', nav: false },
			{ route: 'grpevt/:id', name: 'grpevt', moduleId:'./consult/groupeeventdetail', nav: false }
        ]);
        this.router = router;
    }
}
