import { Lang } from "../core/Language";

export const editLaunchVillagesModal = (launchVillages:village[])=>{
    return /* html */`
        <label for="">${Lang('launchers')}:</label><br>
        <select id="plan_launcher_list" size="5">
        </select>
        <label for="">${Lang('groups')}:</label><br>
        <select id="plan_launcher_select" style="font-size:16px" >
            ${window.Groups.map((group)=>{
                return /* html */`<option value="${group.id}">${group.name}</option>`;
            }).join('')}
        </select>
        <label for="">${Lang('available')}:</label><br>
        <select id="plan_launcher_select_state" style="font-size:16px" >
            <option value="home">${Lang('home')}</option>
            <option value="all">${Lang('all')}</option>
        </select>
        <div>
            <button class="btn" onclick="editLaunchVillagesModal.addGroup()" >${Lang('add')}</button>
            <button class="btn" onclick="editLaunchVillagesModal.removeGroup()" >${Lang('remove')}</button>
        </div>
    `
}

window.editLaunchVillagesModal= {
    addGroup:()=> {
        let val=parseInt($('#plan_launcher_select').val().toString());
        let valState=$('#plan_launcher_select_state').val().toString();


        let ind = window.launchDialog.groupIDs.findIndex((groupID)=>{return groupID.id==val});

        if(ind>-1){
            return;
        }

        window.launchDialog.groupIDs.push({
            id:val,
            name:$("#plan_launcher_select option:selected").text(),
            all:valState === 'all'
        });

        let html='';
        window.launchDialog.groupIDs.forEach((group)=>{
            html+= /* html */`<option value="${group.id}">${group.name} (${group.all!? Lang('all'):Lang('home')})</option>`;
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