//infologger.ts
//
import * as LogManager from 'aurelia-logging';
import {ILogManager} from 'infodata';
//
export class InfoLogger implements ILogManager {
    //
    private _name: string;
    private _logger: LogManager.Logger;
    //
    constructor() {
        this._name =  'InfoLogger';
        this._logger = LogManager.getLogger(this._name);
    }// constructor
    //
    public error(s: string): void {
        if ((this._logger !== undefined) && (this._logger !== null) &&
            (s !== undefined) && (s !== null)) {
            this._logger.error(s);
        }
    }// error
    public warn(s: string): void {
        if ((this._logger !== undefined) && (this._logger !== null) &&
            (s !== undefined) && (s !== null)) {
            this._logger.warn(s);
        }
    }
    public info(s: string): void {
        if ((this._logger !== undefined) && (this._logger !== null) &&
            (s !== undefined) && (s !== null)) {
            this._logger.info(s);
        }
    }
    public debug(s: string): void {
        if ((this._logger !== undefined) && (this._logger !== null) &&
            (s !== undefined) && (s !== null)) {
            this._logger.debug(s);
        }
    }
}// class InfoLogger
