import { TroopTransaction, game, savePlan } from "../core/Api";
import { Lang } from "../core/Language";
import { ConfirmVillageSpeedRemoveModal } from "./ConfirmVillageSpeedRemoveModal";
import { addVillageBoosterModal } from "./addVillageSpeedModal";
import { confirmRemoveModal } from "./confirmRemoveModal";
import { confirmRemoveTargetModal } from "./confirmRemoveTargetModal";
import { targetsLauncher } from "./targetsLauncher";

export const targetItem = (target:target)=>{
    let snob=0;
    let small=0;
    let medium=0;
    let large=0;
    let sup=0;

    target.launchers.forEach((launcher)=>{

        if(launcher.village.popSize<=1000){
            small++;
        }else if(launcher.village.popSize>1000 && launcher.village.popSize<=5000){
            medium++
        }else if(launcher.village.popSize>5000){
            large++;
        }
        if(!launcher.isAttack){
            sup++;
        }
        snob+=launcher.village.unitsContain.snob;
        
    })

    return /* html */`
    <div id="${target.village.id}" class="target-item">
        <div onclick="targetItem.toggleTargetItem(this)" class="target-header">
            <div class="target-radio"><input value="${target.village.id}" onclick="targetItem.selectTargetItem(event)" type="radio" name="target" ${target.isSelected? `checked`:``}/></div>
            <div class="indicator ${target.isOpen? 'indicator-open':''}"><span >▶<span></div>
            <div class="target-village-name"><a target="_blank" href="/game.php?village=${game.village.id}&screen=info_village&id=${target.village.id}">${target.village.name}(${target.village.coord.text}) K${target.village.kontinent}</a></div>
            <div class="target-extras">
                ${target.booster>0 ? /* html */`
                <div class="booster-button">( ${target.booster}% <img height="15" src="https://dshu.innogamescdn.com/asset/f9cb54f8/graphic/items/3005.png">) <a class="del-boost" onclick="targetItem.removeVillageBooster(event,${target.village.id})"></a></div>
                `
                :/* html */`
                    <a onclick="targetItem.addVillageBooster(event,${target.village.id})" class="add-village-booster"></a>
                `
                }
                <div class="header-count">
                    ${snob>0? /* html */`<img height="14px" src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_snob.png"><span>${snob}<span>`:''}
                    ${large>0? /* html */`<img src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/command/attack_large.png"><span>${large}<span>`:''}
                    ${medium>0? /* html */`<img src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/command/attack_medium.png"><span>${medium}<span>`:''}
                    ${small>0? /* html */`<img src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/command/attack_small.png"><span>${small}<span>`:''}
                    ${sup>0? /* html */`<img src="https://dshu.innogamescdn.com/asset/69990994/graphic/command/support.png"><span>${sup}<span>`:''}
                </div>
            </div>
            <div><a onclick="targetItem.removeTargetItem(event,${target.village.id})" class="remove-target-btn"></a></div>
        </div>
        <div class="target-launchers" style="display: ${target.isOpen ? 'block':'none' };">
        <div class="target-launch-header">
            <div class="spear-icon">
                <img src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_spear.png">
            </div>
            <div class="sword-icon">
                <img src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_sword.png">
            </div>
            <div class="axe-icon">
                <img  src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_axe.png">
            </div>
            ${window.gameConfig.game.archer==0 ?
            /* html */``:/* html */`
            <div class="archer-icon">
                <img src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_archer.png">
            </div>
            `}
            <div class="spy-icon">
                <img src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_spy.png">
            </div>
            <div class="light-icon">
                <img src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_light.png">
            </div>
            ${window.gameConfig.game.archer==0 ?
            /* html */``:/* html */`
            <div class="marcher-icon">
                <img src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_marcher.png">
            </div>
            `}
            <div class="heavy-icon">
                <img src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_heavy.png">
            </div>
            <div class="ram-icon">
                <img src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_ram.png">
            </div>
            <div class="catapult-icon">
                <img src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_catapult.png">
            </div>
            <div class="pala-icon">
                <img src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_knight.png">
            </div>
            <div class="snob-icon">
                <img src="https://dshu.innogamescdn.com/asset/fd86cac8/graphic/unit/unit_snob.png">
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
    toggleTargetItem:(elem) => {
        $(elem).parent().find('.target-launchers').toggle();
        $(elem).find('.indicator').toggleClass('indicator-open');
        $(elem).find('input').prop('checked', true);
        let id=parseInt($(elem).parent().attr('id'));
        let ind = window.attackPlan.targetPool.findIndex((target)=>{return target.village.id==id})
        window.attackPlan.targetPool[ind].isOpen=!window.attackPlan.targetPool[ind].isOpen;
    },
    selectTargetItem:(e)=>{
        let id=parseInt($(e.target).parent().parent().parent().attr('id'));
        window.attackPlan.targetPool.forEach((target:target)=>{
            if(target.village.id==id){
                target.isSelected=true;
                target.isOpen=true;
            }else{
                target.isSelected=false;
            }
        })
        e.stopPropagation();
        $(e.target).parent().parent().parent().find('.target-launchers').toggle();
        $(e.target).parent().parent().find('.indicator').toggleClass('indicator-open');
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
        }
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
        window.attackPlan.targetPool[targetIndex].booster=parseInt($('#planner-village-boost').val().toString());
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

