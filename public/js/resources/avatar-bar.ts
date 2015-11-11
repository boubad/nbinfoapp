//avatar-bar.ts
//
import {BaseDetailComponent} from './basedetailcomponent';
import {IBaseItem} from 'infodata';
//
export class AvatarBar extends BaseDetailComponent<IBaseItem> {
    constructor() {
        super();
    }
    public get avatarUrl(): string {
        return (this.parent != null) ? this.parent.avatarUrl : null;
    }
    public get hasAvatarUrl(): boolean {
        return (this.avatarUrl !== null);
    }
    public get canRemoveAvatar(): boolean {
        return (this.parent !== null) ? this.parent.canRemoveAvatar : false;
    }
    public get cannotRemoveAvatar(): boolean {
        return (!this.canRemoveAvatar);
    }
    public get canSaveAvatar(): boolean {
        return (this.parent !== null) ? this.parent.canSaveAvatar : false;
    }
    public get cannotSaveAvatar(): boolean {
        return (!this.canSaveAvatar);
    }
    public get workingUrl(): string {
        return (this.parent !== null) ? this.parent.workingUrl : null;
    }
    public get hasWorkingUrl(): boolean {
        return (this.workingUrl !== null);
    }
    public avatarFileChanged(event: any): any {
        if (this.parent !== null) {
            this.parent.avatarFileChanged(event);
        }
    }// fileChanged
    public removeAvatar(): any {
        return (this.parent !== null) ? this.parent.removeAvatar() : Promise.resolve(false);
    }
    public saveAvatar(): any {
        return (this.parent !== null) ? this.parent.saveAvatar() : Promise.resolve(false);
    }// saveAvatar
}
