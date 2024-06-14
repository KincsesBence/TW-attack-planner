import { coordDistance, game } from "../core/Api";
import { Lang } from "../core/Language";

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
                Object.keys(target.village.unitsContain).forEach((key)=>{
                    if(launcher.village.unitsContain[key as keyof unitConfig]>0){
                        smartlink+=`&${key}=${launcher.village.unitsContain[key as keyof unitConfig]}`;
                    }
                }); 
    
                attacks.push({
                    launchDate:launchtext,
                    launchLink:`https://${window.location.host}/game.php?village=${launcher.village.id}&screen=place&target=${target.village.id}${smartlink}`,
                    unitSpeed:launcher.unitSpeed,
                    villageFrom:launcher.village,
                    villageTo:target.village,
                    note:launcher.notes,
                    isAttack:launcher.isAttack
                })
            })
        })
        console.log(attacks);
        attacks.sort((attack1,attack2)=>{return attack1.launchDate>attack2.launchDate ? 1:-1});
        let {bbcode,html} = generateLaunchText(attacks);
        $('.bb-field').html(bbcode);
        $('.inApp-field').html(html);
        console.log(bbcode,html);
        
        
        $('#dialog-loading').hide();
        $('.modal-input-inline').show();
    }

    setTimeout(()=>{calculate()}, 2000);
   
    return /* html */`
    <div id="dialog-loading">
            <img style="height:25px" src="https://dshu.innogamescdn.com/asset/6389cdba/graphic/loading.gif"><span style="padding:5px">${Lang('calculaing')}...</span>
    </div>
    <div class="modal-input-inline" style="display:none">
        <label for="bb">${Lang('bbCode')}:</label>
        <input onclick="window.changeDisplayType()" type="radio" id="bb" value="bb" name="showType" >
        <label for="inapp">In-app:</label>
        <input onclick="window.changeDisplayType()" type="radio" id="inapp" value="inapp" name="showType" checked>
        <div class="bb-field" style="display:none"></div>
        <div class="inApp-field" style="max-height:600px; overflow-y: auto;">
        </div>
    </div>
    `
}

export function generateLaunchText(attacks:attack[]):{bbcode:string,html:string}{
    let maxChar=60000;
    let currentChar=0;
    let pageCnt=1;
    let header=`<textarea style="resize: none;height:100px;width:400px;">[table][**] [||][building]barracks[/building][||]${Lang('launch')}[||]${Lang('target')}[||]${Lang('command')}[||]${Lang('note')}[/**]`;
    let closing='[/table]</textarea>';
    let bbcode='';
    let html=`<table class="vis"><tr><th></th><th></th><th>${Lang('launch')}</th><th>${Lang('target')}</th><th>${Lang('command')}</th><th>${Lang('note')}</th></tr>`;
    for (let i = 0; i < attacks.length; i++) {
        let temp=`[*]#${i+1}[|][unit]${attacks[i].unitSpeed.key}[/unit][|][b]${attacks[i].launchDate}[/b]`
        +`[|] ${attacks[i].villageTo.coord.text} [|][url=${attacks[i].launchLink}]${attacks[i].isAttack ? Lang('attack'):Lang('support')}[/url][|]${attacks[i].note}`;
        if(currentChar+temp.length+closing.length>=maxChar){
            currentChar=0;
            bbcode+=closing;
        }
        if(currentChar==0){
            bbcode+=`${pageCnt}.${Lang('page')}<br>`+header
            currentChar+=header.length;
        }
        
        bbcode+=temp;
        currentChar+=temp.length;
        html+=`<tr><td>#${i+1}</td><td><img src="/graphic/unit/unit_${attacks[i].unitSpeed.key}.png"></td><td>${attacks[i].launchDate}</td>`+
        `<td><a target="_blank" href="/game.php?village=${game.village.id}&screen=info_village&id=${attacks[i].villageTo.id}">${attacks[i].villageTo.name} (${attacks[i].villageTo.coord.text}) </a></td><td><a href="${attacks[i].launchLink}">${attacks[i].isAttack ? Lang('attack'):Lang('support')}</a></td><td>${attacks[i].note}</td></tr>`
    }
    html+='</table>'
    console.log(bbcode,html);

    return {bbcode,html}
}

window.changeDisplayType = () => {
    if ($('input[name=showType]:checked').val()=='bb') {
        $('.bb-field').show();
        $('.inApp-field').hide();
    }else{
        $('.bb-field').hide();
        $('.inApp-field').show();
    }
}