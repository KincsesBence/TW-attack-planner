export const targetsLauncher = (launcher:launcher,targetId:number):string=>{    
    let size='small';
    if(launcher.village.popSize>1000 && launcher.village.popSize<=5000){
        size='medium';
    }else if(launcher.village.popSize>5000){
        size='large';
    }
    

    let src=`https://dshu.innogamescdn.com/asset/72737c96/graphic/command/attack_${size}.png`;

    if(!launcher.isAttack){
        src=`https://dshu.innogamescdn.com/asset/69990994/graphic/command/support.png`;
    }

    let units=Object.keys(launcher.village.unitsContain) as (keyof typeof launcher.village.unitsContain)[]
    let unitText=``;
    for (let i = 0; i < units.length; i++) {
        const key = units[i];
        if(window.gameConfig.game.archer==0 && (key=="archer" || key=="marcher")){
            continue;
        }
        unitText+=/* html */`<div class="${key}-field ${launcher.village.unitsContain[key]==0 ? `hidden` : ``}">${launcher.village.unitsContain[key]}</div>`;
    }

    return /* html */`
    <div class="targetsLauncher-item" id="${launcher.village.id.toString()}">
        <div class="name-field">${launcher.village.name} (${launcher.village.coord.text})</div>
        <div class="size-field"><img src="${src}"></div>
        ${unitText}
        <div class="del-field"><a onclick="window.targetItem.removeTargetLauncherItem(${launcher.village.id.toString()},${targetId})" class="remove-target-btn"></a></div>
    </div>`;
}
