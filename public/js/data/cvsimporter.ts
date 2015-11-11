// importcsv.ts
import { ITransformArray, IBaseItem, IItemFactory} from 'infodata';
import {Papa} from 'papaparse';
//
//declare var Papa:any;
//import Papa = require('papaparse');
//
export class CSVImporter implements ITransformArray {
    //
    private _factory: IItemFactory;
    //
    constructor(fact:IItemFactory) {
        this._factory = fact;
    }
    protected get factory():IItemFactory {
      return (this._factory !== undefined) ? this._factory : null;
    }
    public transform_map(oMap: any): IBaseItem {
        return this.factory.create_item(oMap);
    }// transform_map
    public transform_file(file: File,stype:string): Promise<any> {
        let oRet:any = [];
        if ((file === undefined) || (file === null)) {
            return Promise.resolve(oRet);
        }
        let self = this;
        return new Promise((resolve, reject) => {
            Papa.parse(file, {
                header: true,             // default: false
                dynamicTyping: true,       // default: false
                skipEmptyLines: true,      // default: false
                chunk: (results: ParseResult, parser) => {
                  if ((results !== undefined) && (results !== null)){
                    if ((results.data !== undefined) && (results.data !== null)){
                      let maps = results.data;
                      if (maps.length > 0){
                        for (let x of maps){
                          x.type = stype;
                          let y = self.transform_map(x);
                          if ((y !== undefined) && (y !== null)){
                            oRet.push(y);
                          }
                        }// x
                      }
                    }
                  }
                },
                complete: (results: ParseResult, file?: File) => {
                    resolve(oRet);
                }, // default: undefined
                error: (error: ParseError, file?: File) => {
                    reject(new Error(error.message));
                },
               beforeFirstChunk :(s: string) => {
                 oRet = [];
               }       // default: undefined
            });
        });
    }// transform_file
}// class CSVImporter
