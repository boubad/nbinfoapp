// maintest.ts
/// <reference path='../../../typings/qunit/qunit.d.ts' />
//
import {main as PouchBase} from './data/pouchdatabasetest';
import {main as dep} from './data/departementtest';
//
class MainTest {
	constructor() { }
	//
	public test_dummy(): void {
		test('Dummy test',() => {
			ok(true,'This test should pass!');
		});
	}// test_dummy
	//
	public run(): void {
		this.test_dummy();
		//
		PouchBase.run();
		//dep.run();
	}// run
}// class DummyTest
//
export var main=new MainTest();
