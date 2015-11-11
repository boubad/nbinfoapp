//basemodel.ts
//
import {IDataService, IUIManager, IObjectStore, IBaseItem,
IMessageManager, ILogManager, IInfoMessage} from 'infodata';
//
import {DEPARTEMENT_TYPE, ANNEE_TYPE, SEMESTRE_TYPE,
UNITE_TYPE, MATIERE_TYPE, GROUPE_TYPE,
MESSAGE_DOMAIN, INFO_MESSAGE, INFO_MESSAGE_CHANNEL,
ERROR_MESSAGE, MESSAGE_LOGOUT, MESSAGE_NAVIGATE, MESSAGE_LOGIN,
MESSAGE_REFRESHALL, MESSAGE_REFRESH} from '../infoconstants';
//
import {UIManager} from './uimanager';
import {LocalStore} from './localstore';
import {InfoMessage} from './infomessage';
import {DataService} from '../data/dataservice';

//
export class BaseModel {
	//
	private _uiManager: IUIManager;
    private _localStore: IObjectStore;
    private _dataService: IDataService;
    private _messagemanager: IMessageManager;
    private _logger: ILogManager;
    protected _inMessage: boolean = false;
    public baseUrl: string = null;
    public title: string = null;
    public errorMessage: string = null;
    public infoMessage: string = null;
	//
	constructor(service?: IDataService, mess?: IMessageManager, logm?: ILogManager) {
		if ((service !== undefined) && (service !== null)) {
			this._dataService = service;
		}
		if ((mess !== undefined) && (mess !== null)) {
			this._messagemanager = mess;
		}
		if ((logm !== undefined) || (logm !== null)) {
			this._logger = logm;
		}
		let origin = window.location.origin;
        let pathname = window.location.pathname;
		this.baseUrl = origin + pathname.toLowerCase().replace("index.html", "");
        if (!this.baseUrl.endsWith("/")) {
            this.baseUrl = this.baseUrl + "/";
        }
	}// constructor
	public get images_dir(): string {
        return (this.baseUrl + "images/");
    }
    protected get_logger_name(): string {
        return 'InfoLogger';
    }
    protected get_messagemanager(): IMessageManager {
        return null;
    }
    protected get_logger(): ILogManager {
        return null;
    }
    protected get_uimanager(): IUIManager {
        return new UIManager();
    }
    protected get_localstore(): IObjectStore {
        return new LocalStore();
    }
    protected get_dataservice(): IDataService {
        return new DataService();
    }
    //
    public get logger(): ILogManager {
        if ((this._logger === undefined) || (this._logger === null)) {
            this._logger = this.get_logger();
        }
        return (this._logger !== undefined) ? this._logger : null;
    }
    public get uiManager(): IUIManager {
        if ((this._uiManager === undefined) || (this._uiManager === null)) {
            this._uiManager = this.get_uimanager();
        }
        return (this._uiManager !== undefined) ? this._uiManager : null;
    }
    public get localStore(): IObjectStore {
        if ((this._localStore === undefined) || (this._localStore === null)) {
            this._localStore = this.get_localstore();
        }
        return (this._localStore !== undefined) ? this._localStore : null;
    }
    public get messageManager(): IMessageManager {
        if ((this._messagemanager === undefined) || (this._messagemanager === null)) {
            this._messagemanager = this.get_messagemanager();
        }
        return (this._messagemanager !== undefined) ? this._messagemanager : null;
    }
    public get dataService(): IDataService {
        if ((this._dataService === undefined) || (this._dataService === null)) {
            this._dataService = this.get_dataservice();
        }
        return (this._dataService !== undefined) ? this._dataService : null;
    }
    public get is_in_message(): boolean {
        if ((this._inMessage === undefined) || (this._inMessage === null)) {
            this._inMessage = false;
        }
        return this._inMessage;
    }
    protected perform_subscribe(): any {
        let self = this;
        if (this.messageManager !== null) {
            this.messageManager.subscribe(InfoMessage.Channel, (msg: IInfoMessage) => {
                if ((msg.source !== undefined) && (msg.source !== self)) {
                    if (!self.is_in_message) {
                        self._inMessage = true;
                        try {
                            self.message_received(msg).then((x) => {
                                self._inMessage = false;
                            });
                        } catch (e) {
                            let ss = ((e !== undefined) && (e !== null)) ? e.toString() : 'Error';
                            self.error(ss);
                            self._inMessage = false;
                        }
                    }
                }
            });
        }
    }// perform_subscribe
    protected perform_attach(): any {
        this.perform_subscribe();
    }// perform_attach
    protected perform_detach(): void {
        if (this.messageManager !== null) {
            this.messageManager.unsubscribe(INFO_MESSAGE_CHANNEL);
        }
    }
    protected confirm(s: string): boolean {
        if (this.uiManager !== null) {
            return this.uiManager.confirm(s);
        } else {
            return false;
        }
    }
    protected createUrl(blob: Blob): string {
        if (this.uiManager !== null) {
            return this.uiManager.createUrl(blob);
        } else {
            return null;
        }
    }
    protected revokeUrl(url: string): void {
        if (this.uiManager !== null) {
            this.uiManager.revokeUrl(url);
        }
    }
    protected info_log(s: string): void {
        if (this.logger !== null) {
            this.logger.info(s);
        }
    }
    protected debug(s: string): void {
        if (this.logger !== null) {
            this.logger.debug(s);
        }
    }
    protected warn(s: string): void {
        if (this.logger !== null) {
            this.logger.warn(s);
        }
    }
    protected error(s: string): void {
        if (this.logger !== null) {
            this.logger.error(s);
        }
    }
    public publish_message(payload: IInfoMessage): any {
        if ((this.messageManager !== null) && (payload !== undefined) && (payload !== null)) {
            payload.source = this;
            this.messageManager.publish(InfoMessage.Channel, payload);
        }
    }// publish
    public publish_string_message(mval: string): any {
        let p = new InfoMessage({ type: MESSAGE_DOMAIN, categ: mval, value: mval });
        this.publish_message(p);
    }
	public publish_domain_message(item: IBaseItem): any {
		let mval = item.type();
        let p = new InfoMessage({ type: MESSAGE_DOMAIN, categ: mval, value: mval });
        this.publish_message(p);
    }
    public publish_navigation_message(xroute: string): any {
        let p = new InfoMessage({ type: MESSAGE_NAVIGATE, categ: xroute, value: xroute });
        this.publish_message(p);
    }
    public publish_login_message(): any {
        let p = new InfoMessage({ type: MESSAGE_LOGIN, categ: MESSAGE_LOGIN, value: MESSAGE_LOGIN });
        this.publish_message(p);
    }
    public publish_logout_message(): any {
        let p = new InfoMessage({ type: MESSAGE_LOGOUT, categ: MESSAGE_LOGOUT, value: MESSAGE_LOGOUT });
        this.publish_message(p);
    }
    protected message_received(message: IInfoMessage): Promise<any> {
        if (message.type == MESSAGE_DOMAIN) {
            let s = message.categ;
            if ((s !== undefined) && (s !== null)) {
                if (s == DEPARTEMENT_TYPE) {
                    return this.post_change_departement();
                } else if (s == ANNEE_TYPE) {
                    return this.post_change_annee();
                } else if (s == GROUPE_TYPE) {
                    return this.post_change_groupe();
                } else if (s == UNITE_TYPE) {
                    return this.post_change_unite();
                } else if (s == SEMESTRE_TYPE) {
                    return this.post_change_semestre();
                } else if (s == MATIERE_TYPE) {
                    return this.post_change_matiere();
                }
            }
        } else if (message.type == MESSAGE_LOGOUT) {
            return this.perform_logout();
        } else if (message.type == MESSAGE_NAVIGATE) {
            let s = message.categ;
            if ((s !== undefined) && (s !== null)) {
                return this.perform_navigate(s);
            }
        } else if (message.type == MESSAGE_REFRESHALL) {
            return this.refreshAll();
        } else if (message.type == MESSAGE_REFRESH) {
            return this.refresh();
        }
        return Promise.resolve(true);
    }// message_received
    public refresh(): Promise<any> {
        return Promise.resolve(true);
    }// refresh
    public refreshAll(): Promise<any> {
        return Promise.resolve(true);
    }// refreshAll
    protected perform_navigate(xroute: string): Promise<any> {
        return Promise.resolve(true);
    }
    protected perform_logout(): Promise<any> {
        return Promise.resolve(true);
    }
    protected post_change_departement(): Promise<any> {
        return Promise.resolve(true);
    }
    protected post_change_annee(): Promise<any> {
        return Promise.resolve(true);
    }
    protected post_change_unite(): Promise<any> {
        return Promise.resolve(true);
    }
    protected post_change_groupe(): Promise<any> {
        return Promise.resolve(true);
    }
    protected post_change_semestre(): Promise<any> {
        return Promise.resolve(true);
    }
    protected post_change_matiere(): Promise<any> {
        return Promise.resolve(true);
    }
    protected retrieve_one_avatar(item: IBaseItem): Promise<IBaseItem> {
        if ((item === undefined) || (item === null)) {
            return Promise.resolve(item);
        }
		if ((item.url !== undefined) && (item.url !== null)) {
			return Promise.resolve(item);
		}
		item.url = null;
		let id = item.avatarid;
		let docid = item.avatardocid();
		if ((id === undefined) || (id === null) || (docid === undefined) || (docid === null)) {
			return Promise.resolve(item);
		}
		let service = this.dataService;
		let man = this.uiManager;
		if ((service === undefined) || (service === null) || (man === undefined) || (man === null)) {
			return Promise.resolve(item);
		}
        return service.find_attachment(docid, id).then((b) => {
			if ((b !== undefined) && (b !== null)) {
				item.url = man.createUrl(b);
			}
			return item;
		}).catch((e) => {
			return item;
		});
    }// rerieve_one_avatar
    protected retrieve_avatars(items: IBaseItem[]): Promise<IBaseItem[]> {
        if ((items === undefined) || (items === null)) {
            return Promise.resolve([]);
        }
        if (items.length < 1) {
            return Promise.resolve([]);
        }
        let pp: Promise<IBaseItem>[] = [];
        for (let p of items) {
            let x = this.retrieve_one_avatar(p);
            pp.push(x);
        }// p
        return Promise.all(pp);
    }// retrive_avatars
    protected get_all_items(model: IBaseItem, skip?: number, limit?: number): Promise<IBaseItem[]> {
        let start = model.start_key();
        let end = model.end_key();
		return this.dataService.get_items_range(start, end, skip, limit);
    }// get_all_items
    protected add_to_array(cont: IBaseItem[], item: IBaseItem): void {
        let bFound = false;
        let sid = item.id;
        for (let x of cont) {
            if (x.id == sid) {
                bFound = true;
                break;
            }
        }
        if (!bFound) {
            cont.push(item);
        }
    }// add_to_array
    protected clear_error(): void {
        this.errorMessage = null;
        this.infoMessage = null;
    }
    public get hasErrorMessage(): boolean {
        return ((this.errorMessage !== null) && (this.errorMessage.trim().length > 0));
    }
    public get hasInfoMessage(): boolean {
        return ((this.infoMessage !== null) && (this.infoMessage.trim().length > 0));
    }
    public set_error(err: any): void {
        if ((err !== undefined) && (err !== null)) {
            if ((err.message !== undefined) && (err.message !== null)) {
                this.errorMessage = (err.message.length > 0) ? err.message : 'Erreur inconnue...';
            } else if ((err.msg !== undefined) && (err.msg !== null)) {
                this.errorMessage = (err.msg.length > 0) ? err.msg : 'Erreur inconnue...';
            } else if ((err.reason !== undefined) && (err.reason !== null)) {
                this.errorMessage = err.reason;
            } else {
                this.errorMessage = JSON.stringify(err);
            }
        } else {
            this.errorMessage = 'Erreur inconnue...';
        }
    } // set_error
    protected sync_array<T extends IBaseItem>(cont: T[], id: string): T {
        let pSel: T = null;
        if ((cont !== undefined) && (cont !== null) && (cont.length > 0)) {
            if ((id !== undefined) && (id !== null)) {
                for (let x of cont) {
                    if ((x !== null) && (x.id !== undefined) && (x.id == id)) {
                        pSel = x;
                        break;
                    }
                }// x
            }// id
            if (pSel === null) {
                pSel = cont[0];
            }
        }// cont
        return pSel;
    }// sync_array
	public deactivate(): any {
		this.perform_detach();
	}
	protected perform_activate(): Promise<any> {
		this.perform_attach();
		return Promise.resolve(true);
	}
	public activate(params?: any, config?: any, instruction?: any): any {
		return this.perform_activate();
	}// activate
}// class BaseModel
