//dataservice.ts
/// <reference path='../../../typings/pouchdb/pouchdb.d.ts' />
//
import {IBaseItem, IDocPersist, IItemFactory, IDataService, IEtudiantEvent, IAffectation,
IEtudiantAffectation, IGroupeEvent, IEnseignantAffectation, IMatiere, IUnite, IPerson,
IDepartement, IGroupe, ISemestre, IAnnee, IEtudiant, IEnseignant, IPersonItem,IAdministrator} from 'infodata';
import {ItemFactory} from './itemfactory';
import {PouchDatabase} from '../pouchdb/pouchdatabase';
import {SUPER_USERNAME,SUPER_FIRSTNAME,SUPER_LASTNAME,
	PROFAFFECTATION_PREFIX,ETUDAFFECTATION_PREFIX,GROUPEEVENT_PREFIX,
ETUDEVENT_PREFIX,GENRE_TP,EVT_NOTE} from "../infoconstants";
//
const INDEXED_FIELDS:string[] = ["_id","type","status","dossier","sexe","birthDate",
"username","firstname","lastname","ville","etablissement",
"serieBac","optionBac","mentionBac","etudesSuperieures","apb",
"sigle","departementid","uniteid","anneeid","groupeid","matiereid","semestreid",
"etudiantid","enseignantid","profaffectationid","groupeeventid","etudiantaffectationid",
"genre","name","startDate","endDate","eventDate"];
//
export class DataService implements IDataService {
    private _service: IDocPersist = null;
    private _factory: IItemFactory = null;
	private _name: string = null;
    //
    constructor(serv?: IDocPersist) {
		if (serv !== undefined) {
			this._service = serv;
			this._name = serv.name;
		}
		if ((this._service === undefined) || (this._service === null)) {
			this._service = new PouchDatabase();
			this._name = this._service.name;
		}
		this._factory = new ItemFactory();
    }
	//
	protected sort_array(pp:IBaseItem[]):void {
		if ((pp !== undefined) && (pp !== null) && (pp.length > 1)){
			let p = pp[0];
			if ((p !== undefined) && (p !== null)){
				let pf = p.sort_func;
				if ((pf !== undefined) && (pf !== null)){
					pp.sort(pf);
				}// pf
			}//p
		}// pp
	}
	//
	public get name(): string {
		return this._name;
	}
	public set name(s: string) {
		this._name = s;
		this._service = new PouchDatabase(this._name);
	}
	//
	
	public get service(): IDocPersist {
		return (this._service !== undefined) ? this._service : null;
	}
	public set service(s: IDocPersist) {
		this._service = (s !== undefined) ? s : null;
	}
	public get itemFactory(): IItemFactory {
		return (this._factory !== undefined) ? this._factory : null;
	}
	public set itemFactory(s: IItemFactory) {
		this._factory = (s !== undefined) ? s : null;
	}
	public get is_valid(): boolean {
		return ((this.service !== null) && (this.itemFactory !== null));
	}
	//
	public get_etudiant_events(pEtud:IEtudiant):Promise<IEtudiantEvent[]>{
		let oRet:IEtudiantEvent[]=[];
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((pEtud === undefined)|| (pEtud === null)){
			return Promise.resolve(oRet);
		}
		let id:string = pEtud.personid;
		if ((id === undefined)|| (id === null)){
			return Promise.resolve(oRet);
		}
		let pPers:IPerson = this.itemFactory.create_person({_id:id});
		return this.load_item(pPers).then((b)=>{
			let ids:string[]=[];
			if ((b !== undefined) && (b !== null) && (b == true)){
				ids = pPers.eventids;
			}
		   return this.get_items_array(ids);
		}).then((ee:IEtudiantEvent[])=>{
			if ((ee !== undefined) && (ee !== null)){
				oRet = ee;
			}
			this.sort_array(oRet);
			return oRet;
		}).catch((e)=>{
			return oRet;
		})
	}//get_etudiant_events
	//
	protected insert_ifnot_exists(p:IBaseItem):Promise<boolean>{
		return this.exists_item(p.id).then((b)=>{
			if ((b !== undefined) && (b !== null) && (b.length > 0)){
				return Promise.resolve(true);
			} else {
				return this.save_item(p);
			}
		});
	}//insert_ifnot_exists
	public check_groupeevent_notes(gvt:IGroupeEvent):Promise<boolean>{
		let oRet:boolean = false;
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((gvt === undefined) || (gvt === null)){
			return Promise.resolve(oRet);
		}
		let fact = this.itemFactory;
		let matid:string = null;
		let grp:IGroupe = null;
		let semid:string = null;
		let evtdate:Date = gvt.eventDate;
		let matName:string = null;
		let grpName:string = null;
		let pAf:IEnseignantAffectation = null;
		let pSem:ISemestre = null;
		return this.get_groupeevent_profaffectation(gvt).then((af)=>{
			if ((af !== undefined) && (af !== null)){
				pAf = af;
				semid = af.semestreid;
				return this.get_profaffectation_matiere(af);
			}else {
				return Promise.resolve(null);
			}
		}).then((mat)=>{
			if ((mat !== undefined) && (mat !== null)){
				matName = mat.text;
				matid = mat.id;
			}
			if (pAf !== null){
				return this.get_affectation_groupe(pAf);
			} else {
				return Promise.resolve(null);
			}
		}).then((gg)=>{
			if ((gg !== undefined) && (gg !== null)){
				grp = gg;
				grpName = gg.text;
			}
			if (pAf !== null){
				return this.get_affectation_semestre(pAf);
			} else {
			return Promise.resolve(null);	
			}
		}).then((ss)=>{
			if ((ss !== undefined) && (ss !== null)){
				pSem = ss;
			}
			if ((grp !== null) && (pSem !== null)){
				return this.get_semestre_groupe_etudaffectations(pSem,grp);
			} else {
				return Promise.resolve([]);
			}
		}).then((aa:IEtudiantAffectation[])=>{
			let items:IEtudiantEvent[] = [];
			if ((aa !== undefined) && (aa !== null) &&
			(semid !== null) && (matid !== null)){
				for (let a of aa){
					let v:IEtudiantEvent = fact.create_etudiantevent({
						personid:a.personid,
						firstname: a.firstname,
						lastname: a.lastname,
						semestreid: semid,
						matiereid: matid,
						genre: EVT_NOTE,
						eventDate: evtdate,
						matiereName: matName,
						groupeName: grpName,
						groupeeventid:gvt.id,
						etudiantaffectationid: a.id
					});
					v.check_id();
					items.push(v);
				}// a
			}
			let oAr:Promise<boolean>[] = [];
			for (let it of items){
				oAr.push(this.insert_ifnot_exists(it));
			}//it
			return Promise.all(oAr);
		}).then((rr)=>{
			oRet = ((rr !== undefined) && (rr !== null));
			return oRet;
		}).catch((err)=>{
			return oRet;
		});
	}//check_groupeevent_notes
	//
	public get_semestre_etudevents(sem:ISemestre,genre?:string) : Promise<IEtudiantEvent[]>{
		let oRet:IEtudiantEvent[] = [];
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((sem === undefined) || (sem === null)){
			return Promise.resolve(oRet);
		}
		let s1 = sem.id;
		if ((s1 === undefined) || (s1 === null)){
			return Promise.resolve(oRet);
		}
		return this.get_semestre_groupeevents(sem).then((gvts)=>{
			let oAr:Promise<IEtudiantEvent[]>[] = [];
			if ((gvts !== undefined) && (gvts !== null)){
				for (let g of gvts){
					oAr.push(this.get_groupeevent_events(g));
				}// g
			}// gvts
			return Promise.all(oAr);
		}).then((xx)=>{
			if ((xx !== undefined) && (xx !== null)){
				for (let ee of xx){
					for (let e of ee){
						if ((genre !== undefined) && (genre !== null)){
							if (genre == e.genre){
								oRet.push(e);
							}
						} else {
						oRet.push(e);
						}
					}// e
				}// ee
			}// xx
			this.sort_array(oRet);
			return oRet;
		}).catch((e)=>{
			return oRet;
		});
	}//get_semestre_etudevents
	//
	public get_semestre_matiere_etudevents(sem:ISemestre,mat:IMatiere,genre?:string) : Promise<IEtudiantEvent[]>{
		let oRet:IEtudiantEvent[] = [];
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((sem === undefined) || (sem === null) || (mat === undefined) || (mat === null)){
			return Promise.resolve(oRet);
		}
		let s1 = sem.id;
		let s2 = mat.id;
		if ((s1 === undefined) || (s2 === undefined) || (s1 === null)|| (s2 === null)){
			return Promise.resolve(oRet);
		}
		return this.get_semestre_matiere_groupeevents(sem,mat).then((gvts)=>{
			let oAr:Promise<IEtudiantEvent[]>[] = [];
			if ((gvts !== undefined) && (gvts !== null)){
				for (let g of gvts){
					oAr.push(this.get_groupeevent_events(g));
				}// g
			}// gvts
			return Promise.all(oAr);
		}).then((xx)=>{
			if ((xx !== undefined) && (xx !== null)){
				for (let ee of xx){
					for (let e of ee){
						if ((genre !== undefined) && (genre !== null)){
							if (genre == e.genre){
								oRet.push(e);
							}
						} else {
						oRet.push(e);
						}
					}// e
				}// ee
			}// xx
			this.sort_array(oRet);
			return oRet;
		}).catch((e)=>{
			return oRet;
		});
	}//get_semestre_matiere_etudevents
	//
	public get_groupeevent_events(gvt?:IGroupeEvent,genre?:string) : Promise<IEtudiantEvent[]>{
		let oRet:IEtudiantEvent[] = [];
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((gvt === undefined) || (gvt === null)){
			return Promise.resolve(oRet);
		}
		let s1 = gvt.id;
		if ((s1 === undefined) || (s1 === null)){
			return Promise.resolve(oRet);
		}
		let startkey:string = ETUDEVENT_PREFIX + s1 ;
		let endkey:string = startkey + "\uffff";
		return this.get_items_all(startkey,endkey).then((ee:IEtudiantEvent[])=>{
			for (let e of ee){
						if ((genre !== undefined) && (genre !== null)){
							if (genre == e.genre){
								oRet.push(e);
							}
						} else {
						oRet.push(e);
						}
					}// e
			this.sort_array(oRet);				  
			return oRet;
		}).catch((e)=>{
			return oRet;
		});
	}//get_groupeevent_events
	//
	public get_semestre_matiere_groupeevents(sem:ISemestre,mat:IMatiere,skip?:number,limit?:number): Promise<IGroupeEvent[]>{
		let oRet:IGroupeEvent[] = [];
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((sem === undefined) || (sem === null) || (mat === undefined) || (mat === null)){
			return Promise.resolve(oRet);
		}
		let s1 = sem.id;
		let s2 = mat.id;
		if ((s1 === undefined) || (s2 === undefined) || (s1 === null)|| (s2 === null)){
			return Promise.resolve(oRet);
		}
		let startkey:string = GROUPEEVENT_PREFIX + s1 + s2;
		let endkey:string = startkey + "\uffff";
		return this.get_items_range(startkey,endkey,skip,limit).then((dd:IGroupeEvent[])=>{
			oRet = ((dd !== undefined) && (dd !== null)) ? dd : [];
			this.sort_array(oRet);
			return oRet;
		}).catch((e)=>{
			return oRet;
		});
	}//get_semestre_matiere_groupeevents
	//
	public get_semestre_groupeevents(sem:ISemestre,skip?:number,limit?:number): Promise<IGroupeEvent[]>{
		let oRet:IGroupeEvent[] = [];
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((sem === undefined) || (sem === null)){
			return Promise.resolve(oRet);
		}
		let s1 = sem.id;
		if ((s1 === undefined) || (s1 === null)){
			return Promise.resolve(oRet);
		}
		let startkey:string = GROUPEEVENT_PREFIX + s1;
		let endkey:string = startkey + "\uffff";
		return this.get_items_range(startkey,endkey,skip,limit).then((dd:IGroupeEvent[])=>{
			oRet = ((dd !== undefined) && (dd !== null)) ? dd : [];
			this.sort_array(oRet);
			return oRet;
		}).catch((e)=>{
			return oRet;
		});
	}//get_semestre_groupeevents
	public get_semestre_groupe_etudaffectations(sem:ISemestre,grp:IGroupe) : Promise<IEtudiantAffectation[]>{
		let oRet:IEtudiantAffectation[] = [];
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((sem === undefined) || (sem === null) || (grp === undefined) || (grp === null)){
			return Promise.resolve(oRet);
		}
		let s1 = sem.id;
		let s2 = grp.id;
		let genre = grp.genre;
		if ((s1 === undefined) || (s2 === undefined) || (s1 === null)|| (s2 === null) ||
		(genre === undefined) || (genre === null)){
			return Promise.resolve(oRet);
		}
		if (genre == GENRE_TP){
			let startkey = ETUDAFFECTATION_PREFIX + s1 + s2;
			let endkey = startkey + "\uffff";
			return this.get_items_all(startkey,endkey).then((dd:IEtudiantAffectation[])=>{
				oRet = ((dd !== undefined) && (dd !== null)) ? dd : [];
				this.sort_array(oRet);
				return oRet;
			}).catch((e)=>{
				return oRet;
			});
		}
		let ids:string[] = grp.children_ids;
		if ((ids === undefined) || (ids === null)){
			ids = [];
		}
		let self = this;
		return this.get_items_array(ids).then((gg:IGroupe[])=>{
			let oAr:Promise<IEtudiantAffectation[]>[] = [];
			if ((gg !== undefined) && (gg !== null)){
				for (let g of gg){
					oAr.push(self.get_semestre_groupe_etudaffectations(sem,g));
				}
			}// gg
			return Promise.all(oAr);
		}).then((dd)=>{
			if ((dd !== undefined) && (dd !== null)){
				for (let xx of dd){
					for (let a of xx){
						oRet.push(a);
					}
				}// xx
			}// dd
			this.sort_array(oRet);
			return oRet;
		}).catch((e)=>{
			return oRet;
		});
	}//get_semestre_groupe_etudaffectations
	public get_semestre_matiere_enseignantaffectations(sem:ISemestre,mat:IMatiere) : Promise<IEnseignantAffectation[]> {
		let oRet:IEnseignantAffectation[] = [];
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((sem === undefined) || (sem === null) || (mat === undefined) || (mat === null)){
			return Promise.resolve(oRet);
		}
		let s1 = sem.id;
		let s2 = mat.id;
		if ((s1 === undefined) || (s2 === undefined) || (s1 === null)|| (s2 === null)){
			return Promise.resolve(oRet);
		}
		let startkey:string = PROFAFFECTATION_PREFIX + s1 + s2;
		let endkey:string = startkey + "\uffff";
		return this.get_items_all(startkey,endkey).then((dd:IEnseignantAffectation[])=>{
			oRet = ((dd !== undefined) && (dd !== null)) ? dd : [];
			this.sort_array(oRet);
			return oRet;
		}).catch((e)=>{
			return oRet;
		});
	}//get_semestre_matiere_enseignantaffectations
	//
	public check_super_admin() : Promise<boolean>{
		let oRet:boolean = false;
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		let pPers:IPerson = this.itemFactory.create_person({username:SUPER_USERNAME,firstname:SUPER_FIRSTNAME,
			lastname:SUPER_LASTNAME});
		pPers.check_id();
		pPers.reset_password();
		let id:string = pPers.id;
		let bOld:boolean = false;
		return this.service.exists_doc(id).then((srev)=>{
			if ((srev !== undefined) && (srev !== null) && (srev.length > 0)){
				bOld = true;
				return this.load_item(pPers);
			} else {
				return this.save_item(pPers);
			}
		}).then((b)=>{
			oRet = ((b !== undefined) && (b !== null)) ? b : false;
			if (!bOld){
			return this.service.create_all_indexes(INDEXED_FIELDS);
			} else {
				let xx:boolean[] = [];
				return Promise.resolve(xx);
			}
		}).then((bb)=>{
			return oRet;
		}).catch((e)=>{
			return oRet;
		});			
	}//check_super_admin(
	//
	public get_departement_annees(p: IDepartement): Promise<IAnnee[]> {
		let oRet: IAnnee[] = [];
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((p === undefined) || (p === null)) {
			return Promise.resolve(oRet);
		}
		let model: IAnnee = this.itemFactory.create_annee({ departementid: p.id });
		let startkey = model.start_key();
		let endkey = model.end_key();
		return this.get_items_range(startkey, endkey, 0, 100).then((dd: IAnnee[]) => {
			if ((dd !== undefined) && (dd !== null)) {
				oRet = dd;
			}
			this.sort_array(oRet);
			return oRet;
		}).catch((e) => {
			return oRet;
		});
	}//get_departement_annees
	public get_departement_groupes(p: IDepartement): Promise<IGroupe[]> {
		let oRet: IGroupe[] = [];
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((p === undefined) || (p === null)) {
			return Promise.resolve(oRet);
		}
		let model: IGroupe = this.itemFactory.create_groupe({ departementid: p.id });
		let startkey = model.start_key();
		let endkey = model.end_key();
		return this.get_items_range(startkey, endkey, 0, 100).then((dd: IGroupe[]) => {
			if ((dd !== undefined) && (dd !== null)) {
				oRet = dd;
			}
			this.sort_array(oRet);
			return oRet;
		}).catch((e) => {
			return oRet;
		});
	}// get_departement_groupes
	public get_departement_unites(p: IDepartement): Promise<IUnite[]> {
		let oRet: IUnite[] = [];
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((p === undefined) || (p === null)) {
			return Promise.resolve(oRet);
		}
		let model: IUnite = this.itemFactory.create_unite({ departementid: p.id });
		let startkey = model.start_key();
		let endkey = model.end_key();
		return this.get_items_range(startkey, endkey, 0, 100).then((dd: IUnite[]) => {
			if ((dd !== undefined) && (dd !== null)) {
				oRet = dd;
			}
			this.sort_array(oRet);
			return oRet;
		}).catch((e) => {
			return oRet;
		});
	}//get_departement_unites
	public get_unite_matieres(p: IUnite): Promise<IMatiere[]> {
		let oRet: IMatiere[] = [];
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((p === undefined) || (p === null)) {
			return Promise.resolve(oRet);
		}
		let model: IMatiere = this.itemFactory.create_matiere({ uniteid: p.id });
		let startkey = model.start_key();
		let endkey = model.end_key();
		return this.get_items_range(startkey, endkey, 0, 100).then((dd: IMatiere[]) => {
			if ((dd !== undefined) && (dd !== null)) {
				oRet = dd;
			}
			this.sort_array(oRet);
			return oRet;
		}).catch((e) => {
			return oRet;
		});
	}// get_unite_matieres
	public get_annee_semestres(p: IAnnee): Promise<ISemestre[]> {
		let oRet: ISemestre[] = [];
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((p === undefined) || (p === null)) {
			return Promise.resolve(oRet);
		}
		let model: ISemestre = this.itemFactory.create_semestre({ anneeid: p.id });
		let startkey = model.start_key();
		let endkey = model.end_key();
		return this.get_items_range(startkey, endkey, 0, 100).then((dd: ISemestre[]) => {
			if ((dd !== undefined) && (dd !== null)) {
				oRet = dd;
			}
			this.sort_array(oRet);
			return oRet;
		}).catch((e) => {
			return oRet;
		});
	}//get_annee_semestres
	//
	public replicate_all(from: string, to: string): Promise<any> {
		if (!this.is_valid) {
			throw new Error("invalid database");
		}
		if ((from === undefined) || (from === null) || (to === undefined) || (to === null)) {
			throw new Error("invalid args");
		}
		let source = from.trim();
		let dest = to.trim();
		if ((source.length < 1) || (dest.length < 1) || (source == dest)) {
			throw new Error("invalid args");
		}
		return this.service.replicate(source, dest);
	}// replicate_all
	//
	public replicate_person(pPers: IPerson, from: string, to: string): Promise<any> {
		if (!this.is_valid) {
			throw new Error("invalid database");
		}
		if ((pPers !== undefined) || (pPers === null) || (from === undefined) || (from === null) || (to === undefined) || (to === null)) {
			throw new Error("invalid args");
		}
		let ids = pPers.get_all_ids();
		let source = from.trim();
		let dest = to.trim();
		if ((source.length < 1) || (dest.length < 1) || (source == dest)) {
			throw new Error("invalid args");
		}
		return this.service.replicate(source, dest, ids);
	}//replicate_person
	//
	public replicate_to(to: string): Promise<any> {
		if (!this.is_valid) {
			throw new Error("invalid database");
		}
		return this.service.replicate(this.service.name, to);
	}
	public replicate_person_to(pPers: IPerson, to: string): Promise<any> {
		if (!this.is_valid) {
			throw new Error("invalid database");
		}
		if ((pPers === undefined) || (pPers === null)) {
			throw new Error("invalid args");
		}
		return this.replicate_person(pPers, this.service.name, to);
	}
	public replicate_from(from: string): Promise<any> {
		if (!this.is_valid) {
			throw new Error("invalid database");
		}
		return this.service.replicate(from, this.service.name);
	}
	public replicate_person_from(pPers: IPerson, from: string): Promise<any> {
		if (!this.is_valid) {
			throw new Error("invalid database");
		}
		if ((pPers === undefined) || (pPers === null)) {
			throw new Error("invalid args");
		}
		return this.replicate_person(pPers, from, this.service.name);
	}
	//
	public get_person_by_username(suser: string): Promise<IPerson> {
		let oRet: IPerson = null;
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((suser === undefined) || (suser === null)) {
			return Promise.resolve(oRet);
		}
		let ss: string = suser.trim();
		if (ss.length < 1) {
			return Promise.resolve(oRet);
		}
		let oPers: IPerson = this.itemFactory.create_person({ username: ss });
		oPers.check_id();
		let id: string = oPers.id;
		return this.service.read_doc(id, true).then((doc) => {
			if ((doc !== undefined) && (doc !== null) && (doc._id !== undefined) &&
				(doc._rev !== undefined) && (doc._id == id)) {
				oRet = this.itemFactory.create_person(doc);
			}
			return oRet;
		}).catch((ee) => {
			return oRet;
		});
	}// get_person_by_username
		
	//
	public get_departements(skip?: number, limit?: number): Promise<IDepartement[]> {
		let oRet: IDepartement[] = [];
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		let model: IDepartement = this.itemFactory.create_departement();
		let startkey: string = model.start_key();
		let endkey: string = model.end_key();
		return this.service.docs_read_range(startkey, endkey, skip, limit).then((dd) => {
			if ((dd !== undefined) && (dd !== null)) {
				let n: number = dd.length;
				for (let i = 0; i < n; ++i) {
					oRet.push(this.itemFactory.create_departement(dd[i]));
				}
			}
			this.sort_array(oRet);
			return oRet;
		}).catch((ee) => {
			return oRet;
		});
	}//get_departements
	//
	public remove_item(p: IBaseItem): Promise<boolean> {
		let oRet: boolean = false;
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((p === undefined) || (p === null)) {
			return Promise.resolve(false);
		}
		p.check_id();
		let id: string = p.id;
		if ((id === undefined) || (id === null)) {
			return Promise.resolve(oRet);
		}
		id = id.trim();
		if (id.length < 1) {
			return Promise.resolve(oRet);
		}
		let oMap: any = {};
		p.to_map(oMap);
		let man = this.service;
		return this.service.remove_doc({ _id: id }).then((r: PouchUpdateResponse) => {
			if ((r !== undefined) && (r !== null)) {
				oRet = r.ok;
			}
			return oRet;
		}).catch((ee) => {
			return oRet;
		});
	}// remove_item
	//
	public save_item(p: IBaseItem): Promise<boolean> {
		let oRet: boolean = false;
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((p === undefined) || (p === null)) {
			return Promise.resolve(false);
		}
		p.check_id();
		if (!p.is_storeable()) {
			return Promise.resolve(oRet);
		}
		let id: string = p.id;
		if ((id === undefined) || (id === null)) {
			return Promise.resolve(oRet);
		}
		id = id.trim();
		if (id.length < 1) {
			return Promise.resolve(oRet);
		}
		let oMap: any = {};
		p.to_map(oMap);
		let man = this.service;
		return this.service.exists_doc(id).then((srev) => {
			if ((srev !== undefined) && (srev !== null) && (srev.length > 0)) {
				oMap._rev = srev;
				return man.update_doc(oMap);
			} else {
				return man.insert_doc(oMap);
			}
		}).then((r: PouchUpdateResponse) => {
			if ((r !== undefined) && (r !== null)) {
				oRet = r.ok;
			}
			return oRet;
		}).catch((ee) => {
			return oRet;
		});
	}// save_item
	public save_personitem(p: IPersonItem) : Promise<boolean>{
		let oRet: boolean = false;
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((p === undefined) || (p === null)) {
			return Promise.resolve(false);
		}
		let nPersonId:string = p.personid;
		if ((nPersonId === undefined)|| (nPersonId === null)){
			return Promise.resolve(false);
		}
		let pPers:IPerson = null;
		return this.find_item_by_id(nPersonId).then((px:IPerson)=>{
			pPers = (px !== undefined) ? px : null;
			let b:boolean = p.check_person(pPers);
			if (pPers !== null){
				p.personid = pPers.id;
			}
			if ((pPers !== null) && (pPers.avatarid !== null)){
				p.avatarid = pPers.avatarid;
			}
			if (b){
				return this.save_item(pPers);
			} else {
				return Promise.resolve(true);
			}
		}).then((bx)=>{
			return this.save_item(p);
		}).catch((ex)=>{
			return false;
		});
	}//save_personitem
	//
	public maintains_items(pp: IBaseItem[], bDelete?: boolean): Promise<boolean[]> {
		let oRet: boolean[] = [];
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((pp === undefined) || (pp === null)) {
			return Promise.resolve(oRet);
		}
		let n: number = pp.length;
		if (n < 1) {
			return Promise.resolve(oRet);
		}
		let oAr: Promise<boolean>[] = [];
		for (let i = 0; i < n; ++i) {
			oAr.push(this.save_item(pp[i]));
		}// i
		return Promise.all(oAr).then((bb) => {
			if ((bb !== undefined) && (bb !== null)) {
				oRet = bb;
			}
			return oRet;
		}).catch((err) => {
			return oRet;
		});
	}// maintains_items
	//
	public maintains_personitems(pp: IPersonItem[]): Promise<boolean[]> {
		let oRet: boolean[] = [];
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((pp === undefined) || (pp === null)) {
			return Promise.resolve(oRet);
		}
		let n: number = pp.length;
		if (n < 1) {
			return Promise.resolve(oRet);
		}
		let oAr: Promise<boolean>[] = [];
		for (let i = 0; i < n; ++i) {
			oAr.push(this.save_personitem(pp[i]));
		}// i
		return Promise.all(oAr).then((bb) => {
			if ((bb !== undefined) && (bb !== null)) {
				oRet = bb;
			}
			return oRet;
		}).catch((err) => {
			return oRet;
		});
	}// maintains_personitems
	//
	public get_ids(startkey: string, endkey?: string): Promise<string[]> {
		let oRet: string[] = [];
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((startkey === undefined) || (startkey === null)) {
			return Promise.resolve(oRet);
		}
		let start = startkey.trim();
		if (start.length < 1) {
			return Promise.resolve(oRet);
		}
		let end: string = ((endkey !== undefined) && (endkey !== null) && (endkey.length > 0)) ? endkey : (start + "\uffff");
		return this.service.docs_ids_range(start, end).then((dd) => {
			if ((dd !== undefined) && (dd !== null)) {
				oRet = dd;
			}
			return oRet;
		}).catch((err) => {
			return oRet;
		});
	}// get_ids
	//
	public get_items_range(startkey: string, endkey: string, skip?: number, limit?: number): Promise<IBaseItem[]> {
		let oRet: IBaseItem[] = [];
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((startkey === undefined) || (startkey === null) || (endkey === undefined) || (endkey === null)) {
			return Promise.resolve(oRet);
		}
		let fact = this.itemFactory;
		return this.service.docs_read_range(startkey, endkey, skip, limit).then((docs) => {
			if ((docs !== undefined) && (docs !== null)) {
				let n = docs.length;
				for (let i = 0; i < n; ++i) {
					let p = fact.create_item(docs[i]);
					if ((p !== undefined) && (p !== null)) {
						oRet.push(p);
					}
				}// i
			}// docs
			this.sort_array(oRet);
			return oRet;
		}).catch((err) => {
			return oRet;
		});
	}// get_items_range
	public get_items_all(startkey: string, endkey: string): Promise<IBaseItem[]> {
		let oRet: IBaseItem[] = [];
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((startkey === undefined) || (startkey === null) || (endkey === undefined) || (endkey === null)) {
			return Promise.resolve(oRet);
		}
		let fact = this.itemFactory;
		return this.service.docs_read_range(startkey, endkey).then((docs) => {
			if ((docs !== undefined) && (docs !== null)) {
				let n = docs.length;
				for (let i = 0; i < n; ++i) {
					let p = fact.create_item(docs[i]);
					if ((p !== undefined) && (p !== null)) {
						oRet.push(p);
					}
				}// i
			}// docs
			this.sort_array(oRet);
			return oRet;
		}).catch((err) => {
			return oRet;
		});
	}// get_items_all
	//
	public get_items_array(ids: string[]): Promise<IBaseItem[]> {
		let oRet: IBaseItem[] = [];
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((ids === undefined) || (ids === null)) {
			return Promise.resolve(oRet);
		}
		let fact = this.itemFactory;
		return this.service.docs_array(ids).then((docs) => {
			if ((docs !== undefined) && (docs !== null)) {
				let n = docs.length;
				for (let i = 0; i < n; ++i) {
					let p = fact.create_item(docs[i]);
					if ((p !== undefined) && (p !== null)) {
						oRet.push(p);
					}
				}// i
			}// docs
			this.sort_array(oRet);
			return oRet;
		}).catch((err) => {
			return oRet;
		});
	}// get_items_array
	//
	public remove_all_items(startkey: string, endkey: string): Promise<boolean> {
		let oRet: boolean = false;
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((startkey === undefined) || (startkey === null) || (endkey === undefined) || (endkey === null)) {
			return Promise.resolve(oRet);
		}
		return this.service.remove_all_items(startkey, endkey).then((b) => {
			if ((b !== undefined) && (b !== null)) {
				oRet = true;
			}
			return oRet;
		}).catch((err) => {
			return oRet;
		});
	}//remove_all_items
	//
	public load_item(p: IBaseItem): Promise<boolean> {
		let oRet: boolean = false;
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((p === undefined) || (p === null)) {
			return Promise.resolve(false);
		}
		let id: string = p.id;
		if ((id === undefined) || (id === null)) {
			return Promise.resolve(oRet);
		}
		id = id.trim();
		if (id.length < 1) {
			return Promise.resolve(oRet);
		}
		return this.service.read_doc(id, true).then((doc) => {
			if ((doc !== undefined) && (doc !== null) && (doc._id !== undefined) &&
				(doc._rev !== undefined) && (doc._id == id)) {
				p.from_map(doc);
				oRet = true;
			}
			return oRet;
		}).catch((ee) => {
			return oRet;
		});
	}// load_item
	//
	public isOnline(): Promise<boolean> {
		let oRet: boolean = false;
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		return this.service.isOnline().then((b) => {
			if ((b !== undefined) && (b !== null)) {
				oRet = b;
			}
			return oRet;
		}).catch((ee) => {
			return oRet;
		});
	}// isOnline
	//
	public find_attachment(docid: string, attachmentId: string): Promise<Blob> {
		let oRet: Blob = null;
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((docid === undefined) || (docid === null) || (attachmentId === undefined) ||
			(attachmentId === null)) {
			return Promise.resolve(oRet);
		}
		if ((docid.trim().length < 1) || (attachmentId.trim().length < 1)) {
			return Promise.resolve(oRet);
		}
		return this.service.find_attachment(docid, attachmentId).then((b) => {
			if ((b !== undefined) && (b !== null)) {
				oRet = b;
			}
			return oRet;
		}).catch((ee) => {
			return oRet;
		});
	}// find_attachment
	//
	public maintains_attachment(docid: string, attachmentId: string,
		attachmentData: Blob, attachmentType: string): Promise<boolean> {
		let oRet: boolean = null;
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		return this.service.maintains_attachment(docid, attachmentId, attachmentData, attachmentType).then((r: PouchUpdateResponse) => {
			oRet = (r !== undefined) && (r !== null) && (r.ok == true);
			return oRet;
		}).catch((ee) => {
			return oRet;
		});
	}// maintains_attachment
	public remove_attachment(docid: string, attachmentId: string): Promise<boolean> {
		let oRet: boolean = null;
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		return this.service.remove_attachment(docid, attachmentId).then((r: PouchUpdateResponse) => {
			oRet = (r !== undefined) && (r !== null) && (r.ok == true);
			return oRet;
		}).catch((ee) => {
			return oRet;
		});
	}//remove_attachment
	//
	public find_item_by_id(id:string) : Promise<IBaseItem>{
		let oRet:IBaseItem = null;
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((id === undefined) || (id === null)){
			return Promise.resolve(oRet);
		}
		let sid = id.trim();
		if (sid.length < 1){
			return Promise.resolve(oRet);
		}
		return this.service.read_doc(sid).then((doc)=>{
			oRet = this.itemFactory.create_item(doc);
			return oRet;
		}).catch((ee) => {
			return oRet;
		});
	}//find_item_by_id
	//
	public exists_item(id: string): Promise<string> {
		let oRet: string = null;
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		return this.service.exists_doc(id).then((b) => {
			oRet = (b !== undefined) ? b : null;
			return oRet;
		}).catch((ee) => {
			return oRet;
		});
	}// exists_item
	//
	public get_groupe_departement(e: IGroupe): Promise<IDepartement> {
		let oRet: IDepartement = null;
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((e === undefined) || (e === null)) {
			return Promise.resolve(oRet);
		}
		let id: string = e.departementid
		if ((id === undefined) || (id === null)) {
			return Promise.resolve(oRet);
		}
		id = id.trim();
		if (id.length < 1) {
			return Promise.resolve(oRet);
		}
		return this.service.read_doc(id, true).then((doc) => {
			if ((doc !== undefined) && (doc !== null) && (doc._id !== undefined) &&
				(doc._rev !== undefined) && (doc._id == id)) {
				oRet = this.itemFactory.create_departement(doc);
			}
			return oRet;
		}).catch((ee) => {
			return oRet;
		});
	}//get_groupe_departement
	//
	public get_unite_departement(e: IUnite): Promise<IDepartement> {
		let oRet: IDepartement = null;
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((e === undefined) || (e === null)) {
			return Promise.resolve(oRet);
		}
		let id: string = e.departementid;
		if ((id === undefined) || (id === null)) {
			return Promise.resolve(oRet);
		}
		id = id.trim();
		if (id.length < 1) {
			return Promise.resolve(oRet);
		}
		return this.service.read_doc(id, true).then((doc) => {
			if ((doc !== undefined) && (doc !== null) && (doc._id !== undefined) &&
				(doc._rev !== undefined) && (doc._id == id)) {
				oRet = this.itemFactory.create_departement(doc);
			}
			return oRet;
		}).catch((ee) => {
			return oRet;
		});
	}//get_unite_departement
	//
	public get_annee_departement(e: IAnnee): Promise<IDepartement> {
		let oRet: IDepartement = null;
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((e === undefined) || (e === null)) {
			return Promise.resolve(oRet);
		}
		let id: string = e.departementid;
		if ((id === undefined) || (id === null)) {
			return Promise.resolve(oRet);
		}
		id = id.trim();
		if (id.length < 1) {
			return Promise.resolve(oRet);
		}
		return this.service.read_doc(id, true).then((doc) => {
			if ((doc !== undefined) && (doc !== null) && (doc._id !== undefined) &&
				(doc._rev !== undefined) && (doc._id == id)) {
				oRet = this.itemFactory.create_departement(doc);
			}
			return oRet;
		}).catch((ee) => {
			return oRet;
		});
	}//get_annee_departement
	//
	public get_semestre_annee(e: ISemestre): Promise<IAnnee> {
		let oRet: IAnnee = null;
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((e === undefined) || (e === null)) {
			return Promise.resolve(oRet);
		}
		let id: string = e.anneeid;
		if ((id === undefined) || (id === null)) {
			return Promise.resolve(oRet);
		}
		id = id.trim();
		if (id.length < 1) {
			return Promise.resolve(oRet);
		}
		return this.service.read_doc(id, true).then((doc) => {
			if ((doc !== undefined) && (doc !== null) && (doc._id !== undefined) &&
				(doc._rev !== undefined) && (doc._id == id)) {
				oRet = this.itemFactory.create_annee(doc);
			}
			return oRet;
		}).catch((ee) => {
			return oRet;
		});
	}//get_semestre_annee
	//
	public get_matiere_unite(e: IMatiere): Promise<IUnite> {
		let oRet: IUnite = null;
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((e === undefined) || (e === null)) {
			return Promise.resolve(oRet);
		}
		let id: string = e.uniteid;
		if ((id === undefined) || (id === null)) {
			return Promise.resolve(oRet);
		}
		id = id.trim();
		if (id.length < 1) {
			return Promise.resolve(oRet);
		}
		return this.service.read_doc(id, true).then((doc) => {
			if ((doc !== undefined) && (doc !== null) && (doc._id !== undefined) &&
				(doc._rev !== undefined) && (doc._id == id)) {
				oRet = this.itemFactory.create_unite(doc);
			}
			return oRet;
		}).catch((ee) => {
			return oRet;
		});
	}//get_matiere_unite
	//
	public get_affectation_groupe(e: IAffectation): Promise<IGroupe> {
		let oRet: IGroupe = null;
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((e === undefined) || (e === null)) {
			return Promise.resolve(oRet);
		}
		let id: string = e.groupeid;
		if ((id === undefined) || (id === null)) {
			return Promise.resolve(oRet);
		}
		id = id.trim();
		if (id.length < 1) {
			return Promise.resolve(oRet);
		}
		return this.service.read_doc(id, true).then((doc) => {
			if ((doc !== undefined) && (doc !== null) && (doc._id !== undefined) &&
				(doc._rev !== undefined) && (doc._id == id)) {
				oRet = this.itemFactory.create_groupe(doc);
			}
			return oRet;
		}).catch((ee) => {
			return oRet;
		});
	}//get_affectation_groupe
	//
	public get_affectation_semestre(e: IAffectation): Promise<ISemestre> {
		let oRet: ISemestre = null;
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((e === undefined) || (e === null)) {
			return Promise.resolve(oRet);
		}
		let id: string = e.semestreid;
		if ((id === undefined) || (id === null)) {
			return Promise.resolve(oRet);
		}
		id = id.trim();
		if (id.length < 1) {
			return Promise.resolve(oRet);
		}
		return this.service.read_doc(id, true).then((doc) => {
			if ((doc !== undefined) && (doc !== null) && (doc._id !== undefined) &&
				(doc._rev !== undefined) && (doc._id == id)) {
				oRet = this.itemFactory.create_semestre(doc);
			}
			return oRet;
		}).catch((ee) => {
			return oRet;
		});
	}//get_affectation_semestre
	//
	public get_etudaffectation_etudiant(e: IEtudiantAffectation): Promise<IEtudiant> {
		let oRet: IEtudiant = null;
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((e === undefined) || (e === null)) {
			return Promise.resolve(oRet);
		}
		let id: string = e.etudiantid;
		if ((id === undefined) || (id === null)) {
			return Promise.resolve(oRet);
		}
		id = id.trim();
		if (id.length < 1) {
			return Promise.resolve(oRet);
		}
		return this.service.read_doc(id, true).then((doc) => {
			if ((doc !== undefined) && (doc !== null) && (doc._id !== undefined) &&
				(doc._rev !== undefined) && (doc._id == id)) {
				oRet = this.itemFactory.create_etudiant(doc);
			}
			return oRet;
		}).catch((ee) => {
			return oRet;
		});
	}//get_etudaffectation_etudiant
	//
	public get_profaffectation_enseignant(e: IEnseignantAffectation): Promise<IEnseignant> {
		let oRet: IEnseignant = null;
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((e === undefined) || (e === null)) {
			return Promise.resolve(oRet);
		}
		let id: string = e.enseignantid;
		if ((id === undefined) || (id === null)) {
			return Promise.resolve(oRet);
		}
		id = id.trim();
		if (id.length < 1) {
			return Promise.resolve(oRet);
		}
		return this.service.read_doc(id, true).then((doc) => {
			if ((doc !== undefined) && (doc !== null) && (doc._id !== undefined) &&
				(doc._rev !== undefined) && (doc._id == id)) {
				oRet = this.itemFactory.create_enseignant(doc);
			}
			return oRet;
		}).catch((ee) => {
			return oRet;
		});
	}//get_profaffectation_enseignant
	//
	public get_profaffectation_matiere(e: IEnseignantAffectation): Promise<IMatiere> {
		let oRet: IMatiere = null;
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((e === undefined) || (e === null)) {
			return Promise.resolve(oRet);
		}
		let id: string = e.matiereid;
		if ((id === undefined) || (id === null)) {
			return Promise.resolve(oRet);
		}
		id = id.trim();
		if (id.length < 1) {
			return Promise.resolve(oRet);
		}
		return this.service.read_doc(id, true).then((doc) => {
			if ((doc !== undefined) && (doc !== null) && (doc._id !== undefined) &&
				(doc._rev !== undefined) && (doc._id == id)) {
				oRet = this.itemFactory.create_matiere(doc);
			}
			return oRet;
		}).catch((ee) => {
			return oRet;
		});
	}//get_profaffectation_matiere
	//
	public get_groupeevent_profaffectation(e: IGroupeEvent): Promise<IEnseignantAffectation> {
		let oRet: IEnseignantAffectation = null;
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((e === undefined) || (e === null)) {
			return Promise.resolve(oRet);
		}
		let id: string = e.profaffectationid;
		if ((id === undefined) || (id === null)) {
			return Promise.resolve(oRet);
		}
		id = id.trim();
		if (id.length < 1) {
			return Promise.resolve(oRet);
		}
		return this.service.read_doc(id, true).then((doc) => {
			if ((doc !== undefined) && (doc !== null) && (doc._id !== undefined) &&
				(doc._rev !== undefined) && (doc._id == id)) {
				oRet = this.itemFactory.create_enseignantaffectation(doc);
			}
			return oRet;
		}).catch((ee) => {
			return oRet;
		});
	}//get_groupeevent_profaffectation
	//
	public get_etudiantevent_groupeevent(e: IEtudiantEvent): Promise<IGroupeEvent> {
		let oRet: IGroupeEvent = null;
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((e === undefined) || (e === null)) {
			return Promise.resolve(oRet);
		}
		let id: string = e.groupeeventid;
		if ((id === undefined) || (id === null)) {
			return Promise.resolve(oRet);
		}
		id = id.trim();
		if (id.length < 1) {
			return Promise.resolve(oRet);
		}
		return this.service.read_doc(id, true).then((doc) => {
			if ((doc !== undefined) && (doc !== null) && (doc._id !== undefined) &&
				(doc._rev !== undefined) && (doc._id == id)) {
				oRet = this.itemFactory.create_groupeevent(doc);
			}
			return oRet;
		}).catch((ee) => {
			return oRet;
		});
	}//get_etudiantevent_groupeevent
	//
	public get_etudiantevent_etudaffectation(e: IEtudiantEvent): Promise<IEtudiantAffectation> {
		let oRet: IEtudiantAffectation = null;
		if (!this.is_valid) {
			return Promise.resolve(oRet);
		}
		if ((e === undefined) || (e === null)) {
			return Promise.resolve(oRet);
		}
		let id: string = e.etudiantaffectationid;
		if ((id === undefined) || (id === null)) {
			return Promise.resolve(oRet);
		}
		id = id.trim();
		if (id.length < 1) {
			return Promise.resolve(oRet);
		}
		return this.service.read_doc(id, true).then((doc) => {
			if ((doc !== undefined) && (doc !== null) && (doc._id !== undefined) &&
				(doc._rev !== undefined) && (doc._id == id)) {
				oRet = this.itemFactory.create_etudiantaffectation(doc);
			}
			return oRet;
		}).catch((ee) => {
			return oRet;
		});
	}//get_etudiantevent_etudaffectation
	//
	public query_items(xtype:string,selector?:any,skip?:number,limit?:number) : Promise<IBaseItem[]>{
		let oRet:IBaseItem[] = [];
		if ((xtype === undefined)|| (xtype === null)){
			return Promise.resolve(oRet);
		}
		if (xtype.trim().length < 1){
			return Promise.resolve(oRet);
		}
		let xsel:any = {type: xtype};
		if ((selector !== undefined) && (selector !== null)){
			for  (let key in selector){
				let skey = key.toString();
				if ((skey != "type") && (skey != "_id") && (skey != "_rev") && (skey != "_deleted") && (skey != "_attachments")){
					let val = selector[key];
					if ((val !== undefined) && (val !== null)) {
						if (val.toString().length > 0){
					xsel[key] = val;
						}
					}
				}// skey
			}// key
		}
		return this.service.find_docs(xsel,null,skip,limit).then((dd)=>{
			if ((dd !== undefined) && (dd !== null)){
				for (let doc of dd){
					let item = this.itemFactory.create_item(doc);
					if (item !== null){
						oRet.push(item);
					}
				}// doc
			}// dd
			this.sort_array(oRet);
			return oRet;
		}).catch((e)=>{
			return oRet;
		});
	}// query_items
	public query_by_template(temp:IBaseItem,skip?:number,limit?:number) : Promise<IBaseItem[]>{
		let oRet:IBaseItem[] = [];
		if ((temp === undefined)|| (temp === null)){
			return Promise.resolve(oRet);
		}
		let xtype:string = temp.type();
		if (xtype.trim().length < 1){
			return Promise.resolve(oRet);
		}
		let xsel:any = {};
		temp.to_map(xsel);
		return this.query_items(xtype,xsel,skip,limit);
	}// query_by_template
	//
	public query_ids(selector?:any,skip?:number, limit?:number) : Promise<string[]>{
		let oRet:string[] = [];
		if ((selector === undefined)|| (selector === null)){
			return Promise.resolve(oRet);
		}
		return this.service.find_docs(selector,["_id"],skip,limit).then((dd)=>{
			if ((dd !== undefined) && (dd !== null)){
				for (let doc of dd){
					if ((doc._id !== undefined) && (doc._id !== null)){
						oRet.push(doc._id);
					}
				}// doc
			}// dd
			return oRet;
		}).catch((e)=>{
			return oRet;
		});
	}// query_items
	//
}// class DataService
