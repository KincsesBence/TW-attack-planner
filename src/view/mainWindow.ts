import { Lang } from "../core/Language";
import { Query } from "../core/Query";
import { addAttackModal } from "./addAttackModal";
import { addPlayerSpeedModal } from "./addPlayerSpeedModal";
import { autoAssignModal } from "./autoAssignModal";
import { calculatedAttackModal } from "./calculatedAttackModal";
import { confirmCalculateAttackModal } from "./confirmCalculateAttackModal";
import { confirmResetAssignmentsModal } from "./confirmResetAssignmentsModal";
import { editArrivalsModal } from "./editArrivalsModal";
import { editPlanNameModal } from "./editPlanNameModal";
import { editTargetModal } from "./editTargetModal";
import { editTemplatesModal } from "./editTemplatesModal";
import { launchItem } from "./launchItem";
import { targetItem } from "./targetItem";


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
            grid-template-columns: 260px 1.3fr 1.3fr;
            grid-template-rows: 30px 3fr [option] 0.1fr;
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
                "target-header"
                "target-list";
        }

        .target-header {
            grid-area: target-header; 
        }
        .target-list { grid-area: target-list; overflow-y:auto; }

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
            display: block;
        }
        .launch-header { 
            padding-right:5px;
            background: linear-gradient(to bottom,#e2c07c 0%,#dab874 44%,#c1a264 100%);
            grid-area: launch-header;
            display: grid;
            grid-template-columns:  1fr 1fr 1fr 1fr${window.gameConfig.game.archer==1 && ' 1fr'} 1fr 1fr${window.gameConfig.game.archer==1 && ' 1fr'} 1fr 1fr 1fr 1fr 1fr; 
            grid-template-rows: 30px;
            gap: 0px;
            grid-template-areas: 
                "size-icon spear-icon sword-icon axe-icon${window.gameConfig.game.archer==1 && ' archer-icon'} spy-icon light-icon${window.gameConfig.game.archer==1 && ' marcher-icon'} heavy-icon ram-icon catapult-icon pala-icon snob-icon"
        }

        .target-launch-header { 
            background: linear-gradient(to bottom,#e2c07c 0%,#dab874 44%,#c1a264 100%);
            grid-area: launch-header;
            display: grid;
            grid-template-columns:  30px 1fr 1fr 1fr${window.gameConfig.game.archer==1 && ' 1fr'} 1fr 1fr${window.gameConfig.game.archer==1 ? ' 1fr':''} 1fr 1fr 1fr 1fr 1fr 30px; 
            grid-template-rows: 30px;
            gap: 0px;
            grid-template-areas: 
                "size-icon spear-icon sword-icon axe-icon${window.gameConfig.game.archer==1 && ' archer-icon'} spy-icon light-icon${window.gameConfig.game.archer==1 && ' marcher-icon'} heavy-icon ram-icon catapult-icon pala-icon snob-icon del-icon"
        }

        .target-launch-header div {
            padding: 5px;
        }

        .target-launch-header img {
            margin: 0 auto;
            display: block;
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
        .del-icon { grid-area: del-icon; }

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

        .header-count{
            margin-left:10px;
            display: inline;
        }

        .header-count span{
            font-weight: bold;
            padding: 0 2px;
        }

        .btn-add-attack{
                font-size: 30px !important;
                padding: 0;
                line-height: 20px;
        }
    </style>
     <style>
            .targetsLauncher-item{
                height: max-content;
                border-top: solid 1px #6c4824;
                border-bottom: solid 1px #6c4824;
                margin-top:3px;
                text-align:center;
                display: grid; 
                grid-template-columns:  30px 1fr 1fr 1fr${window.gameConfig.game.archer==1 && ` 1fr`} 1fr 1fr${window.gameConfig.game.archer==1 && ` 1fr`} 1fr 1fr 1fr 1fr 1fr 30px; 
                grid-template-rows: 35px 30px ;
                gap: 0px 0px; 
                grid-template-areas: 
                    "size-field name-field name-field name-field${window.gameConfig.game.archer==1 && ` name-field`} name-field name-field${window.gameConfig.game.archer==1 && ` name-field`} name-field name-field name-field name-field name-field del-field"
                    "size-field spear-field sword-field axe-field${window.gameConfig.game.archer==1 && ` archer-field`} spy-field light-field${window.gameConfig.game.archer==1 && ` marcher-field`} heavy-field ram-field catapult-field knight-field snob-field del-field";
            }
            .del-field{ grid-area: del-field; padding: 20px 5px;background-color:#fff5dc;border-left: 1px solid #6c4824;}
            .size-field{ grid-area: size-field; padding: 5px 8px;background-color:#fff5dc;border-right: 1px solid #6c4824;}

            .launch-item{
            height: max-content;
            border-top: solid 1px #6c4824;
            border-bottom: solid 1px #6c4824;
            margin-top:3px;
            text-align:center;
            display: grid; 
            grid-template-columns:  1fr 1fr 1fr 1fr${window.gameConfig.game.archer==1 && ` 1fr`} 1fr 1fr${window.gameConfig.game.archer==1 && ` 1fr`} 1fr 1fr 1fr 1fr 1fr;
            grid-template-rows: 30px 30px ;
            gap: 0px 0px; 
            grid-template-areas:
                "check-field name-field name-field name-field${window.gameConfig.game.archer==1 && ` name-field`} name-field name-field${window.gameConfig.game.archer==1 && ` name-field`} name-field name-field name-field name-field name-field"
                "check-field spear-field sword-field axe-field${window.gameConfig.game.archer==1 && ` archer-field`} spy-field light-field${window.gameConfig.game.archer==1 && ` marcher-field`}  heavy-field ram-field catapult-field knight-field snob-field";
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

            .size-field img{
                height: 16px;
                float:right;
                padding: 15px 0;
            }

            .del-field .remove-target-btn{
                margin: 0 !important;
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
                display:grid;
                grid-area: name-field;
                color: #603000;
                font-weight: bold;
                background-color:#ecd8b2;
                padding: 5px 0;
            }
            .target-item{
                overflow-x:hidden;
                display: block;
                width:100%;
                margin: 5px 0;
                border-top: solid 1px #6c4824;
                border-bottom: solid 1px #6c4824;
            }
            .target-header{
                height:35px;
                width:100%;
                display: flex;
	            justify-content: space-around;
                background-color: #ecd8b2;
                cursor: pointer;
            }

            .target-header div{
                padding-top: 9px;
                padding-bottom: 9px;
            }

            .target-village-name{
                color: #603000;
                font-weight: bold;
            }
            .target-extras{
                flex-grow: 1;
            }

            .target-launchers{
                display:none;
                width:100%;
                min-height:20px;
                background-color: #fff5dc;
            }

            .remove-target-btn {
                float: right;
                z-index: 2;
                width: 20px;
                height: 20px;
                background: url(https://dshu.innogamescdn.com/asset/80b013af/graphic/login_close.png) top left no-repeat;
                cursor: pointer;
                background-size: 20px;
                margin-right: 10px;
            }
            .add-village-booster{
                background: url(https://klanhaboru.hu/graphic/plus.png) top left no-repeat;
                height: 16px;
                width: 16px;
                margin-left: 5px;
                cursor: pointer;
                display: inline-block;
                vertical-align: middle;
            }

            .indicator{
                font-size: 16px;
                padding-left: 5px;
                padding-right: 5px;
            }

            .indicator-open{
                transform: rotate(90deg);
            }

            .planner-modal {
                background: transparent url(https://dshu.innogamescdn.com/asset/fd86cac8/graphic/index/contentbg.png) scroll left top repeat;
                filter: drop-shadow(0 0 0.75rem rgb(88, 88, 88));
                width: max-content;
                height: fit-content;
                max-height: calc(100vh - 120px);
                border: 2px solid #6c4824;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
                border-radius: 10px;
                z-index: 100001;
                display: grid;
                align-content: space-evenly;
                grid-template-areas:
                    'header'
                    'content';
                grid-template-rows: 30px calc(100% - 30px);
            }

            .planner-modal-header {
                font-size:16px;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
                padding: 5px;
                grid-area: header;
                text-align: center;
                background: linear-gradient(to bottom,#e2c07c 0%,#dab874 44%,#c1a264 100%);
            }

            .planner-modal-content {
                display:grid;
                grid-area: content;
                padding: 10px;
            }

            .modal-input-group{
                display:inline-grid;
                text-align:center;
                border-bottom: solid 1px #603000;
                padding: 5px 0;
            }

            .modal-input-inline{
                display:block;
                text-align:center;
                border-bottom: solid 1px #603000;
                padding: 5px 0;
            }

            .modal-input-group label{
                margin-bottom:10px;
            }

            .modal-input-group input{
                margin-bottom:10px;
            }

            .modal-input-group textarea{
                margin-bottom:10px;
            }

            .modal-input-group button{
                margin-bottom:10px;
            }

            .modal-input-group input{
                text-align:center;
                font-size: 14px;
            }

            .modal-input-group select{
                text-align:center;
                font-size: 14px;
                margin-bottom:10px;
            }
            
            .del-boost {
                background: url(https://klanhaboru.hu/graphic/minus.png) top left no-repeat;
                height: 16px;
                width: 16px;
                margin-left: 5px;
                cursor: pointer;
                display: inline-block;
                vertical-align: middle;
            }

            .booster-button {
                display: inline;
            }

            .launch-search-bar{
                display: inline-block;

            }

            .launch-search-bar input{
                width:60px;
                font-size:12px;
            }

            .remove-search-btn {
                float: right;
                z-index: 2;
                width: 20px;
                height: 20px;
                background: url(https://dshu.innogamescdn.com/asset/80b013af/graphic/login_close.png) top left no-repeat;
                cursor: pointer;
                background-size: 20px;
            }

           

        </style>
    <div class="mainWindow">
        <div class="container">
            <div class="options-title header">
                <h3>${Lang('options')}</h3>
            </div>
            <div class="options-panel">
                <div class="option-item">
                    <h2 style="font-size: 1rem;"><span id="open-plan-name">${window.attackPlan.name}</span><a onclick="window.editName()" class="rename-icon" href="#" data-title="${'rename'}"></a></h2>
                </div>
                <div class="option-item">
                    <button onclick="window.editTargets()" class="btn">${Lang('editTargets')}</button>
                </div>
                <div class="option-item">
                    <button onclick="window.editArrivals()" class="btn">${Lang('editArrivals')}</button>
                </div>
                <div class="option-item">
                    <button onclick="window.editTemplates()" class="btn">${Lang('editTemplates')}</button>
                </div>
                <div class="option-item">
                    <button onclick="window.editPlayerBoosts()" class="btn">${Lang('editPalyerBoosters')}</button>
                </div>
                <div class="option-item">
                    <button onclick="window.openAutoAssignModal()" class="btn">${Lang('autoAssigner')}</button>
                </div>
                <div class="option-item">
                    <button onclick="window.calculateAttack()" class="btn">${Lang('calculateAttack')}</button>
                </div>
                <div class="option-item">
                    <button onclick="window.resetAssignments()" class="btn">${Lang('resetAssigments')}</button>
                </div>
            </div>
            <div class="target-title header">
                <h3>${Lang('targets')} (<span id="target-cnt"></span>)</h3>
            </div>
            <div class="target-panel">
                <div class="target-header">
                </div>
                <div class="target-list">
                </div>
            </div>
            <div class="launch-title header">
                <div class="launch-filter-bar">
                    <button onclick="window.launchVillagesQuery.order('coord.text')" class="btn">XY</button>
                    <button onclick="window.launchVillagesQuery.order('name')" class="btn">${Lang('name')}</button>
                    
                </div>
                <h3>${Lang('launchVillages')} (<span id="launch-cnt"></span>)</h3>
                <div class="launch-filter-bar">
                    <button onclick="window.launchVillagesQuery.order('popSize')" class="btn">${Lang('size')}</button>
                    <div class="launch-search-bar">
                        <input id="search-bar" onkeyup="window.launchVillagesQuery.search(this)" placeholder="${Lang('search')}" type="text">
                        <button onclick="window.launchVillagesQuery.resetAll()" class="btn">${Lang('reset')}</button>
                    </div>
                </div>
            </div>
            <div class="launch-panel">
                <div class="launch-header">
                    <div class="size-icon">
                        <button onclick="window.openAddLauncherWindow()" class="btn btn-add-attack">⬅</button>
                    </div>
                    <div class="spear-icon">
                        <img onclick="window.launchVillagesQuery.order('unitsContain.spear')" src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_spear.png">
                    </div>
                    <div class="sword-icon">
                        <img onclick="window.launchVillagesQuery.order('unitsContain.sword')" src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_sword.png">
                    </div>
                    <div class="axe-icon">
                        <img onclick="window.launchVillagesQuery.order('unitsContain.axe')" src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_axe.png">
                    </div>
                    ${window.gameConfig.game.archer==1 &&
                        /* html */`<div class="archer-icon">
                        <img onclick="window.launchVillagesQuery.order('unitsContain.archer')" src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_archer.png">
                    </div>`}
                    <div class="spy-icon">
                        <img onclick="window.launchVillagesQuery.order('unitsContain.spy')" src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_spy.png">
                    </div>
                    <div class="light-icon">
                        <img onclick="window.launchVillagesQuery.order('unitsContain.light')" src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_light.png">
                    </div>
                    ${window.gameConfig.game.archer==1 &&
                        /* html */`<div class="marcher-icon">
                            <img onclick="window.launchVillagesQuery.order('unitsContain.marcher')" src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_marcher.png">
                        </div>`
                    }
                    <div class="heavy-icon">
                        <img onclick="window.launchVillagesQuery.order('unitsContain.heavy')" src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_heavy.png">
                    </div>
                    <div class="ram-icon">
                        <img onclick="window.launchVillagesQuery.order('unitsContain.ram')" src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_ram.png">
                    </div>
                    <div class="catapult-icon">
                        <img onclick="window.launchVillagesQuery.order('unitsContain.catapult')" src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_catapult.png">
                    </div>
                    <div class="pala-icon">
                        <img onclick="window.launchVillagesQuery.order('unitsContain.pala')" src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_knight.png">
                    </div>
                    <div class="snob-icon">
                        <img onclick="window.launchVillagesQuery.order('unitsContain.snob')" src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_snob.png">
                    </div>
                </div>
                <div class="launch-list">
                </div>
            </div>
            <div class="credits">
                v0.1.2-beta [2024.06.08.]; by: toldi26
            </div>
        </div>
    </div>
    <div class="planner-modal" style="display:none;">
    <div class="planner-modal-header"><b></b></div>
    <div class="planner-modal-content"> </div>
    </div>
    <script>
        window.mainInit();
    </script>
    `
}

window.mainInit = () => {
    window.launchVillagesQuery = new Query(window.attackPlan.launchPool,$('.launch-list').get()[0],$('#launch-cnt').get()[0],launchItem,'name');
    window.launchVillagesQuery.render();
    window.targetPoolQuery = new Query(window.attackPlan.targetPool,$('.target-list').get()[0],$('#target-cnt').get()[0],targetItem,'village.name');
    window.targetPoolQuery.render();
}

window.openAddLauncherWindow = () => {
    if($('input[name="target"]:checked').get().length==0){
        window.UI.ErrorMessage(Lang('noTargetSel'))
        return;
    }

    if($('input[name="target"]:checked').get().length==0){
        window.UI.ErrorMessage(Lang('noTargetSel'))
        return;
    }

    if($('.launch-list').find("input:checked").get().length==0){
        window.UI.ErrorMessage(Lang('noLauncherSel'))
        return;
    }

    window.createModal(addAttackModal(),Lang('addAtatck'));
}

window.createModal = (content:string,header:string) => {
    let close=`<div id="plannerCloseBtn" class="modal-input-inline"><button class="btn" onclick="window.closeModal()">${Lang('close')}</button></div>`;
    $('.planner-modal-header b').text(header);
    $('.planner-modal-content').html(content+close);
    $('.planner-modal').show();
}

window.closeModal = () => {
    $('.planner-modal-header b').text('');
    $('.planner-modal-content').html('');
    $('.planner-modal').hide();
}

window.editName = () => {
    window.createModal(editPlanNameModal(window.attackPlan),Lang('renamePlan'));
}

window.editTargets = () => {
    window.createModal(editTargetModal(window.attackPlan.targetPool),Lang('editTargetsText'));
}

window.editArrivals = () =>{
    window.createModal(editArrivalsModal(window.attackPlan.arrivals),Lang('editArrivalsText'));
}

window.editTemplates = () =>{
    window.createModal(editTemplatesModal(window.attackPlan.templates),Lang('editTemplatesText'));
}
window.editPlayerBoosts = () =>{
    window.createModal(addPlayerSpeedModal(),Lang('editBoostersText'));
}
window.calculateAttack = () =>{
    let cnt=0;
    window.attackPlan.targetPool.forEach((target:target)=>{
        target.launchers.forEach((launcher:launcher)=>{
            cnt++;
        })
    })

    if (cnt==0){
        window.UI.ErrorMessage(Lang('noAttackAssigned'));
        return;
    }
    window.createModal(confirmCalculateAttackModal(),Lang('calculateAttack'));
}

window.confirmCalculateAttack = () =>{
    window.createModal(calculatedAttackModal(),Lang('attackPlan'));
}

window.openAutoAssignModal = ()=>{
    window.autoAssign.assignTypes=[];
    window.autoAssign.launchPoolCopy=structuredClone(window.attackPlan.launchPool)
    console.log(window.attackPlan.launchPool[5].unitsContain);
    console.log(window.autoAssign.launchPoolCopy[5].unitsContain);
    window.createModal(autoAssignModal(),Lang('autoAssigner'));
}

window.resetAssignments = ()=>{
    window.createModal(confirmResetAssignmentsModal(),Lang('resetAssigments'));
}


