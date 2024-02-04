
export const editTargetModal = ()=>{
    return /* html */`
    <div class="modal-input-group">
        <label for="">new targets:</label><br>
        <textarea id="plan_targets" size="10"></textarea>
    </div>
    <div class="modal-input-inline">
        <button class="btn" onclick="window.addTargets()">Hozzáad</button>
    </div>
    <div class="modal-input-inline">
        <button class="btn" onclick="window.closeModal()">Bezár</button>
    </div>
    `
}

window.addTargets = () => {
    let val:string = $('#plan_targets').val().toString();
    let reg = Array.from(val.matchAll(/([0-9]{1,3}).([0-9]{1,3})/g));
    reg.forEach((elem:any)=>{
        let coord=elem[1]+"|"+elem[2];
        let village = window.Villages.find((village:village)=>{ return village.coord.text==coord})     
        console.log(coord,village);
        if(village){
            window.attackPlan.targetPool.push({
                booster:0,
                launchers:[],
                village
            })
        }
    });
    $('.planner-modal-content').html(editTargetModal());
    window.renderTargetVillages();
    window.closeModal()
}