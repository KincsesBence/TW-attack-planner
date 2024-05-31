import { TroopTransaction, calcUnitPop, getSlowestUnit } from "../core/Api"

export const addAttackModal = ()=>{
    return /* html */`
    <div class="modal-input-inline">
        <label for="attack">Támadás:</label>
        <input type="radio" value="attack" name="planner-operation" checked>
        <label for="reinforce">Erősítés:</label>
        <input type="radio" value="reinforce" name="planner-operation">
    </div>
    <div class="modal-input-group">
        <label for="planner-template">Template:</label>
        <select id="planner-template" placeholder="---Nincs kiválasztva---">
            <option value="temp_all">Összes egység</option>
            ${window.attackPlan.templates.map((template)=>{
                return /* html */`<option value="${template.name}">${template.name}</option>`
            })}
        </select>
    </div>
    <div class="modal-input-group">
        <label for="planner-arrival">Érkezés:</label>
        <select id="planner-arrival" placeholder="---Nincs kiválasztva---">
            ${window.attackPlan.arrivals.map((arrival)=>{
                return /* html */`<option value="${arrival}">${arrival}</option>`
            })}
        </select>
    </div>
    <div class="modal-input-group">
        <label for="planner-notes">Megjegyzés:</label>
        <input id="planner-notes" placeholder="---Nincs megjegyzés---">
    </div>
    <div class="modal-input-inline">
        <button class="btn" onclick="window.addAttackConfirm()">Hozzáadás</button> 
        <button class="btn" onclick="window.closeModal()">Mégse</button>
    </div>
    `
}

window.window.addAttackConfirm = () => {  
    let launchers:village[]=[];
    let targets:target[]=[];

    if($('input[name="target"]:checked').get().length==0){
        window.UI.ErrorMessage('No target selected')
        return;
    }

    if($('.launch-list').find("input:checked").get().length==0){
        window.UI.ErrorMessage('No launcher selected')
        return;
    }

    let targetID:number = parseInt($('input[name="target"]:checked').val().toString());
    let templateName = $('#planner-template').val();
    let operation = $('input[name="planner-operation"]:checked').val().toString();
    let arrival = $('#planner-arrival').val().toString();
    let notes = $('#planner-notes').val().toString();

    console.log($('.launch-list').find("input:checked").get().length,targetID,templateName,operation,arrival,notes);

    let indTarget= window.attackPlan.targetPool.findIndex((target)=>{return target.village.id==targetID})    
    let indPlan= window.attackPlan.templates.findIndex((template)=>{return template.name==templateName})



    $('.launch-list').find("input:checked").get().forEach((input:any)=>{
        let launcherID = parseInt($(input).val().toString());
        let indLanucher = window.attackPlan.launchPool.findIndex((vill:village)=>{return vill.id==launcherID;})
        
        
        
        let template=null;
        if(indPlan>-1){
            template=window.attackPlan.templates[indPlan].units;
        }
        if(templateName=='temp_all'){
            template=window.attackPlan.launchPool[indLanucher].unitsContain
        }
        window.addLauncher(indTarget,indLanucher,template,operation,arrival,notes)
        launchers.push(window.attackPlan.launchPool[indLanucher]);
    })

    targets.push(window.attackPlan.targetPool[indTarget]);
    window.partialRender(launchers,targets);
    $('.planner-modal').hide();

    window.DB.savePlan(window.attackPlan);
}

window.addLauncher = (indTarget: number, indLanucher: number,trans:units,operation:string,arrival:string,notes:string) => { 
    console.log("addLauncher");
      
    let newVillage={...window.attackPlan.launchPool[indLanucher]};
        newVillage.unitsContain={spear:0,sword:0,axe:0,archer:0,spy:0,light:0,marcher:0,heavy:0,ram:0,catapult:0,knight:0,snob:0};
        
        [newVillage.unitsContain,window.attackPlan.launchPool[indLanucher].unitsContain]  
        = TroopTransaction(
            newVillage.unitsContain,
            window.attackPlan.launchPool[indLanucher].unitsContain,
            trans
        )

        newVillage.popSize=calcUnitPop(newVillage.unitsContain);
        window.attackPlan.launchPool[indLanucher].popSize=calcUnitPop(window.attackPlan.launchPool[indLanucher].unitsContain);
        

        //console.log(getSlowestUnit(newVillage.unitsContain,operation=='attack'));
        

        if(newVillage.popSize>0){
            window.attackPlan.targetPool[indTarget].launchers.push({
                arrival:arrival,
                isAttack:operation=='attack',
                notes:notes,
                unitSpeed:getSlowestUnit(newVillage.unitsContain,operation=='attack'),
                village:newVillage,
            })
        }

        if(window.attackPlan.launchPool[indLanucher].popSize==0){
            console.log('removed');
            window.attackPlan.launchPool.splice(indLanucher,1);
        }
}