import { addPlan, findPlan, loadPages, loadPlans, removePlan } from "../core/Api";
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
                    <label for="template_name">Template name:</label><br>
                    <input onkeyup="launchDialog.step1Check()" id="template_name" type="text"/>
                </div>
                <div class="step-2 step" style="display:none;">
                    <label for="">Targets:</label><br>
                    <textarea onkeyup="launchDialog.step2Check()" id="plan_targets" size="10"></textarea>
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
                    <label for="template_select">Templates:</label>
                    <select onclick="launchDialog.selectTemplate()" id="template_select" size="5"></select>
                    <label for="temp_name">name:</label>
                    <input id="temp_name" type="text" />
                    <label >units:</label>
                    <table>
                        <tbody>
                            <tr>
                                <td valign="top">
                                    <table class="vis" width="100%">
                                            <tbody>
                                                <tr>
                                                    <th>Gyalogság</th>
                                                </tr>
                                                <tr>
                                                    <td class="nowrap">
                                                    <img
                                                        src="https://dshu.innogamescdn.com/asset/5b5eb006/graphic/unit/unit_spear.png"
                                                        class="" data-title="Lándzsás">
                                                        <input value="0" style="width:60px" id="palnner_unit_input_spear" type="number" min="0">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="nowrap">
                                                    <img
                                                        src="https://dshu.innogamescdn.com/asset/5b5eb006/graphic/unit/unit_sword.png"
                                                        class="" data-title="Lándzsás">
                                                        <input value="0" style="width:60px" id="palnner_unit_input_sword" type="number" min="0">
                                                    </td>
                                                </tr> 
                                                <tr>
                                                    <td class="nowrap">
                                                    <img
                                                        src="https://dshu.innogamescdn.com/asset/5b5eb006/graphic/unit/unit_axe.png"
                                                        class="" data-title="Lándzsás">
                                                        <input value="0" style="width:60px" id="palnner_unit_input_axe" type="number" min="0">
                                                    </td>
                                                </tr> 
                                                <tr>
                                                    <td class="nowrap">
                                                    <img
                                                        src="https://dshu.innogamescdn.com/asset/5b5eb006/graphic/unit/unit_archer.png"
                                                        class="" data-title="Lándzsás">
                                                        <input value="0" style="width:60px" id="palnner_unit_input_archer" type="number" min="0">
                                                    </td>
                                                </tr> 
                                            </tbody>
                                    </table>
                                </td>
                                <td valign="top">
                                    <table class="vis" width="100%">
                                            <tbody>
                                                <tr>
                                                    <th>Lovasság</th>
                                                </tr>
                                                <tr>
                                                    <td class="nowrap">
                                                    <img
                                                        src="https://dshu.innogamescdn.com/asset/5b5eb006/graphic/unit/unit_spy.png"
                                                        class="" data-title="Lándzsás">
                                                        <input value="0" style="width:60px" id="palnner_unit_input_spy" type="number" min="0">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="nowrap">
                                                    <img
                                                        src="https://dshu.innogamescdn.com/asset/5b5eb006/graphic/unit/unit_light.png"
                                                        class="" data-title="Lándzsás">
                                                        <input value="0" style="width:60px" id="palnner_unit_input_light" type="number" min="0">
                                                    </td>
                                                </tr> 
                                                <tr>
                                                    <td class="nowrap">
                                                    <img
                                                        src="https://dshu.innogamescdn.com/asset/5b5eb006/graphic/unit/unit_marcher.png"
                                                        class="" data-title="Lándzsás">
                                                        <input value="0" style="width:60px" id="palnner_unit_input_marcher" type="number" min="0">
                                                    </td>
                                                </tr> 
                                                <tr>
                                                    <td class="nowrap">
                                                    <img
                                                        src="https://dshu.innogamescdn.com/asset/5b5eb006/graphic/unit/unit_heavy.png"
                                                        class="" data-title="Lándzsás">
                                                        <input value="0" style="width:60px" id="palnner_unit_input_heavy" type="number" min="0">
                                                    </td>
                                                </tr> 
                                            </tbody>
                                    </table>
                                </td>
                            <tr>
                            <tr>
                                <td valign="top">
                                    <table class="vis" width="100%">
                                            <tbody>
                                                <tr>
                                                    <th>Hadászat</th>
                                                </tr>
                                                <tr>
                                                    <td class="nowrap">
                                                    <img
                                                        src="https://dshu.innogamescdn.com/asset/5b5eb006/graphic/unit/unit_ram.png"
                                                        class="" data-title="Lándzsás">
                                                        <input value="0" style="width:60px" id="palnner_unit_input_ram" type="number" min="0">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="nowrap">
                                                    <img
                                                        src="https://dshu.innogamescdn.com/asset/5b5eb006/graphic/unit/unit_catapult.png"
                                                        class="" data-title="Lándzsás">
                                                        <input value="0" style="width:60px" id="palnner_unit_input_catapult" type="number" min="0">
                                                    </td>
                                                </tr> 
                                            </tbody>
                                    </table>
                                </td>
                                <td valign="top">
                                    <table class="vis" width="100%">
                                            <tbody>
                                                <tr>
                                                    <th>Egyéb</th>
                                                </tr>
                                                <tr>
                                                    <td class="nowrap">
                                                    <img
                                                        src="https://dshu.innogamescdn.com/asset/5b5eb006/graphic/unit/unit_knight.png"
                                                        class="" data-title="Lándzsás">
                                                        <input value="0" style="width:60px" id="palnner_unit_input_knight" type="number" min="0">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="nowrap">
                                                    <img
                                                        src="https://dshu.innogamescdn.com/asset/5b5eb006/graphic/unit/unit_snob.png"
                                                        class="" data-title="Lándzsás">
                                                        <input value="0" style="width:60px" id="palnner_unit_input_snob" type="number" min="0">
                                                    </td>
                                                </tr> 
                                            </tbody>
                                    </table>
                                </td>
                            </tr>
                        <tbody>
                    </table>
                    <div>
                        <button onclick="launchDialog.addTemplate()">add</button>
                        <button onclick="launchDialog.removeTemplate()">remove</button>
                    </div>
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
step1Check:()=>{
    let val:string = $('#template_name').val().toString();
    if(val.length >3 && findPlan((elem:plan)=>{return elem.name==val})==null){
        $('#nextBtn').prop( "disabled", false);
        window.launchDialog.plan.name=val;
    }else{
        $('#nextBtn').prop( "disabled", true);
    }
},
step2Check:()=>{
    let val:string = $('#plan_targets').val().toString();
    console.log(val);
    window.launchDialog.plan.targetPool=[];
    let reg = Array.from(val.matchAll(/([0-9]{1,3}).([0-9]{1,3})/g));
    console.log(reg);
    reg.forEach((elem:any)=>{
        let coord=elem[1]+"|"+elem[2];
        let village = window.Villages.find((village:village)=>{ return village.coord.text==coord})     
        console.log(coord,village);
        if(village){
            window.launchDialog.plan.targetPool.push({
                booster:0,
                launchers:[],
                village
            })
        }
    });

    if(window.launchDialog.plan.targetPool.length>0){
        $('#nextBtn').prop( "disabled", false);
    }else{
        $('#nextBtn').prop( "disabled", true);
    }
},
step3Check:()=>{
    if(window.launchDialog.groupIDs.length>0){
        $('#nextBtn').prop( "disabled", false);
    }else{
        $('#nextBtn').prop( "disabled", true);
    }
},
step4Check:()=>{
    if(window.launchDialog.plan.arrivals.length>0){
        $('#createPlan').prop( "disabled", false);
    }else{
        $('#createPlan').prop( "disabled", true);
    }
},
step5Check:()=>{
    if(window.launchDialog.plan.templates.length>0){
        $('#createPlan').prop( "disabled", false);
    }else{
        $('#createPlan').prop( "disabled", true);
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
    window.launchDialog.plan={
        arrivals:[],
        boosters:[],
        launchPool:[],
        id:new Date().getTime().toString(),
        name:'',
        targetPool:[],
        templates:[]
    }
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
    $('#palnner_unit_input_spear').val('0')
    $('#palnner_unit_input_sword').val('0')
    $('#palnner_unit_input_archer').val('0')
    $('#palnner_unit_input_axe').val('0')
    $('#palnner_unit_input_spy').val('0')
    $('#palnner_unit_input_light').val('0')
    $('#palnner_unit_input_marcher').val('0')
    $('#palnner_unit_input_heavy').val('0')
    $('#palnner_unit_input_ram').val('0')
    $('#palnner_unit_input_catapult').val('0')
    $('#palnner_unit_input_knight').val('0')
    $('#palnner_unit_input_snob').val('0')
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
addArrival:()=> {
    let val = $('#plan_arrivals_input').val().toString().replace('T',' ');
    console.log(val);

    if(val==""){
        return;
    }
    
    if(!window.launchDialog.plan.arrivals.includes(val)){
        window.launchDialog.plan.arrivals.push(val);
    }

    window.launchDialog.plan.arrivals.sort((a,b)=>{return a>b? 1:-1})

    let select="";
    window.launchDialog.plan.arrivals.forEach((arrival)=>{
        select+=`<option value="${arrival}">${arrival}</option>`;
    });

    $('#plan_arrivals_select').html(select);
    window.launchDialog.step3Check();
},
removeArrival:()=> {
    let val = $('#plan_arrivals_select').val().toString().replace('T',' ');
    console.log(val);

    if(val==""){
        return;
    }

    let ind=window.launchDialog.plan.arrivals.findIndex((arrival)=>{ return arrival==val})

    if(ind>-1){
        window.launchDialog.plan.arrivals.splice(ind,1);
    }

    let select="";
    window.launchDialog.plan.arrivals.forEach((arrival)=>{
        select+=`<option value="${arrival}">${arrival}</option>`;
    });

    $('#plan_arrivals_select').html(select);
    window.launchDialog.step3Check();
},
addTemplate:()=> {
    let template:template ={
        name:$('#temp_name').val().toString(),
        units:{
            spear:parseInt($('#palnner_unit_input_spear').val().toString()),
            sword:parseInt($('#palnner_unit_input_sword').val().toString()),
            archer:parseInt($('#palnner_unit_input_archer').val().toString()),
            axe:parseInt($('#palnner_unit_input_axe').val().toString()),
            spy:parseInt($('#palnner_unit_input_spy').val().toString()),
            light:parseInt($('#palnner_unit_input_light').val().toString()),
            marcher:parseInt($('#palnner_unit_input_marcher').val().toString()),
            heavy:parseInt($('#palnner_unit_input_heavy').val().toString()),
            ram:parseInt($('#palnner_unit_input_ram').val().toString()),
            catapult:parseInt($('#palnner_unit_input_catapult').val().toString()),
            knight:parseInt($('#palnner_unit_input_knight').val().toString()),
            snob:parseInt($('#palnner_unit_input_snob').val().toString()),
        }
    } 
    console.log(template);

    if(template.name==""){
        return
    }

    let ind=window.launchDialog.plan.templates.findIndex((temp)=>{ return temp.name==template.name});

    if(ind>-1){
        window.launchDialog.plan.templates[ind]=template;
    }else{
        window.launchDialog.plan.templates.push(template);
    }
    $('#temp_name').val('');
    $('#palnner_unit_input_spear').val('0')
    $('#palnner_unit_input_sword').val('0')
    $('#palnner_unit_input_archer').val('0')
    $('#palnner_unit_input_axe').val('0')
    $('#palnner_unit_input_spy').val('0')
    $('#palnner_unit_input_light').val('0')
    $('#palnner_unit_input_marcher').val('0')
    $('#palnner_unit_input_heavy').val('0')
    $('#palnner_unit_input_ram').val('0')
    $('#palnner_unit_input_catapult').val('0')
    $('#palnner_unit_input_knight').val('0')
    $('#palnner_unit_input_snob').val('0')


    let select="";
    window.launchDialog.plan.templates.forEach((temp)=>{
        select+=`<option value="${temp.name}">${temp.name}</option>`;
    });

    $('#template_select').html(select);
    window.launchDialog.step4Check();
},
removeTemplate:()=> {
    let val=$('#template_select').val();

    let ind=window.launchDialog.plan.templates.findIndex((temp)=>{ return temp.name==val})
    
    if(ind>-1){
        window.launchDialog.plan.templates.splice(ind,1);
    }

    let select="";
    window.launchDialog.plan.templates.forEach((temp)=>{
        select+=`<option value="${temp.name}">${temp.name}</option>`;
    });

    $('#template_select').html(select);
    window.launchDialog.step4Check();
},
selectTemplate:()=> {
    let val=$('#template_select').val();

    let ind=window.launchDialog.plan.templates.findIndex((temp)=>{ return temp.name==val})

    if(ind>-1){
        let temp=window.launchDialog.plan.templates[ind]
        $('#temp_name').val(temp.name),
        $('#palnner_unit_input_spear').val(temp.units.spear)
        $('#palnner_unit_input_sword').val(temp.units.sword)
        $('#palnner_unit_input_archer').val(temp.units.archer)
        $('#palnner_unit_input_axe').val(temp.units.axe)
        $('#palnner_unit_input_spy').val(temp.units.spy)
        $('#palnner_unit_input_light').val(temp.units.light)
        $('#palnner_unit_input_marcher').val(temp.units.marcher)
        $('#palnner_unit_input_heavy').val(temp.units.heavy)
        $('#palnner_unit_input_ram').val(temp.units.ram)
        $('#palnner_unit_input_catapult').val(temp.units.catapult)
        $('#palnner_unit_input_knight').val(temp.units.knight)
        $('#palnner_unit_input_snob').val(temp.units.snob)
    }
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
    window.launchDialog.step3Check();
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
    window.launchDialog.step3Check();
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