//header-bar.ts
//
import {BaseBean} from '../model/basebean';
//
export class SheaderBar  {
  private _parent:BaseBean;
  constructor(){
  }
  public bind(s: BaseBean) {
      this._parent = s;
  }
  protected get parent():BaseBean {
      return (this._parent !== undefined) ? this._parent : null;
  }
  public get is_connected(): boolean {
      return (this.parent !== null) ? this.parent.is_connected : false;
  }
  public get is_not_connected(): boolean {
      return (!this.is_connected);
  }
  public get title(): string {
      return (this.parent !== null) ? this.parent.title : null;
  }
  public get errorMessage(): string {
      return (this.parent !== null) ? this.parent.errorMessage : null;
  }
  public get infoMessage(): string {
      return (this.parent !== null) ? this.parent.infoMessage : null;
  }
  public get hasErrorMessage(): boolean {
      return (this.errorMessage !== null);
  }
  public get hasInfoMessage(): boolean {
      return (this.infoMessage !== null);
  }
  //
}
