
export const editTargetModal = (targets:target[])=>{
    window.editTargetModal.targetRef=targets;
    return /* html */`
    <div class="modal-input-group">
    <label for="target-select">Targets (<span id="modal-targets-cnt">${targets.length}</span>):</label>
    <select id="target-select" size="5">
        ${targets.map((target)=>{
            return /* html */`
            <option value="${target.village.name}">${target.village.name} (${target.village.coord.text}) K${target.village.kontinent}</option>
            `
        }).join('')}
    </select>
    </div>
    <div class="modal-input-group">
        <label for="">new targets:</label><br>
        <textarea id="plan_targets" size="10"></textarea>
    </div>
    <div class="modal-input-inline">
        <button class="btn" onclick="editTargetModal.addTargets()">Add</button><button class="btn" onclick="editTargetModal.removeTargets()">Remove</button>
    </div>
    `
}

window.editTargetModal = {
    addTargets:() => {
        let val:string = $('#plan_targets').val().toString();
        console.log(val);
        let reg = Array.from(val.matchAll(/([0-9]{1,3}).([0-9]{1,3})/g));
        console.log(reg);
        reg.forEach((elem:any)=>{
            let coord=elem[1]+"|"+elem[2];
            let village = window.Villages.find((village:village)=>{ return village.coord.text==coord})
            let idx = window.editTargetModal.targetRef.findIndex((target:target)=>{ return target.village.coord.text==coord})
            if(village && idx==-1){
                window.editTargetModal.targetRef.push({
                    booster:0,
                    launchers:[],
                    village:village
                })
            }
        });

        $('#plan_targets').val('');
        $('#modal-targets-cnt').text(window.editTargetModal.targetRef.length);
        $('#target-select').html(window.editTargetModal.targetRef.map((target:target)=>{
            return /* html */`
            <option value="${target.village.name}">${target.village.name} (${target.village.coord.text}) K${target.village.kontinent}</option>
            `
        }).join(''))
        window.launchDialog.stepCheck();
    },
    removeTargets:() => {},
    targetRef:[],
}




