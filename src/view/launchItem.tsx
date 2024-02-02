export const launchItem = (village:village):HTMLDivElement=>{    
    let launchItem = document.createElement("div");
    launchItem.className="launch-item";
    launchItem.id=village.id.toString();

    let nameField  = document.createElement("div");
    nameField.className=`name-field`;
    nameField.innerText=`${village.name} (${village.coord.text})`;
    launchItem.appendChild(nameField)

    let checkBox = document.createElement("input");
    checkBox.value=`${village.id}`;
    checkBox.type="checkbox";
    let img = document.createElement("img");
    let size='small';
    if(village.popSize>1000 && village.popSize<=5000){
        size='medium';
    }else if(village.popSize>5000){
        size='large';
    }
    img.src=`https://dshu.innogamescdn.com/asset/72737c96/graphic/command/attack_${size}.png`;
    let checkField  = document.createElement("div");
    checkField.className=`check-field`;
    checkField.appendChild(checkBox);
    checkField.appendChild(img);
    launchItem.appendChild(checkField);

    let units=Object.keys(village.unitsContain) as (keyof typeof village.unitsContain)[]
    for (let i = 0; i < units.length; i++) {
        const key = units[i];
        if(window.gameConfig.game.archer==0 && (key=="archer" || key=="marcher")){
            continue;
        }

        let uf  = document.createElement("div");
        uf.className=`${key}-field ${village.unitsContain[key]==0 ? `hidden` : ``}`;
        uf.innerText=`${village.unitsContain[key]}`;
        launchItem.appendChild(uf);
    }

    return launchItem;
}