//mymap.ts
//
export class MyMap<K,V> {
  private _data:any;
  constructor(){
    this._data = {};
  }
  public has(key:K):boolean {
    let bRet:boolean = false;
    if ((key !== undefined) && (key !== null)){
      let skey:string = key.toString();
      if ((this._data[skey] !== undefined) && (this._data[skey] !== null)){
        bRet = true;
      }
    }
    return bRet;
  }// has
  public get_val(key:K): V {
    let bRet:V = null;
    if ((key !== undefined) && (key !== null)){
      let skey:string = key.toString();
      if ((this._data[skey] !== undefined) && (this._data[skey] !== null)){
        bRet = this._data[skey];
      }
    }
    return bRet;
  }
  public set(key:K,val:V): any{
    if ((key !== undefined) && (key !== null) && (val !== undefined) && (val !== null)){
      let skey:string = key.toString();
      this._data[skey] = val;
    }
  }// set
  public forEach(callback:(val:V, key:K)=>any): void {
    for (let x in this._data){
        callback(this._data[x], x);
    }// x
  }// forEach
  public clear(): void {
    this._data = {};
  }
}// MyMap
