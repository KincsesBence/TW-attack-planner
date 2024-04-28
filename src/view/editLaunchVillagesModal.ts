export const editLaunchVillagesModal = (launchVillages:village[])=>{
    return /* html */`
        <label for="">Lanuchers:</label><br>
        <select id="plan_launcher_list" size="5">
        </select>
        <select id="plan_launcher_select" style="font-size:16px" >
            ${window.Groups.map((group)=>{
                return /* html */`<option value="${group.id}">${group.name}</option>`;
            }).join('')}
        </select>
        <div>
            <button onclick="editLaunchVillagesModal.addGroup()" >add</button>
            <button onclick="editLaunchVillagesModal.removeGroup()" >remove</button>
        </div>
    `
}

window.editLaunchVillagesModal= {
    addGroup:()=> {
        let val=parseInt($('#plan_launcher_select').val().toString());

        let ind = window.launchDialog.groupIDs.findIndex((groupID)=>{return groupID.id==val});

        if(ind>-1){
            return;
        }

        window.launchDialog.groupIDs.push({
            id:val,
            name:$("#plan_launcher_select option:selected").text()
        });

        let html='';
        window.launchDialog.groupIDs.forEach((group)=>{
            html+= /* html */`<option value="${group.id}">${group.name}</option>`;
        })

        $('#plan_launcher_list').html(html);
        window.launchDialog.stepCheck();
    },
    removeGroup:()=> {
        let val=parseInt($('#plan_launcher_list').val().toString());
        let ind = window.launchDialog.groupIDs.findIndex((groupID)=>{return groupID.id==val});
        window.launchDialog.groupIDs.splice(ind,1);

        let html='';
        window.launchDialog.groupIDs.forEach((group)=>{
            html+= /* html */`<option value="${group.id}">${group.name}</option>`;
        })
        $('#plan_launcher_list').html(html);
        window.launchDialog.stepCheck();
    }
}