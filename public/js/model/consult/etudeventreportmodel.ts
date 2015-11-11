//etudeventreportmodel.ts
//
import {UserInfo} from '../userinfo';
import {SemestreReportBase} from './semestrereportmodel';
import {DisplayEtudiant, DisplayEtudiantsArray} from '../../data/displayetudiant';
import {IDisplayEtudiant, IEtudiantEvent} from 'infodata';
import {EVT_NOTE} from '../../infoconstants';
//
export class EtudEventReportModel extends SemestreReportBase {
    //
    constructor(info: UserInfo) {
        super(info);
        this.title = 'Evènements Semestres';
    }// constructor

    protected get_initial_events(): Promise<IEtudiantEvent[]> {
		let oRet: IEtudiantEvent[] = [];
        return this.dataService.get_semestre_etudevents(this.semestre).then((ee) => {
			if ((ee !== undefined) && (ee !== null)) {
				for (let p of ee) {
					if (p.genre != EVT_NOTE) {
						oRet.push(p);
					}
				}//p
			}// ee
			return oRet;
		});
    }
    protected transform_data(pp: IEtudiantEvent[]): Promise<IDisplayEtudiant[]> {
		let nPers: string = null;
		if (this.is_etud) {
			nPers = this.personid;
		}
        let oRet: IDisplayEtudiant[] = [];
        if ((pp !== undefined) && (pp !== null)) {
            let grp: DisplayEtudiantsArray = new DisplayEtudiantsArray();
            for (let p of pp) {
				if (nPers == null) {
					grp.add_event(p);
				} else if (p.personid == nPers) {
					grp.add_event(p);
				}
            }
            oRet = grp.get_sorted_etudiantdisplays();
        }// pp
        return Promise.resolve(oRet);
    }// transformData

}// class BaseEditViewModel
