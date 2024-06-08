import { Lang } from "../core/Language"


export const confirmCalculateAttackModal = ()=>{
    return /* html */`
    <div class="modal-input-inline">
        <h2>${Lang('calculateQuestion')}</h2>
    </div>
    <div class="modal-input-inline">
        <button class="btn" onclick="window.confirmCalculateAttack()">${Lang('yes')}</button> 
        <button class="btn" onclick="window.closeModal()">${Lang('cancel')}</button>
    </div>
    `
}