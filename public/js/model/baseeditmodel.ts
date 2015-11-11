//baseeditmodel.ts
//
import {UserInfo} from './userinfo';
import {BaseConsultViewModel} from './baseconsultmodel';
import {InfoRoot} from '../inforoot';
//import {WorkViewModel} from './workviewmodel';
import {IBaseItem, IFileDesc, IUIManager, IInfoMessage} from 'infodata';
import {MESSAGE_LOGOUT} from '../infoconstants';
//
export class BaseEditViewModel<T extends IBaseItem> extends BaseConsultViewModel<T> {
	private _add_mode: boolean = false;
	//
	protected hasAvatars: boolean = false;
	//
	constructor(info: UserInfo) {
		super(info);
		
	}// constructor
	//
	
	public check_item(): void {
		let old = this.currentItem;
		this.currentItem = this.create_item();
		this.currentItem = old;
	}
	//
	protected is_storeable(): boolean {
		return (this.currentItem !== null) && this.currentItem.is_storeable();
	}
	//
	public get isReadOnly(): boolean {
		return (!this.is_admin) && (!this.is_super);
	}
	public set isReadOnly(s: boolean) { }
	public get isEditable(): boolean {
		return this.is_admin || this.is_super;
	}
	public set isEditeable(s: boolean) { }
	public get avatarUrl(): string {
		return (this.currentItem != null) ? this.currentItem.url : null;
	}
	public get hasAvatarUrl(): boolean {
		return ((this.currentItem !== null) && (this.currentItem.url !== null));
	}
	public set hasAvatarUrl(s: boolean) { }
	public get canRemoveAvatar(): boolean {
		return this.isEditable && (this.currentItem !== null) && (this.currentItem.id !== null) &&
			(this.currentItem.rev !== null) && (this.currentItem.avatarid !== null);
	}
	public get cannotRemoveAvatar(): boolean {
		return (!this.canRemoveAvatar);
	}
	public get canSaveAvatar(): boolean {
		return this.isEditable && (this.currentItem !== null) && (this.currentItem.rev !== null) &&
			(this.currentItem.id !== null) && this.fileDesc.is_storeable;
	}
	public get cannotSaveAvatar(): boolean {
		return (!this.canSaveAvatar);
	}
	public get workingUrl(): string {
		return this.fileDesc.url;
	}
	public get hasWorkingUrl(): boolean {
		return (this.workingUrl !== null);
	}
	public set hasWorkingUrl(s: boolean) { }
	public get isEditItem(): boolean {
		return (this.currentItem !== null) &&
			(this.currentItem.id !== null) && (this.currentItem.rev !== null);
	}
	public set isEditItem(s: boolean) { }
	public get isNotEditItem():boolean{
		return (!this.isEditItem);
	}
	public set isNotEditItem(s:boolean){}
	public avatarFileChanged(event: any): any {
		this.fileDesc.changed(event);
	}// fileChanged
	public removeAvatar(): any {
		let p = this.currentItem;
		if (p === null) {
			return;
		}
		if ((p.id === null) || (p.rev === null)) {
			return;
		}
		let id = p.avatardocid();
		let avatarid = p.avatarid;
		if ((id === null) || (avatarid === null)) {
			return;
		}
		if (this.confirm('Voulez-vous vraiment supprimer cet avatar?')) {
			let self = this;
			let service = this.dataService;
			this.clear_error();
			return service.remove_attachment(id, avatarid).then((r) => {
				if (p.url !== null) {
					self.revokeUrl(p.url);
					p.url = null;
				}
				p.avatarid = null;
				return service.save_item(p);
			}).then((x) => {
				self.fileDesc.clear();
				self.infoMessage = 'Avatar supprimé.';
			}).catch((err) => {
				self.set_error(err);
			});
		}
	}
	public saveAvatar(): any {
		let f = this.fileDesc;
		let p = this.currentItem;
		if ((f === null) || (p === null)) {
			return;
		}
		if ((p.id === null) || (p.rev === null) || (!f.is_storeable)) {
			return;
		}
		let id = p.avatardocid();
		if (id === null) {
			return;
		}
		let avatarid = f.name;
		let type = f.type;
		let data = f.data;
		if ((avatarid === null) || (type === null) || (data === null)) {
			return;
		}
		let service = this.dataService;
		this.clear_error();
		let self = this;
		return service.maintains_attachment(id, avatarid, data, type).then((r) => {
			p.avatarid = avatarid;
			return service.save_item(p);
		}).then((px) => {
			p.url = self.fileDesc.remove_url();
			self.fileDesc.clear();
			self.infoMessage = 'Avatar modifié.';
		}).catch((err) => {
			self.set_error(err);
		});
	}// saveAvatar
	protected get oldItem(): T {
		return this._old_item;
	}
	protected set oldItem(s: T) {
		this._old_item = (s !== undefined) ? s : null;
	}
	protected get AddMode(): boolean {
		return this._add_mode;
	}
	protected set addMode(b: boolean) {
		this._add_mode = b;
	}
	public get canAdd(): boolean {
		return (!this.addMode) && this.isEditable;
	}
	public set canAdd(s: boolean) { }
	public addNew(): any {
		this.oldItem = this.currentItem;
		this.currentItem = this.create_item();
		this.addMode = true;
	}
	public get canCancel(): boolean {
		return this.addMode;
	}
	public get cannotCancel(): boolean {
		return (!this.canCancel);
	}
	public cancel_add(): void {
		this.currentItem = this.oldItem;
		this.addMode = false;
	}
	public cancel(): void {
		this.cancel_add();
	}
	public get canRemove(): boolean {
		return this.isEditItem && this.isEditable;
	}
	public set canRemove(s: boolean) { }
	public get cannotRemove(): boolean {
		return (!this.canRemove);
	}
	public set cannotRemove(s: boolean) { }
	public get canSave(): boolean {
		return this.is_storeable() && this.isEditable;
	}
	public set canSave(b: boolean) { }
	public get cannotSave(): boolean {
		return (!this.canSave);
	}
	public set cannotSave(s: boolean) { }
	//
	public refresh(): Promise<any> {
		let oldid = (this.currentItem !== null) ? this.currentItem.id : null;
		let self = this;
		return super.refresh().then((r) => {
			let p = InfoRoot.sync_array(self.items, oldid);
			this.currentItem = p;
			return true;
		});
	}// refresh

	protected prepare_refresh(): void {
		super.prepare_refresh();
		this._current_item = this.create_item();
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
		return this.dataService.save_item(item).then((r) => {
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
	public remove(): Promise<any> {
		let item = this.currentItem;
		if (item === null) {
			return Promise.resolve(false);
		}
		if ((item.id === null) || (item.rev === null)) {
			return Promise.resolve(false);
		}
		if (!this.confirm('Voulez-vous vraiment supprimer ' + item.id + '?')) {
			return Promise.resolve(false);
		}
		let self = this;
		this.clear_error();
		return this.dataService.remove_item(item).then((r) => {
			self.refreshAll();
			return true;
		}).catch((err) => {
			self.set_error(err);
			return false;
		});
	}// remove
	public get description(): string {
		return (this.currentItem !== null) ? this.currentItem.description : null;
	}
	public set description(s: string) {
		let x = this.currentItem;
		if (x !== null) {
			x.description = s;
		}
	}
	public get status(): string {
		return (this.currentItem !== null) ? this.currentItem.status : null;
	}
	public set status(s: string) {
		let x = this.currentItem;
		if (x !== null) {
			x.status = s;
		}
	}
}// class BaseEditViewModel
