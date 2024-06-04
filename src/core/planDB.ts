export class planDB {
    db:IDBDatabase;
    async init(){
        this.db = await this.loadDB();
        console.log("loaded plan DB 🚀");
    }
    async loadPlans(){
        return new Promise<plan[]>(async (resolve,reject)=>{
            if (!this.db.objectStoreNames.contains('plans')){
                resolve([]);
                return;
            }
            let transPlans = this.db.transaction("plans");
            let reqPlans = await transPlans.objectStore("plans").getAll();
            reqPlans.onsuccess= () =>{
                resolve(reqPlans.result.map((plan)=> JSON.parse(plan.data)))
            }
        })
    }
    async savePlan(plan:plan){
        let transaction = this.db.transaction("plans", "readwrite");
        await transaction.objectStore("plans").put({id:plan.id,data:JSON.stringify(plan)});
    }
    async removePlan(id:string){
        console.log(id);
        
        let transaction = this.db.transaction("plans", "readwrite");
        await transaction.objectStore("plans").delete(id);
    }

    async loadDB(){
        return new Promise<IDBDatabase>((resolve,reject)=>{
            let openRequest = indexedDB.open("TW_ATTACK_PLANNER_DATA", 1);
            openRequest.onupgradeneeded = function() {
                let db = openRequest.result;
                if (!db.objectStoreNames.contains('plans'))
                db.createObjectStore('plans', {keyPath: 'id', autoIncrement: false}); 
                openRequest.onsuccess = function() {
                    resolve(openRequest.result);
                };
            };

            openRequest.onsuccess = function() {
                resolve(openRequest.result);
            };
            
            openRequest.onerror = function() {
                console.error("Error", openRequest.error);
                throw new Error(openRequest.error.message);
            };
        })
    }
}