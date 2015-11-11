//
import {BaseBean} from '../model/basebean';
import {IDepartement, IAnnee, ISemestre, IGroupe, IUnite, IMatiere} from 'infodata';
//
export class WorkBar {
    private _parent: BaseBean;
    constructor() {
    }
    public bind(s: BaseBean) {
        this._parent = s;
    }
    protected get parent(): BaseBean {
        return (this._parent !== undefined) ? this._parent : null;
    }
    public get is_connected(): boolean {
        return (this.parent !== null) ? this.parent.is_connected : false;
    }
    public get is_not_connected(): boolean {
        return (!this.is_connected);
    }
    //
    public get departements(): IDepartement[] {
        return (this.parent !== null) ? this.parent.departements : [];
    }
    public get departement(): IDepartement {
        return (this.parent !== null) ? this.parent.departement : null;
    }
    public set departement(s: IDepartement) {
        if (this.parent !== null) {
            this.parent.departement = s;
        }
    }
    //
    public get annees(): IAnnee[] {
        return (this.parent !== null) ? this.parent.annees : [];
    }
    public get annee(): IAnnee {
        return (this.parent !== null) ? this.parent.annee : null;
    }
    public set annee(s: IAnnee) {
        if (this.parent !== null) {
            this.parent.annee = s;
        }
    }
    //
    public get semestres(): ISemestre[] {
        return (this.parent !== null) ? this.parent.semestres : [];
    }
    public get semestre(): ISemestre {
        return (this.parent !== null) ? this.parent.semestre : null;
    }
    public set semestre(s: ISemestre) {
        if (this.parent !== null) {
            this.parent.semestre = s;
        }
    }
    //
    public get unites(): IUnite[] {
        return (this.parent !== null) ? this.parent.unites : [];
    }
    public get unite(): IUnite {
        return (this.parent !== null) ? this.parent.unite : null;
    }
    public set unite(s: IUnite) {
        if (this.parent !== null) {
            this.parent.unite = s;
        }
    }
    //
    public get matieres(): IMatiere[] {
        return (this.parent !== null) ? this.parent.matieres : [];
    }
    public get matiere(): IMatiere {
        return (this.parent !== null) ? this.parent.matiere : null;
    }
    public set matiere(s: IMatiere) {
        if (this.parent !== null) {
            this.parent.matiere = s;
        }
    }
    //
    public get groupes(): IGroupe[] {
        return (this.parent !== null) ? this.parent.groupes : [];
    }
    public get groupe(): IGroupe {
        return (this.parent !== null) ? this.parent.groupe : null;
    }
    public set groupe(s: IGroupe) {
        if (this.parent !== null) {
            this.parent.groupe = s;
        }
    }
   
}
