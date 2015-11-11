//commanddetail.ts
//
import {BaseComponent} from './basecomponent';
import {BaseEditViewModel} from '../model/baseeditmodel';
import {IBaseItem} from 'infodata';
//
export class ComandDetailComponent<T extends IBaseItem> extends BaseComponent<BaseEditViewModel<T>> {
    //
    constructor() {
        super();
    }
  
    public get isEditable(): boolean {
        return (this.parent !== null) ? this.parent.isEditable : false;
    }
    public get canAdd(): boolean {
        return (this.parent !== null) ? this.parent.canAdd : false;
    }
    public get cannotAdd():boolean {
      return (!this.canAdd);
    }
    public addNew(): any {
        if (this.parent !== null) {
            this.parent.addNew();
        }
    }
    public get canCancel(): boolean {
        return (this.parent !== null) ? this.parent.canCancel : false;
    }
    public get cannotCancel(): boolean {
        return (!this.canCancel);
    }
    public cancel_add(): void {
        if (this.parent !== null) {
            this.parent.cancel_add();
        }
    }
    public cancel(): void {
        this.cancel_add();
    }
    public get canRemove(): boolean {
        return (this.parent !== null) ? this.parent.canRemove : false;
    }
    public get cannotRemove(): boolean {
        return (!this.canRemove);
    }
    public get canSave(): boolean {
        return (this.parent !== null) ? this.parent.canSave : false;
    }
    public get cannotSave(): boolean {
        return (!this.canSave);
    }
    //
    public save(): any {
        return (this.parent !== null) ? this.parent.save() : Promise.resolve(false);
    }// save
    public remove(): any {
        return (this.parent !== null) ? this.parent.remove() : Promise.resolve(false);
    }// remove
}// class BaseListComponent
