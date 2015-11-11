//infomessage.ts
import {IInfoMessage} from 'infodata';
import {INFO_MESSAGE_CHANNEL} from '../infoconstants';
//
export class InfoMessage implements IInfoMessage {
    //
    private _type: string;
    private _categ: string;
    private _value: any;
    private _info: string;
    private _source: any;
    private _error: string;
    private _tag: string;
    //
    constructor(oMap?: any) {
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.type !== undefined) {
                this._type = oMap.type;
            }
            if (oMap.categ !== undefined) {
                this._categ = oMap.categ;
            }
            if (oMap.value !== undefined) {
                this._value = oMap.value;
            }
            if (oMap.info !== undefined) {
                this._info = oMap.info;
            }
            if (oMap.source !== undefined) {
                this._source = oMap.source;
            }
            if (oMap.error !== undefined) {
                this._error = oMap.error;
            }
            if (oMap.tag !== undefined) {
                this._tag = oMap.tag;
            }
        }// oMap
    }// constructor
    public static get Channel(): string {
        return INFO_MESSAGE_CHANNEL;
    }
    public get type(): string {
        return (this._type !== undefined) ? this._type : null;
    }
    public set type(s: string) {
        this._type = (s !== undefined) ? s : null;
    }
    public get categ(): string {
        return (this._categ !== undefined) ? this._categ : null;
    }
    public set categ(s: string) {
        this._categ = (s !== undefined) ? s : null;
    }
    public get value(): any {
        return (this._type !== undefined) ? this._value : null;
    }
    public set value(s: any) {
        this._type = (s !== undefined) ? s : null;
    }
    public get info(): string {
        return (this._info !== undefined) ? this._info : null;
    }
    public set info(s: string) {
        this._info = (s !== undefined) ? s : null;
    }
    public get source(): any {
        return (this._source !== undefined) ? this._source : null;
    }
    public set source(s: any) {
        this._source = (s !== undefined) ? s : null;
    }
    public get error(): string {
        return (this._error !== undefined) ? this._error : null;
    }
    public set error(s: string) {
        this._error = (s !== undefined) ? s : null;
    }
    public get tag(): string {
        return (this._tag !== undefined) ? this._tag : null;
    }
    public set tag(s: string) {
        this._tag = (s !== undefined) ? s : null;
    }
}// class InfoMessage
