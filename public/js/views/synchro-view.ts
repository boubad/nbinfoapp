//synchro-view.ts
//
import {InfoUserInfo} from './infouserinfo';
import {SynchroManager} from '../model/syncmanager';
import {BaseBean} from '../model/basebean';
//
//
export class SynchroView extends BaseBean {
	//
	public static inject(){return [InfoUserInfo];}
	//
	private manager:SynchroManager = null;
	private candidateServer:string = null;
	public  canPerform:boolean = true;
  //
  constructor(info: InfoUserInfo) {
		super(info);
		this.manager = new SynchroManager(info.dataService);
		this.canPerform = true;
  }
  public get servers(): string[] {
        return this.manager.servers;
    }
    public get currentServer(): string {
        return this.manager.currentServer;
    }
    public set currentServer(s: string) {
        this.manager.currentServer = s;
    }
	
    public get canRemoveServer(): boolean {
        return (this.currentServer !== null) && (this.currentServer.trim().length > 0);
    }
    public set canRemoveServer(s: boolean) { }
    public get cannotRemoveServer(): boolean {
        return (!this.canRemoveServer);
    }
    public set cannotRemoveServer(s: boolean) { }
    public removeServer(): void {
        this.manager.remove_server(this.currentServer);
    }// removeServer
    //
    public get canAddServer(): boolean {
        return (this.candidateServer !== null) && (this.candidateServer.trim().length > 0);
    }
    public get cannotAddServer(): boolean {
        return (!this.canAddServer);
    }
    public addServer(): void {
        this.manager.add_server(this.candidateServer);
        this.candidateServer = null;
    }// addServer
    //
	 public get canImport(): boolean {
        return this.manager.canImport;
    }
	 public get canExport(): boolean {
        return this.manager.canExport;
    }
	public import(): Promise<any>{
		this.canPerform = false;
		this.clear_error();
		this.infoMessage = "Synchronization en cours (import) ...";
		return this.manager.import_from().then((r)=>{
			this.infoMessage = "Synchronization terminée!";
			this.canPerform = true;
			return true;
		}).catch((e)=>{
			this.set_error(e);
			this.canPerform = true;
			return false;
		})
	}
	public export(): Promise<any>{
		this.canPerform = false;
		this.clear_error();
		this.infoMessage = "Synchronization en cours (export) ...";
		return this.manager.export_to().then((r)=>{
			this.infoMessage = "Synchronization terminée!";
			this.canPerform = true;
			return true;
		}).catch((e)=>{
			this.set_error(e);
			this.canPerform = true;
			return false;
		})
	}
	public canActivate(params?: any, config?: any, instruction?: any): any {
		let bRet: boolean = false;
		let userinfo = this.userInfo;
		if (userinfo !== null) {
			bRet = userinfo.is_connected && (!userinfo.is_etud);
		}
		return bRet;
    }// activate
}// SynchroView 
