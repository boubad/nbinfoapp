//pouchdatabase.ts
//
/// <reference path='../../../typings/pouchdb/pouchdb.d.ts' />
//
import * as PouchDB from 'pouchdb';
//import {PouchDB} from 'pouchdb';
//
import {IDocPersist} from 'infodata';
import {DATABASE_NAME} from '../infoconstants';
//
PouchDB.plugin(require('pouchdbfind'));
//
export class PouchDatabase implements IDocPersist {
	//
	private _db: IPouchDB = null;
	private _url: string = null;
	//
	constructor(name?: string) {
		this._url = ((name !== undefined) && (name !== null)) ? name : DATABASE_NAME;
	}
	//
	public get name(): string {
		return this._url;
	}
	public set name(s: string) {
		this._db = null;
		this._url = (s !== undefined) ? s : null;
	}
	//
	public get db(): Promise<IPouchDB> {
		if (this._db !== null) {
			return Promise.resolve(this._db);
		}
		let self = this;
		return new Promise((resolve, reject) => {
			try {
				let xx = new PouchDB(self._url, { auto_compaction: true }, (err: PouchError, xdb: any) => {
					if ((err !== undefined) && (err !== null)) {
						reject(new Error(err.reason));
					} else {
						self._db = ((xdb !== undefined) && (xdb !== null)) ? xdb : null;
						if (self._db !== null) {
							resolve(self._db);
						} else {
							reject(new Error('Null Database handle'));
						}
					}
				});
			} catch (e) {
				let ss = ((e !== undefined) && (e !== null)) ? JSON.stringify(e) : 'Error: ';
				console.log(ss);
				reject(new Error(ss));
			}
		});
	}// db
	//
	public replicate(from: string, to: string, ids?: string[]): Promise<boolean> {
		let oRet: boolean = false;
		let options: any = {};
		if ((ids !== undefined) && (ids !== null) && (ids.length > 0)) {
			options.doc_ids = ids;
		}
		return PouchDB.replicate(from, to, options).then((b) => {
			oRet = ((b !== undefined) && (b !== null));
			return oRet;
		}).catch((err) => {
			return oRet;
		});
	}// replicate_all
	//
	public exists_doc(docid: string): Promise<string> {
		return this.db.then((xdb) => {
			return xdb.get(docid);
		}).then((doc) => {
			let sRet: string = null;
			if ((doc !== undefined) && (doc !== null) &&
				(doc._rev !== undefined) && (doc._rev !== null)) {
				sRet = doc._rev;
			}
			return sRet;
		}).catch((e) => {
			return null;
		});
	}// exists_doc
	public read_doc(docid: string, bAttachments?: boolean, bMeta?: Boolean): Promise<IPouchDocument> {
		return this.db.then((xdb) => {
			let options: PouchGetOptions = {};
			if ((bAttachments !== undefined) && (bAttachments !== null) && (bAttachments == true)) {
				options.attachments = true;
			}
			if ((bMeta !== undefined) && (bMeta !== null) && (bMeta == true)) {
				options.meta = true;
			}
			return xdb.get(docid, options);
		}).then((doc) => {
			if (doc == undefined) {
				doc = null;
			}
			return doc;
		}).catch((e) => {
			return null;
		});
	}// exists_doc
	public insert_doc(doc: IPouchDocument): Promise<PouchUpdateResponse> {
		if ((doc === undefined) || (doc === null)) {
			Promise.reject(new Error('Invalid document'));
		}
		return this.db.then((xdb) => {
			return xdb.put(doc);
		});
	}// insert_doc
	public update_doc(doc: IPouchDocument): Promise<PouchUpdateResponse> {
		if ((doc === undefined) || (doc === null)) {
			Promise.reject(new Error('Invalid document'));
		}
		let docid: string = null;
		if (doc._id !== undefined) {
			docid = doc._id;
		}
		if (docid == null) {
			Promise.reject(new Error('Invalid document id'));
		}
		let zdb: IPouchDB = null;
		return this.db.then((xdb) => {
			zdb = xdb;
			return xdb.get(docid, { attachments: true });
		}).then((p) => {
			doc._rev = p._rev;
			if ((p._attachments !== undefined) && (p._attachments !== null)) {
				doc._attachments = p._attachments;
			}
			return zdb.put(doc);
		}, (err) => {
			if (err.status != 404) {
				Promise.reject(new Error(err.reason));
			}
			return zdb.put(doc);
		});
	}// update_doc
	public remove_doc(doc: IPouchDocument): Promise<PouchUpdateResponse> {
		if ((doc === undefined) || (doc === null)) {
			Promise.reject(new Error('Invalid document'));
		}
		let docid: string = null;
		if (doc._id !== undefined) {
			docid = doc._id;
		}
		if (docid == null) {
			Promise.reject(new Error('Invalid document id'));
		}
		let zdb: IPouchDB = null;
		return this.db.then((xdb) => {
			zdb = xdb;
			return xdb.get(docid);
		}).then((p) => {
			doc._rev = p._rev;
			return zdb.remove(doc);
		});
	}// remove_doc
	//
	public bulk_maintains(docs: IPouchDocument[]): Promise<any> {
		return this.db.then((xdb) => {
			return xdb.bulkDocs(docs);
		});
	}//bulk_maintains
	//
	public docs_ids_range(startKey: string, endKey: string): Promise<string[]> {
		let oRet: string[] = [];
		if ((startKey === undefined) || (startKey === null) ||
			(endKey === undefined) || (endKey === null)) {
			return Promise.resolve(oRet);
		}
		let options: PouchGetOptions = {
			startkey: startKey, endkey: endKey
		};
		return this.db.then((xdb) => {
			return xdb.allDocs(options).then((rr) => {
				if ((rr !== undefined) && (rr !== null) && (rr.rows !== undefined) &&
					(rr.rows !== null)) {
					for (let r of rr.rows) {
						if (r.id !== undefined) {
							if ((r._deleted !== undefined) && (r.deleted !== undefined)) {
								continue;
							}
							let id = r.id;
							oRet.push(id);
						}
					}// r
				}
				return oRet;
			});
		});
	}//get_ids
	public docs_read_range(startKey: string, endKey: string, skip?: number, limit?: number): Promise<IPouchDocument[]> {
		let oRet: IPouchDocument[] = [];
		if ((startKey === undefined) || (startKey === null) ||
			(endKey === undefined) || (endKey === null)) {
			return Promise.resolve(oRet);
		}
		let options: PouchGetOptions = {
			startkey: startKey, endkey: endKey, include_docs: true
		};
		if ((skip !== undefined) && (skip !== null) && (skip > 0)) {
			options.skip = skip;
		}
		if ((limit !== undefined) && (limit !== null) && (limit > 0)) {
			options.limit = limit;
		}
		return this.db.then((xdb) => {
			return xdb.allDocs(options).then((rr) => {
				if ((rr !== undefined) && (rr !== null) && (rr.rows !== undefined) &&
					(rr.rows !== null)) {
					for (let r of rr.rows) {
						if ((r.id !== undefined) && (r.doc !== undefined) && (r.doc !== null)) {
							if ((r._deleted !== undefined) && (r.deleted !== undefined)) {
								continue;
							}
							let doc = r.doc;
							oRet.push(doc);
						}
					}// r
				}
				return oRet;
			});
		});
	}//docs_read_range
  
	public docs_array(ids: string[]): Promise<IPouchDocument[]> {
		if ((ids === undefined) || (ids === null)) {
			return Promise.resolve([]);
		}
		if (ids.length < 1) {
			return Promise.resolve([]);
		}
		let options: PouchAllDocsOptions = { keys: ids, include_docs: true };
		return this.db.then((xdb) => {
			return xdb.allDocs(options).then((rr) => {
				let oRet: IPouchDocument[] = [];
				if ((rr !== undefined) && (rr !== null)) {
					let data = rr.rows;
					if ((data !== undefined) && (data !== null)) {
						for (let r of data) {
							let bOk = true;
							if ((r.value !== undefined) && (r.value !== null)) {
								let val = r.value;
								if ((val.deleted !== undefined) && (val.deleted !== null)) {
									bOk = false;
								}
								if ((val.error !== undefined) && (val.error !== null)) {
									bOk = false;
								}
							}
							if ((r.doc === undefined) || (r.doc === null)) {
								bOk = false;
							}
							if (bOk) {
								oRet.push(r.doc);
							}
						}// r
					}// data
				}// rr
				return oRet;
			});
		});
	}//get_items_array
	public find_attachment(docid: string, attachmentId: string): Promise<Blob> {
		let oRet: Blob = null;
		if ((docid === undefined) || (docid === null) || (attachmentId === undefined) ||
			(attachmentId === null)) {
			return Promise.resolve(oRet);
		}
		return this.db.then((xdb: IPouchDB) => {
			return xdb.getAttachment(docid, attachmentId);
		}).then((p) => {
			return p;
		}, (err) => {
			return null;
		});
	}// find_attachment
	public maintains_attachment(docid: string, attachmentId: string,
		attachmentData: Blob, attachmentType: string): Promise<PouchUpdateResponse> {
		if ((docid === undefined) || (docid === null) || (attachmentId === undefined) ||
			(attachmentId === null) || (attachmentData === undefined) ||
			(attachmentData === null) || (attachmentType === undefined) ||
			(attachmentType === null)) {
			Promise.reject(new Error('Invalid argument(s)'));
		}
		let xdb: IPouchDB = null;
		let rev: string = null;
		return this.db.then((d: IPouchDB) => {
			xdb = d;
			return xdb.get(docid);
		}).then((p) => {
			rev = p._rev;
			return xdb.putAttachment(p._id, attachmentId, p._rev, attachmentData, attachmentType);
		}).then((rx) => {
			return rx;
		}, (err: PouchError) => {
			if (err.status == 409) {
				return { ok: true, id: docid, rev: rev };
			} else {
				Promise.reject(new Error(err.reason));
			}
		});
	}// maintains_attachment
	public remove_attachment(docid: string, attachmentId: string): Promise<PouchUpdateResponse> {
		if ((docid === undefined) || (docid === null) || (attachmentId === undefined) ||
			(attachmentId === null)) {
			Promise.reject(new Error('Invalid argument(s)'));
		}
		let xdb: IPouchDB = null;
		return this.db.then((d: IPouchDB) => {
			xdb = d;
			return xdb.get(docid);
		}).then((p) => {
			return xdb.removeAttachment(p._id, attachmentId, p._rev);
		});
	}// maintains_attachment
	public isOnline(): Promise<boolean> {
		let self = this;
		return this.db.then((xdb) => {
			return ((xdb !== undefined) && (xdb !== null));
		});
	}// isOnline


	public remove_all_items(startKey: string, endKey: string): Promise<any> {
		if ((startKey === undefined) || (startKey === null) ||
			(endKey === undefined) || (endKey === null)) {
			Promise.reject(new Error('Invalid argument(s)'));
		}
		let rdb: IPouchDB = null;
		return this.db.then((xdb) => {
			rdb = xdb;
			let options: PouchGetOptions = {
				startkey: startKey, endkey: endKey, include_docs: true
			};
			return rdb.allDocs(options);
		}).then((dd) => {
			let docs: any[] = [];
			for (let x of dd.rows) {
				let d = x.doc;
				docs.push({ _id: d._id, _rev: d._rev, _deleted: true });
			}// x
			if (docs.length > 0) {
				return rdb.bulkDocs(docs);
			} else {
				return [];
			}
		});
	}//remove_all_items
	public create_one_index(field: string): Promise<boolean> {
		let oRet: boolean = false;
		if ((field === undefined) || (field === null)) {
			return Promise.resolve(oRet);
		}
		if (field.trim().length < 1) {
			return Promise.resolve(oRet);
		}
		return this.db.then((xdb) => {
			return xdb.createIndex({ index: { fields: [field] } });
		}).then((r) => {
			let bRet: boolean = false;
			if ((r !== undefined) && (r !== null) && (r.result !== undefined)) {
				bRet = ((r.result == "created") || (r.result == "exists"));
			}
			return bRet;
		}).catch((e) => {
			return oRet;
		});
	}// create_indexes
	public create_indexes(fields: string[]): Promise<boolean> {
		if ((fields === undefined) || (fields === null)) {
			Promise.reject(new Error('Invalid argument(s)'));
		}
		let ss: string[] = [];
		for (let s of fields) {
			if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
				ss.push(s);
			}
		}
		if (ss.length < 1) {
			Promise.reject(new Error('Invalid argument(s)'));
		}
		return this.db.then((xdb) => {
			if ((xdb === undefined) || (xdb === null)) {
				Promise.reject(new Error('Invalid db'));
			}
			return xdb.createIndex({ index: { fields: ss } });
		}).then((r) => {
			let bRet: boolean = false;
			if ((r !== undefined) && (r !== null) && (r.result !== undefined)) {
				bRet = ((r.result == "created") || (r.result == "exists"));
			}
			return bRet;
		});
	}// create_indexes
	public create_all_indexes(fields: string[]): Promise<boolean[]> {
		let oRet: boolean[] = [];
		if ((fields === undefined) || (fields === null)) {
			return Promise.resolve(oRet);
		}
		let ss: string[] = [];
		for (let s of fields) {
			if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
				ss.push(s);
			}
		}
		if (ss.length < 1) {
			return Promise.resolve(oRet);
		}
		let oAr: Promise<boolean>[] = [];
		for (let x of ss) {
			oAr.push(this.create_one_index(x));
		}
		return Promise.all(oAr);
	}//create_all_indexes
	public find_docs(temp: any, fields?: string[], skip?: number, limit?: number): Promise<any[]> {
		let oRet: any[] = [];
		if ((temp === undefined) || (temp == null)) {
			return Promise.resolve(oRet);
		}
		let options: PouchFindOptions = { selector: temp };
		if ((fields !== undefined) && (fields !== null) && (fields.length > 0)) {
			options.fields = fields;
		}
		if ((skip !== undefined) && (skip !== null) && (skip > 0)) {
			options.skip = skip;
		}
		if ((limit !== undefined) && (limit !== null) && (limit > 0)) {
			options.limit = limit;
		}
		return this.db.then((xdb) => {
			return xdb.find(options);
		}).then((r) => {
			if ((r !== undefined) && (r !== null) && (r.docs !== undefined) && (r.docs !== null)) {
				oRet = r.docs;
			}
			return oRet;
		}).catch((e) => {
			return oRet;
		});
	}// find_docs
}// class PouchDatabase
