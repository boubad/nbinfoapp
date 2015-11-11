//admin-router.ts
///
import {Router} from 'aurelia-router';
import {BaseBean} from '../../model/basebean';
import {InfoUserInfo} from '../infouserinfo';
//
export class ConsultRouter extends BaseBean {
	//
	public static inject() { return [InfoUserInfo]; }
	//
	public heading: string = 'Consultation';
	public router: Router;
	//
	constructor(info: InfoUserInfo) {
		super(info);
		this.title = 'Consultation';
	}// constructor
	//
	public configureRouter(config, router: Router) {
		config.map([
			{ route: ['', 'home'], name:'home',moduleId: '../home', nav: true, title: 'Accueil' },
			{route: 'etudsearch', name: 'etudsearch', moduleId:'./etudsearch', nav: true, title: 'Rechercher' },
			{ route: 'semestreevents', name: 'semestreevents', moduleId:'./semestre-events', nav: true, title: 'Liste Evènements' },
			{ route: 'noteslist', name: 'noteslist', moduleId:'./noteslist', nav: true, title: 'Liste Notes' },
			{ route: 'groupeeventslist', name: 'groupeeventslist', moduleId:'./groupeeventslist', nav: true, title: 'Liste devoirs' },
			{ route: 'groupeevents', name: 'groupeevents', moduleId:'./groupeevents', nav: true, title: 'Edition devoirs' },
			{ route: 'etudnotes/:id', name: 'etudnotes', moduleId: './etudiant-notes', nav: false },
			{ route: 'etudevt/:id', name: 'etudevt', moduleId: './etudeventdetail', nav: false },
			{ route: 'etud/:id', name: 'etud', moduleId:'./etudiants-sumary', nav: false }
		]);
		this.router = router;
	}
	public canActivate(params?: any, config?: any, instruction?: any): any {
		let bRet: boolean = this.is_connected;
		return bRet;
	}// activate
}
