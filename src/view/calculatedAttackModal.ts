import { coordDistance, game } from "../core/Api";
import { Lang } from "../core/Language";

export const calculatedAttackModal = ()=>{
    const unitCode=['spear','sword','axe','archer','spy','light','marcher','heavy','ram','catapult','knight','snob'];
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
                let qrlink=``;
                Object.keys(window.unitConfig).forEach((key,index)=>{
                    if(!launcher.village.unitsContain.hasOwnProperty(key)) return;
                    if(launcher.village.unitsContain[key as keyof unitConfig]>0){
                        smartlink+=`&${key}=${launcher.village.unitsContain[key as keyof unitConfig]}`;
                        qrlink+=`${unitCode.indexOf(key).toString(16)}:${launcher.village.unitsContain[key as keyof unitConfig].toString(16)},`;
                    }
                }); 
                
    
                attacks.push({
                    launchDate:launchtext,
                    launchLink:`https://${window.location.host}/game.php?village=${launcher.village.id}&screen=place&target=${target.village.id}${smartlink}`,
                    qrdata:`${launcher.isAttack? 1:0},`+
                    `${unitCode.indexOf(launcher.unitSpeed.key).toString(16)},`+
                    `${new Date(launchtext).getTime().toString(16)},`+
                    `${launcher.village.id.toString(16)},`+
                    `${target.village.id.toString(16)},`+
                    `${sanitizeQRtext(target.village.name)},`+
                    `${qrlink.slice(0,-1)};`,
                    unitSpeed:launcher.unitSpeed,
                    villageFrom:launcher.village,
                    villageTo:target.village,
                    note:launcher.notes,
                    isAttack:launcher.isAttack
                })
            })
        })
        attacks.sort((attack1,attack2)=>{return attack1.launchDate>attack2.launchDate ? 1:-1});
        let {bbcode,html,QRhtml} = generateLaunchText(attacks);
        console.log(QRhtml);
        

        $('.bb-field').html(bbcode);
        $('.inApp-field').html(html);
        $('.qr-field').html(QRhtml);
        
        
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
        <label for="inapp">mobile-app:</label>
        <input onclick="window.changeDisplayType()" type="radio" id="mobile" value="mobile" name="showType" >
        <div class="bb-field" style="display:none;max-height:600px; overflow-y: auto;"></div>
        <div class="inApp-field" style="max-height:600px; overflow-y: auto;"></div>
        <div class="qr-field" style="display:none;max-height:650px; overflow-y: auto;"></div>
    </div>
    `
}

export function generateLaunchText(attacks:attack[]):{bbcode:string,html:string,QRhtml:string}{
    let maxChar=60000;
    let currentChar=0;
    let pageCnt=1;
    let header=`<textarea style="resize:none;overflow: hidden;height:100px;width:400px;">[table][**] [||][building]barracks[/building][||]${Lang('launch')}[||]${Lang('target')}[||]${Lang('command')}[||]${Lang('note')}[/**]`;
    let closing='[/table]</textarea><br>';
    let bbcode='';
    let QRhtml='';
    let QRPage=1;
    let QR=`twla://${QRPage.toString(16)}:-pageCnt-,${window.location.hostname},${sanitizeQRtext(window.attackPlan.name)}/`;
    let html=`<table class="vis"><tr><th></th><th></th><th>${Lang('launch')}</th><th>${Lang('target')}</th><th>${Lang('command')}</th><th>${Lang('note')}</th></tr>`;
    for (let i = 0; i < attacks.length; i++) {
        let temp=`[*]#${i+1}[|][unit]${attacks[i].unitSpeed.key}[/unit][|][b]${attacks[i].launchDate}[/b]`
        +`[|] ${attacks[i].villageTo.coord.text} [|][url=${attacks[i].launchLink}]${attacks[i].isAttack ? Lang('attack'):Lang('support')}[/url][|]${attacks[i].note}`;
        if(currentChar+temp.length+closing.length>=maxChar){
            currentChar=0;
            pageCnt++;
            bbcode+=closing;
        }
        if(currentChar==0){
            bbcode+=`${pageCnt}.${Lang('page')}<br>`+header
            currentChar+=header.length;
        }

        if(QR.length+attacks[i].qrdata.length>1000){
            QRhtml+=`<h3>${QRPage}.Oldal</h3><div><p><img src="https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${QR}"></p></div>`;
            QRPage++;
            QR=`twla://${QRPage.toString(16)}/`;
        }

        QR+=attacks[i].qrdata;

        if(i == attacks.length-1){
            QRhtml+=`<h3>${QRPage}.Oldal</h3><div><p><img src="https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${QR}"></p></div>`;
        }

        bbcode+=temp;
        currentChar+=temp.length;
       
        html+=`<tr><td>#${i+1}</td><td><img src="/graphic/unit/unit_${attacks[i].unitSpeed.key}.png"></td><td>${attacks[i].launchDate}</td>`+
        `<td><a target="_blank" href="/game.php?village=${game.village.id}&screen=info_village&id=${attacks[i].villageTo.id}">${attacks[i].villageTo.name} (${attacks[i].villageTo.coord.text}) </a></td><td><a href="${attacks[i].launchLink}">${attacks[i].isAttack ? Lang('attack'):Lang('support')}</a></td><td>${attacks[i].note}</td></tr>`
    }
    html+='</table>'
    
    QRhtml = QRhtml.replace('-pageCnt-',QRPage.toString(16));

    return {bbcode,html,QRhtml}
}

window.changeDisplayType = () => {
    let val=$('input[name=showType]:checked').val();
    $('.inApp-field').hide();
    $('.bb-field').hide();
    $('.qr-field').hide();
    switch(val){
        case 'bb':
            $('.bb-field').show();
        break;
        case 'inapp':
            $('.inApp-field').show();
        break;
        case 'mobile':
            $('.qr-field').show();
            $( ".qr-field").accordion();
        break;
    }
}

function sanitizeQRtext(text:string):string{
    const list=[';','/',',',':'];
    list.forEach((item)=>{
        text=text.replaceAll(item,' ');
    })

    return text;
}