import { TroopTransaction } from "../core/Api"

export const confirmResetAssignmentsModal = ()=>{
    return /* html */`
    <div class="modal-input-inline">
        <h2>Biztosan szeretnéd visszaállítani az összes támadást?</h2>
    </div>
    <div class="modal-input-inline">
        <button class="btn" onclick="window.finalResetAssignments()">Igen</button>
    </div>
    `
}

window.finalResetAssignments = () => {
    window.attackPlan.targetPool.forEach((target:target)=>{
        target.isSelected=false;
        target.isOpen=false;
        target.launchers.forEach((launcher:launcher)=>{
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
        target.launchers=[];
    })
    window.closeModal();
    window.launchVillagesQuery.resetAll();
    window.targetPoolQuery.resetAll();
    window.DB.savePlan(window.attackPlan);
}