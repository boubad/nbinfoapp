//itemfactory.ts
import {IItemFactory, IBaseItem, IDepartement, IAnnee, IGroupe,
IUnite, IPerson, IEtudiant, IEnseignant, IAdministrator, ISemestre, IMatiere,
IEtudiantAffectation, IEnseignantAffectation, IGroupeEvent, IEtudiantEvent} from 'infodata';
import {Departement} from './departement';
import {Annee} from './annee';
import {Groupe} from './groupe';
import {Unite} from './unite';
import {Person} from './person';
import {Etudiant, Enseignant, Administrator} from './departementperson';
import {Semestre} from './semestre';
import {Matiere} from './matiere';
import {EtudiantAffectation, EnseignantAffectation} from './affectation';
import {GroupeEvent, EtudiantEvent} from './infoevent';
import {DEPARTEMENT_TYPE, UNITE_TYPE, GROUPE_TYPE, ANNEE_TYPE, SEMESTRE_TYPE,
MATIERE_TYPE, PERSON_TYPE, ETUDIANT_TYPE, ENSEIGNANT_TYPE, ADMINISTRATOR_TYPE,
ETUDAFFECTATION_TYPE, PROFAFFECTATION_TYPE, GROUPEEVENT_TYPE, ETUDEVENT_TYPE} from '../infoconstants';
//
export class ItemFactory implements IItemFactory {
	constructor() { }
	//
	public create_item(oMap?: any): IBaseItem {
		let oRet: IBaseItem = null;
		if ((oMap !== undefined) && (oMap !== null) && (oMap.type !== undefined)) {
			let t: string = oMap.type;
			if (t !== null) {
				if (t == DEPARTEMENT_TYPE) {
					oRet = new Departement(oMap);
				} else if (t == ANNEE_TYPE) {
					oRet = new Annee(oMap);
				} else if (t == SEMESTRE_TYPE) {
					oRet = new Semestre(oMap);
				} else if (t == UNITE_TYPE) {
					oRet = new Unite(oMap);
				} else if (t == MATIERE_TYPE) {
					oRet = new Matiere(oMap);
				} else if (t == GROUPE_TYPE) {
					oRet = new Groupe(oMap);
				} else if (t == PERSON_TYPE) {
					oRet = new Person(oMap);
				} else if (t == ETUDIANT_TYPE) {
					oRet = new Etudiant(oMap);
				} else if (t == ENSEIGNANT_TYPE) {
					oRet = new Enseignant(oMap);
				} else if (t == ADMINISTRATOR_TYPE) {
					oRet = new Administrator(oMap);
				} else if (t == ETUDAFFECTATION_TYPE) {
					oRet = new EtudiantAffectation(oMap);
				} else if (t == PROFAFFECTATION_TYPE) {
					oRet = new EnseignantAffectation(oMap);
				} else if (t == GROUPEEVENT_TYPE) {
					oRet = new GroupeEvent(oMap);
				} else if (t == ETUDEVENT_TYPE) {
					oRet = new EtudiantEvent(oMap);
				}
			}// t
		}// t
		return oRet;
	}// ctrateçitem
	//
	public create_etudiantevent(oMap?: any): IEtudiantEvent {
		return new EtudiantEvent(oMap);
	}
	public create_groupeevent(oMap?: any): IGroupeEvent {
		return new GroupeEvent(oMap);
	}
	public create_etudiantaffectation(oMap?: any): IEtudiantAffectation {
		return new EtudiantAffectation(oMap);
	}
	public create_enseignantaffectation(oMap?: any): IEnseignantAffectation {
		return new EnseignantAffectation(oMap);
	}
	public create_semestre(oMap?: any): ISemestre {
		return new Semestre(oMap);
	}
	public create_matiere(oMap?: any): IMatiere {
		return new Matiere(oMap);
	}
	public create_groupe(oMap?: any): IGroupe {
		return new Groupe(oMap);
	}
	public create_unite(oMap?: any): IUnite {
		return new Unite(oMap);
	}
	public create_annee(oMap?: any): IAnnee {
		return new Annee(oMap);
	}
	public create_departement(oMap?: any): IDepartement {
		return new Departement(oMap);
	}
	public create_person(oMap?: any): IPerson {
		return new Person(oMap);
	}
	public create_etudiant(oMap?: any): IEtudiant {
		return new Etudiant(oMap);
	}
	public create_enseignant(oMap?: any): IEnseignant {
		return new Enseignant(oMap);
	}
	public create_administrator(oMap?: any): IAdministrator {
		return new Administrator(oMap);
	}
}// class ItemFactory