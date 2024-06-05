

export class Query{
    private objectRef:any[]
    private objectCopy:any[]=[];
    private way=1;
    private field='';
    private from=0;
    private to=0;
    private draw=50;
    private targetHtml:Element
    private targetCnt:Element
    private funcRef:(items:village | target)=>string
    private CanScroll=false;
    private To:NodeJS.Timeout;

    constructor(ref:any[],targetHtml:Element,targetCnt:Element,funcRef:(items:village | target)=>string) {
        this.objectRef=ref;
        this.objectCopy=[...ref];
        this.funcRef=funcRef;
        this.targetHtml=targetHtml;
        this.targetCnt=targetCnt;

        let classRef=this
        targetHtml.addEventListener('scroll', function(ev) {
            let max=targetHtml.scrollHeight-100;
            let pos=targetHtml.clientHeight+targetHtml.scrollTop;
    
            let isOver=false;
            if(max<=pos && !isOver && classRef.CanScroll){
                isOver=true;
                classRef.pull();
            }
        })

        addEventListener("wheel", (event) => {
            classRef.CanScroll=true;
            clearTimeout(classRef.To);
            classRef.To = setTimeout(()=>{
                classRef.CanScroll=false;
            },500)
        });
    }
    setDraw(val:number){
        this.draw=val;
    }

    calcPaging(){
        this.to=this.from+this.draw;
        if(this.to>this.objectRef.length){
            this.to=this.objectRef.length;
        }
    }

    reset(){
        $(this.targetHtml).html('');
        $(this.targetHtml).scrollTop(0);
        this.objectCopy=[...this.objectRef];
        this.from=0;
        this.to=0;
    }

    resetAll(){
        this.reset();
        this.render();
    }

    order(field:string){
        this.reset();
        if(this.field==field){
            this.way*=-1;
        }else{
            this.way=-1;
        }
        
        console.log(this.way,field);
        let classRef=this;
        let fn = (a:any,b:any)=>{
            return classRef.getProp(field,a)<classRef.getProp(field,b)? -1*this.way:1*this.way;
        }
        this.objectCopy.sort(fn);
        this.field=field;
        this.render();
    }

    getProp(fieldPath:string,obj:any):any{
        let list=fieldPath.split('.');
        if(list.length==1){
            return obj[list[0]]
        }else{
            let field = list.shift();
            obj=obj[field];
            return this.getProp(list.join('.'),obj)
        }
    }

    pull(){
        if(this.from+this.draw>this.objectCopy.length){
            return;
        }
        this.from+=this.draw;
        this.to=this.from+this.draw;
        this.render();
    }

    render(){
        this.calcPaging();
        console.log(this.from,this.to,this.objectCopy);
        for (let i = this.from; i < this.to; i++) {
            $(this.targetHtml).append(this.funcRef(this.objectCopy[i]));
        }
        $(this.targetCnt).text(this.objectCopy.length);
    }

    partialRender(renderObjects:village[] | target[],fieldPath:string){
        
        renderObjects.forEach((renderObject:village | target)=>{
            console.log($(this.targetHtml).find(`#${this.getProp(fieldPath,renderObject)}`));
            $(this.targetHtml).find(`#${this.getProp(fieldPath,renderObject)}`).replaceWith(this.funcRef(renderObject));
        })
        
    }

}