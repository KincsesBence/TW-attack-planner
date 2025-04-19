import { savePlan } from "../core/Api";
import { Lang } from "../core/Language";

export const editPlanNameModal = (plan:plan)=>{
    window.editPlanNameModal.planRef=plan;
    return /* html */`
        <label for="plan_name_input" >${Lang('planName')}:</label><br>
        <input maxlength="20" value="${window.editPlanNameModal.planRef.name}" onkeyup="window.editPlanNameModal.saveName()" id="plan_name_input" type="text"/>
    `
}
window.editPlanNameModal={
    saveName:()=>{
        let val=$('#plan_name_input').val().toString();
        val=val.substring(0, 20).trim();
        window.editPlanNameModal.planRef.name=val;
        if($('#open-plan-name').get().length>0){
            $('#open-plan-name').text(val);
        }
        if($('.mainWindow').get().length==1){
            savePlan()
        }else{
            window.launchDialog.stepCheck();
        }
    }
}


