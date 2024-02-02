export class Model {
    items:any[] =[];

    constructor(items:any[]=[]){
        this.items=items;
    }

    first(){
        return this.items.length >0 ? this.items[0] : null
    }

    get(n=this.items.length){
        return this.items.slice(0,n);
    }

    filter(predicate: (value: any, index: number, array: any[]) => unknown){
        let result = this.items.filter(predicate);
        return new Model(result);
    }

    find(predicate: (value: any, index: number, array: any[]) => unknown){
        let result = this.items.find(predicate);
        return result;
    }

    sort(field:string,isASC:boolean){
        let result = this.items.sort((a:any,b:any)=>{
            if(a[field]>b[field]){
                return isASC? 1:-1
            }else{
                return isASC? -1:1
            }
        })

        return new Model(result);
    }
        
    
} 