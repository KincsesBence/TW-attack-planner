import { calcUnitPop, game } from "../core/Api";

export const launchItem = (village:village):string=>{   

    village.popSize=calcUnitPop(village.unitsContain)

    let size='small';
    if(village.popSize>1000 && village.popSize<=5000){
        size='medium';
    }else if(village.popSize>5000){
        size='large';
    }

    let units=Object.keys(village.unitsContain) as (keyof typeof village.unitsContain)[]

    return /* html */`
        <div class="launch-item" id="${village.id}">
            <div class="name-field">
                <a href="/game.php?village=${game.village.id}&screen=info_village&id=${village.id}" target="_blank">${village.name} (${village.coord.text}) K${village.kontinent}</a>
            </div>
            <div class="check-field">
                <input type="checkbox" value="${village.id}"><img src="https://dshu.innogamescdn.com/asset/72737c96/graphic/command/attack_${size}.png">
            </div>
            ${units.map((key: keyof units)=>{
                if(window.gameConfig.game.archer==0 && (key=="archer" || key=="marcher")){
                    return;
                }
                return /* html */`<div class="${key}-field ${village.unitsContain[key]==0 ? `hidden` : ``}">${village.unitsContain[key]}</div>`
            }).join('')}
        </div>`

}