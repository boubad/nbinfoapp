//person-bar.ts
//
//
import {BaseComponent} from './basecomponent';
import {PersonViewModel} from '../model/admin/personmodel';
import {IDepartementPerson} from 'infodata';
//
export class ImportBar<T extends IDepartementPerson> extends BaseComponent<PersonViewModel<T>> {
	//
	constructor(){
		super();
	}
	//
    public get canImport(): boolean {
        return (this.parent !== null) ? this.parent.canImport : false;
    }
    public importFileChanged(event: any): any{
        if (this.parent !== null){
          this.parent.importFileChanged(event);
        }
      }
	//
    public get isEditable():boolean{
      return (this.parent !== null) ? this.parent.isEditable : false;
    }
	//
}// class PersonBar