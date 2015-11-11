//unites.ts
//
//
import {InfoUserInfo} from '../infouserinfo';
import {DepSigleNameViewModel} from '../../model/admin/depsiglenamemodel';
import {IUnite, IMatiere} from 'infodata';
import {InfoRoot} from '../../inforoot';
//
export class Unites extends DepSigleNameViewModel<IUnite> {
	static inject() { return [InfoUserInfo]; }
	//
	constructor(info: InfoUserInfo) {
		super(info);
		this.title = 'Unités';
	}// constructor
	public get order(): string {
    return (this.currentItem !== null) ? InfoRoot.number_to_string(this.currentItem.order) : "";
  }
  public set order(s: string) {
    let x = this.currentItem;
    if (x !== null) {
      let d = InfoRoot.string_to_number(s);
      x.order = ((d !== null) && (d > 0)) ? d : null;
    }
  }
	public get coefficient(): string {
    return (this.currentItem !== null) ? InfoRoot.number_to_string(this.currentItem.coefficient) : "";
  }
	public set coefficient(s: string) { }
	protected create_item(): IUnite {
    return this.itemFactory.create_unite({
      departementid: this.departementid
    });
  }
	public save(): Promise<any> {
		let item = this.currentItem;
		if (item === null) {
			return Promise.resolve(false);
		}
		if (!item.is_storeable()) {
			return Promise.resolve(false);
		}
		var self = this;
		this.clear_error();
		item.check_id();
		let model = this.itemFactory.create_matiere({ uniteid: item.id });
		return this.dataService.get_items_all(model.start_key(), model.end_key()).then((mm: IMatiere[]) => {
			let sum: number = 0;
			if ((mm !== undefined) && (mm !== null)) {
				for (let m of mm) {
					sum += m.coefficient;
				}
			}// mm
			item.coefficient = (sum > 0) ? sum : 1;
			return this.dataService.save_item(item);
		}).then((r) => {
			if (item.rev !== null) {
				return self.refresh();
			} else {
				return self.refreshAll();
			}
		}).catch((err) => {
			self.set_error(err);
			return false;
		});
	}// save
}// class Unites