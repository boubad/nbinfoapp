// groupeeventdetailmodel.ts
import {InfoUserInfo} from '../infouserinfo';
import {BaseDetailModel} from '../../model/consult/basedetailmodel';
import {IGroupeEvent, IEtudiantEvent, IUIManager, IBaseItem} from 'infodata';
import {InfoRoot} from '../../inforoot';
import {EVT_NOTE} from '../../infoconstants';

export class GroupeEventDetailModel extends BaseDetailModel {
	 //
	static inject() { return [InfoUserInfo]; }
  //
  public notes: IEtudiantEvent[] = [];
  public evts: IEtudiantEvent[] = [];
  private _evt_model: IEtudiantEvent = null;
  public currentItem: IGroupeEvent = null;
  //
  constructor(userinfo: InfoUserInfo) {
    super(userinfo);
    this.title = "Détails Devoirs";
  }
  public activate(params?: any, config?: any, instruction?: any): any {
    if (this._evt_model === null) {
      this._evt_model = this.itemFactory.create_etudiantevent();
    }
    if ((this.currentItem !== null) && (this.currentItem.url !== null)) {
      this.revokeUrl(this.currentItem.url);
      this.currentItem.url = null;
    }
    if (this.currentItem === null) {
      this.currentItem = this.itemFactory.create_groupeevent();
    }
    this.notes = [];
    this.evts = [];
    let id: string = null;
    if (params.id !== undefined) {
      id = params.id;
    }
    return super.activate(params, config, instruction).then((r) => {
      return this.dataService.find_item_by_id(id);
    }).then((p: IGroupeEvent) => {
      if (p !== null) {
        this.currentItem = p;
        this.title = p.name;
      }
      return this.retrieve_one_avatar(this.currentItem);
    }).then((xx) => {
      return this.fill_notes();
    }).then((x) => {
      return this.initialize_groupeevent(this.currentItem);
    })
  }// activate
  public deactivate(): any {
    if ((this.currentItem !== null) && (this.currentItem.url !== null)) {
      this.uiManager.revokeUrl(this.currentItem.url);
      this.currentItem.url = null;
    }
    return super.deactivate();
  }
  public get hasUrl(): boolean {
    return (this.currentItem.url !== null);
  }// hasUrl
  public set hasUrl(s: boolean) { }
  public get url(): string {
    return this.currentItem.url;
  }
  protected fill_notes(): Promise<any> {
    this.notes = [];
    this.evts = [];
    let x = this.currentItem;
    let id = (x !== null) ? x.id : null;
    if (id === null) {
      return Promise.resolve(true);
    }
    let model = this._evt_model;
    model.groupeeventid = id;
    let self = this;
    return this.dataService.get_items_all(model.start_key(), model.end_key()).then((xx: IEtudiantEvent[]) => {
      let rx = ((xx !== undefined) && (xx !== null)) ? xx : [];
      return self.retrieve_avatars(rx);
    }).then((ee: IEtudiantEvent[]) => {
      if ((ee !== undefined) && (ee !== null)) {
        let xee = self.filter_etudevents(ee);
        for (let x of xee) {
          if (x.genre == "NOT") {
            self.add_to_array(self.notes, x);
          } else {
            self.add_to_array(self.evts, x);
          }
        }// e
      }// ee
      return true;
    });
  }
	private filter_etudevents(ee: IEtudiantEvent[]): IEtudiantEvent[] {
		let oRet: IEtudiantEvent[] = [];
		let nPers: string = null;
		if (this.is_etud) {
			nPers = this.personid;
		}
		if ((ee !== undefined) && (ee !== null) && (ee.length > 0)) {
			for (let x of ee) {
				if (nPers != null) {
					if (nPers == x.personid) {
						oRet.push(x);
					}
				} else {
					oRet.push(x);
				}
			}// e
		}// ee
		return oRet;
	}// filter_etudevents
  public get genre(): string {
    return (this.currentItem !== null) ? this.currentItem.genre : "";
  }
  public set genre(s: string) {
  }
  public get name(): string {
    return (this.currentItem !== null) ? this.currentItem.name : "";
  }
  public set name(s: string) {
  }
  public get location(): string {
    return (this.currentItem !== null) ? this.currentItem.location : "";
  }
  public set location(s: string) {
  }
  public get description(): string {
    return (this.currentItem !== null) ? this.currentItem.description : "";
  }
  public set description(s: string) { }
  public get eventDate(): string {
    return (this.currentItem !== null) ?
      InfoRoot.date_to_string(this.currentItem.eventDate) : null;
  }
  public set eventDate(s: string) {
  }
  public get coefficient(): string {
    return (this.currentItem !== null) ?
      InfoRoot.number_to_string(this.currentItem.coefficient) : "";
  }
  public set coefficient(s: string) {
  }
  public get startTime(): string {
    return (this.currentItem !== null) ? this.currentItem.startTime : null;
  }
  public set startTime(s: string) {
  }
  public get endTime(): string {
    return (this.currentItem !== null) ? this.currentItem.endTime : null;
  }
  public set endTime(s: string) {
  }
}// class Profgroupeevents
