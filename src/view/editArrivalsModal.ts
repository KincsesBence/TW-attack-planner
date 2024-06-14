import { Lang } from "../core/Language";

export const editArrivalsModal = (arrivals:string[])=>{
    window.editArrivalsModal.arrivalsRef=arrivals;
    return /* html */`
    <div class="modal-input-group">
        <label for="">${Lang('arrivals')}:</label>
        <select id="plan_arrivals_select" size="5">
        ${arrivals.map((arrival)=>{
            return /* html */`
            <option value="${arrival}">${arrival}</option>
            `
        }).join('')}
        </select>
        <input id="plan_arrivals_input" type="datetime-local" type="text" step="1"/>
    </div>
    <div class="modal-input-inline">
        <button class="btn" onclick="editArrivalsModal.addArrival()" >${Lang('add')}</button>
        <button class="btn" onclick="editArrivalsModal.removeArrival()">${Lang('remove')}</button>
    </div>
    `
}
window.editArrivalsModal = {
    addArrival:()=> {
        let val = $('#plan_arrivals_input').val().toString().replace('T',' ');

        if(val==""){
            return;
        }
        
        if(! window.editArrivalsModal.arrivalsRef.includes(val)){
            window.editArrivalsModal.arrivalsRef.push(val);
        }

        window.editArrivalsModal.arrivalsRef.sort((a,b)=>{return a>b? 1:-1})

        let select="";

        window.editArrivalsModal.arrivalsRef.forEach((arrival)=>{
            select+=`<option value="${arrival}">${arrival}</option>`;
        });
        $('#plan_arrivals_select').html(select);
        if($('.mainWindow').get().length==1){
            window.DB.savePlan(window.attackPlan);
        }else{
            window.launchDialog.stepCheck();
        }
    },
    removeArrival:()=> {
        let val = $('#plan_arrivals_select').val().toString().replace('T',' ');
        if(val==""){
            return;
        }

        let ind= window.editArrivalsModal.arrivalsRef.findIndex((arrival)=>{ return arrival==val})

        if(ind>-1){
            window.editArrivalsModal.arrivalsRef.splice(ind,1);
        }

        let select="";
        window.editArrivalsModal.arrivalsRef.forEach((arrival)=>{
            select+=`<option value="${arrival}">${arrival}</option>`;
        });
        $('#plan_arrivals_select').html(select);
        if($('.mainWindow').get().length==1){
            window.DB.savePlan(window.attackPlan);
        }else{
            window.launchDialog.stepCheck();
        }
    }
}