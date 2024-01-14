import { launchItem } from "./launchItem";

export const mainWindow = ()=>{
    return /* html */`
    <style>
        ::-webkit-scrollbar {
    width: 5px;
    }
    
    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 10px;
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: grey;
        border-radius: 10px;
    }

        .mainWindow{
            width: 100%;
            height:85vh;
        }
        .popup_box_container{
            height:100% !important;
        }
        #popup_box_PlannerMainWindow{
            width: 95vw !important;
        }
        html{
            overflow: hidden !important;
        }
        .container {
            height: calc(100% - 10px);
            border: solid 2px #6c4824;
            border-radius:20px;
            display: grid;
            grid-template-columns: 0.5fr 1.3fr 1.3fr;
            grid-template-rows: 26px 3fr [option] 0.1fr;
            gap: 0px 0px;
            grid-auto-flow: row;
        }

        .options-title { 
            grid-area: 1 / 1 / 2 / 2; 
            border-top-left-radius: 20px;
            border-right: solid 2px #6c4824;
            border-bottom: solid 2px #6c4824;
        }

        .options-panel {
            border-right: solid 2px #6c4824;
            display: table;
        }

        .target-title { 
            grid-area: 1 / 2 / 2 / 3; 
            border-right: solid 1px #6c4824;
            border-bottom: solid 2px #6c4824;
        }

        .target-panel { 
            grid-area: 2 / 2 / 4 / 3; 
            border-right: solid 1px #6c4824;

            display: grid; 
            grid-template-columns: 1fr; 
            grid-template-rows: 30px 1fr; 
            gap: 0px 0px; 
            grid-template-areas: 
                "launch-header"
                "launch-list";
        }

        .traget-header {
            grid-area: traget-header; 
        }
        .target-list { grid-area: target-list; }

        .launch-title { 
            grid-area: 1 / 3 / 2 / 4;
            border-top-right-radius: 20px;
            border-left: solid 1px #6c4824;
            border-bottom: solid 2px #6c4824;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-evenly;
            align-items: flex-start;
            align-content: flex-start;
            flex-direction: row;
        }

        .launch-panel { 
            grid-area: 2 / 3 / 4 / 4; 
            border-left: solid 1px #6c4824;
            display: grid; 
            grid-template-columns: 1fr; 
            grid-template-rows: 30px 1fr; 
            gap: 0px 0px; 
            grid-template-areas: 
                "launch-header"
                "launch-list"; 
        }

        .launch-list {
            overflow-y:scroll;
            border-bottom-right-radius: 20px;
            grid-area: launch-list; 
            display: grid;
        }
        .launch-header { 
            padding-right:5px;
            background: linear-gradient(to bottom,#e2c07c 0%,#dab874 44%,#c1a264 100%);
            grid-area: launch-header;
            display: grid;
            grid-template-columns:  1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
            grid-template-rows: 30px;
            gap: 0px;
            grid-template-areas: 
                "size-icon spear-icon sword-icon axe-icon archer-icon spy-icon light-icon marcher-icon heavy-icon ram-icon catapult-icon pala-icon snob-icon"
        }

        .launch-filter-bar{
           
        }

        .credits { grid-area: option / 1 / 4 / 2; border-right: solid 2px #6c4824; padding:10px;}

        .header {
            background: linear-gradient(to bottom,#e2c07c 0%,#dab874 44%,#c1a264 100%);
            text-align: center;
            padding:3px;
        }

        .launch-header div{
            padding: 5px;
        }
        .launch-header img{
            margin: 0 auto;
            display: block;
            cursor: pointer;
        }

        .size-icon { grid-area: size-icon; }
        .spear-icon { grid-area: spear-icon; }
        .sword-icon { grid-area: sword-icon; }
        .axe-icon { grid-area: axe-icon; }
        .archer-icon { grid-area: archer-icon; }
        .spy-icon { grid-area: spy-icon; }
        .light-icon { grid-area: light-icon; }
        .marcher-icon { grid-area: marcher-icon; }
        .heavy-icon { grid-area: heavy-icon; }
        .ram-icon { grid-area: ram-icon; }
        .catapult-icon { grid-area: catapult-icon; }
        .pala-icon { grid-area: pala-icon; }
        .snob-icon { grid-area: snob-icon; }

        .option-item{
            width:100%;
            margin: 15px 0;
        }
        .option-item button{
            height: 30px;
            margin: 0 auto;
            display: block;
            min-width: 85%;
        }
        .option-item h2{
            text-align:center;
        }
    </style>
     <style>
            .launch-item{
            height: max-content;
            border-top: solid 1px #6c4824;
            border-bottom: solid 1px #6c4824;
            margin-top:3px;
            text-align:center;
            display: grid; 
            grid-template-columns:  1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;;
            grid-template-rows: 30px 30px ;
            gap: 0px 0px; 
            grid-template-areas:
                "check-field name-field name-field name-field ${window.gameConfig.game.archer==1 && `name-field`} name-field name-field ${window.gameConfig.game.archer==1 && `name-field`} name-field name-field name-field name-field name-field"
                "check-field spear-field sword-field axe-field ${window.gameConfig.game.archer==1 && `archer-field`} spy-field light-field ${window.gameConfig.game.archer==1 && `marcher-field`}  heavy-field ram-field catapult-field knight-field snob-field";
            }

            .check-field input{
                height:16px;
                width:16px;
                float:left;
            }

            .check-field img{
                height: 16px;
                float:right;
                padding-right:3px;
            }

            .check-field { grid-area: check-field; padding: 20px 0; background-color:#fff5dc; border-right:1px solid #6c4824}
            .spear-field { grid-area: spear-field; padding: 5px 0;background-color:#fff5dc}
            .sword-field { grid-area: sword-field; padding: 5px 0;background-color:#fff5dc}
            .axe-field { grid-area: axe-field; padding: 5px 0;background-color:#fff5dc}
            .archer-field { grid-area: archer-field; padding: 5px 0;background-color:#fff5dc}
            .spy-field { grid-area: spy-field; padding: 5px 0;background-color:#fff5dc}
            .light-field { grid-area: light-field; padding: 5px 0;background-color:#fff5dc}
            .marcher-field { grid-area: marcher-field; padding: 5px 0;background-color:#fff5dc}
            .heavy-field { grid-area: heavy-field; padding: 5px 0;background-color:#fff5dc}
            .ram-field { grid-area: ram-field; padding: 5px 0;background-color:#fff5dc}
            .catapult-field { grid-area: catapult-field; padding: 5px 0;background-color:#fff5dc}
            .knight-field { grid-area: knight-field; padding: 5px 0;background-color:#fff5dc}
            .snob-field { grid-area: snob-field; padding: 5px 0;background-color:#fff5dc}
            .name-field { 
                grid-area: name-field;
                color: #603000;
                font-weight: bold;
                background-color:#ecd8b2;
                padding: 5px 0;
            }
        </style>
    <div class="mainWindow">
        <div class="container">
            <div class="options-title header">
                <h3>Options</h3>
            </div>
            <div class="options-panel">
                <div class="option-item">
                    <h2>${window.attackPlan.name}</h2>
                </div>
                <div class="option-item">
                    <button class="btn">Add targets</button>
                </div>
                <div class="option-item">
                    <button class="btn">Edit arrivals</button>
                </div>
                <div class="option-item">
                    <button class="btn">Edit Templates</button>
                </div>
                <div class="option-item">
                    <button class="btn">Edit player buffs</button>
                </div>
                <div class="option-item">
                    <button class="btn">Auto assigner</button>
                </div>
                <div class="option-item">
                    <button class="btn">Calculate</button>
                </div>
                <div class="option-item">
                    <button class="btn">Reset assignments</button>
                </div>
            </div>
            <div class="target-title header">
                <h3>Targets</h3>
            </div>
            <div class="target-panel">
                <div class="traget-header">
                </div>
                <div class="target-list">
                </div>
            </div>
            <div class="launch-title header">
                <div class="launch-filter-bar">
                    <button onclick="window.oderLaunchVillages('coord')" class="btn">XY</button>
                    <button onclick="window.oderLaunchVillages('name')" class="btn">Name</button>
                    
                </div>
                <h3>Launch villages</h3>
                <div class="launch-filter-bar">
                    <button onclick="window.oderLaunchVillages('size')" class="btn">Size</button>
                    <button onclick="window.oderLaunchVillages('reset')" class="btn">Reset</button>
                </div>
            </div>
            <div class="launch-panel">
                <div class="launch-header">
                    <div class="size-icon">
                        <button class="btn"><---</button>
                    </div>
                    <div class="spear-icon">
                        <img onclick="window.oderLaunchVillages('spear')" src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_spear.png">
                    </div>
                    <div class="sword-icon">
                        <img onclick="window.oderLaunchVillages('sword')" src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_sword.png">
                    </div>
                    <div class="axe-icon">
                        <img onclick="window.oderLaunchVillages('axe')" src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_axe.png">
                    </div>
                    ${window.gameConfig.game.archer==1 &&
                        /* html */`<div class="archer-icon">
                        <img onclick="window.oderLaunchVillages('archer')" src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_archer.png">
                    </div>`}
                    <div class="spy-icon">
                        <img onclick="window.oderLaunchVillages('spy')" src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_spy.png">
                    </div>
                    <div class="light-icon">
                        <img onclick="window.oderLaunchVillages('light')" src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_light.png">
                    </div>
                    ${window.gameConfig.game.archer==1 &&
                        /* html */`<div class="marcher-icon">
                            <img onclick="window.oderLaunchVillages('marcher')" src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_marcher.png">
                        </div>`
                    }
                    <div class="heavy-icon">
                        <img onclick="window.oderLaunchVillages('heavy')" src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_heavy.png">
                    </div>
                    <div class="ram-icon">
                        <img onclick="window.oderLaunchVillages('ram')" src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_ram.png">
                    </div>
                    <div class="catapult-icon">
                        <img onclick="window.oderLaunchVillages('catapult')" src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_catapult.png">
                    </div>
                    <div class="pala-icon">
                        <img onclick="window.oderLaunchVillages('pala')" src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_knight.png">
                    </div>
                    <div class="snob-icon">
                        <img onclick="window.oderLaunchVillages('snob')" src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_snob.png">
                    </div>
                </div>
                <div class="launch-list">
                </div>
            </div>
            <div class="credits">
                v0.1.0-alpha; by: toldi26
            </div>
        </div>
    </div>
    <script>
        window.mainInit();
    </script>
    `
}

window.mainInit = () => {
    window.launchVillagesStep=25;
    window.launchVillagesPaging=0;
    window.launchVillagesWay=1;
    window.launchVillagesOrder='name';
    window.renderLaunchVillages();
}

var TimeOut:NodeJS.Timeout
window.oderLaunchVillages = (by:string) => {
    if(by==window.launchVillagesOrder){
        window.launchVillagesWay*=-1;
    }
    window.launchVillagesOrder=by;

    clearTimeout(TimeOut);
    TimeOut= setTimeout(()=>{
        let fn=null;
            switch (by){
                case "name": fn=(a:village,b:village)=>{return a.name<b.name? -1*window.launchVillagesWay:1*window.launchVillagesWay;};break;
                case "coord": fn=(a:village,b:village)=>{return a.coord.text<b.coord.text? -1*window.launchVillagesWay:1*window.launchVillagesWay;};break;
                case "size": fn=(a:village,b:village)=>{return a.popSize>b.popSize? -1*window.launchVillagesWay:1*window.launchVillagesWay;};break;
                case "spear": fn=(a:village,b:village)=>{return a.unitsContain.spear>b.unitsContain.spear? -1*window.launchVillagesWay:1*window.launchVillagesWay;};break;
                case "sword": fn=(a:village,b:village)=>{return a.unitsContain.sword>b.unitsContain.sword? -1*window.launchVillagesWay:1*window.launchVillagesWay;};break;
                case "axe": fn=(a:village,b:village)=>{return a.unitsContain.axe>b.unitsContain.axe? -1*window.launchVillagesWay:1*window.launchVillagesWay;};break;
                case "archer": fn=(a:village,b:village)=>{return a.unitsContain.archer>b.unitsContain.archer? -1*window.launchVillagesWay:1*window.launchVillagesWay;};break;
                case "light": fn=(a:village,b:village)=>{return a.unitsContain.light>b.unitsContain.light? -1*window.launchVillagesWay:1*window.launchVillagesWay;};break;
                case "spy": fn=(a:village,b:village)=>{return a.unitsContain.spy>b.unitsContain.spy? -1*window.launchVillagesWay:1*window.launchVillagesWay;};break;
                case "marcher": fn=(a:village,b:village)=>{return a.unitsContain.marcher>b.unitsContain.marcher? -1*window.launchVillagesWay:1*window.launchVillagesWay;};break;
                case "heavy": fn=(a:village,b:village)=>{return a.unitsContain.heavy>b.unitsContain.heavy? -1*window.launchVillagesWay:1*window.launchVillagesWay;};break;
                case "ram": fn=(a:village,b:village)=>{return a.unitsContain.ram>b.unitsContain.ram? -1*window.launchVillagesWay:1*window.launchVillagesWay;};break;
                case "catapult": fn=(a:village,b:village)=>{return a.unitsContain.catapult>b.unitsContain.catapult? -1*window.launchVillagesWay:1*window.launchVillagesWay;};break;
                case "snob": fn=(a:village,b:village)=>{return a.unitsContain.snob>b.unitsContain.snob? -1*window.launchVillagesWay:1*window.launchVillagesWay;};break;
                case "knight": fn=(a:village,b:village)=>{return a.unitsContain.knight>b.unitsContain.knight? -1*window.launchVillagesWay:1*window.launchVillagesWay;};break;
                default:
                fn=(a:village,b:village)=>{return a.name<b.name? -1:1;};
                window.launchVillagesStep=25;
                window.launchVillagesPaging=0;
                window.launchVillagesWay=1;
            }
            window.attackPlan.launchPool.sort(fn);
        $('.launch-list').html('');
        $('.launch-list').scrollTop(0);
        window.launchVillagesPaging=0;
        
        window.renderLaunchVillages();
    },500)
}

window.renderLaunchVillages = async ()=>{
    if(window.attackPlan.launchPool.length<window.launchVillagesPaging){
        return;
    }
    var launchList = document.getElementsByClassName('launch-list')[0];
    console.log(window.launchVillagesPaging,window.launchVillagesPaging+window.launchVillagesStep);
    let to=window.launchVillagesPaging+window.launchVillagesStep
    if(window.launchVillagesPaging+window.launchVillagesStep>window.attackPlan.launchPool.length){
        to=window.attackPlan.launchPool.length;
    }

    for (let i = window.launchVillagesPaging; i < to; i++) {
        const village = window.attackPlan.launchPool[i];
        launchList.appendChild(launchItem(village));
    }

    
    window.launchVillagesPaging+=window.launchVillagesStep;
    
    launchList.addEventListener('scroll', function(ev) {
        let max=launchList.scrollHeight-100;
        let pos= launchList.clientHeight+launchList.scrollTop;

        let isOver=false;
        if(max<=pos && !isOver){
            isOver=true;
            window.renderLaunchVillages();
        }
    })
}


