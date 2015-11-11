//groupes.ts
//
//
import {InfoUserInfo} from '../infouserinfo';
import {DepSigleNameViewModel} from '../../model/admin/depsiglenamemodel';
import {IGroupe, IMenuDesc} from 'infodata';
import {GENRE_PROMO, GENRE_TD, GENRE_TP} from '../../infoconstants';
import {InfoRoot} from '../../inforoot';
//
export class Groupes extends DepSigleNameViewModel<IGroupe> {
	static inject() { return [InfoUserInfo]; }
	//
	private _genres: IMenuDesc[] = [{ id: GENRE_TP, display: "Travaux Pratiques" },
		{ id: GENRE_TD, display: "Travaux Dirigés" }, { id: GENRE_PROMO, display: "Amphi" }
	];
	//
	public leftgroupes: IGroupe[] = [];
	public rightgroupes: IGroupe[] = [];
	public selectedLeft: IGroupe[] = [];
	public selectedRight: IGroupe[] = [];
	//
	private all_children: IGroupe[] = [];
	public _xgenre: IMenuDesc = null;
	//
    constructor(info: InfoUserInfo) {
        super(info);
        this.title = 'Groupes';
    }// constructor
	public get canHaveChildren(): boolean {
		let p = this.currentItem;
		return (p !== null) && (p.genre !== null) && (p.genre != GENRE_TP);
	}
	public get hasCandidates(): boolean {
		return ((this.leftgroupes !== undefined) && (this.leftgroupes !== null) && (this.leftgroupes.length > 0));
	}
	public get hasChildren(): boolean {
		return ((this.rightgroupes !== undefined) && (this.rightgroupes !== null) && (this.rightgroupes.length > 0));
	}
	public get allGenres(): IMenuDesc[] {
		return this._genres;
	}
	public get xgenre(): IMenuDesc {
		return (this._xgenre !== undefined) ? this._xgenre : null;
	}
	public set xgenre(s: IMenuDesc) {
		this._xgenre = s;
		if (this.currentItem !== null) {
			this.currentItem.genre = ((this._xgenre !== undefined) && (this._xgenre !== null)) ? this._xgenre.id : null;
			this.check_groupes();
		}
	}
	public get canAddChildren(): boolean {
		return ((this.selectedLeft !== undefined) && (this.selectedLeft !== null) && (this.selectedLeft.length > 0));
	}
	public get canRemoveChildren(): boolean {
		return ((this.selectedRight !== undefined) && (this.selectedRight !== null) && (this.selectedRight.length > 0));
	}
	public add_children(): any {
		if (!this.canAddChildren) {
			return;
		}
		let p: IGroupe = this.currentItem;
		if (p === null) {
			return;
		}
		let xgenre = p.genre;
		if ((xgenre === undefined) || (xgenre === null)) {
			return;
		}
		if (xgenre == GENRE_TP) {
			return;
		}
		let ids: string[] = p.children_ids;
		if ((ids == undefined) || (ids === null)) {
			ids = [];
		}
		for (let xp of this.selectedLeft) {
			let xg = xp.genre;
			let xid = xp.id;
			if ((xgenre == GENRE_TD) && (xg == GENRE_TP)) {
				InfoRoot.add_id_to_array(ids, xid);
			} else if ((xgenre == GENRE_PROMO) && (xg == GENRE_TD)) {
				InfoRoot.add_id_to_array(ids, xid);
			}
		}
		p.children_ids = ids;
		this.check_groupes();
	}// addGroupe
	public remove_children(): any {
		if (!this.canRemoveChildren) {
			return;
		}
		let p: IGroupe = this.currentItem;
		if (p === null) {
			return;
		}
		let ids: string[] = p.children_ids;
		if ((ids == undefined) || (ids === null)) {
			ids = [];
		}
		let oRet: string[] = [];
		for (let id of ids) {
			let bFound: boolean = false;
			for (let x of this.selectedRight) {
				if ((x.id == id)) {
					bFound = true;
					break;
				}
			}// i
			if (!bFound) {
				oRet.push(id);
			}
		}// id
		p.children_ids = oRet;
		this.check_groupes();
	}// addGroupe
	protected create_item(): IGroupe {
		return this.itemFactory.create_groupe({
			departementid: this.departementid, genre: GENRE_TP
		});
	}
	public post_change_departement(): Promise<any> {
		let self = this;
		let service = this.dataService;
		return super.post_change_departement().then((b) => {
			return service.get_departement_groupes(this.departement);
		}).then((gg: IGroupe[]) => {
			self.all_children = ((gg !== undefined) && (gg !== null)) ? gg : [];
			self.check_groupes();
			return true;
		});
    }
	public save(): Promise<any> {
		let self = this;
		let service = this.dataService;
		return super.save().then((b) => {
			return service.get_departement_groupes(this.departement);
		}).then((gg: IGroupe[]) => {
			self.all_children = ((gg !== undefined) && (gg !== null)) ? gg : [];
			self.check_groupes();
			return true;
		});
	}// save
	public remove(): Promise<any> {
		let self = this;
		let service = this.dataService;
		return super.remove().then((b) => {
			return service.get_departement_groupes(this.departement);
		}).then((gg: IGroupe[]) => {
			self.all_children = ((gg !== undefined) && (gg !== null)) ? gg : [];
			self.check_groupes();
			return true;
		});
	}// save
	private check_groupes(): void {
		this.selectedLeft = [];
		this.selectedRight = [];
		this.rightgroupes = [];
		this.leftgroupes = [];
		let g: IGroupe = this.currentItem;
		if (g == null) {
			return;
		}
		let genre: string = g.genre;
		if (genre == null) {
			return;
		}
		if (genre == GENRE_TP) {
			return;
		}
		let ids = g.children_ids;
		for (let gx of this.all_children) {
			let id = gx.id;
			let bFound: boolean = false;
			for (let xid of ids) {
				if (xid == id) {
					bFound = true;
					break;
				}
			}// xid
			if (bFound) {
				this.rightgroupes.push(gx);
			} else {
				if (genre == GENRE_TD) {
					if (gx.genre == GENRE_TP) {
						this.leftgroupes.push(gx);
					}
				} else if (genre == GENRE_PROMO) {
					if (gx.genre == GENRE_TD) {
						this.leftgroupes.push(gx);
					}
				}
			}
		}// gx
	}// check_groupes
	protected post_change_item(): Promise<any> {
		let self = this;
		return super.post_change_item().then((b) => {
			self.check_groupes();
			self._xgenre = null;
			let p = self.currentItem;
			if (p !== null) {
				let xs: string = p.genre;
				if (xs !== null) {
					for (let x of self.allGenres) {
						if (x.id == xs) {
							self._xgenre = x;
							break;
						}
					}// x
				}// xs
			}// p
			return true;
		});
	}// post_change_item
	protected perform_activate(): Promise<any> {
		return super.perform_activate().then((r) => {
			return this.dataService.get_departement_groupes(this.departement);
		}).then((gg: IGroupe[]) => {
			this.all_children = ((gg !== undefined) && (gg !== null)) ? gg : [];
			this.check_groupes();
			return true;
		});
	}// perform_activate
}// class Unites