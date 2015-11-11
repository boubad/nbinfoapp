//connect-bar.ts
//
import {bindable} from 'aurelia-framework';
import {UserInfo} from '../model/userinfo';
//
export class ConnectBar {
  //
  @bindable info: UserInfo = null;
  //
  constructor() {
  }
  public get is_connected(): boolean {
    return ((this.info !== undefined) && (this.info !== null)) ? this.info.is_connected : false;
  }
  public set is_connected(s: boolean) { }
  public get is_notconnected(): boolean {
    return (!this.is_connected);
  }
  public set is_notconnected(s: boolean) { }
  public get fullname(): string {
    return ((this.info !== undefined) && (this.info !== null)) ? this.info.fullname : null;
  }
  public get has_url(): boolean {
    return ((this.info !== undefined) && (this.info !== null)) ? this.info.has_url : false;
  }
  public set has_url(s: boolean) { }
  public get url(): string {
    return ((this.info !== undefined) && (this.info !== null)) ? this.info.url : null;
  }
  public logout(): void {
    if ((this.info !== undefined) && (this.info !== null)) {
		this.info.logout();
    }
  }
}// class ConnectBar
