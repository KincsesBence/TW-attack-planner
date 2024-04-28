export const editPlanNameModal = (plan:plan)=>{
    window.editPlanNameModal.planRef=plan;
    return /* html */`
        <label for="template_name_input" >Template name:</label><br>
        <input maxlength="20" value="${window.editPlanNameModal.planRef.name}" onkeyup="window.editPlanNameModal.saveName()" id="template_name_input" type="text"/>
    `
}
window.editPlanNameModal={
    saveName:()=>{
        let val=$('#template_name_input').val().toString();
        val=val.substring(0, 20).trim();
        window.editPlanNameModal.planRef.name=val;
        if($('#open-plan-name').get().length>0){
            $('#open-plan-name').text(val);
        }
        
        window.launchDialog.stepCheck();
    }
}


