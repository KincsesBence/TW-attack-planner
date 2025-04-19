import { savePlan, TroopTransaction } from "../core/Api";
import { Lang } from "../core/Language";

export const editTargetModal = (targets:target[])=>{
    window.editTargetModal.targetRef=targets;
    return /* html */`
    <div class="modal-input-group">
    <label for="target-select">${Lang('targets')} (<span id="modal-targets-cnt">${targets.length}</span>):</label>
    <select id="target-select" size="5" multiple>
        ${targets.map((target)=>{
            return /* html */`
            <option value="${target.village.id}">${target.village.name} (${target.village.coord.text}) K${target.village.kontinent}</option>
            `
        }).join('')}
    </select>
    </div>
    <div class="modal-input-group">
        <label for="">${Lang('newTargets')}:</label><br>
        <textarea id="plan_targets" size="10"></textarea>
    </div>
    <div class="modal-input-inline">
        <button class="btn" onclick="editTargetModal.addTargets()">${Lang('add')}</button>
        <button class="btn" onclick="editTargetModal.removeTargets()">${Lang('remove')}</button>
    </div>
    `
}

window.editTargetModal = {
    addTargets:() => {
        let val:string = $('#plan_targets').val().toString();
        console.log(val);
        let reg = Array.from(val.matchAll(/([0-9]{1,3}).([0-9]{1,3})/g));
        console.log(reg);
        reg.forEach((elem:any)=>{
            let coord=elem[1]+"|"+elem[2];
            let village = window.Villages.find((village:village)=>{ return village.coord.text==coord})
            let idx = window.editTargetModal.targetRef.findIndex((target:target)=>{ return target.village.coord.text==coord})
            if(village && idx==-1){
                window.editTargetModal.targetRef.push({
                    booster:0,
                    launchers:[],
                    village:village,
                    isOpen:false,
                    isSelected:false,
                })
            }
        });

        $('#plan_targets').val('');
        $('#modal-targets-cnt').text(window.editTargetModal.targetRef.length);
        $('#target-select').html(window.editTargetModal.targetRef.map((target:target)=>{
            return /* html */`
            <option value="${target.village.id}">${target.village.name} (${target.village.coord.text}) K${target.village.kontinent}</option>
            `
        }).join(''))
        
        if($('.mainWindow').get().length==1){
            savePlan()
            window.targetPoolQuery.resetAll();
        }else{
            window.launchDialog.stepCheck();
        }
    },
    removeTargets:() => {
        let vals=$('#target-select').val().toString().split(',');
        
        vals.forEach((elem)=>{
           let ind = window.editTargetModal.targetRef.findIndex((target:target)=>{return target.village.id==parseInt(elem)})

           if($('.mainWindow').get().length==1){
                window.editTargetModal.targetRef[ind].launchers.forEach((launcher:launcher)=>{
                    let LauncherIndex=window.attackPlan.launchPool.findIndex((lpVilage:village)=>{return lpVilage.id==launcher.village.id});
                    if(LauncherIndex==-1){
                        window.attackPlan.launchPool.push({...launcher.village});
                    }else{
                        
                        [window.attackPlan.launchPool[LauncherIndex].unitsContain,
                        launcher.village.unitsContain]  
                        = TroopTransaction(
                            window.attackPlan.launchPool[LauncherIndex].unitsContain,
                            launcher.village.unitsContain,
                            launcher.village.unitsContain
                        )    
                    }
                })
           }

           window.editTargetModal.targetRef.splice(ind,1);
           
        })

        $('#target-select').html(window.editTargetModal.targetRef.map((target:target)=>{
            return /* html */`
            <option value="${target.village.id}">${target.village.name} (${target.village.coord.text}) K${target.village.kontinent}</option>
            `
        }).join(''))
        if($('.mainWindow').get().length==1){
            window.targetPoolQuery.resetAll();
            window.launchVillagesQuery.resetAll();
        }
    },
    targetRef:[],
}




