import { calcTargetInfo } from "./Api";

const upgrades = [{v:'empty',fn:emptyVerUpgrade}];

export function upgradePlan(plan:plan){
        let version='empty'
        if(plan.hasOwnProperty("version")){
            version=plan.version
        }

        let ind = upgrades.findIndex(u => u.v===version);

        if(ind==-1) return plan;

        for (let j = ind; j < upgrades.length; j++) {
            plan = upgrades[j].fn(plan)
        }

        plan.version = SCRIPT_INFO.version

    return plan;
}

function emptyVerUpgrade(plan:plan){
    plan.targetPool.forEach((target)=>{
        target.info = calcTargetInfo(target.launchers);
        const playerInd=window.Players.findIndex(p=>p.id==target.village.owner as number)
        const owner = playerInd==-1? null:{
           name: window.Players[playerInd].name,
           id: window.Players[playerInd].id
        }
        target.village.owner=owner
    })
    
    return plan
}