//noteslistmodel.ts
//
import {UserInfo} from '../userinfo';
import {BaseConsultViewModel} from '../baseconsultmodel';
import {DisplayEtudiant, DisplayEtudiantsArray} from '../../data/displayetudiant';
import {IDisplayEtudiant, IEtudiantEvent} from 'infodata';
import {EVT_NOTE} from '../../infoconstants';
//
export class NoteListModel extends BaseConsultViewModel<IDisplayEtudiant> {
    //
    private _all_data: IDisplayEtudiant[] = [];
    //
    constructor(userinfo: UserInfo) {
        super(userinfo);
        this.title = 'Notes Semestres';
    }// constructor
    protected post_change_semestre(): Promise<any> {
        return this.refreshAll();
    }
    protected post_change_matiere(): Promise<any> {
        return this.refreshAll();
    }
    protected is_refresh(): boolean {
        return (this.semestre !== null) && (this.matiere !== null);
    }
    protected prepare_refresh(): void {
        super.prepare_refresh();
        this._all_data = [];
    }
    private transform_data(pp: IEtudiantEvent[]): Promise<IDisplayEtudiant[]> {
		let nPers: string = null;
		if (this.is_etud) {
			nPers = this.personid;
		}
        let oRet: IDisplayEtudiant[] = [];
        if ((pp !== undefined) && (pp !== null)) {
            let grp: DisplayEtudiantsArray = new DisplayEtudiantsArray();
            //let ppx = this.filter_etudevents(pp);
            for (let p of pp) {
				if (p.genre == EVT_NOTE) {
					if (nPers == null) {
						grp.add_event(p);
					} else if (p.personid == nPers) {
						grp.add_event(p);
					}
				}// note
            }
            oRet = grp.get_etudiantdisplays();
        }// pp
        return Promise.resolve(oRet);
    }// transformData
    public refreshAll(): Promise<any> {
        this.prepare_refresh();
        if (!this.is_refresh()) {
            return Promise.resolve(true);
        }
        let nc = this.itemsPerPage;
        let self = this;
        return this.dataService.get_semestre_matiere_etudevents(this.semestre, this.matiere).then((pp: IEtudiantEvent[]) => {
            return self.transform_data(pp);
        }).then((zz: IDisplayEtudiant[]) => {
            self._all_data = zz;
            let nt = self._all_data.length;
            let np = Math.floor(nt / nc);
            if ((np * nc) < nt) {
                ++np;
                self.pagesCount = np;
            }
            return self.refresh();
        });
        return Promise.resolve(true);
    }// refreshAll
    public refresh(): Promise<any> {
        this.clear_error();
        this.items = [];
        if (!this.is_refresh()) {
            return Promise.resolve(true);
        }
        let nbItems = this._all_data.length;
        let nc = this.itemsPerPage;
        let istart = (this.currentPage - 1) * nc;
        if ((istart < 0) && (istart >= nbItems)) {
            return Promise.resolve(true);
        }
        let iend = istart + nc - 1;
        if (iend >= nbItems) {
            iend = nbItems - 1;
        }
        if ((iend < 0) && (iend >= nbItems)) {
            return Promise.resolve(true);
        }
        let oRet: IDisplayEtudiant[] = [];
        let i = istart;
        while (i <= iend) {
            let p = this._all_data[i++];
            oRet.push(p);
        }// i
        let self = this;
        return this.retrieve_avatars(oRet).then((pp: IDisplayEtudiant[]) => {
            self.items = pp;
            return true;
        })
    }// refresh
}// class BaseEditViewModel
