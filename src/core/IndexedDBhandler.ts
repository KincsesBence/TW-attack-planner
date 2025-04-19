export type store ={
    name:string,
    keyName:string
    AI:boolean,
    transaction?:IDBTransaction
    isOpen?:boolean
}

export class IndexedDBHandler {

    private db:IDBDatabase
    private dbName:string
    private version:number
    private stores:store[]

    constructor(db:IDBDatabase,dbName:string,stores:store[],version:number) {
        this.db=db;
        this.dbName=dbName;
        this.stores=stores;
        this.version=version;
        console.log(`loaded ${this.dbName} DB 🚀`);
    }

    static async init(dbName:string,stores:store[],version:number):Promise<IndexedDBHandler>{
        return new Promise<IndexedDBHandler>((resolve,reject)=>{
            let openRequest = indexedDB.open(dbName, version);
            openRequest.onupgradeneeded = () => {
    
                stores.forEach(store => {
                    if (openRequest.result.objectStoreNames.contains(store.keyName)) return;
                    openRequest.result.createObjectStore(store.name, {keyPath: store.keyName, autoIncrement: store.AI}); 
                });

                openRequest.onsuccess = () => {
                    resolve(new IndexedDBHandler(openRequest.result,dbName,stores,version))
                };
            };

            openRequest.onsuccess = () => {
                resolve(new IndexedDBHandler(openRequest.result,dbName,stores,version))
            };
            
            openRequest.onerror = () => {
                console.error("Error", openRequest.error);
                throw new Error(openRequest.error.message);
            };

        })
    }

    getTransaction(storeName:string){
        let ind = this.stores.findIndex((store:store)=>{return store.name==storeName})
        if(ind==-1) return null;
        if(!this.stores[ind].transaction){
            this.openTransaction(this.stores[ind],storeName);
        }
        if(!this.stores[ind].isOpen){
            this.openTransaction(this.stores[ind],storeName);
        }
        return this.stores[ind].transaction;
    }

    openTransaction(ref:store,storeName:string){
        ref.transaction=this.db.transaction(storeName, "readwrite");
        ref.isOpen=true
        ref.transaction.oncomplete=()=>{
            ref.isOpen=false;
        }
        ref.transaction.onabort=()=>{
            ref.isOpen=false;
        }
        ref.transaction.onerror=()=>{
            ref.isOpen=false;
        }

        ref.transaction.durability
    }

    async getAllData(storeName:string):Promise<any[]>{
        return new Promise<any[]>(async (resolve,reject)=>{
            if(!this.db.objectStoreNames.contains(storeName)){
                resolve([]);
                return
            }
            let transaction = this.getTransaction(storeName);
            let req = await transaction.objectStore(storeName).getAll();
            req.onsuccess= () =>{
                resolve(req.result);
            }
        })
    }

    async getData(storeName:string,id:number|string){
        return new Promise<any | null>(async (resolve,reject)=>{
            if(!this.db.objectStoreNames.contains(storeName)){
                resolve(null);
                return
            }
            let transaction = this.getTransaction(storeName);
            let req = await transaction.objectStore(storeName).get(id);
            req.onsuccess= () =>{    
                if(req.result){
                    resolve(req.result);
                }else{
                    resolve(null);
                }
            }
        })
    }

	async setData(storeName:string,data:any){
        return new Promise<any | null>(async (resolve,reject)=>{
            if(!this.db.objectStoreNames.contains(storeName)){
                resolve(null);
                return
            }
            let transaction = this.getTransaction(storeName);
            let req = await transaction.objectStore(storeName).put(data);
            req.onsuccess= () =>{
                resolve(req.result);
            }
        })
    }

    async removeData(storeName:string,id:number|string){
        return new Promise<any | null>(async (resolve,reject)=>{
            if(!this.db.objectStoreNames.contains(storeName)){
                resolve(null);
                return
            }
            let transaction = this.getTransaction(storeName);
            let req = await transaction.objectStore(storeName).delete(id);
            req.onsuccess= () =>{
                resolve(req.result);
            }
        })
    }

    async clearStore(storeName:string){
        return new Promise<any | null>(async (resolve,reject)=>{
            if(!this.db.objectStoreNames.contains(storeName)){
                resolve(null);
                return
            }
            let transaction = this.getTransaction(storeName);
            let req = await transaction.objectStore(storeName).clear();
            req.onsuccess= () =>{
                resolve(req.result);
            }
        })
    }

}