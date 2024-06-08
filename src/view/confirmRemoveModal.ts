import { Lang } from "../core/Language"

export const confirmRemoveModal = (launcher:number,target:number)=>{
    return /* html */`
    <div class="modal-input-inline">
        <h2>${Lang('removeQuestion')}</h2>
    </div>
    <div class="modal-input-inline">
        <button class="btn" onclick="window.targetItem.confirmRemoveTargetLauncherItem(${launcher},${target})">${Lang('yes')}</button> 
        <button class="btn" onclick="window.closeModal()">${Lang('cancel')}</button>
    </div>
    `
}