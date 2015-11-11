//localstore.ts
import {IObjectStore} from 'infodata';
//
declare var window;
//
const ISLOCAL: boolean = (window !== undefined) && (window !== null) &&
    (window.localStorage !== undefined) && (window.localStorage !== null);
//
export class LocalStore implements IObjectStore {
    private _data: any = {};
    constructor() {
    }
    public get_value(key: string): string {
        if (ISLOCAL) {
            return window.localStorage.getItem(key);
        } else {
            if (this._data[key] !== undefined) {
                return this._data[key];
            } else {
                return null;
            }
        }
    }
    public store_value(key: string, val: string): any {
        if (ISLOCAL) {
            window.localStorage.setItem(key, val);
        } else {
            this._data[key] = val;
        }
    }
    public remove_value(key: string): any {
        if (ISLOCAL) {
            window.localStorage.removeItem(key);
        } else {
            this._data[key] = null;
        }
    }
    public clear(): any {
        if (!ISLOCAL) {
            this._data = {};
        }
    }// clear
}
