//pouchdatabasetest.ts
/// <reference path='../../../../typings/qunit/qunit.d.ts' />
import {IDocPersist} from 'infodata';
import {PouchDatabase} from '../../js/pouchdb/pouchdatabase';
////////////////////////////////
//const TEST_DATABASE:string = "http://localhost:5984/test";
const TEST_DATABASE:string = "test";
//////////////////////////////
class PouchDatabaseTest {

	constructor() {
	}
	//
	test_online(): void {
		QUnit.test("test online", (assert) => {
			var done = assert.async();
			var db: PouchDatabase = new PouchDatabase(TEST_DATABASE);
			db.isOnline().then((bRet) => {
				assert.ok(bRet, "Server is online");
				done();
			}).catch((err) => {
				assert.ok(false, "Exception occured...");
				done();
			});
		});
	}// test_online
	//
	test_onedoc(): void {
		QUnit.test("test online", (assert) => {
			var done = assert.async();
			var docid: string = "testdocid";
			var doc: IPouchDocument = { _id: docid };
			var db: PouchDatabase = new PouchDatabase(TEST_DATABASE);
			db.exists_doc(docid).then((rev) => {
				if ((rev !== undefined) && (rev !== null)) {
					return db.update_doc(doc);
				} else {
					return db.insert_doc(doc);
				}
			}).then((r) => {
				assert.ok((r !== undefined) && (r !== null), "return of insert/update");
				assert.ok((r.ok !== undefined) && (r.ok !== null));
				assert.ok((r.id !== undefined) && (r.id !== null), "reponse id " + r.id);
				assert.ok((r.rev !== undefined) && (r.rev !== null), "response rev " + r.rev);
				assert.ok(r.ok == true, "insert/update success");
				return db.read_doc(docid);
			}).then((xdoc) => {
				assert.ok((xdoc !== undefined) && (xdoc !== null));
				assert.ok(doc._id !== undefined);
				assert.ok(doc._id == docid);
				return db.remove_doc(xdoc);
			}).then((rx) => {
				assert.ok((rx !== undefined) && (rx !== null), "return of remove");
				assert.ok((rx.ok !== undefined) && (rx.ok !== null));
				assert.ok((rx.id !== undefined) && (rx.id !== null), "reponse id " + rx.id);
				assert.ok((rx.rev !== undefined) && (rx.rev !== null), "response rev " + rx.rev);
				assert.ok(rx.ok == true, "remove success");
				done();
			}).catch((err) => {
				assert.ok(false, "Exception occured...");
				done();
			});
		});
	}// test_onedoc
	//
	test_all_docs(): void {
		QUnit.test("all docs tests", (assert) => {
			var done = assert.async();
			var nb: number = 20;
			var docs: any[] = [];
			var ids: string[] = [];
			var startkey: string = "id";
			var endkey: string = startkey + "\uffff";
			for (var i = 0; i < nb; ++i) {
				var id: string = "id" + i;
				ids.push(id);
				docs.push({ _id: id, ival: i });
			}// i
			var db: PouchDatabase = new PouchDatabase(TEST_DATABASE);
			db.bulk_maintains(docs).then((r) => {
				assert.ok((r !== undefined) && (r !== null));
				return db.docs_ids_range(startkey, endkey);
			}).then((xids) => {
				assert.ok((xids !== undefined) && (xids !== null));
				assert.ok(xids.length >= nb);
				return db.docs_read_range(startkey, endkey, 0, nb);
			}).then((xdocs) => {
				assert.ok((xdocs !== undefined) && (xdocs !== null));
				assert.ok(xdocs.length >= nb);
				return db.docs_array(ids);
			}).then((ydocs) => {
				assert.ok((ydocs !== undefined) && (ydocs !== null));
				assert.ok(ydocs.length >= nb);
				return db.remove_all_items(startkey, endkey);
			}).then((xx) => {
				assert.ok((xx !== undefined) && (xx !== null));
				return db.docs_array(ids);
			}).then((zdocs) => {
				assert.ok((zdocs !== undefined) && (zdocs !== null));
				assert.ok(zdocs.length < 1);
				done();
			}).catch((err) => {
				assert.ok(false, "Exception occured...");
				done();
			});
		});
	}// test_all_docs
	//
	test_create_indexes(): void {
		QUnit.test(" create_indexes", (assert) => {
			var done = assert.async();
			var nb: number = 20;
			var docs: any[] = [];
			var ids: string[] = [];
			var startkey: string = "id";
			var endkey: string = startkey + "\uffff";
			for (var i = 0; i < nb; ++i) {
				var id: string = "id" + i;
				ids.push(id);
				docs.push({ _id: id, ival: i, sval:"s" + i });
			}// i
			var db: PouchDatabase = new PouchDatabase(TEST_DATABASE);
			db.bulk_maintains(docs).then((r) => {
				assert.ok((r !== undefined) && (r !== null));
				let fields:string[] = ["ival","sval"];
				return db.create_indexes(fields);
			}).then((bRet) => {
				assert.ok(bRet == true);
				done();
			}).catch((err) => {
				assert.ok(false, "Exception occured...");
				done();
			});
		});
	}// test_create_indexes
	//
	public run(): void {
		QUnit.module("PouchDatabase ");
		this.test_online();
		this.test_create_indexes();
		//this.test_onedoc();
		//this.test_all_docs();
	}// run
}// class PouchDatabaseTest
export var main = new PouchDatabaseTest();
