import { Lang } from "../core/Language"

export const addVillageBoosterModal = (target:number)=>{
    return /* html */`
    <div class="modal-input-group">
        <label for="planner-notes">${Lang('boosterPct')}:</label>
        <input id="planner-village-boost" type="number" max="60" min="1" placeholder="%">
    </div>
    <div class="modal-input-inline">
        <button class="btn" onclick="window.targetItem.confirmAddVillageBooster(${target})">${Lang('yes')}</button> 
    </div>
    `
}