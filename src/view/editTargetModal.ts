
export const editTargetModal = ()=>{
    return /* html */`
    <div class="modal-input-group">
        <label for="">new targets:</label><br>
        <textarea id="plan_targets" size="10"></textarea>
    </div>
    <div class="modal-input-inline">
        <button class="btn" onclick="window.closeModal()">Bezár</button>
    </div>
    `
}
