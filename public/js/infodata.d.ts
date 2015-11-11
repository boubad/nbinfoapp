//geninfo.d.ts
/// <reference path='../../typings/es6.d.ts' />
//
declare module 'infodata' {
	//
	export interface IMenuDesc {
		id: string;
		display: string;
		text?: string;
		description?: string;
		url?: string;
	}// interface IMenuDesc
	//
	export interface IInfoElement {

	} // interface IInfoElement
	//
	export interface IAttachedDoc extends IInfoElement {
        id?: string;
        name?: string;
        mime_type?: string;
        data?: Blob;
        description?: string;
        keywords?: string[];
        text?: string;
        //
        is_storeable?: () => boolean;
    } // interface IAttachedDoc
    //
    export interface IElementDesc extends IInfoElement {
        id: string;
        text: string;
        rev?: string;
        avatarid?: string;
        url?: string;
        selected?: boolean;
        description?: string;
		status?: string;
		has_url: boolean;
        //
        is_storeable: () => boolean;
        to_map: (oMap: any) => void;
		from_map: (oMap?: any) => void;
        toString: () => string;
        sort_func: (p1: IElementDesc, p2: IElementDesc) => number;
    }// interface IElementDesc
    //
    export interface IBaseItem extends IElementDesc {
        type: () => string;
        store_prefix: () => string;
        start_key: () => string;
        end_key: () => string;
        create_id: () => string;
		check_id: () => void;
        //
        attachments?: any;
        avatardocid?: () => string;
    }// interface IBaseItem
	export interface ISigleNamedItem extends IBaseItem {
		sigle: string;
		name: string;
	}
	export interface IDepartement extends ISigleNamedItem {

	}
	export interface IDepartementSigleNamedItem extends ISigleNamedItem {
		departementid: string;
	}
	export interface IUnite extends IDepartementSigleNamedItem {
		order: number;
		coefficient: number;
	}
	export interface IGroupe extends IDepartementSigleNamedItem {
		genre: string;
		children_ids: string[];
	}
	export interface IMatiere extends ISigleNamedItem {
		uniteid: string;
		genre: string;
		mat_module: string;
		order: number;
		ecs: number;
		coefficient: number;
	}
	export interface IIntervalledSigleItem extends ISigleNamedItem {
		startDate: Date;
		endDate: Date;
	}
	export interface IAnnee extends IIntervalledSigleItem {
		departementid: string;
	}
	export interface ISemestre extends IIntervalledSigleItem {
		anneeid: string;
	}
	export interface IPerson extends IBaseItem {
		username: string;
		password: string;
		firstname: string;
		lastname: string;
		email?: string;
		phone?: string;
		//
		departementids?: string[];
		groupeids?: string[];
		anneeids?: string[];
		semestreids?: string[];
		uniteids?: string[];
		matiereids?: string[];
		affectationids?: string[];
		eventids?: string[];
		etudiantids?: string[];
		enseignantids?: string[];
		administratorids?: string[];
		//
		dossier?: string;
		sexe?: string;
		birthDate?: Date;
		ville?: string;
		etablissement?: string;
		serieBac?: string;
		optionBac?: string;
		mentionBac?: string;
		etudesSuperieures: string;
		apb?: string;
		//
		fullname: string;
		reset_password: () => void;
		change_password: (ct: string) => void;
		check_password: (ct: string) => boolean;
		//
		get_all_ids?: () => string[];
	}
	interface IPersonItem extends IBaseItem {
		personid: string;
		firstname: string;
		lastname: string;
		fullname: string;
		//
		check_person: (oPers: IPerson) => boolean;
	}
	interface IDepartementPerson extends IPersonItem {
		departementid: string;
	}
	export interface IEtudiant extends IDepartementPerson {

	}
	export interface IEnseignant extends IDepartementPerson {

	}
	export interface IAdministrator extends IDepartementPerson {

	}
	export interface IAffectation extends IPersonItem {
		anneeid: string;
		semestreid: string;
		groupeid: string;
		startDate: Date;
		endDate: Date;
		groupeName: string;
	}
	export interface IEtudiantAffectation extends IAffectation {
		etudiantid: string;
	}
	export interface IEnseignantAffectation extends IAffectation {
		enseignantid: string;
		uniteid: string;
		matiereid: string;
	}
	export interface IInfoEvent extends IPersonItem {
		semestreid: string;
		matiereid: string;
		groupeid: string;
		genre: string;
		matiereName: string;
		groupeName: string;
		eventDate: Date;
		dateString: string;
		coefficient: number;
		semestreSigle: string;
		anneeid: string;
		anneeSigle: string;
		matiereCoefficient: number;
		uniteid: string;
		uniteCoefficient: number;
		uniteSigle: string;
	}
	export interface IGroupeEvent extends IInfoEvent {
		profaffectationid: string;
		name: string;
		location: string;
		eventDate: Date;
		minnote: number;
		maxnote: number;
		startTime:string;
		endTime: string;
	}
	export interface IEtudiantEvent extends IInfoEvent {
		groupeeventid: string;
		groupeEventName: string;
		etudiantid: string;
		etudiantaffectationid: string;
		note: number;
	}
	//
	export interface IItemFactory {
		create_item: (oMap?: any) => IBaseItem;
		create_etudiantevent: (oMap?: any) => IEtudiantEvent;
		create_groupeevent: (oMap?: any) => IGroupeEvent;
		create_etudiantaffectation: (oMap?: any) => IEtudiantAffectation;
		create_enseignantaffectation: (oMap?: any) => IEnseignantAffectation;
		create_semestre: (oMap?: any) => ISemestre;
		create_matiere: (oMap?: any) => IMatiere;
		create_groupe: (oMap?: any) => IGroupe;
		create_unite: (oMap?: any) => IUnite;
		create_annee: (oMap?: any) => IAnnee;
		create_departement: (oMap?: any) => IDepartement;
		create_person: (oMap?: any) => IPerson;
		create_etudiant: (oMap?: any) => IEtudiant;
		create_enseignant: (oMap?: any) => IEnseignant;
		create_administrator: (oMap?: any) => IAdministrator;
	}
	//
	export interface IDocPersist {
		name: string;
		exists_doc: (docid: string) => Promise<string>;
		read_doc: (docid: string, bAttachments?: boolean, bMeta?: Boolean) => Promise<any>;
		insert_doc: (doc: any) => Promise<any>;
		update_doc: (doc: any) => Promise<any>;
		remove_doc: (doc: any) => Promise<any>;
		bulk_maintains: (docs: any[]) => Promise<any>;
		docs_ids_range: (startkey: string, endkey: string) => Promise<string[]>;
		docs_read_range: (startkey: string, endkey: string, skip?: number, limit?: number) => Promise<any[]>;
		docs_array: (ids: string[]) => Promise<any[]>;
		remove_all_items: (startKey: string, endKey: string) => Promise<any>;
		isOnline: () => Promise<boolean>;
		find_attachment: (docid: string, attachmentId: string) => Promise<Blob>;
		maintains_attachment: (docid: string, attachmentId: string,
			attachmentData: Blob, attachmentType: string) => Promise<any>;
		remove_attachment: (docid: string, attachmentId: string) => Promise<any>;
		//
		replicate: (from: string, to: string, ids?: string[]) => Promise<boolean>;
		//
		create_one_index: (field: string) => Promise<boolean>;
		create_indexes: (fields: string[]) => Promise<boolean>;
		create_all_indexes: (fields: string[]) => Promise<boolean[]>;
		find_docs: (temp: any, fields?: string[], skip?: number, limit?: number) => Promise<any[]>;
		
	}// interface IIDocPersist
	//
	export interface IDataService {
		service: IDocPersist;
		itemFactory: IItemFactory;
		name: string;
		is_valid: boolean;
		get_etudiantevent_etudaffectation: (e: IEtudiantEvent) => Promise<IEtudiantAffectation>;
		get_etudiantevent_groupeevent: (e: IEtudiantEvent) => Promise<IGroupeEvent>;
		get_groupeevent_profaffectation: (a: IGroupeEvent) => Promise<IEnseignantAffectation>;
		get_profaffectation_matiere: (a: IEnseignantAffectation) => Promise<IMatiere>;
		get_profaffectation_enseignant: (a: IEnseignantAffectation) => Promise<IEnseignant>;
		get_etudaffectation_etudiant: (a: IEtudiantAffectation) => Promise<IEtudiant>;
		get_affectation_semestre: (a: IAffectation) => Promise<ISemestre>;
		get_affectation_groupe: (a: IAffectation) => Promise<IGroupe>;
		get_matiere_unite: (a: IMatiere) => Promise<IUnite>;
		get_semestre_annee: (a: ISemestre) => Promise<IAnnee>;
		get_groupe_departement: (a: IGroupe) => Promise<IDepartement>;
		get_annee_departement: (a: IAnnee) => Promise<IDepartement>;
		get_unite_departement: (a: IUnite) => Promise<IDepartement>;
		//
		find_item_by_id: (id: string) => Promise<IBaseItem>;
		save_item: (p: IBaseItem) => Promise<boolean>;
		save_personitem: (p: IPersonItem) => Promise<boolean>;
		load_item: (p: IBaseItem) => Promise<boolean>;
		remove_item: (p: IBaseItem) => Promise<boolean>;
		maintains_items: (pp: IBaseItem[], bDelete?: boolean) => Promise<boolean[]>;
		maintains_personitems: (pp: IPersonItem[]) => Promise<boolean[]>;
		get_ids: (startkey: string, endkey?: string) => Promise<string[]>;
		get_items_range: (startkey: string, endkey: string, skip?: number, limit?: number) => Promise<IBaseItem[]>;
		get_items_all: (startkey: string, endkey: string) => Promise<IBaseItem[]>;
		get_items_array: (ids: string[]) => Promise<IBaseItem[]>;
		remove_all_items: (startKey: string, endKey: string) => Promise<boolean>;
		exists_item: (id: string) => Promise<string>;
		//
		isOnline: () => Promise<boolean>;
		find_attachment: (docid: string, attachmentId: string) => Promise<Blob>;
		maintains_attachment: (docid: string, attachmentId: string,
			attachmentData: Blob, attachmentType: string) => Promise<boolean>;
		remove_attachment: (docid: string, attachmentId: string) => Promise<boolean>;
		//
		get_departements: (skip?: number, limit?: number) => Promise<IDepartement[]>;
		get_person_by_username: (suser: string) => Promise<IPerson>; 
		//
		replicate_all: (from: string, to: string) => Promise<any>;
		replicate_person: (pPers: IPerson, from: string, to: string) => Promise<any>;
		replicate_to: (to: string) => Promise<any>;
		replicate_person_to: (pPers: IPerson, to: string) => Promise<any>;
		replicate_from: (from: string) => Promise<any>;
		replicate_person_from: (pPers: IPerson, from: string) => Promise<any>;
		//
		get_departement_annees: (p: IDepartement) => Promise<IAnnee[]>;
		get_departement_groupes: (p: IDepartement) => Promise<IGroupe[]>;
		get_departement_unites: (p: IDepartement) => Promise<IUnite[]>;
		get_unite_matieres: (p: IUnite) => Promise<IMatiere[]>;
		get_annee_semestres: (p: IAnnee) => Promise<ISemestre[]>;
		//
		check_super_admin: () => Promise<boolean>;
		//
		get_semestre_matiere_enseignantaffectations: (sem: ISemestre, mat: IMatiere) => Promise<IEnseignantAffectation[]>;
		get_semestre_groupe_etudaffectations: (sem: ISemestre, grp: IGroupe) => Promise<IEtudiantAffectation[]>;
		get_semestre_groupeevents: (sem: ISemestre, skip?: number, limit?: number) => Promise<IGroupeEvent[]>;
		get_semestre_matiere_groupeevents: (sem: ISemestre, mat: IMatiere, skip?: number, limit?: number) => Promise<IGroupeEvent[]>;
		get_groupeevent_events: (gvt: IGroupeEvent, genre?: string) => Promise<IEtudiantEvent[]>;
		get_semestre_matiere_etudevents: (sem: ISemestre, mat: IMatiere, genre?: string) => Promise<IEtudiantEvent[]>;
		get_semestre_etudevents: (sem: ISemestre, genre?: string) => Promise<IEtudiantEvent[]>;
		//
		check_groupeevent_notes: (gvt: IGroupeEvent) => Promise<boolean>;
		get_etudiant_events: (pEtud: IEtudiant) => Promise<IEtudiantEvent[]>;
		//
		query_items:(type:string,selector?:any,skip?:number,limit?:number) => Promise<IBaseItem[]>;
		query_by_template: (temp:IBaseItem, skip?:number, limit?:number) => Promise<IBaseItem[]>;
		query_ids:(selector?:any,skip?:number, limit?:number) => Promise<string[]>;
	}// interface IDataService
	//
	export interface IInfoMessage {
		type: string;
		categ?: string;
		value?: any;
		info?: string;
		source?: any;
		error?: string;
		tag?: string;
	}// interface IInfoMessage
	export interface IUIManager {
		createUrl: (data: Blob) => string;
		revokeUrl: (s: string) => void;
		confirm: (question: string) => boolean;
	}// interface IUIManager
	export interface IObjectStore {
		get_value: (key: string) => string;
		store_value: (key: string, value: string) => any;
		remove_value: (key: string) => any;
		clear: () => any;
	}// interface IObjectStore
	export interface IFileDesc {
		name: string;
		type: string;
		data: Blob;
		url: string;
		//
		has_url: boolean;
		is_storeable: boolean;
		clear: () => void;
		changed: (evt: any) => any;
		remove_url: () => string;
	}// interface IFileDesc
	export interface IMessageManager {
        publish: (type: string, payload: any) => void;
        subscribe: (type: string, callback: (payload: any) => any) => void;
        unsubscribe: (type: string) => void;
	}
    export interface ILogManager {
        error: (s: string) => void;
        warn: (s: string) => void;
        info: (s: string) => void;
        debug: (s: string) => void;
    }
	export interface IDisplayEtudiant extends IBaseItem {
		personid: string;
		etudiantid: string;
		uniteid: string;
		matiereid: string;
		groupeid: string;
		firstname: string;
		lastname: string;
		coefficient: number;
		coefficientString: string;
		note: number;
		noteString: string;
		absencesCount: number;
		retardsCount: number;
		miscCount: number;
		notesCount: number;
		fullname: string;
		groupeSigle: string;
		absenceString: string;
		retardString: string;
		miscString: string;
		sortCriteria: number;
		matiereSigle: string;
		uniteSigle: string;
		description: string;
		matiereCoefficient: number;
		uniteCoefficient: number;
		order: number;
		//
		_count?: number;
		_sumcoefs?: number;
		_sumdata?: number;
	}// interface IDisplayEtudiant
	export interface ITransformArray {
		transform_map: (oMap: any) => IBaseItem;
		transform_file: (file: File, stype: string) => Promise<any>;
	}
}// module infodata
