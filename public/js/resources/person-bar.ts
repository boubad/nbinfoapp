//person-bar.ts
//
//
import {BaseComponent} from './basecomponent';
import {PersonViewModel} from '../model/admin/personmodel';
import {IDepartementPerson} from 'infodata';
//
export class PersonBar<T extends IDepartementPerson> extends BaseComponent<PersonViewModel<T>> {
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
	 public get isReadOnly():boolean{
      return (this.parent !== null) ? this.parent.isReadOnly : false;
    }
    public get isEditItem(): boolean {
        return (this.parent !== null) ? this.parent.isEditItem : false;
    }
	public get isNotEditItem():boolean {
		return (this.parent !== null) ? this.parent.isNotEditItem : false;
	}
    public get isEditable():boolean{
      return (this.parent !== null) ? this.parent.isEditable : false;
    }
    public reset_password(): any {
        if (this.parent !== null) {
            this.parent.reset_password();
        }
    }
    public get username(): string {
        return (this.parent !== null) ? this.parent.username : null;
    }
    public set username(s: string) {
        if (this.parent !== null) {
            this.parent.username = s;
        }
    }
    public get lastname(): string {
        return (this.parent !== null) ? this.parent.lastname : null;
    }
    public set lastname(s: string) {
        if (this.parent !== null) {
            this.parent.lastname = s;
        }
    }

    public get firstname(): string {
        return (this.parent !== null) ? this.parent.firstname : null;
    }
    public set firstname(s: string) {
        if (this.parent !== null) {
            this.parent.firstname = s;
        }
    }
    public get email(): string {
        return (this.parent !== null) ? this.parent.email : null;
    }
    public set email(s: string) {
        if (this.parent !== null) {
            this.parent.email = s;
        }
    }
    public get phone(): string {
        return (this.parent !== null) ? this.parent.phone : null;
    }
    public set phone(s: string) {
        if (this.parent !== null) {
            this.parent.phone = s;
        }
    }
	public get description(): string {
        return (this.parent !== null) ? this.parent.description : null;
    }
    public set description(s: string) {
        if (this.parent !== null) {
            this.parent.description = s;
        }
    }
	public get status(): string {
        return (this.parent !== null) ? this.parent.status : null;
    }
    public set status(s: string) {
        if (this.parent !== null) {
            this.parent.status = s;
        }
    }
	//
}// class PersonBar