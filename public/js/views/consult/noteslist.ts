import {NoteListModel} from '../../model/consult/noteslistmodel';
import {InfoUserInfo} from '../infouserinfo';
//
export class NoteList extends NoteListModel {
	//
	static inject() { return [InfoUserInfo]; }
    //
    constructor(userinfo: InfoUserInfo) {
        super(userinfo);
    }
}
