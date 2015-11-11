//admin-router.ts
///
import {Router} from 'aurelia-router';
import {BaseBean} from '../../model/basebean';
import {InfoUserInfo} from '../infouserinfo';
//
export class AdminRouter extends BaseBean {
	//
	public static inject() { return [InfoUserInfo]; }
	//
	public heading: string = 'Administration';
	public router: Router;
	//
	constructor(info: InfoUserInfo) {
		super(info);
		this.title = 'Administration';
	}// constructor
	//
	public configureRouter(config, router: Router) {
		config.map([
			{ route: ['', 'home'], moduleId: '../home', nav: true, title: 'Accueil' },
			{ route: 'etudaffectations', moduleId: './etudaffectations', nav: true, title: 'Affectations Etudiants' },
			{ route: 'profaffectations', moduleId: './profaffectations', nav: true, title: 'Affectations Enseignants' },
			{ route: 'etudiants', moduleId: './etudiants', nav: true, title: 'Etudiants' },
			{ route: 'semestres', moduleId: './semestres', nav: true, title: 'Semestres' },
			{ route: 'annees', moduleId: './annees', nav: true, title: 'Années' },
			{ route: 'enseignants', moduleId: './enseignants', nav: true, title: 'Enseignants' },
			{ route: 'groupes', moduleId: './groupes', nav: true, title: 'Groupes' },
			{ route: 'matieres', moduleId: './matieres', nav: true, title: 'Matières' },
			{ route: 'unites', moduleId: './unites', nav: true, title: 'Unités' },
			{ route: 'administrators', moduleId: './administrators', nav: true, title: 'Opérateurs' },
			{ route: 'departements', moduleId: './departements', nav: true, title: 'Départements' },
			{ route: 'etud/:id', name: 'etud', moduleId:'../consult/etudiants-sumary', nav: false }
		]);
		this.router = router;
	}
	public canActivate(params?: any, config?: any, instruction?: any): any {
		let bRet: boolean = false;
		if (this.is_connected) {
			bRet = this.is_admin || this.is_super;
		}
		return bRet;
	}// activate
}
