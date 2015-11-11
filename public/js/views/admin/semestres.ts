//annees.ts
//
import {InfoUserInfo} from '../infouserinfo';
import {IntervalledViewModel} from '../../model/admin/intervalmodel';
import {ISemestre} from 'infodata';
import {InfoRoot} from '../../inforoot';
//
export class Semestres extends IntervalledViewModel<ISemestre> {
	//
	static inject() { return [InfoUserInfo]; }
	//
    constructor(info: InfoUserInfo) {
        super(info);
        this.title = 'Semestres';
    }// constructor
	protected create_item(): ISemestre {
        return this.itemFactory.create_semestre({
			anneeid:this.anneeid
		});
    }
	 protected is_refresh(): boolean {
        return (this.anneeid !== null);
    }
	public post_change_annee():Promise<any>{
		 this.modelItem.anneeid = this.anneeid;
        this.currentItem = this.create_item();
        return this.refreshAll();
	}
	protected perform_activate():Promise<any> {
		return super.perform_activate().then((r)=>{
			let old = this.annee;
			let id = (old !== null) ? old.id : null;
			this.annee = null;
			this.annee = this.sync_array(this.annees,id);
			return this.refreshAll();
		});
	}// perform_activate
    protected initialize_data(): any {
        return Promise.resolve(true);
    }// initialize_data
    
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
		return (this.annee !== null) ? InfoRoot.date_to_string(this.annee.startDate) : null;
	}
	protected get_maxDate(): string {
		return (this.annee !== null) ? InfoRoot.date_to_string(this.annee.endDate) : null;
	}
}// class Semestres
