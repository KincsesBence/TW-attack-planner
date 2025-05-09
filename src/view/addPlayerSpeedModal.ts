import { savePlan } from "../core/Api";
import { Lang } from "../core/Language";

export const addPlayerSpeedModal = ()=>{

    let owners:number[]=[];
    window.attackPlan.targetPool.forEach((target:target)=>{
        if(!owners.includes(target.village.owner)){
            owners.push(target.village.owner);
        }
    })

    let ownerdata:player[]=[];

    owners.forEach((owner)=>{
        let res = window.Players.find((palyer:player)=>{return palyer.id==owner})
        if(!res) return
        if(window.attackPlan.boosters.findIndex((boost:boost)=>{return boost.playerId==res.id})==-1){
            ownerdata.push(res);
        }
    })

    return /* html */`
    <div class="modal-input-group">
        <select id="planner-player-boosts" size="5">
           ${window.attackPlan.boosters.map((boost:boost)=>{
            return /* html */`<option value="${boost.playerId}">${boost.player} (${boost.value}%)</option>`
           })}
        </select>
        <button class="btn" onclick="window.removePlayerBoost()">${Lang('remove')}</button>
    </div>

    <div class="modal-input-group">
        <select id="planner-player-select">
           ${ownerdata.map((data:player)=>{
            return /* html */`<option value="${data.id}">${data.name}</option>`
           })}
        </select>
        <label for="planner-player-boost">${Lang('boosterPct')}:</label>
        <input id="planner-player-boost" type="number" max="60" min="1" placeholder="%">
        <button class="btn" onclick="window.addPlayerBoost()">${Lang('add')}</button>
    </div>
    `
}


window.addPlayerBoost = ()=> {
    if($('#planner-player-boost').val()=="") return;

    let id=parseInt($('#planner-player-select').val().toString());
    let val=parseInt($('#planner-player-boost').val().toString());

    if(val==0) return;

    let player = window.Players.find((palyer:player)=>{return palyer.id==id})

    window.attackPlan.boosters.push({
        player:player,
        playerId:id,
        value:val
    })
    savePlan()
    $('.planner-modal-content').html(addPlayerSpeedModal());
}

window.removePlayerBoost = ()=> {
    if($('#planner-player-boosts').val()==null) return;
    let id=parseInt($('#planner-player-boosts').val().toString());
    let idx = window.attackPlan.boosters.findIndex((boost:boost)=>{return boost.playerId==id})
    window.attackPlan.boosters.splice(idx,1);
    $('.planner-modal-content').html(addPlayerSpeedModal());
}