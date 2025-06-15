import { AssetName, TroopTransaction, calcTargetInfo, game, savePlan } from "../core/Api";
import { Lang } from "../core/Language";
import { ConfirmVillageSpeedRemoveModal } from "./ConfirmVillageSpeedRemoveModal";
import { addVillageBoosterModal } from "./addVillageSpeedModal";
import { confirmRemoveModal } from "./confirmRemoveModal";
import { confirmRemoveTargetModal } from "./confirmRemoveTargetModal";
import { targetsLauncher } from "./targetsLauncher";

export const targetItem = (target:target)=>{

    return /* html */`
    <div id="${target.village.id}" class="target-item">
        <div class="target-header" onclick="targetItem.selectTargetItem(event,${target.village.id})">
            <div class="target-radio"><input value="${target.village.id}" onclick="targetItem.selectTargetItem(event,${target.village.id})" type="radio" name="target" ${target.isSelected? `checked`:``}/></div>
            <div onclick="targetItem.toggleTargetItem(event,${target.village.id})" class="indicator ${target.isOpen? 'indicator-open':''}"><span >▶<span></div>
            <div class="target-village-name"><a target="_blank" href="/game.php?village=${game.village.id}&screen=info_village&id=${target.village.id}">${target.village.name} (${target.village.coord.text}) K${target.village.kontinent}</a>${(target.village.owner as owner).name? ` (${(target.village.owner as owner).name})`:'' }</div>
            <div class="target-extras">
                ${target.booster>0 ? /* html */`
                <div class="booster-button">( ${target.booster}% <img height="15" src="${AssetName}/graphic/items/3005.png">) <a class="del-boost" onclick="targetItem.removeVillageBooster(event,${target.village.id})"></a></div>
                `
                :/* html */`
                    <a onclick="targetItem.addVillageBooster(event,${target.village.id})" class="add-village-booster"></a>
                `
                }
                ${target.info? /* html */`
                <div class="header-count">
                    ${target.info.snob>0? /* html */`<img height="14px" src="${AssetName}/graphic/unit/unit_snob.png"><span>${target.info.snob}<span>`:''}
                    ${target.info.large>0? /* html */`<img src="${AssetName}/graphic/command/attack_large.png"><span>${target.info.large}<span>`:''}
                    ${target.info.medium>0? /* html */`<img src="${AssetName}/graphic/command/attack_medium.png"><span>${target.info.medium}<span>`:''}
                    ${target.info.small>0? /* html */`<img src="${AssetName}/graphic/command/attack_small.png"><span>${target.info.small}<span>`:''}
                    ${target.info.sup>0? /* html */`<img src="${AssetName}/graphic/command/support.png"><span>${target.info.sup}<span>`:''}
                </div>`:``
                }
            </div>
            <div><a onclick="targetItem.removeTargetItem(event,${target.village.id})" class="remove-target-btn"></a></div>
        </div>
        <div class="target-launchers" style="display: ${target.isOpen ? 'block':'none' };">
        <div class="target-launch-header">
            <div class="spear-icon">
                <img src="${AssetName}/graphic/unit/unit_spear.png">
            </div>
            <div class="sword-icon">
                <img src="${AssetName}/graphic/unit/unit_sword.png">
            </div>
            <div class="axe-icon">
                <img  src="${AssetName}/graphic/unit/unit_axe.png">
            </div>
            ${window.gameConfig.game.archer==0 ?
            /* html */``:/* html */`
            <div class="archer-icon">
                <img src="${AssetName}/graphic/unit/unit_archer.png">
            </div>
            `}
            <div class="spy-icon">
                <img src="${AssetName}/graphic/unit/unit_spy.png">
            </div>
            <div class="light-icon">
                <img src="${AssetName}/graphic/unit/unit_light.png">
            </div>
            ${window.gameConfig.game.archer==0 ?
            /* html */``:/* html */`
            <div class="marcher-icon">
                <img src="${AssetName}/graphic/unit/unit_marcher.png">
            </div>
            `}
            <div class="heavy-icon">
                <img src="${AssetName}/graphic/unit/unit_heavy.png">
            </div>
            <div class="ram-icon">
                <img src="${AssetName}/graphic/unit/unit_ram.png">
            </div>
            <div class="catapult-icon">
                <img src="${AssetName}/graphic/unit/unit_catapult.png">
            </div>
            <div class="pala-icon">
                <img src="${AssetName}/graphic/unit/unit_knight.png">
            </div>
            <div class="snob-icon">
                <img src="${AssetName}/graphic/unit/unit_snob.png">
            </div>
            <div class="del-icon"></div> 
        </div>
        ${target.launchers.map((launcher)=>{
            return targetsLauncher(launcher,target.village.id)
        }).join('')}
        </div>
    </div>
    `
}

window.targetItem = {
    toggleTargetItem:(e,id) => {
        const target = $('.target-list').find(`#${id}`);
        target.find('.target-launchers').toggle();
        target.find('.indicator').toggleClass('indicator-open');
        target.find('input').prop('checked', true);
        let ind = window.attackPlan.targetPool.findIndex((target)=>{return target.village.id==id})
        window.attackPlan.targetPool[ind].isOpen=!window.attackPlan.targetPool[ind].isOpen;
        e.stopPropagation();
    },
    selectTargetItem:(e,id)=>{
        window.attackPlan.targetPool.forEach((target:target)=>{
            if(target.village.id==id){
                target.isSelected=true;
                target.isOpen=true;
            }else{
                target.isSelected=false;
            }
        })
        const target = $('.target-list').find(`#${id}`)
        target.find('input').prop('checked', true);
        target.find('.target-launchers').show();
        target.find('.indicator').addClass('indicator-open');
        e.stopPropagation();
    },
    removeTargetItem:(event:Event,target:number)=>{
        event.stopPropagation();
        $('.planner-modal-header b').text(Lang('removeTarget'));
        $('.planner-modal-content').html(confirmRemoveTargetModal(target));
        $('.planner-modal').show();
    },
    confirmRemoveTargetItem:(target:number)=>{
        let partialRender:village[]=[];
        let targetIndex=window.attackPlan.targetPool.findIndex((tp)=>{return tp.village.id==target})
        let needRerender:boolean=false;
        if(targetIndex<-1){
            return;
        }
        window.attackPlan.targetPool[targetIndex].launchers.forEach((launcher)=>{

            let LauncherIndex=window.attackPlan.launchPool.findIndex((lp)=>{return lp.id==launcher.village.id});
           
            if(LauncherIndex==-1){
                let newVillage={...launcher.village};
                window.attackPlan.launchPool.push(newVillage);
                needRerender=true;
            }else{
                [window.attackPlan.launchPool[LauncherIndex].unitsContain,
                launcher.village.unitsContain]  
                = TroopTransaction(
                    window.attackPlan.launchPool[LauncherIndex].unitsContain,
                    launcher.village.unitsContain,
                    launcher.village.unitsContain
                )
                partialRender.push(launcher.village);
            }
        });

        if(needRerender){
            window.launchVillagesQuery.resetAll();
        }else{
            window.launchVillagesQuery.partialRender(partialRender,'id');
        }
        
        window.attackPlan.targetPool.splice(targetIndex,1);
        window.targetPoolQuery.resetAll();
        window.closeModal();
        savePlan()
    },
    removeTargetLauncherItem:(launcher:number,target:number)=>{
        $('.planner-modal-header b').text(Lang('removeAttack'));
        $('.planner-modal-content').html(confirmRemoveModal(launcher,target));
        $('.planner-modal').show();
    },
    confirmRemoveTargetLauncherItem:(launcher:number,target:number)=>{

        let renderLauncher=[];

        let targetIndex=window.attackPlan.targetPool.findIndex((tp)=>{return tp.village.id==target})

        if(targetIndex<-1){
            return;
        }

        let targetLauncherIndex=window.attackPlan.targetPool[targetIndex].launchers.findIndex((tl)=>{return tl.village.id==launcher})
        
        if(targetLauncherIndex<-1){
            return;
        }

        let LauncherIndex=window.attackPlan.launchPool.findIndex((lp)=>{return lp.id==launcher});

        if(LauncherIndex==-1){
            let newVillage={...window.attackPlan.targetPool[targetIndex].launchers[targetLauncherIndex].village};
            window.attackPlan.launchPool.push(newVillage);
            window.attackPlan.targetPool[targetIndex].launchers.splice(targetLauncherIndex,1);
            window.launchVillagesQuery.resetAll();
        }else{
            
            [window.attackPlan.launchPool[LauncherIndex].unitsContain,
            window.attackPlan.targetPool[targetIndex].launchers[targetLauncherIndex].village.unitsContain]  
            = TroopTransaction(
                window.attackPlan.launchPool[LauncherIndex].unitsContain,
                window.attackPlan.targetPool[targetIndex].launchers[targetLauncherIndex].village.unitsContain,
                window.attackPlan.targetPool[targetIndex].launchers[targetLauncherIndex].village.unitsContain
            )
            console.log(window.attackPlan.launchPool[LauncherIndex].unitsContain,window.attackPlan.targetPool[targetIndex].launchers[targetLauncherIndex].village.unitsContain);


            renderLauncher.push(window.attackPlan.launchPool[LauncherIndex]);
            window.attackPlan.targetPool[targetIndex].launchers.splice(targetLauncherIndex,1);
            window.attackPlan.targetPool[targetIndex].launchers.sort((a,b)=>{return a.arrival>b.arrival? 1:-1})
        }
        window.attackPlan.targetPool[targetIndex].info=calcTargetInfo(window.attackPlan.targetPool[targetIndex].launchers);
        window.launchVillagesQuery.partialRender(renderLauncher,"id");
        window.targetPoolQuery.partialRender([window.attackPlan.targetPool[targetIndex]],"village.id");
        window.closeModal();
        savePlan()
    },
    addVillageBooster:(event:Event,target:number)=>{
        event.stopPropagation();
        $('.planner-modal-header b').text(Lang('addVillageBoost'));
        $('.planner-modal-content').html(addVillageBoosterModal(target));
        $('.planner-modal').show();
    },
    confirmAddVillageBooster:(target:number)=>{
        let targetIndex=window.attackPlan.targetPool.findIndex((tp)=>{return tp.village.id==target})
        if(targetIndex<-1){
            return;
        }
        const boostval=parseInt($('#planner-village-boost').val().toString());

        if(boostval<1 || boostval>100) {
            window.UI.ErrorMessage(Lang('addVillageBoostError'))
            return
        }

        window.attackPlan.targetPool[targetIndex].booster = boostval
        window.closeModal();
        window.targetPoolQuery.partialRender([window.attackPlan.targetPool[targetIndex]],"village.id");
        savePlan()
    },
    removeVillageBooster:(event:Event,target:number)=>{
        event.stopPropagation();
        $('.planner-modal-header b').text(Lang('removeVillageBoost'));
        $('.planner-modal-content').html(ConfirmVillageSpeedRemoveModal(target));
        $('.planner-modal').show();
    },
    confirmRemoveVillageBooster:(target:number)=>{
        window.closeModal();
        let targetIndex=window.attackPlan.targetPool.findIndex((tp)=>{return tp.village.id==target})
        if(targetIndex<-1){
            return;
        }
        window.attackPlan.targetPool[targetIndex].booster=0;
        window.closeModal();
        window.targetPoolQuery.partialRender([window.attackPlan.targetPool[targetIndex]],"village.id");
        savePlan()
    },
}

