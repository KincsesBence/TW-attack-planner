import { TroopTransaction, calcUnitPop, coordDistance, game, hasAvailableTroops, savePlan } from "../core/Api";
import { Lang } from "../core/Language";

export const autoAssignModal = ()=>{
    let templates='';

    window.attackPlan.templates.forEach((template)=>{
        templates+=/* html */`
            <option value='${template.name}'>${template.name}</option>
        `;
    });

    

    return /* html */`
    <style>
        .assigner-row {  display: grid;
            display: grid;
            grid-template-columns: 200px repeat(auto-fill, 80px) 10px;
        }

        .assigner-row input{
            width:30px;
        }

        .item{
            padding:5px;
        }

        .add-assignment{
            width: 130px;
        }

        .add-assignment input{
            width: 50px;
        }

        .assigner-target-villages{
            width:1100px;
            max-height:250px;
            overflow-y:auto;
            border: solid 1px #6c4824;
            border-radius: 5px;
            background-color:#fff5dc;
        }

        .assigner-target-villages .item{
            border: solid 1px #6c4824;
        }

        .assigner-counter .item{
            border: solid 1px #6c4824;
        }

        .assigner-counter .item:first-of-type{
            border: none !important;
        }

        .assigner-counter .item:last-of-type{
            border: none !important;
        }


        .assigner-target-btn{
            display:block;
            width: 20px;
            height: 20px;
            background: url(https://dshu.innogamescdn.com/asset/80b013af/graphic/login_close.png) top left no-repeat;
            cursor: pointer;
            background-size: 20px;
            margin-right: 10px;
        }

        .assigner-date div{
            transform: rotate(290deg) translateX(20px);
            text-wrap: nowrap;
        }

        .assignment-alg{
            margin:15px 0;
            display: flex;
            justify-content: center;
        }

        .add-assignment-input{
            margin-bottom:5px;
            display:grid;
        }
    </style>
    
    <div class="assigner">
        <div class="add-assignment">
            <div class="add-assignment-input">
                <label>${Lang('date')}:</label>
                <select id="assignmentArrival">
                ${window.attackPlan.arrivals.map((arrival)=>{
                    return /* html */`<option value='${arrival}'>${arrival}</option>`
                }).join('')}
                </select>
            </div>
            <div class="add-assignment-input">
                <label>${Lang('template')}:</label>
                <select id="assignmentTemplates">
                    ${templates}
                </select>
            </div>
            <div class="add-assignment-input">
                <label>${Lang('qntt')}:</label>
                <input min="1" value="1" id="assigner-number-filter" type="number" disabled>
                <input id="assigner-max-filter" onclick="$('#assigner-number-filter').prop('disabled', (i, v) => !v);" type="checkbox" checked>
            </div>
            
            <button class="btn" onclick="autoAssign.addAssignment()">+ ${Lang('add')}</button>
        </div>
        <div class="assigner-header">
            <div class="assigner-row assigner-date">
                    <div class="item"></div>
                    <div class="item checkbox"></div>
            </div>
            <div class="assigner-row assigner-remover">
                    <div class="item"></div>
                    <div class="item checkbox"></div>
            </div>
            <div class="assigner-row assigner-loader">
                    <div class="item"></div>
                    <div class="item checkbox"></div>
            </div>
            <div class="assigner-row assigner-name">
                <div class="item">${Lang('village')} (${window.attackPlan.targetPool.length})</div>
                <div class="item checkbox">
                    <input id="assigner-main-checkbox" onclick="autoAssign.checkAll()" type="checkbox">
                </div>
            </div>  
        </div>
        <div class="assigner-target-villages">
            ${window.attackPlan.targetPool.map((target:target)=>{
            return /* html */`
                <div class="assigner-row" id="assigner-row-${target.village.id}">
                    <div class="item"><a target="_blank" href="/game.php?village=${game.village.id}&screen=info_village&id=${target.village.id}">${target.village.name}(${target.village.coord.text}) K${target.village.kontinent}</a></div>
                    <div class="item checkbox">
                        <input class="assigner-target-check" value="${target.village.id}" type="checkbox">
                    </div>
                </div>
            `
        }).join('')}
        </div>
        <div class="assigner-row assigner-counter">
            <div class="item"></div>
            <div class="item checkbox"></div>
        </div>
        <div class="assignment-alg">
            <input id="evenDistributeClosest" value="1" type="radio" name="assignmentAlg"><label for="evenDistributeClosest">${Lang('even')}</label>
            <input id="oneByOneQ" value="2" type="radio" name="assignmentAlg"><label for="oneByOneQ">${Lang('oneByOne')}</label>
            <input id="oneByOneClosest" value="3"  type="radio" name="assignmentAlg"><label for="oneByOneClosest">${Lang('oneByOneClosest')}</label>
            <input id="closestToTarget" value="4" type="radio" name="assignmentAlg"><label for="closestToTarget">${Lang('closestToTarget')}</label>
        </div>
        <div>
            <button style="margin: 0 auto; display: block;" onclick="autoAssign.startAssignment()" class="btn">${Lang('startAssignment')}</button>
        </div>
        
    </div>
    <div id="dialog-loading" style="display: none;justify-content: center;width: 100%;">
        <img style="height:25px" src="https://dshu.innogamescdn.com/asset/6389cdba/graphic/loading.gif"><span style="padding:5px">${Lang('assigningAttacks')}...</span>
    </div>
    `
}

window.autoAssign = {
    assignTypes:[],
    launchPoolCopy:[],
    removeAssignment:(id) =>{
        let ind = window.autoAssign.assignTypes.findIndex((type)=>{return type.id==id.toString()})
        if(ind==-1){
            return
        }
        window.autoAssign.assignTypes[ind].filtered.forEach((village:village)=>{
            let lpcInd=window.autoAssign.launchPoolCopy.findIndex((vil:village)=>{return vil.id==village.id})
            if (lpcInd==-1){
                window.autoAssign.launchPoolCopy.push(village);
            }else{
                if(window.autoAssign.assignTypes[ind].template.units.snob>0){
                    if(window.autoAssign.assignTypes[ind].template.units.marcher<0){
                        village.unitsContain.marcher-=window.autoAssign.assignTypes[ind].template.units.marcher;
                    }
                    if(window.autoAssign.assignTypes[ind].template.units.light<0){
                        village.unitsContain.light-=window.autoAssign.assignTypes[ind].template.units.light;
                    }
                    if(window.autoAssign.assignTypes[ind].template.units.axe<0){
                        village.unitsContain.axe-=window.autoAssign.assignTypes[ind].template.units.axe;
                    }
                }
                [window.autoAssign.launchPoolCopy[lpcInd].unitsContain,village.unitsContain]  
                = TroopTransaction(
                    window.autoAssign.launchPoolCopy[lpcInd].unitsContain,
                    village.unitsContain,
                    village.unitsContain
                )
            }

        });
        window.autoAssign.assignTypes.splice(ind,1);
        $('.ar-'+id).remove();

    },
    fillAssignment:(id) =>{
        $(`.assigner-target-villages .assigner-target-check`).get().forEach((elem)=>{
            
            if(!$(elem).is(':checked')){
                return
            }
            let val= $(`.assigner-loader .ar-${id}`).find('.ass-inp').val();
            $(elem).parent().parent().find(`.ar-${id} .ass-inp`).val(val);
        })
        window.autoAssign.updateCount(id);
    },
    addAssignment:() =>{
        if(window.autoAssign.assignTypes.length>=10){
            return;
        }
        let arrival= $('#assignmentArrival').val().toString();
        let max=99999;
        if(!$('#assigner-max-filter').is(':checked')){
            max=parseInt($('#assigner-number-filter').val().toString());
        }
        let templateName= $('#assignmentTemplates').val().toString();
        let temp= window.attackPlan.templates.find((template)=>{
            return template.name==templateName;
        })
        let newAssignment = {
            id:new Date().getTime().toString(),
            arrival:arrival,
            filtered:filterVillages(temp,max),
            required:0,
            template:temp,
            max:max
        }

        window.autoAssign.assignTypes.push(newAssignment);
        $('.assigner-header .assigner-loader .checkbox').before(/* html */`<div class="item ar-${newAssignment.id}" >
        <input class="ass-inp" value="0" type="number" min="0">
        <button onclick="autoAssign.fillAssignment(${newAssignment.id})">↓</button></div>
        `)
        $('.assigner-header .assigner-name .checkbox').before(/* html */`
            <div class="item ar-${newAssignment.id}" >${newAssignment.template.name}</div>
        `);
        $('.assigner-header .assigner-remover .checkbox').before(/* html */`
            <div class="item ar-${newAssignment.id}" ><a onclick="autoAssign.removeAssignment(${newAssignment.id})" class="assigner-target-btn"></a></div>
        `);
        $('.assigner-header .assigner-date .checkbox').before(/* html */`
        <div class="item ar-${newAssignment.id}" >${newAssignment.arrival}</div>
        `);
        $('.assigner-target-villages').find('.assigner-row').get().forEach((row)=>{
            $(row).find('.checkbox').before(/* html */`<div class="item ar-${newAssignment.id}" >
                <input class="ass-inp" 
                onchange="autoAssign.updateCount(${newAssignment.id})" 
                onkeyup="autoAssign.updateCount(${newAssignment.id})" 
                value="0" type="number" min="0"></div>`);
        })
        $('.assigner-counter .checkbox').before(/* html */`
        <div class="item ar-${newAssignment.id}" ><span class="cnt-actual">0</span>/${newAssignment.filtered.length}</div>
        `);

        console.log(window.autoAssign.assignTypes);
        
    },
    startAssignment:()=>{
        let alg=$('input[name="assignmentAlg"]:checked').val();
        if (!alg) {
            window.UI.ErrorMessage(Lang('noAlgSelected'));
            return;
        }

        if(window.autoAssign.assignTypes.length==0){
            window.UI.ErrorMessage(Lang('noAttackAssigned'));
            return;
        }

        
        $('#dialog-loading').show();
        $('#plannerCloseBtn').hide();
        $('.assigner').hide();
        setTimeout(() => {
            
            switch (alg){
                case "1":
                    evenDistributeClosest()
                break;
                case "2":
                    oneByOneQ()
                break;
                case "3":
                    oneByOneClosest()
                break;
                case "4":
                    closestToTarget()
                break;
            }
            window.targetPoolQuery.resetAll();
            window.launchVillagesQuery.resetAll();
            window.closeModal();
            savePlan()
        }, 200);
        
    },
    checkAll:() =>{
        let checked = $('.assigner-target-villages').find('input[type=checkbox]').get();
        checked.forEach((check)=>{
                $(check).prop( "checked", $('#assigner-main-checkbox').prop('checked'));
        })
    },
    updateCount:(id) =>{
        let cntr=0;
        $(`.assigner-target-villages .ar-${id} .ass-inp`).get().forEach((elem)=>{
            let val= $(elem).val();
            cntr+=parseInt(val.toString().split('x')[0]);
        })
        console.log(id,cntr);
        let ind=window.autoAssign.assignTypes.findIndex((assign)=>{return assign.id==id.toString()})
        window.autoAssign.assignTypes[ind].required=cntr;
        $(`.assigner-counter .ar-${id} .cnt-actual`).text(cntr);
    },
}

function filterVillages(template:template,max:number):village[]{
    let villages:village[]=[];

    for (let indLanucher = 0; indLanucher < window.autoAssign.launchPoolCopy.length; indLanucher++) {
        const Lanucher = window.autoAssign.launchPoolCopy[indLanucher];
        if(villages.length>=max) break;

        if(hasAvailableTroops(Lanucher,template.units)){
            let newVillage={...Lanucher};
            newVillage.unitsContain={spear:0,sword:0,axe:0,archer:0,spy:0,light:0,marcher:0,heavy:0,ram:0,catapult:0,knight:0,snob:0};
            
            [newVillage.unitsContain,Lanucher.unitsContain]  
            = TroopTransaction(
                newVillage.unitsContain,
                Lanucher.unitsContain,
                template.units
            )
            if(template.units.snob>0){
                if(template.units.marcher<0){
                    Lanucher.unitsContain.marcher=0;
                }
                if(template.units.light<0){
                    Lanucher.unitsContain.light=0;
                }
                if(template.units.axe<0){
                    Lanucher.unitsContain.axe=0;
                }
            }
            newVillage.popSize=calcUnitPop(newVillage.unitsContain);
            Lanucher.popSize=calcUnitPop(Lanucher.unitsContain);
            villages.push(newVillage);

            if(Lanucher.popSize==0){
                console.log('removed');
                window.autoAssign.launchPoolCopy.splice(indLanucher,1);
            }
        }
    }
    
    return villages;
}

function oneByOneQ(){
    for (let indTarget = 0; indTarget < window.attackPlan.targetPool.length; indTarget++) {
        const target = window.attackPlan.targetPool[indTarget];
        for (let indAssign = 0; indAssign <  window.autoAssign.assignTypes.length; indAssign++) {
            const assignType = window.autoAssign.assignTypes[indAssign];
            if(assignType.filtered.length==0) continue;
            let cnt=parseInt($(`#assigner-row-${target.village.id} .ar-${assignType.id} .ass-inp`).val().toString());
            for (let i = 0; i < cnt; i++) {
                let choosen=-1;
                let smallest=999999;
                assignType.filtered.forEach((launchVillage,indLanucher)=>{
                    let dist=coordDistance(launchVillage,target.village);
                    if(dist<smallest){
                        choosen=indLanucher;
                        smallest=dist;
                    }
                })
                if(choosen>-1){
                    let realInd=window.attackPlan.launchPool.findIndex((village:village)=>{return village.id==assignType.filtered[choosen].id})
                    window.addLauncher(indTarget,realInd,assignType.template.units,'attack',assignType.arrival,'');
                    assignType.filtered.splice(choosen,1);
                }
            }
        }
    }
}

function oneByOneClosest(){
    for (let indTarget = 0; indTarget < window.attackPlan.targetPool.length; indTarget++) {
        const target = window.attackPlan.targetPool[indTarget];
        for (let indAssign = 0; indAssign <  window.autoAssign.assignTypes.length; indAssign++) {
            const assignType = window.autoAssign.assignTypes[indAssign];
            if(assignType.filtered.length==0) continue;
            let cnt=parseInt($(`#assigner-row-${target.village.id} .ar-${assignType.id} .ass-inp`).val().toString());
            for (let i = 0; i < cnt; i++) {
                let realInd=window.attackPlan.launchPool.findIndex((village:village)=>{return village.id==assignType.filtered[0].id})
                window.addLauncher(indTarget,realInd,assignType.template.units,'attack',assignType.arrival,'');
                assignType.filtered.splice(0,1);
            }
        }
    }
}

function closestToTarget(){
    let assigned:assignmentCount[]=[];
    for (let indAssign = 0; indAssign <  window.autoAssign.assignTypes.length; indAssign++) {
        const assignType = window.autoAssign.assignTypes[indAssign];
        if(assignType.filtered.length==0) continue;
        for (let indLanucher = 0; indLanucher < assignType.filtered.length; indLanucher++) {
            const launchVillage = assignType.filtered[indLanucher];
            let choosen=-1;
            let smallest=999999;
            for (let indTarget = 0; indTarget < window.attackPlan.targetPool.length; indTarget++) {
                const target=window.attackPlan.targetPool[indTarget];
                let assInd=assigned.findIndex((assign)=>{return assign.id==target.village.id});
                let cnt=0;
                for (let i = 0; i < indAssign+1; i++) {
                    cnt+=parseInt($(`#assigner-row-${target.village.id} .ar-${window.autoAssign.assignTypes[i].id} .ass-inp`).val().toString());
                }
                console.log(cnt);
                if(assInd>-1){
                    if(assigned[assInd].cnt>=cnt) continue;
                }

                let dist=coordDistance(launchVillage,target.village);
                if(dist<smallest){
                    choosen=indTarget;
                    smallest=dist;
                }
            }
            if(choosen>-1){
                let assInd=assigned.findIndex((assign)=>{return assign.id==window.attackPlan.targetPool[choosen].village.id})
                if(assInd==-1){
                    assigned.push({
                        id:window.attackPlan.targetPool[choosen].village.id,
                        cnt:1
                    })
                }else{
                    assigned[assInd].cnt++;
                }
                let realInd=window.attackPlan.launchPool.findIndex((village:village)=>{return village.id==assignType.filtered[indLanucher].id})
                window.addLauncher(choosen,realInd,assignType.template.units,'attack',assignType.arrival,'');
                assignType.filtered.splice(indLanucher,1);
            }
        }
    }
}

function evenDistributeClosest(){
    window.autoAssign.assignTypes.forEach((assignType,index) => { 
        let filled=0;
       while (assignType.filtered.length>0 && assignType.required>filled) {
        for (let indTarget = 0; indTarget < window.attackPlan.targetPool.length; indTarget++) {
            const target=window.attackPlan.targetPool[indTarget];
            let cnt=0;     
            for (let i = 0; i < index+1; i++) {
                cnt+=parseInt($(`#assigner-row-${target.village.id} .ar-${window.autoAssign.assignTypes[i].id} .ass-inp`).val().toString());
            }
            console.log(cnt);
            if(target.launchers.length<cnt){
                let choosen=-1;
                let smallest=999999;
                assignType.filtered.forEach((launchVillage,indLanucher)=>{
                    let dist=coordDistance(launchVillage,target.village);
                    if(dist<smallest){
                        choosen=indLanucher;
                        smallest=dist;
                    }
                })
                if(choosen>-1){
                    filled++;
                    console.log(filled,assignType.required);
                    let realInd=window.attackPlan.launchPool.findIndex((village:village)=>{return village.id==assignType.filtered[choosen].id})
                    window.addLauncher(indTarget,realInd,assignType.template.units,'attack',assignType.arrival,'');
                    assignType.filtered.splice(choosen,1);
                }
            }
        }
       }
    });
}