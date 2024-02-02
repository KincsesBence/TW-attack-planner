
export const ConfirmVillageSpeedRemoveModal = (target:number)=>{
    return /* html */`
    <div class="modal-input-inline">
        <h2>Biztosan szeretnéd eltávolítani?</h2>
    </div>
    <div class="modal-input-inline">
        <button class="btn" onclick="window.targetItem.confirmRemoveVillageBooster(${target})">Igen</button> 
        <button class="btn" onclick="window.closeModal()">Mégse</button>
    </div>
    `
}