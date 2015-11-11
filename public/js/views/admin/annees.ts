//annees.ts
//
import {InfoUserInfo} from '../infouserinfo';
import {IntervalledViewModel} from '../../model/admin/intervalmodel';
import {IAnnee} from 'infodata';
//
export class Annees extends IntervalledViewModel<IAnnee> {
	//
	static inject() { return [InfoUserInfo]; }
	//
    constructor(info: InfoUserInfo) {
        super(info);
        this.title = 'Années';
    }// constructor
	 protected is_refresh(): boolean {
        return (this.departementid !== null);
    }
    public post_change_departement(): Promise<any> {
        this.modelItem.departementid = this.departementid;
        this.currentItem = this.create_item();
        return this.refreshAll();
    }
	protected perform_activate():Promise<any> {
		return super.perform_activate().then((r)=>{
			let old = this.departement;
			let id = (old !== null) ? old.id : null;
			this.departement = null;
			this.departement = this.sync_array(this.departements,id);
			return true;
		});
	}// perform_activate
    protected initialize_data(): any {
        return Promise.resolve(true);
    }// initialize_data
    protected create_item(): IAnnee {
        return this.itemFactory.create_annee({
			departementid:this.departementid
		});
    }
    public get isEditable(): boolean {
		return this.is_admin || this.is_super;
    }
    public set isEditeable(s: boolean) { }
    public canActivate(params?: any, config?: any, instruction?: any): any {
		let bRet: boolean = false;
		if (this.is_connected) {
			bRet = this.is_admin || this.is_super;
		}
		return bRet;
    }// activate
	protected get_minDate(): string {
		return null;
	}
	protected get_maxDate():string {
		return null;
	}
}// class DepartementModel
