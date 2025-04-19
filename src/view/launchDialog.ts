import { loadPages} from "../core/Api";
import { editArrivalsModal } from "./editArrivalsModal";
import { editLaunchVillagesModal } from "./editLaunchVillagesModal";
import { editPlanNameModal } from "./editPlanNameModal";
import { editTargetModal } from "./editTargetModal";
import { editTemplatesModal } from "./editTemplatesModal";
import { mainWindow } from "./mainWindow";
import { Lang } from "../core/Language";

export const launchDialog = ()=>{
    return /* html */`
        <style>
            .launch-dialog{
                display:grid;
                text-align:center;
            }
            .launch-dialog option {
                font-size:16px;
                padding:2px 5px;
                text-align:center;
            }

            .launch-dialog button{
                margin: 10px auto;
                width: max-content;
            }

            .launch-dialog-selector{
                display:grid;
            }

            .new-plan{
                display:none;
            }

            .steps{
                width:100%;
                display:inline-flex;
                justify-content: space-evenly;
                width: 100%;
                padding: 10px 0;
            }

            .step{
                display:grid;
            }

            .circle{
                border-radius:50%;
                background: linear-gradient(to bottom, #947a62 0%,#7b5c3d 22%,#6c4824 30%,#6c4824 100%);
                color:white;
                padding: 4px 10px;
                font-size: 20px;
                cursor:pointer;
                z-index:2;
            }

            .inactive{
                background: linear-gradient(to bottom, #b1a397 0%, #645d56 22%, #635f5a 30%, #6c6763 100%) !important
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
            .progress-field{
                width:88%; 
                position:absolute;
                height: 5px;
                background-color: black;
                margin-top: 13px;
                z-index:1;
                background: linear-gradient(to bottom, #b1a397 0%, #645d56 22%, #635f5a 30%, #6c6763 100%);
            }
            #progress-bar{
                height:100%;
                background: linear-gradient(to bottom, #947a62 0%,#7b5c3d 22%,#6c4824 30%,#6c4824 100%);
                z-index:1;
            }
            .confirm-remove button{
                margin:0 5px;
            }
        </style>
        <div id="dialog-loading" style="display: none;justify-content: center;width: 100%;">
            <img style="height:25px" src="https://dshu.innogamescdn.com/asset/6389cdba/graphic/loading.gif"><span style="padding:5px">${Lang('loading')}</span>
        </div>
        <div class="launch-dialog">
            <div><h1>TW Attack Planner</h1></div>
            <div class="launch-dialog-selector">
                <h3>${Lang("plans")}:</h3>
                <select id="launchDialogSelect" size="5" onDblClick="launchDialog.loadPlan()">
                    ${window.Plans.map((plan)=>{
                        return /* html */`<option value="${plan.id}">${plan.name}</option>`;
                    }).join('')}
                </select>
                <button onclick="launchDialog.loadPlan()" class="btn">${Lang("loadPlan")}</button>
                <button id="removePlan" onclick="launchDialog.confirmRemovePlan()" class="btn">${Lang("removePlan")}</button>
                <div class="confirm-remove" style="display:none;">
                    <button onclick="launchDialog.removePlan()" class="btn">${Lang("remove")}</button>
                    <button onclick="launchDialog.cancelRemovePlan()" class="btn">${Lang("cancel")}</button>
                </div>
                <button onclick="launchDialog.newplan()" class="btn">+ ${Lang("newPlan")}</button>
            </div>

            <div class="new-plan">
                <div class="steps">
                    <div class="progress-field">
                        <div id="progress-bar" style="width:0%"></div>
                    </div>
                    <div id="c1" onclick="launchDialog.goToStep(1)" class="circle">1</div>
                    <div id="c2" class="circle inactive">2</div>
                    <div id="c3" class="circle inactive">3</div>
                    <div id="c4" class="circle inactive">4</div>
                    <div id="c5" class="circle inactive">5</div>
                </div>
                <div class="step-1 step"></div>
                <div class="step-2 step" style="display:none;"></div>
                <div class="step-3 step" style="display:none;"></div>
                <div class="step-4 step" style="display:none;"></div>
                <div class="step-5 step" style="display:none;"></div>
                <button id="nextBtn" onclick="launchDialog.goNext(2)" class="btn" disabled>${Lang("next")}</button>
                <button style="display:none;" id="createPlan" onclick="launchDialog.createPlan()" class="btn" disabled>${Lang("createPlan")}</button>
                <button onclick="launchDialog.cancelNewPlan()" class="btn">${Lang("cancel")}</button>
            </div>
        </div>
    `;
}
window.launchDialog={
groupIDs:[],
currentStep:0,
stepCheck:()=>{
    if($('#dialog-loading').get().length==0){
        return;
    }
    let stmt=false;
    let max=window.launchDialog.currentStep;
    switch(window.launchDialog.currentStep){
        case 0:
            if(window.launchDialog.plan.name.length >3 && window.Plans.findIndex((plan)=>{return plan.name==window.launchDialog.plan.name})==-1){
                window.launchDialog.currentStep++
            }else{
                break;
            }
        case 1:
            if(window.launchDialog.plan.targetPool.length>0){
                window.launchDialog.currentStep++
            }else{
                break;
            }
        case 2:
            if(window.launchDialog.groupIDs.length>0){
                window.launchDialog.currentStep++
            }else{
                break;
            }
        case 3:
            if(window.launchDialog.plan.arrivals.length>0){
                window.launchDialog.currentStep++
            }else{
                break;
            }
        case 4:
            if(window.launchDialog.plan.templates.length>0){
                window.launchDialog.currentStep++
            }else{
                break;
            }
    }
    if(max<window.launchDialog.currentStep){
        $('#nextBtn').prop( "disabled", false);
    }
    if( window.launchDialog.currentStep==5){
        $('#createPlan').prop( "disabled", false);
    }
},
goToStep:(stepIn) =>{
    $('.step-1').hide();
    $('.step-2').hide();
    $('.step-3').hide();
    $('.step-4').hide();
    $('.step-5').hide();
    $('.step-'+stepIn).show();
    if(stepIn<5){
        $('#nextBtn').attr('onclick','launchDialog.goNext('+(stepIn+1)+')');
        $('#createPlan').hide();
        $('#nextBtn').show();

    }else{
        $('#createPlan').show();
        $('#nextBtn').hide();
    }
    window.launchDialog.stepCheck()
},
goNext:(stepIn) =>{
    $('.step-1').hide();
    $('.step-2').hide();
    $('.step-3').hide();
    $('.step-4').hide();
    $('.step-5').hide();

    $('#c'+stepIn).attr('onclick','launchDialog.goToStep('+stepIn+')');
    if(stepIn>4){
        $('.step-5').show();
        $('#nextBtn').hide();
        $('#createPlan').show();
        $('#c'+stepIn).removeClass('inactive');
        $('#progress-bar').css('width',(stepIn-1)*25+'%')
    }else{
        $('#nextBtn').prop( "disabled", true);
        $('.step-'+stepIn).show();
        $('#c'+stepIn).removeClass('inactive');
        $('#progress-bar').css('width',(stepIn-1)*25+'%')
        stepIn++;
        $('#nextBtn').attr('onclick','launchDialog.goNext('+stepIn+')');
    }
},

newplan: () => {
    $('.new-plan').show();
    $('.launch-dialog-selector').hide();
    window.launchDialog.currentStep=0;
    window.launchDialog.plan={
        arrivals:[],
        boosters:[],
        launchPool:[],
        id:new Date().getTime().toString(),
        name:'',
        targetPool:[],
        templates:[]
    }
    $('.step-1').html(editPlanNameModal(window.launchDialog.plan));
    $('.step-2').html(editTargetModal(window.launchDialog.plan.targetPool));
    $('.step-3').html(editLaunchVillagesModal(window.launchDialog.plan.launchPool));
    $('.step-4').html(editArrivalsModal(window.launchDialog.plan.arrivals));
    $('.step-5').html(editTemplatesModal(window.launchDialog.plan.templates));
},
cancelNewPlan: () => {
    $('.step-1').show();
    $('.step-2').hide();
    $('.step-3').hide();
    $('.step-4').hide();
    $('.step-5').hide();
    $('#nextBtn').attr('onclick','launchDialog.goNext('+(2)+')');
    $('.new-plan').hide();
    $('.launch-dialog-selector').show();
    $('#c2').addClass('inactive');
    $('#c3').addClass('inactive');
    $('#c4').addClass('inactive');
    $('#c5').addClass('inactive');
    $('#createPlan').hide();
    $('#nextBtn').show();
    $('#template_name').val("");
    $('#c2').attr('onclick','');
    $('#c3').attr('onclick','');
    $('#c4').attr('onclick','');
    $('#c5').attr('onclick','');
    $('#plan_arrivals_select').html("");
    $('#plan_targets').val("");
    $('#template_select').html("");
    $('#temp_name').val('');
    window.launchDialog.groupIDs=[];
    $('#plan_launcher_list').html('');
},
createPlan : async ()=>{ 
    $('#dialog-loading').css('display','inline-flex');
    $('.launch-dialog').hide();
    setTimeout( async ()=>{
        window.attackPlan=window.launchDialog.plan;
        window.attackPlan.launchPool = await loadPages(window.launchDialog.groupIDs);   
        await window.DB.setData('plans',window.attackPlan)
        window.UI.SuccessMessage(Lang('PlanSuccessfullyCreated'))
        setTimeout(()=>{
            window.Dialog.close("launchDialog");
            window.Dialog.show("PlannerMainWindow",mainWindow());
            $('.popup_box_container').append('<div style="position: fixed;width: 100%;height: 100%;top:0;left:0;z-index:12001"></div>');
        },1000);
    },1000);
},
loadPlan:()=>{
    if($('#launchDialogSelect').val()==null){
        window.UI.ErrorMessage(Lang('PlanNotSelected'))
        return
    }   

    let val=$('#launchDialogSelect').val().toString();
    
    let ind=window.Plans.findIndex((plan)=>{return plan.id==val});
    if(ind==-1) return;
    
    $('#dialog-loading').css('display','inline-flex');
    $('.launch-dialog').hide();
    setTimeout(()=>{
        window.Dialog.close("launchDialog");
        window.attackPlan=window.Plans[ind]
        window.Dialog.show("PlannerMainWindow",mainWindow());
        $('.popup_box_container').append('<div style="position: fixed;width: 100%;height: 100%;top:0;left:0;z-index:12001"></div>');
    },1000)
},
removePlan: async()=>{
    if($('#launchDialogSelect').val()==null){
        window.UI.ErrorMessage(Lang('PlanNotSelected'))
        return
    }
    let val=$('#launchDialogSelect').val().toString();
    window.DB.removeData('plans',val);
    let plans = await window.DB.getAllData('plans')
    $('#launchDialogSelect').html(`${plans.map((plan)=>{
        return /* html */`<option value="${plan.id}">${plan.name}</option>`;
    })}`);
    $('.confirm-remove').hide();
    $('#removePlan').show();
},
confirmRemovePlan:()=>{
    if($('#launchDialogSelect').val()==null){
        window.UI.ErrorMessage(Lang('PlanNotSelected'))
        return
    }

    $('.confirm-remove').show();
    $('#removePlan').hide();
},
cancelRemovePlan:()=>{
    $('.confirm-remove').hide();
    $('#removePlan').show();
},
plan:undefined
}