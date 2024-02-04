import { coordDistance } from "../core/Api";

export const calculatedAttackModal = ()=>{

    function calculate(){
        let attacks:attack[]=[];
        window.attackPlan.targetPool.forEach((target:target)=>{
            let boostIndx=window.attackPlan.boosters.findIndex((booster:boost)=>{return booster.playerId==target.village.owner});
            target.launchers.forEach((launcher:launcher)=>{
                let boost:number=1;
    
                if(boostIndx>-1){
                    target.booster=window.attackPlan.boosters[boostIndx].value;
                }
                
                if(!launcher.isAttack){
                    boost+=target.booster/100;        
                }
                
                let speed:number=launcher.unitSpeed.value*60;
                
                let attackDate=new Date(launcher.arrival)
                let launch=new Date(attackDate.valueOf() 
                - Math.round((speed * 1000 / window.gameConfig.speed / (window.gameConfig.unit_speed*boost)) 
                * coordDistance(launcher.village,target.village)));
                let launchtext = new Intl.DateTimeFormat('hu-hu', {
                    year: 'numeric', month: '2-digit', day: '2-digit',
                    hour: '2-digit', minute: '2-digit', second: '2-digit',
                    hour12: false,
                }).format(launch);

                let smartlink=``;
                Object.keys(window.unitConfig).forEach((key)=>{
                    if(launcher.village.unitsContain[key as keyof unitConfig]>0){
                        smartlink+=`&${key}=${launcher.village.unitsContain[key as keyof unitConfig]}`;
                    }
                }); 
    
                attacks.push({
                    launchDate:launchtext,
                    launchLink:`${window.location.host}/game.php?village=${launcher.village.id}&screen=place&target=${target.village.id}${smartlink}`,
                    unitSpeed:launcher.unitSpeed,
                    villageFrom:launcher.village,
                    villageTo:target.village,
                    note:launcher.notes,
                    isAttack:launcher.isAttack
                })
            })
        })
        console.log(attacks);
        
        $('#dialog-loading').hide();
    }

    setTimeout(()=>{calculate()}, 2000);
   
    return /* html */`
    <div id="dialog-loading">
            <img style="height:25px" src="https://dshu.innogamescdn.com/asset/6389cdba/graphic/loading.gif"><span style="padding:5px">Betöltés...</span>
    </div>
    <div class="modal-input-inline">
        <label for="bb">BB kód:</label>
        <input type="radio" value="bb" name="showType" checked>
        <label for="inapp">In-app:</label>
        <input type="radio" value="inapp" name="showType">
    </div>
    `
}