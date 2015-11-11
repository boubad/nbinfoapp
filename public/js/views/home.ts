//home.ts
import {BaseBean} from '../model/basebean';
import {InfoUserInfo} from './infouserinfo';
import {Router, RouterConfiguration} from 'aurelia-router';
import {UserInfo} from '../model/userinfo';
import {ADMIN_ROUTE,CONSULT_ROUTE} from '../infoconstants';

export class Home extends BaseBean {
	public username: string = null;
	 public password: string = null;
	 public splashImage: string = null;
	//
	static inject() { return [InfoUserInfo] }
	//
	constructor(info: InfoUserInfo) {
		super(info);
	}
	//
	public get canConnect(): boolean {
		return (this.userInfo !== null) && (this.username !== null) && (this.password !== null) &&
			(this.username.trim().length > 0) && (this.password.trim().length > 0);
	}
	public get cannotConnect(): boolean {
		return (!this.canConnect);
	}
	public get loginImage(): string {
		return this.images_dir + "login.jpg";
	}
	public get hasSplashImage(): boolean {
		return ((this.splashImage !== undefined) && (this.splashImage !== null));
	}
	private homeImage(): string {
		if (this.is_super) {
			return this.images_dir + "admin.jpg";
		} else if (this.is_admin) {
			return this.images_dir + "oper.jpg";
		} else if (this.is_prof) {
			return this.images_dir + "home.jpg";
		} else if (this.is_etud) {
			return this.images_dir + "etudiant.jpg";
		} else {
			return this.loginImage;
		}
	}
	public perform_login(): Promise<any> {
		if (!this.canConnect) {
			return Promise.resolve(false);
		}
		this.errorMessage = null;
		let self = this;
		return this.userInfo.login(this.username, this.password).then((bRet) => {
			self.username = null;
			self.password = null;
			let pPers = self.userInfo.person;
			if ((pPers !== null) && (pPers.id !== null)) {
				self.splashImage = self.homeImage();
				if (this.is_etud) {
					self.userInfo.publish_login_message();
				} else if (this.is_admin) {
					self.userInfo.publish_navigation_message(ADMIN_ROUTE);
				} else {
					self.userInfo.publish_navigation_message(CONSULT_ROUTE);
				}
				return true;
			} else {
				this.errorMessage = 'Identifiant et(ou) mot de passe non-reconnu(s)...';
				return false;
			}
		}).catch((err) => {
			self.set_error(err);
			return false;
		});
	}// login
	public activate(params?: any, config?: any, instruction?: any): any {
		let self = this;
		this.splashImage = this.homeImage();
		return this.dataService.check_super_admin().then((b)=>{
			this.username = null;
			this.password = null;
			return true;
		});
	}// activate
}// class Home

