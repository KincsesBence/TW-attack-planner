import { Lang } from "../core/Language"


export const confirmCalculateAttackModal = ()=>{
    return /* html */`
    <div class="modal-input-inline">
        <h2>${Lang('calculateQuestion')}</h2>
        <label for="diff-time">${Lang('timeDiff')}</label> 
        <select id="diff-time-sign">
            <option>-</option>
            <option selected>+</option>
        <select>
        <input id="diff-time" type="time" step="2" value="00:00:00" />
    </div>
    <div class="modal-input-inline">
        <button class="btn" onclick="window.confirmCalculateAttack()">${Lang('yes')}</button> 
        <button class="btn" onclick="window.closeModal()">${Lang('cancel')}</button>
    </div>
    `
}