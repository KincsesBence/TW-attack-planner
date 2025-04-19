import { getLangFormat } from "./Language";
import { xml2json } from "./xml2json";

export type group = {
    id:number,
    name:string,
    all?:boolean
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
export const game=game_data;
// @ts-ignore: Unreachable code error   
const villageAPI:string="/map/village.txt";
const playersAPI:string="/map/player.txt";
const unitConfigAPI:string="/interface.php?func=get_unit_info";
const gameConfigAPI:string="/interface.php?func=get_config";
const GroupsLocation:string="screen=accountmanager";
const GroupsFallBackLocation:string="screen=overview_villages&mode=combined";
export const storeName="TW_ATTACK_PLANNER"

export async function getGameConfig():Promise<gameConfig>{
    let result = await $.ajax({url: server+gameConfigAPI});
    
    return  xml2json(result,"")
}

export async function getUnitConfig():Promise<unitConfig>{
    let result = await $.ajax({url: server+unitConfigAPI});

    return xml2json(result,"")
}


//TODO manager class
export function loadScriptOptions():scriptOptions{
    const opt = localStorage.getItem(storeName);

    if(opt==null) return {
        latestApiUpdate: 0
    }

    return JSON.parse(opt);
}

export function saveScriptOptions(){
    localStorage.setItem(storeName,JSON.stringify(window.scriptOptions));
}

export async function loadWorldApi(){
    let villages:village[]=[];
    let players:player[]=[];
    let gameConfig:gameConfig
    let unitConfig:unitConfig
    const now = new Date().getTime()-3600000;
    if(window.scriptOptions.latestApiUpdate>now){
        villages = await window.DB.getAllData('villages');
        players = await window.DB.getAllData('players');
        window.gameConfig = window.scriptOptions.gameConfig
        window.unitConfig = window.scriptOptions.unitConfig
    }else{
        gameConfig = await getGameConfig();
        unitConfig = await getUnitConfig();
        villages = await getAllVillages();
        players = await getAllPlayer();

        for (const player of players) {
            await window.DB.setData('players',player);
        }

        for (const village of villages) {
            await window.DB.setData('villages',village);
        }
        
        window.scriptOptions.latestApiUpdate = new Date().getTime();
        window.scriptOptions.gameConfig = gameConfig
        window.scriptOptions.unitConfig = unitConfig
        window.gameConfig = gameConfig
        window.unitConfig = unitConfig
        saveScriptOptions();
        window.Villages = villages
        window.Players = players
    }
}

export async function getAllVillages():Promise<village[]>{    
    let result:string = await $.ajax({url: server+villageAPI});
    result = result.trim();
    let villages:village[] = [];
    let lines=result.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let columns = lines[i].split(',');
        let x=parseInt(columns[2]);
        let y=parseInt(columns[3]);
        villages.push( {
            id:parseInt(columns[0]),
            name:decodeURIComponent(columns[1]).replaceAll('+',' '),
            owner:parseInt(columns[4]),
            kontinent:Math.floor(y/100)*10+Math.floor(x/100),
            coord:{
                text:columns[2]+'|'+columns[3],
                x:x,
                y:y,
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
    return `/game.php?${game.player.sitter != 0 ? "t="+game.player.id+"&":""}village=${game.village.id}&group=${group}&page=${page}&screen=overview_villages&mode=units`;
}

export async function fetchGroups():Promise<group[]>{
    let res = await $.ajax({url: server+`/game.php?${game.player.sitter != 0 ? "t="+game.player.id+"&":""}village=${game.village.id}& ${window.game_data.features.AccountManager.active? GroupsLocation:GroupsFallBackLocation}` });
    let groups:group[] = [];
    let groupsHTML = $(res).find('.group-menu-item').get();
    if(groupsHTML.length>0){
        groupsHTML.forEach((elem)=>{
            groups.push({
                id:parseInt($(elem).attr('data-group-id')),
                name:$(elem).text().trim().slice(1,-1),
            })
        })
    }else{
        let groupsHtml = $($(res).find('#paged_view_content').find('select').get()[0]).find('option').get();
        groupsHtml.forEach(group => {
            if(!$(group).is(':disabled')){
                let params = new URLSearchParams($(group).attr('value'));
                console.log(params,$(group).attr('value'));
                groups.push({
                    id:parseInt(params.get("group")),
                    name:$(group).text()
                });
            }
        });
    }
    return groups
}
 
export async function loadPages(groups:group[]){
    let villages:village[]=[];
    for (const group of groups) {
        const resultMain = await pageRequest(createLink(0,group.id),group.all)
        villages=[...villages,...resultMain.villages];
        await wait(200)

        for (let i = 0; i < resultMain.pageCnt; i++) {
            const result = await pageRequest(createLink(i+1,group.id),group.all)
            villages=[...villages,...result.villages];
            await wait(200) 
        }
    }

    return villages
}


async function wait(ms:number) {
    return new Promise<void>(async (resolve,reject)=>{
        setTimeout(()=>{
            resolve();
        },ms)
    })  
}


function pageRequest(url:string,all:boolean){
    return new Promise<pageData>( async (resolve,reject)=>{
            let result = await $.ajax({url: url});
            let resultVillages = await fetchVillage(result,all);
            resolve({
                pageCnt:parsePageInfo(result),
                villages:resultVillages,
            });
    })
}

function parsePageInfo(html:string){
    let select=$($(html).find('.paged-nav-item').get()[0]).parent().find('select');
    let pageCnt=0;
    if(select.length==1){
        let opt = select.find('option');
        pageCnt = opt.length-1;
    }else{
        pageCnt = $(html).find('.paged-nav-item').length-1;
    }

    return pageCnt
}

function getUnitNameFromUrl(url:string){
    let frag=url.split('/');
    return frag[frag.length-1].split('.')[0].replace('unit_','').replace('@2x','');
}

async function fetchVillage(html:any,all:boolean){  
    let unitTypes:unitTypes[]=[];
    let table = $(html).find('#units_table');
    let ths = $(table).find('thead th').get();
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

    let tbodys = $(table).find('tbody').get();
    let villagePool:village[]=[];
    for (const tbody of tbodys) {
        let trs = $(tbody).find('tr').get();

        let homeTd = $(trs[0]).find('td')
        let onWayTd = $(trs[3]).find('td')

        let villageID=parseInt($(homeTd).find('.quickedit-vn').attr('data-id'));     
        let units:units={spear:0,sword:0,axe:0,archer:0,spy:0,light:0,marcher:0,heavy:0,ram:0,catapult:0,knight:0,snob:0,}
        let size=0;

        unitTypes.forEach((type:unitTypes)=>{
            let valHome=parseInt($(homeTd[type.index]).text());
            let valOnWay=parseInt($(onWayTd[type.index-1]).text());
            let val=all? valHome+valOnWay:valHome;
            units[type.name as keyof units] = val;
            size+=window.unitConfig[type.name as keyof unitConfig].pop*val;
        })

        let villages = window.Villages
        let village:village = villages.find((elem:village)=>{ return elem.id==villageID})      
      
        let popRemain = 0;
        village.unitsContain=units;        
        village.popRemain=popRemain;
        village.popSize=size
        villagePool.push(village); 
    }

    return villagePool;
}

function transUnit(to:number,from:number,trans:number):[number,number]{
    if(trans<0){
        trans=from+trans;
        if(trans<0){
            trans=0;
        }
    }
    
    if(from-trans<0){
        to=from;
        from=0;
    }else{
        to+=trans
        from-=trans;
    }
    return [to,from];
}

export function TroopTransaction(to:units,from:units,trans:units):[units,units]{
    Object.keys(trans).forEach((unis)=>{
        [to[unis as keyof units],from[unis as keyof units]] = transUnit(to[unis as keyof units],from[unis as keyof units],trans[unis as keyof units]);
    })
    return [to,from]
}

export function calcUnitPop(units:units):number{
    let size=0;
    Object.keys(units).forEach((unit)=>{
        if(window.gameConfig.game.archer==0 && (unit=='archer' || unit=='marcher')) return
        size+=window.unitConfig[unit as keyof unitConfig].pop*units[unit as keyof unitConfig];
    })
    return size;
}

export function getSlowestUnit(units:units,isAttack:boolean):speed{
    
    var unitConfig = Object.keys(units)
    .map((k ) => { 
        if(window.gameConfig.game.archer==0 && (k=='archer' || k=='marcher')) return
        return { 
        key: k,
        value: window.unitConfig[k as keyof unitConfig].speed
        };
    }).sort((a,b)=>{
        return a.value>b.value? -1:1
    })

    if(!isAttack && units.knight>0){
        return {
            key:'knight',
            value:window.unitConfig.knight.speed
        }
    }

    for (let i = 0; i < unitConfig.length; i++) {
        if(units[unitConfig[i].key as keyof unitConfig]>0){
            return unitConfig[i]
        }
    }
    
}

export function coordDistance(village1:village | null, village2:village | null):number {
    if(!village1 || !village2){
        return null;
    }
    return Math.sqrt((Math.pow(village2.coord.x - village1.coord.x,2) + Math.pow(village2.coord.y - village1.coord.y,2)));
}

export function hasAvailableTroops(village:village,units:units){
    let keys= Object.keys(units);    
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if(key=='snob' && village.unitsContain[key as keyof unitConfig]>0 && units[key as keyof unitConfig]==0){
            console.log("ide");
            return false;
        }

        if(units[key as keyof unitConfig]==0){
            continue;
        }
        if(units[key as keyof unitConfig]<0 && village.unitsContain[key as keyof unitConfig]+units[key as keyof unitConfig]<0){
            return false;
        }
        if(village.unitsContain[key as keyof unitConfig]==0 && units[key as keyof unitConfig]==99999){
            return false; 
        }
        if(village.unitsContain[key as keyof unitConfig] < units[key as keyof unitConfig] 
            && units[key as keyof unitConfig]!=99999 && units[key as keyof unitConfig]>0){
            return false; 
        }    
    }
    return true; 
}

export async function savePlan(){
    await window.DB.setData('plans',window.attackPlan)
}

export function formatDateTime(date:Date | number){
    const dateName = getLangFormat()
    return new Intl.DateTimeFormat(dateName,{
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false,
    }).format(date);
}

export function formatDate(date:Date | number){
    const dateName = getLangFormat()
    return new Intl.DateTimeFormat(dateName,{
        year: 'numeric', month: '2-digit', day: '2-digit',
    }).format(date);
}