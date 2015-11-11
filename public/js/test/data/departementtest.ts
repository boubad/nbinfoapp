//departementtest.ts
/// <reference path='../../../../typings/qunit/qunit.d.ts' />
//
import {IDocPersist,IDataService} from 'infodata';
import {PouchDatabase} from '../../js/pouchdb/pouchdatabase';
import {Departement}  from '../../js/data/departement';
import {DataService} from '../../js/data/dataservice';
//////////////////////////////
const TEST_DATABASE:string = "test";
const MODULE_NAME:string = "Departement ";
const NB_DEPS:number = 10;
const TEST_SIGLE:string = "TESTDEP";
const TEST_NAME:string = "Test dep Name";
const TEST_DESC:string = "Test dep desc";
const TEST_STATUS:string = "TESTSTATUS";
///////////////////////////////
class DepartementTest {
	dataService:IDataService = null;
	fixture:Departement = null;
	//
	constructor(){}
	public run():void {
		let self = this;
		QUnit.module(MODULE_NAME,{
			setup: (assert)=> {
				var done = assert.async();
				let service:DataService = new DataService();
				service.name = TEST_DATABASE;
				let p:Departement = new Departement({sigle:TEST_SIGLE,name:TEST_NAME,
					description:TEST_DESC, status:TEST_STATUS});
				assert.ok(p !== null);
				p.check_id();
				let id:string = p.id;
				assert.ok((id !== undefined) && (id !== null) && (id.length > 0));
				self.dataService = service;
				service.save_item(p).then((b)=>{
					assert.deepEqual(b,true,"intem saved");
					return service.load_item(p);
				}).then((bb)=>{
					assert.deepEqual(bb,true,"intem loaded");
					assert.deepEqual(p.id,id);
					assert.ok((p.rev !== undefined) && (p.rev !== null));
					self.fixture = p;
					done();
				}).catch((err)=>{
					assert.ok(false, "Exception occured...");
				    done();
				});
			},
			teardown: (assert) =>{
				var done = assert.async();
				done();
			}
		}); // module
		//
		QUnit.test("get_all",(assert)=>{
			var done = assert.async();
			let service = this.dataService;
			assert.ok((service !== undefined) && (service !== null));
			service.get_departements().then((dd)=>{
				assert.ok((dd !== undefined) && (dd !== null));
				assert.ok(dd.length >= 1);
				done();
			}).catch((err)=>{
				assert.ok(false, "Exception occured...");
				done();
			});
		});
		//
		QUnit.test("remove",(assert)=>{
			var done = assert.async();
			let service = this.dataService;
			let p = this.fixture;
			service.remove_item(p).then((b)=>{
				assert.deepEqual(b,true);
				done();
			}).catch((err)=>{
				assert.ok(false, "Exception occured...");
				done();
			});
		});
		//
		QUnit.module(MODULE_NAME);
	}// run
}// class DepartementTest
export var main = new DepartementTest();
