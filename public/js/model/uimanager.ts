//uimanager.ts
import {IUIManager} from 'infodata';
//
declare var window: any;
const HAS_WINDOW: boolean = (window !== undefined) && (window !== null);
const HAS_URL: boolean = (window !== undefined) && (window !== null) && (window.URL !== undefined) &&
    (window.URL !== null);
//
export class UIManager implements IUIManager {
    constructor() {
    }
    public createUrl(blob: Blob): string {
        let sRet: string = null;
        if (HAS_URL && (blob !== undefined) && (blob !== null)) {
            try {
                sRet = window.URL.createObjectURL(blob);
            } catch (e) { }
        }
        return sRet;
    }
    public revokeUrl(url: string): void {
        if (HAS_URL && (url !== undefined) && (url !== null)) {
            try {
                window.URL.revokeObjectURL(url);
            } catch (e) { }
        }
    }// revokeUrl
    public confirm(s: string): boolean {
        if (HAS_WINDOW) {
            return window.confirm(s);
        } else {
            return true;
        }
    }// confirm
}// class UIManager
