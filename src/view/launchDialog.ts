import { addPlan, findPlan, loadPages, loadPlans, removePlan } from "../core/Api";
import { editArrivalsModal } from "./editArrivalsModal";
import { editPlanNameModal } from "./editPlanNameModal";
import { editTargetModal } from "./editTargetModal";
import { editTemplatesModal } from "./editTemplatesModal";
import { mainWindow } from "./mainWindow";

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
            }

            .inactive{
                background: linear-gradient(to bottom, #947a6266 0%,#7b5c3d69 22%,#6c48245e 30%,#6c482480 100%) !important
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
        </style>
        <div id="dialog-loading" style="display: none;justify-content: center;width: 100%;">
            <img style="height:25px" src="https://dshu.innogamescdn.com/asset/6389cdba/graphic/loading.gif"><span style="padding:5px">Betöltés...</span>
        </div>
        <div class="launch-dialog">
            <div><h1>TW Attack Planner</h1></div>
            <div class="launch-dialog-selector">
                <h3>Plans:</h3>
                <select id="launchDialogSelect" size="5">
                    ${window.Plans.map((plan)=>{
                        console.log(plan);
                        return /* html */`<option value="${plan.id}">${plan.name}</option>`;
                    }).join('')}
                </select>
                <button onclick="launchDialog.loadPlan()" class="btn">Load Plan</button>
                <button onclick="launchDialog.removePlan()" class="btn">Remove Plan</button>

                <button onclick="launchDialog.newplan()" class="btn">+ New Plan</button>
            </div>

            <div class="new-plan">
                <div class="steps">
                    <div id="c1" onclick="launchDialog.goToStep(1)" class="circle">1</div>
                    <div id="c2" class="circle inactive">2</div>
                    <div id="c3" class="circle inactive">3</div>
                    <div id="c4" class="circle inactive">4</div>
                    <div id="c5" class="circle inactive">5</div>
                </div>
                <div class="step-1 step">
                    <label for="template_name_input">Template name:</label><br>
                    <input onkeyup="launchDialog.stepCheck()" id="template_name_input" type="text"/>
                </div>
                <div class="step-2 step" style="display:none;">
                   
                </div>
                <div class="step-3 step" style="display:none;">
                    <label for="">Lanuchers:</label><br>
                    <select id="plan_launcher_list" size="5">
                    </select>
                    <select id="plan_launcher_select" style="font-size:16px" >
                        ${window.Groups.map((group)=>{
                            return /* html */`<option value="${group.id}">${group.name}</option>`;
                        }).join('')}
                    </select>
                    <div>
                        <button onclick="launchDialog.addGroup()" >add</button>
                        <button onclick="launchDialog.removeGroup()" >remove</button>
                    </div>
                </div>
                <div class="step-4 step" style="display:none;">
                    <label for="">Arrivals:</label><br>
                    <select id="plan_arrivals_select" size="5">
                    </select>
                    <input id="plan_arrivals_input" type="datetime-local" type="text"/>
                    <div>
                        <button onclick="launchDialog.addArrival()" >add</button>
                        <button onclick="launchDialog.removeArrival()" >remove</button>
                    </div>
                </div>
                <div class="step-5 step" style="display:none;">
                    
                </div>
                <button id="nextBtn" onclick="launchDialog.goNext(2)" class="btn" disabled>Next</button>
                <button style="display:none;" id="createPlan" onclick="launchDialog.createPlan()" class="btn" disabled>Create Plan</button>
                <button onclick="launchDialog.cancelNewPlan()" class="btn">Cancel</button>
            </div>
        </div>
    `;
}


window.launchDialog={
groupIDs:[],
currentStep:0,
stepCheck:()=>{
    let stmt=false;
    let max=window.launchDialog.currentStep;
    switch(window.launchDialog.currentStep){
        case 0:
            if(window.launchDialog.plan.name.length >3 && findPlan((elem:plan)=>{return elem.name==window.launchDialog.plan.name})==null){
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
    console.log(max,window.launchDialog.currentStep);
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
    }else{
        $('#nextBtn').prop( "disabled", true);
        $('.step-'+stepIn).show();
        $('#c'+stepIn).removeClass('inactive');
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
    $('.step-3').html(editTargetModal(window.launchDialog.plan.targetPool));
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
    window.attackPlan=window.launchDialog.plan;
    window.attackPlan.launchPool = await loadPages(window.launchDialog.groupIDs.map((groupID)=>{return groupID.id}));   
    let res=addPlan(window.attackPlan);

    if(res){
        window.UI.SuccessMessage('Plan successfully created!')
    }else{
        window.UI.SuccessMessage('Plan with this name already exist!')
    }

    $('#dialog-loading').css('display','inline-flex');
    $('.launch-dialog').hide();


    setTimeout(()=>{
        window.Dialog.close("launchDialog");
        window.Dialog.show("PlannerMainWindow",mainWindow());
        $('.popup_box_container').append('<div style="position: fixed;width: 100%;height: 100%;top:0;left:0;z-index:12001"></div>');
    },1000);
},

addGroup:()=> {
    let val=parseInt($('#plan_launcher_select').val().toString());

    let ind = window.launchDialog.groupIDs.findIndex((groupID)=>{return groupID.id==val});

    if(ind>-1){
        return;
    }

    window.launchDialog.groupIDs.push({
        id:val,
        name:$("#plan_launcher_select option:selected").text()
    });

    let html='';
    window.launchDialog.groupIDs.forEach((group)=>{
        html+= /* html */`<option value="${group.id}">${group.name}</option>`;
    })

    $('#plan_launcher_list').html(html);
},
removeGroup:()=> {
    let val=parseInt($('#plan_launcher_list').val().toString());
    let ind = window.launchDialog.groupIDs.findIndex((groupID)=>{return groupID.id==val});
    window.launchDialog.groupIDs.splice(ind,1);

    let html='';
    window.launchDialog.groupIDs.forEach((group)=>{
        html+= /* html */`<option value="${group.id}">${group.name}</option>`;
    })
    $('#plan_launcher_list').html(html);
},
loadPlan:()=>{
    let val=$('#launchDialogSelect').val().toString();

    if(val==""){
        return
    }
    
    $('#dialog-loading').css('display','inline-flex');
    $('.launch-dialog').hide();
    setTimeout(()=>{
        window.Dialog.close("launchDialog");
        window.attackPlan=findPlan((elem:plan)=>{return elem.id==val})
        window.Dialog.show("PlannerMainWindow",mainWindow());
        $('.popup_box_container').append('<div style="position: fixed;width: 100%;height: 100%;top:0;left:0;z-index:12001"></div>');
    },1000)
},
removePlan:()=>{
    let val=$('#launchDialogSelect').val().toString();
    if(val==""){
        return
    }
    removePlan(val);

    let plans = loadPlans();
    $('#launchDialogSelect').html(`${plans.map((plan)=>{
        return /* html */`<option value="${plan.id}">${plan.name}</option>`;
    })}`);
},
plan:undefined
}