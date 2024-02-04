

export const confirmCalculateAttackModal = ()=>{
    return /* html */`
    <div class="modal-input-inline">
        <h2>Biztosan szeretnéd kiszámítani?</h2>
    </div>
    <div class="modal-input-inline">
        <button class="btn" onclick="window.confirmCalculateAttack()">Igen</button> 
        <button class="btn" onclick="window.closeModal()">Mégse</button>
    </div>
    `
}