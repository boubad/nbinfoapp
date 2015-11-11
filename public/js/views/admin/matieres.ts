//matieres.ts
//
import {InfoUserInfo} from '../infouserinfo';
import {SigleNameViewModel} from '../../model/admin/siglenamemodel';
import {IMatiere, IUnite} from 'infodata';
import {InfoRoot} from '../../inforoot';
//
export class Matieres extends SigleNameViewModel<IMatiere> {
	//
	static inject() { return [InfoUserInfo]; }
	//
    constructor(info: InfoUserInfo) {
        super(info);
        this.title = 'Matières';
    }// constructor
	protected create_item(): IMatiere {
		return this.itemFactory.create_matiere({
			uniteid: this.uniteid,
			genre: 'PRATIQUE',
			coefficient: 1.0
		});
	}
	public post_change_unite(): Promise<any> {
		this.modelItem.uniteid = this.uniteid;
		this.currentItem = this.create_item();
		if (!this.is_in_activate) {
			return this.refreshAll();
		}else {
			return Promise.resolve(true);
		}
	}
	protected is_refresh(): boolean {
		return (this.uniteid !== null);
	}
	public get genre(): string {
		return (this.currentItem !== null) ? this.currentItem.genre : null;
	}
	public set genre(s: string) {
		let x = this.currentItem;
		if (x !== null) {
			x.genre = s;
		}
	}
	public get mat_module(): string {
		return (this.currentItem !== null) ? this.currentItem.mat_module : null;
	}
	public set mat_module(s: string) {
		let x = this.currentItem;
		if (x !== null) {
			x.mat_module = s;
		}
	}
	public get coefficient(): string {
		return (this.currentItem !== null) ? InfoRoot.number_to_string(this.currentItem.coefficient) : null;
	}
	public set coefficient(s: string) {
		let x = this.currentItem;
		if (x !== null) {
			let d = InfoRoot.string_to_number(s);
			x.coefficient = ((d !== null) && (d > 0)) ? d : null;
		}
	}
	public get ecs(): string {
		return (this.currentItem !== null) ? InfoRoot.number_to_string(this.currentItem.ecs) : null;
	}
	public set ecs(s: string) {
		let x = this.currentItem;
		if (x !== null) {
			let d = InfoRoot.string_to_number(s);
			x.ecs = ((d !== null) && (d > 0)) ? d : null;
		}
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
		let pUnite: IUnite = null;
		return this.dataService.save_item(item).then((r) => {
			return self.dataService.find_item_by_id(item.uniteid);
		}).then((p: IUnite) => {
			if ((p !== undefined) && (p !== null)) {
				pUnite = p;
				let model = this.itemFactory.create_matiere({ uniteid: pUnite.id });
				return self.dataService.get_items_all(model.start_key(), model.end_key());
			} else {
				return Promise.resolve([]);
			}
		}).then((mm: IMatiere[]) => {
			let sum: number = 0;
			if ((mm !== undefined) && (mm !== null)) {
				for (let m of mm) {
					sum += m.coefficient;
				}
			}// mm
			if (pUnite !== null) {
				pUnite.coefficient = (sum > 0) ? sum : 1.0;
				return self.dataService.save_item(pUnite);
			} else {
				return Promise.resolve(true);
			}
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
}// class Matieres
