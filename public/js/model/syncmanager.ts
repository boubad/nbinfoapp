//syncmanager.ts
import {LocalStore} from '../model/localstore';
import {IObjectStore,IDataService, IPerson} from 'infodata';
//
import {DATABASE_NAME, REMOTESERVERSLIST_KEY,DEFAULT_SERVERS} from '../infoconstants';
//
export class SynchroManager {
    //
    private localStore: IObjectStore;
    //
    public servers: string[];
    private _server: string;
	private _busy:boolean = false;
	private _service:IDataService = null;
    //
    constructor(serv:IDataService) {
		this._service = serv;
        this.localStore = new LocalStore();
        this._server = null;
		this._busy = false;
        let s = this.localStore.get_value(REMOTESERVERSLIST_KEY);
        if (s !== null) {
            try {
                this.servers = JSON.parse(s);
            } catch (e) {
                console.log(e);
            }
        }// s
        if ((this.servers === undefined) || (this.servers === null)) {
            this.servers = DEFAULT_SERVERS;
        } else if (this.servers.length < 1) {
            this.servers = DEFAULT_SERVERS;
        }
    }
	//
	protected get service(): IDataService {
		return (this._service !== undefined) ? this._service : null;
	}
    //
    public get currentServer(): string {
        return this._server;
    }
    public set currentServer(s: string) {
        this._server = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim() : null;
    }
    //
    public remove_server(candidate: string): void {
        if ((candidate === undefined) || (candidate === null)) {
            return;
        }
        if (this.servers.length < 1) {
            return;
        }
        let oRet: string[] = [];
        let s = candidate.trim().toLowerCase();
        for (let x of this.servers) {
            let xx = x.trim().toLowerCase();
            if (xx != s) {
                oRet.push(x);
            }
        }
        this.servers = oRet;
        let sx: string = null;
        try {
            sx = JSON.stringify(this.servers);
            this.localStore.store_value(REMOTESERVERSLIST_KEY, sx);
        } catch (e) {
            console.log(e);
        }
    }// removeServer
    public add_server(candidate: string): void {
        if ((candidate === undefined) || (candidate === null)) {
            return;
        }
        let s = candidate.trim();
        if (s.length < 1) {
            return;
        }
        let ss = s.toLowerCase();
        let bFound = false;
        for (let x of this.servers) {
            let xx = x.trim().toLowerCase();
            if (xx == ss) {
                bFound = true;
                break;
            }
        }
        if (bFound) {
            return;
        }
        this.servers.push(s);
        let sx: string = null;
        try {
            sx = JSON.stringify(this.servers);
            this.localStore.store_value(REMOTESERVERSLIST_KEY, sx);
        } catch (e) {
            console.log(e);
        }
    }// addServer
    //
    public get canImport(): boolean {
        return  (this.service !== null) && (this.currentServer !== null) && (!this._busy);
    }
    public get canExport(): boolean {
        return (this.service !== null) &&  (!this._busy) && (this.currentServer !== null);
    }
    public import_from(): Promise<any> {
		 if (!this.canImport) {
            return Promise.resolve({});
        }
        let source = this.currentServer;
        let dest = DATABASE_NAME;
		this._busy = true;
		return this.service.replicate_all(source,dest).then((b)=>{
			this._busy = false;
			return b;
		}).catch((e)=>{
			this._busy = false;
			throw e;
		});
    }
    public get is_busy(): boolean {
        return this._busy;
    }
    public export_to(): Promise<any> {
       if (!this.canExport) {
            return Promise.resolve({});
        }
        let source = DATABASE_NAME;
		let dest = this.currentServer;
		return this.service.replicate_all(source,dest).then((b)=>{
			this._busy = false;
			return b;
		}).catch((e)=>{
			this._busy = false;
			throw e;
		});
    }
    //
}// class SynchroManager
