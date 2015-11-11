//departements.ts
//
//
import {InfoUserInfo} from '../infouserinfo';
import {SigleNameViewModel} from '../../model/admin/siglenamemodel';
import {IDepartement} from 'infodata';
//
export class Departements extends SigleNameViewModel<IDepartement> {
	//
	static inject() { return [InfoUserInfo]; }
	//
    constructor(info: InfoUserInfo) {
        super(info);
        this.title = 'Départements';
    }// constructor
    protected initialize_data(): any {
        return Promise.resolve(true);
    }// initialize_data
    protected create_item(): IDepartement {
        return this.itemFactory.create_departement();
    }
    public get isEditable(): boolean {
		return this.is_super;
    }
    public set isEditeable(s: boolean) { }
    public canActivate(params?: any, config?: any, instruction?: any): any {
		let bRet: boolean = false;
		if (this.is_connected) {
			bRet = this.is_admin || this.is_super;
		}
		return bRet;
    }// activate
	public get currentItem(): IDepartement {
		return (this._current_item !== undefined) ? this._current_item : this.create_item();
	}
	public set currentItem(s: IDepartement) {
		this._current_item = ((s !== undefined) && (s !== null)) ? s : this.create_item();
		this.fileDesc.clear();
		let x = this.currentItem;
		if ((x !== null) && (x.avatarid !== null) && (x.avatardocid() !== null) &&
			(x.url === null)) {
			this.retrieve_one_avatar(x);
		}
		this.post_change_item();
		this.departement = this.currentItem;
	}
	public save(): Promise<any> {
		let self = this;
		return super.save().then((b) => {
			return self.refresh_departements();
		});
	}// save
	public remove(): Promise<any> {
		let self = this;
		return super.remove().then((b) => {
			return self.refresh_departements();
		});
	}// remove
}// class DepartementModel
