//etudiantsumarymodel.ts
//
import {UserInfo} from '../userinfo';
import {BaseDetailModel} from './basedetailmodel';
import {IMenuDesc, IPerson, IEtudiantEvent, IUIManager, IBaseItem, IEtudiant} from 'infodata';
import {EtudiantNotesSummary} from '../../data/notesumary';
import {EtudiantEventsSummary} from '../../data/eventsumary';
import {SummaryItem, SummaryItemMap} from '../../data/sumaryitem';
import {EVT_NOTE} from '../../infoconstants';
import {InfoRoot} from '../../inforoot';
//
export class EtudiantSumaryModel extends BaseDetailModel {
    //
    public currentPerson: IPerson = null;
    private _evts: IEtudiantEvent[] = [];
    public etudiantUrl: string = null;
    public birthDate: string = null;
	private _notesSum: EtudiantNotesSummary;
	private _evtsSum: EtudiantEventsSummary;
	//
	public infoMode: boolean = true;
	public noteMode: boolean = false;
	public evtMode: boolean = false;
	//
	private _xannees: IMenuDesc[];
	private _xsemestres: IMenuDesc[];
	private _xannee: IMenuDesc;
	private _xsemestre: IMenuDesc;
	public etudiant: IEtudiant = null;
    //
    constructor(userinfo: UserInfo) {
        super(userinfo);
        this.title = "Détails Etudiant";
    }
    public get current_etudiantid(): string {
		return (this.currentPerson !== null) ? this.currentPerson.id : '';
    }
	private get notesSum(): EtudiantNotesSummary {
		return (this._notesSum !== undefined) ? this._notesSum : null;
	}
	private get evtsSum(): EtudiantEventsSummary {
		return (this._evtsSum !== undefined) ? this._evtsSum : null;
	}
	public get xannees(): IMenuDesc[] {
		return ((this._xannees !== undefined) && (this._xannees !== null)) ? this._xannees : [];
	}
	public get xannee(): IMenuDesc {
		return (this._xannee !== undefined) ? this._xannee : null;
	}
	public set xannee(s: IMenuDesc) {
		this._xannee = (s !== undefined) ? s : null;
		this._xsemestres = [];
		this._xsemestre = null;
		if ((this._notesSum !== undefined) && (this._notesSum !== null)) {
			this._notesSum.currentAnnee = this._xannee;
			for (let x of this._notesSum.semestresMenu) {
				this._xsemestres.push(x);
			}
		}
		if ((this._evtsSum !== undefined) && (this._xsemestres !== null)) {
			this._evtsSum.currentAnnee = this._xannee;
			for (let x of this._evtsSum.semestresMenu) {
				let bFound: boolean = false;
				let id = x.id;
				for (let y of this._xsemestres) {
					if (y.id == id) {
						bFound = true;
						break;
					}
				}
				if (!bFound) {
					this._xsemestres.push(x);
				}
			}// x
		}
		if (this._xsemestres.length > 0) {
			this.xsemestre = this._xsemestres[0];
		}
	}
	public get xsemestres(): IMenuDesc[] {
		return ((this._xsemestres !== undefined) && (this._xsemestres !== null)) ? this._xsemestres : [];
	}
	public get xsemestre(): IMenuDesc {
		return (this._xsemestre !== undefined) ? this._xsemestre : null;
	}
	public set xsemestre(s: IMenuDesc) {
		this._xsemestre = (s !== undefined) ? s : null;
		if ((this._notesSum !== undefined) && (this._notesSum !== null)) {
			this._notesSum.currentSemestre = this._xsemestre;
		}
		if ((this._evtsSum !== undefined) && (this._evtsSum !== null)) {
			this._evtsSum.currentSemestre = this._xsemestre;
		}
	}
	public get devoirsNotes(): SummaryItem[] {
		return (this.notesSum !== null) ? this.notesSum.devoirsNotes : [];
	}
	public get has_devoirsNotes(): boolean {
		return (this.devoirsNotes.length > 0);
	}
	public get matieresNotes(): SummaryItem[] {
		return (this.notesSum !== null) ? this.notesSum.matieresNotes : [];
	}
	public get has_matieresNotes(): boolean {
		return (this.matieresNotes.length > 0);
	}
	public get unitesNotes(): SummaryItem[] {
		return (this.notesSum !== null) ? this.notesSum.unitesNotes : [];
	}
	public get has_unitesNotes(): boolean {
		return (this.unitesNotes.length > 0);
	}
	public get totalNotes(): SummaryItem[] {
		return (this.notesSum !== null) ? this.notesSum.totalNotes : [];
	}
	public get has_totalNotes(): boolean {
		return (this.totalNotes.length > 0);
	}
	public get allEvts(): IEtudiantEvent[] {
		return (this.evtsSum !== null) ? this.evtsSum.allEvts : [];
	}
	public get has_allEvts(): boolean {
		return (this.allEvts.length > 0);
	}
	public get sumEvts(): SummaryItem[] {
		return (this.evtsSum !== null) ? this.evtsSum.sumEvts : [];
	}
	public get has_sumEvts(): boolean {
		return (this.sumEvts.length > 0);
	}
	public get canInfoMode(): boolean {
		return (!this.infoMode) && (this.currentPerson !== null);
	}
	public get canNoteMode(): boolean {
		return (!this.noteMode) && this.has_devoirsNotes;
	}
	public get canEvtMode(): boolean {
		return (!this.evtMode) && this.has_allEvts;
	}
	public get canChoose(): boolean {
		return (this.has_allEvts || this.has_devoirsNotes);
	}
	public set_info(): void {
		this.infoMode = true;
		this.evtMode = false;
		this.noteMode = false;
	}
	public set_note(): void {
		this.infoMode = false;
		this.evtMode = false;
		this.noteMode = true;
	}
	public set_evts(): void {
		this.infoMode = false;
		this.evtMode = true;
		this.noteMode = false;
	}
    public activate(params?: any, config?: any, instruction?: any): any {
        let self = this;
        this.currentPerson = this.itemFactory.create_person();
        this.birthDate = null;
        this._evts = [];
        this.etudiantUrl = null;
        let service = this.dataService;
        let pPers: IPerson = null;
        let xvts: IEtudiantEvent[] = [];
        let xBlob: Blob = null;
		this.etudiant = null;
		return super.perform_activate().then((x) => {
			let id = (params.id !== undefined) ? params.id : null;
            if (id !== null) {
                return service.find_item_by_id(id);
            } else {
                return Promise.resolve(null);
            }
        }).then((pEtud: IEtudiant) => {
			this.etudiant = (pEtud !== undefined) ? pEtud : null;
			let id = (this.etudiant !== null) ? this.etudiant.personid : null;
			return service.find_item_by_id(id);
		}).then((p: IPerson) => {
			return this.retrieve_one_avatar(p);
		}).then((px:IPerson)=>{
            if ((px !== undefined) && (px !== null)) {
				self.etudiantUrl = px.url;
                self.currentPerson = px;
                self.birthDate = InfoRoot.date_to_string(px.birthDate);
                self.title = px.fullname;
                return service.get_etudiant_events(self.etudiant);
            } else {
                return Promise.resolve(xvts);
            }
        }).then((xx: IEtudiantEvent[]) => {
            self._evts = xx;
            let x = self.currentPerson;
            if ((x.id !== null) && (x.avatarid !== null)) {
                return service.find_attachment(x.id, x.avatarid);
            } else {
                return Promise.resolve(xBlob);
            }
        }).then((blob) => {
            if ((blob !== undefined) && (blob !== null)) {
                self.etudiantUrl = self.createUrl(blob);
            }
			self._notesSum = new EtudiantNotesSummary();
			self._evtsSum = new EtudiantEventsSummary();
			for (let x of self._evts) {
				if (x.genre == EVT_NOTE) {
					self._notesSum.add_event(x);
				} else {
					self._evtsSum.add_event(x);
				}
			}// x
			self._notesSum.end_processing();
			self._xannees = [];
			for (let y of self._notesSum.anneesMenu) {
				self._xannees.push(y);
			}
			for (let xx of self._evtsSum.semestresMenu) {
				let bFound: boolean = false;
				let id = xx.id;
				for (let yy of this._xannees) {
					if (yy.id == id) {
						bFound = true;
						break;
					}
				}
				if (!bFound) {
					this._xannees.push(xx);
				}
			}// x
			if (self._xannees.length > 0) {
				self.xannee = self._xannees[0];
			}
			return true;
		});
	}// activate
    public deactivate(): any {
		if (this.etudiantUrl !== null) {
			this.revokeUrl(this.etudiantUrl);
			this.etudiantUrl = null;
		}
		return super.deactivate();
	}
    public get hasEtudiantUrl(): boolean {
		return (this.etudiantUrl !== null);
	}
    public set hasEtudiantUrl(s: boolean) { }
    public get fullname(): string {
		return this.currentPerson.fullname;
	}
    public set fullname(s: string) { }
    public get username(): string {
		return this.currentPerson.username;
	}
    public set username(s: string) {
	}
    public get firstname(): string {
		return this.currentPerson.firstname;
	}
    public set firstname(s: string) {
	}
    public get lastname(): string {
		return this.currentPerson.lastname;
	}
    public set lastname(s: string) {
	}
    public get email(): string {
		return this.currentPerson.email;
	}
    public set email(s: string) {
	}
    public get phone(): string {
		return this.currentPerson.phone;
	}
    public set phone(s: string) {
	}
    public get dossier(): string {
		return this.currentPerson.dossier;
	}
    public set dossier(s: string) {
	}
    public get sexe(): string {
		return this.currentPerson.sexe;
	}
    public set sexe(s: string) {
	}
    public get ville(): string {
		return this.currentPerson.ville;
	}
    public set ville(s: string) {
	}
    public get etablissement(): string {
		return this.currentPerson.etablissement;
	}
    public set etablissement(s: string) {
	}
    public get serieBac(): string {
		return this.currentPerson.serieBac;
	}
    public set serieBac(s: string) {
	}
    public get optionBac(): string {
		return this.currentPerson.optionBac;
	}
    public set optionBac(s: string) {
	}
    public get mentionBac(): string {
		return this.currentPerson.mentionBac;
	}
    public set mentionBac(s: string) {
	}
    public get etudesSuperieures(): string {
		return this.currentPerson.etudesSuperieures;
	}
    public set etudesSuperieures(s: string) {
	}
}// class EtudDetail
