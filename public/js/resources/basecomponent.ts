//basecomponent.ts
//
import {BaseBean} from '../model/basebean';
import {UserInfo} from '../model/userinfo';
import {InfoRoot} from '../inforoot';
import {IDataService, IDepartement, IAnnee, IUnite, IMatiere, ISemestre, IGroupe} from 'infodata';
//
export class BaseComponent<V extends BaseBean>  {
    //
    private _parent: V;
    //
    constructor() {
    }
    //
    protected internal_get_mindate(): string {
        return this.semestreStartDate;
    }
    protected internal_get_maxdate(): string {
        return this.semestreEndDate;
    }
    //
    public bind(s: V) {
        this._parent = s;
    }
    //
    protected get parent():  V {
        return (this._parent !== undefined) ? this._parent : null;
    }
    public get userInfo(): UserInfo {
        return (this.parent !== null) ? this.parent.userInfo : null;
    }
    public get is_connected(): boolean {
        return (this.parent !== null) ? this.parent.is_connected : false;
    }
    public get is_not_connected(): boolean {
        return (!this.is_connected);
    }
    protected get dataService(): IDataService {
        return (this.parent !== null) ? this.parent.dataService : null;
    }
    protected confirm(question: string): boolean {
        if ((this.parent !== null) && (this.parent.uiManager !== null)) {
            return this.parent.uiManager.confirm(question);
        } else {
            return false;
        }
    }

    public get departementName(): string {
        return ((this.parent !== null) && (this.parent.departement !== null)) ? this.parent.departement.text : null;
    }
    public get anneeName(): string {
        return ((this.parent !== null) && (this.parent.annee !== null)) ? this.parent.annee.text : null;
    }
    public get uniteName(): string {
        return ((this.parent !== null) && (this.parent.unite !== null))? this.parent.unite.text : null;
    }
    public get groupeName(): string {
        return ((this.parent !== null) && (this.parent.groupe !== null)) ? this.parent.groupe.text : null;
    }
    public get semestreName(): string {
        return ((this.parent !== null) && (this.parent.semestre !== null)) ? this.parent.semestre.text : null;
    }
    public get matiereName(): string {
        return ((this.parent !== null) && (this.parent.matiere !== null)) ? this.parent.matiere.text : null;
    }
    public get anneeStartDate(): string {
        return ((this.parent !== null) && (this.parent.annee !== null)) ?
            InfoRoot.date_to_string(this.parent.annee.startDate) : null;
    }
    public get anneeEndDate(): string {
        return ((this.parent !== null) && (this.parent.annee !== null)) ?
            InfoRoot.date_to_string(this.parent.annee.endDate) : null;
    }
    public get semestreStartDate(): string {
        return ((this.parent !== null) && (this.parent.semestre !== null)) ?
            InfoRoot.date_to_string(this.parent.semestre.startDate) : null;
    }
    public get semestreEndDate(): string {
        return ((this.parent !== null) && (this.parent.semestre !== null)) ?
            InfoRoot.date_to_string(this.parent.semestre.endDate) : null;
    }

    public get minDate(): string {
        return this.internal_get_mindate();
    }
    public get maxDate(): string {
        return this.internal_get_maxdate();
    }
}// class BaseComponent
