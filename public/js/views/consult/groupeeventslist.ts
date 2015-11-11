//groupeeeventslistmodel.ts
//
import {InfoUserInfo} from '../infouserinfo';
import {BaseConsultViewModel} from '../../model/baseconsultmodel';
import {IGroupeEvent} from 'infodata';
//
export class GroupeEventListModel extends BaseConsultViewModel<IGroupeEvent> {
    //
	static inject() { return [InfoUserInfo]; }
    //
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
        this.title = "Liste Devoirs";
    }// constructor
    protected is_refresh(): boolean {
        return (this.semestreid !== null) && (this.matiereid !== null) &&
		(this.groupeid !== null);
    }
	protected prepare_model(): void {
		this.modelItem.semestreid = this.semestreid;
		this.modelItem.matiereid = this.matiereid;
		this.modelItem.groupeid = this.groupeid;
	}// prepare_model
    protected create_item(): IGroupeEvent {
        let p = this.itemFactory.create_groupeevent({
            matiereid: this.matiereid,
            semestreid: this.semestreid,
            groupeid: this.groupeid,
        });
        return p;
    }// create_item
    public post_change_semestre(): Promise<any> {
        return this.refreshAll();
    }
    public post_change_matiere(): Promise<any> {
        return this.refreshAll();
    }
    public post_change_groupe(): Promise<any> {
        return this.refreshAll();
    }
}// class GroupeEventListModel
