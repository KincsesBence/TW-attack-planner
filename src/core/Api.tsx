import { VillageModel } from "./VillageModel";
import { xml2json } from "./xml2json";

export type group = {
    value:number,
    text:string
}

type Objectkey = keyof units

type unitTypes = {
    name:string,
    index:number
}

interface pageLoadInput{
    group?:number,
    page?:number,
    groups?:group[],
    pageCnt?:number,
    villages?:village[]
}



const server:string="https://"+window.location.hostname;
// @ts-ignore: Unreachable code error   
const game=game_data;
// @ts-ignore: Unreachable code error   
//const mainOverView:string=`/game.php?village=${game!.village.id}&screen=overview_villages&page=-1&order=axe&dir=desc&mode=combined&group=${params.get('group')}`;
const villageAPI:string="/map/village.txt";
const playersAPI:string="/map/player.txt";
const unitConfigAPI:string="/interface.php?func=get_unit_info";
const gameConfigAPI:string="/interface.php?func=get_config";

export async function getServerConifg():Promise<gameConfig>{
    let result = await $.ajax({url: server+gameConfigAPI});
    return JSON.parse(xml2json(result,"")).config;  
}

export async function getUnitConfig():Promise<unitConfig>{
    let result = await $.ajax({url: server+unitConfigAPI});
    let config = JSON.parse(xml2json(result,"")).config;
    return config;
}

export async function getAllVillages():Promise<village[]>{    
    let result:string = await $.ajax({url: server+villageAPI});
    result = result.trim();
    let villages:village[] = [];
    let lines=result.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let columns = lines[i].split(',');
        villages.push( {
            id:parseInt(columns[0]),
            name:decodeURIComponent(columns[1]).replaceAll('+',' '),
            owner:parseInt(columns[4]),
            coord:{
                text:columns[2]+'|'+columns[3],
                x:parseInt(columns[2]),
                y:parseInt(columns[3])
            },
            popRemain:null,
            unitsContain:null,
            popSize:null
        })
    }
    return villages;
}

export async function getAllPlayer():Promise<player[]>{
    let result:string = await $.ajax({url: server+playersAPI});
    result = result.trim();
    let players:player[] = [];
    let lines=result.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let columns = lines[i].split(',');
        players.push({
            id:parseInt(columns[0]),
            name:decodeURIComponent(columns[1]).replaceAll('+',' '),
            allyId:parseInt(columns[2]),
            villageCnt:parseInt(columns[3]),
            pionts:parseInt(columns[4]),
            rank:parseInt(columns[5]),
        })
    }     
    return players;
}

function createLink(page=1,group=0){
    return `/game.php?${game.player.sitter != 0 ? "t="+game.player.id+"&":""}village=${game.village.id}&group=${group}&page=${page}&screen=overview_villages&mode=combined`;
}

export async function loadPages(page:number=0,group:number=0){
    console.log(group);
    
    let villages:village[]=[];
    let units=[];
    let result = await $.ajax({url: createLink(0,group)});
    let {groups,pageCnt} = fetchGroups(result);
    villages.push(...await fetchVillage(result))
    if(pageCnt>0){
        window.top.UI.InfoMessage(`Falvak betöltése 1/${pageCnt}`);
    }
    var promises = [];

    for (let i = 1; i < pageCnt; i++) {
        promises.push(
            pageRequestDelayed(createLink(i,group),i)
        );
    }
    await Promise.allSettled(promises).then((results) => results.forEach(
        async (result:any) => {villages.push(...result.value)} 
    ));
    
    return {
        groups,
        villages
    }
}

function pageRequestDelayed(url:string,delay:number){
    return new Promise( async (resolve,reject)=>{
        setTimeout(async ()=>{
            window.top.UI.InfoMessage(`Falvak betöltése 1/${delay+1}`);
            let result = await $.ajax({url: url});
            let resultVillages = await fetchVillage(result);
            resolve(resultVillages);
        },200*delay)
    })
}



function fetchGroups(html:string):{groups:group[],pageCnt:number}{
    let groups:group[]=[];
    let groupsHtml = $(html).find('.group-menu-item').get();
    groupsHtml.forEach(group => {
        groups.push({
            text:$(group).text().trim().slice(1,-1),
            value:parseInt($(group).attr('data-group-id'))
        });
    });

    let select=$($(html).find('.paged-nav-item').get()[0]).parent().find('select');
    let pageCnt=0;
    if(select.length==1){
        let opt = select.find('option');
        pageCnt = opt.length-1;
    }else{
        pageCnt = $(html).find('.paged-nav-item').length;
    }

    return {groups,pageCnt}
}

function getUnitNameFromUrl(url:string){
    let frag=url.split('/');
    return frag[frag.length-1].split('.')[0].replace('unit_','').replace('@2x','');
}

async function fetchVillage(html:any){  
    let table = $(html).find('#combined_table');
    let rows = table.find('tr');
    let villagePool:village[]=[];
    let unitTypes:unitTypes[]=[];
    let ths = $(rows).find('th').get();
    ths.forEach((th, index) => {
        let img=$(th).find('img');
        if(img.length>0){
            let src = $(img).attr('src');
            if (src.includes('graphic/unit/unit_') && !src.includes('unit_militia')) {
                unitTypes.push({
                    index: index,
                    name: getUnitNameFromUrl(src)
                });
            }
        }
    });

    for (let i = 1; i < rows.length; i++) {
        
        
        const row = rows[i];
        let colums = $(row).find('td');    
        let villageID=parseInt($(row).find('.quickedit-vn').attr('data-id'));     
        let units:units={spear:0,sword:0,axe:0,archer:0,spy:0,light:0,marcher:0,heavy:0,ram:0,catapult:0,knight:0,snob:0,}
        let size=0;
        unitTypes.forEach((type:unitTypes)=>{
            let val=parseInt($(colums[type.index]).text());
            units[type.name as keyof units] = val
            
            size+=window.unitConfig[type.name as keyof unitConfig].pop*val;
        })

        let villages = await VillageModel.init();
        let village:village = villages.find((elem:village)=>{ return elem.id==villageID})      
      
        let popRemain = parseInt($(colums[7]).find('a').text().split(' ')[0]);
        village.unitsContain=units;        
        village.popRemain=popRemain;
        village.popSize=size
        villagePool.push(village);   
    }

    console.log(villagePool);
    return villagePool;
}

export function loadPlans(){
    let result=localStorage.getItem('TW-Attack-Planner');
    let plans:plan[] = [];
    if(result){
        plans = JSON.parse(result);
    }

    return plans
}

export function findPlan(predicate: (value: any, index: number, array: any[]) => unknown): plan | null{
    let result=localStorage.getItem('TW-Attack-Planner');
    let plans:plan[] = [];
    if(result){
        plans = JSON.parse(result);
    }

    let ind=plans.findIndex(predicate)

    if(ind>-1){ 
        return plans[ind];
    }else{
        return null;
    }
}


export function addPlan(newPlan:plan):boolean{
    let result=localStorage.getItem('TW-Attack-Planner');
    let plans:plan[] = [];
    if(result){
        plans = JSON.parse(result);
    }

    let ind=plans.findIndex((plan)=>{
        return plan.name==newPlan.name
    })

    if(ind==-1){
        plans.push(newPlan);
    }else{
        return false;
    }
    localStorage.setItem('TW-Attack-Planner',JSON.stringify(plans));
    return true;
}

export function updatePlan(updatedPlan:plan):boolean{
    let result=localStorage.getItem('TW-Attack-Planner');
    let plans:plan[] = [];
    if(result){
        plans = JSON.parse(result);
    }

    let ind=plans.findIndex((plan)=>{
        return plan.id==updatedPlan.id
    })

    plans[ind]=updatedPlan;
    localStorage.setItem('TW-Attack-Planner',JSON.stringify(plans));
    return true;
}

export function removePlan(id:string){
    let result=localStorage.getItem('TW-Attack-Planner');
    let plans:plan[] = [];
    if(result){
        plans = JSON.parse(result);
    }

    let ind=plans.findIndex((plan)=>{
        return plan.id==id;
    })

    if(ind>-1){
        plans.splice(ind,1);
        localStorage.setItem('TW-Attack-Planner',JSON.stringify(plans));
    }
}
