//intramessagemanager.ts
//
import {IMessageManager} from 'infodata';
import * as evtagg from 'aurelia-event-aggregator';
//
export class InfoMessageManager implements IMessageManager {
    //
    private _dispose_func: Function;
    private _eventAggregator: evtagg.EventAggregator;
    //
    public static inject():any {return [evtagg.EventAggregator];}
    //
    constructor(eventAggregator: evtagg.EventAggregator) {
        this._eventAggregator = eventAggregator;
    }// constructor
    public publish(type: string, payload: any): void {
        if ((this._eventAggregator !== undefined) && (this._eventAggregator !== null) &&
            (type !== undefined) && (type !== null) && (payload !== undefined)) {
            this._eventAggregator.publish(type, payload);
        }
    }//publish
    public subscribe(type: string, callback: (payload: any) => any): void {
        if ((this._eventAggregator !== undefined) && (this._eventAggregator !== null) &&
            (type !== undefined) && (type !== null) && (callback !== undefined) &&
            (callback !== null)) {
            this._dispose_func = this._eventAggregator.subscribe(type, callback);
        }
    }// subscribe
    public unsubscribe(type: string): void {
        if ((type !== undefined) && (type === null)) {
            if ((this._dispose_func !== undefined) && (this._dispose_func !== null)) {
                this._dispose_func();
                this._dispose_func = null;
            }
        }
    }//unsubscribe
}// class InfoMessageManager
