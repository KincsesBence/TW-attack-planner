
export const editTemplatesModal = (templates:template[])=>{
    window.templateModal.templateRef=templates;
    return /* html */`
        <style>
            .template-editor {  
            margin: 0 auto;
            display: grid;
            grid-template-columns: 100px 100px;
            grid-template-rows: max-content 35px max-content max-content;
            text-align:center;
            gap: 10px 0px;
            grid-auto-flow: row;
            grid-template-areas:
                "template-select-box template-select-box"
                "template-buttons template-buttons"
                "template-infantry template-calvary"
                "template-machines template-other";
            }
            .template-select-box { grid-area: template-select-box; display:grid; }
            .template-calvary { grid-area: template-calvary; }
            .template-machines { grid-area: template-machines; }
            .template-other { grid-area: template-other; }
            .template-buttons{ grid-area: template-buttons; }
            .template-infantry { grid-area: template-infantry; }
            .template-input-group{
                margin-top:5px;
            }

            .template-editor option {
                font-size: 16px;
                padding: 2px 5px;
                text-align: center;
            }
            .template-unitsInput {
                width: 45px;
            }

        </style>
        <div class="template-editor">
            <div class="template-select-box">
                <label for="template_select">Templates:</label>
                <select onclick="templateModal.selectTemplate()" id="template_select" size="5">
                    ${templates.map((template)=>{
                        return /* html */`
                        <option value="${template.name}">${template.name}</option>
                        `
                    })
                    }
                </select>
                <label for="temp_name">name:</label>
                <input id="temp_name" type="text" />
            </div>
            <div class="template-infantry">
                <div class="template-input-group">
                    <img src="https://dshu.innogamescdn.com/asset/31698b62/graphic/unit/unit_spear.png" >
                    <input id="palnner_unit_input_spear" type="number" tabindex="1" value="0" class="template-unitsInput"><br>
                    <input onclick="templateModal.selectAll('spear')" id="max_spear" type="checkbox"> Összes
                </div>
                <div class="template-input-group">
                    <img src="https://dshu.innogamescdn.com/asset/31698b62/graphic/unit/unit_sword.png" >
                    <input id="palnner_unit_input_sword" type="number" tabindex="1" value="0" class="template-unitsInput"><br>
                    <input onclick="templateModal.selectAll('sword')" id="max_sword" type="checkbox"> Összes
                </div>
                <div class="template-input-group">
                    <img src="https://dshu.innogamescdn.com/asset/31698b62/graphic/unit/unit_axe.png" >
                    <input id="palnner_unit_input_axe" type="number" tabindex="1" value="0" class="template-unitsInput"><br>
                    <input onclick="templateModal.selectAll('axe')" id="max_axe" type="checkbox"> Összes
                </div>
                <div class="template-input-group" ${window.gameConfig.game.archer==0 ? 'style="display:none;"':''} >
                    <img src="https://dshu.innogamescdn.com/asset/31698b62/graphic/unit/unit_archer.png" >
                    <input id="palnner_unit_input_archer" type="number" tabindex="1" value="0" class="template-unitsInput"><br>
                    <input onclick="templateModal.selectAll('archer')" id="max_archer" type="checkbox"> Összes
                </div>
            </div>
            <div class="template-calvary">
                <div class="template-input-group">
                    <img src="https://dshu.innogamescdn.com/asset/31698b62/graphic/unit/unit_spy.png" >
                    <input id="palnner_unit_input_spy" type="number" tabindex="1" value="0" class="template-unitsInput"><br>
                    <input onclick="templateModal.selectAll('spy')" id="max_spy" type="checkbox"> Összes
                </div>
                <div class="template-input-group">
                    <img src="https://dshu.innogamescdn.com/asset/31698b62/graphic/unit/unit_light.png" >
                    <input id="palnner_unit_input_light" type="number" tabindex="1" value="0" class="template-unitsInput"><br>
                    <input onclick="templateModal.selectAll('light')" id="max_light" type="checkbox"> Összes
                </div>
                <div class="template-input-group" ${window.gameConfig.game.archer==0 ? 'style="display:none;"':''}>
                    <img src="https://dshu.innogamescdn.com/asset/31698b62/graphic/unit/unit_marcher.png" >
                    <input id="palnner_unit_input_marcher" type="number" tabindex="1" value="0" class="template-unitsInput"><br>
                    <input onclick="templateModal.selectAll('marcher')" id="max_marcher" type="checkbox"> Összes
                </div>
                <div class="template-input-group">
                    <img src="https://dshu.innogamescdn.com/asset/31698b62/graphic/unit/unit_heavy.png" >
                    <input id="palnner_unit_input_heavy" type="number" tabindex="1" value="0" class="template-unitsInput"><br>
                    <input onclick="templateModal.selectAll('heavy')" id="max_heavy" type="checkbox"> Összes
                </div>    
            </div>
            <div class="template-machines">
                <div class="template-input-group">
                    <img src="https://dshu.innogamescdn.com/asset/31698b62/graphic/unit/unit_ram.png" >
                    <input id="palnner_unit_input_ram" type="number" tabindex="1" value="0" class="template-unitsInput"><br>
                    <input onclick="templateModal.selectAll('ram')" id="max_ram" type="checkbox"> Összes
                </div>
                <div class="template-input-group">
                    <img src="https://dshu.innogamescdn.com/asset/31698b62/graphic/unit/unit_catapult.png" >
                    <input id="palnner_unit_input_catapult"  type="number" tabindex="1" value="0" class="template-unitsInput"><br>
                    <input onclick="templateModal.selectAll('catapult')" id="max_catapult" type="checkbox"> Összes
                </div>
            </div>
            <div class="template-other">
                <div class="template-input-group">
                    <img src="https://dshu.innogamescdn.com/asset/31698b62/graphic/unit/unit_knight.png" >
                    <input id="palnner_unit_input_knight" type="number" tabindex="1" value="0" class="template-unitsInput"><br>
                    <input onclick="templateModal.selectAll('knight')" id="max_knight" type="checkbox"> Összes
                </div>
                <div class="template-input-group">
                    <img src="https://dshu.innogamescdn.com/asset/31698b62/graphic/unit/unit_snob.png" >
                    <input id="palnner_unit_input_snob" type="number" tabindex="1" value="0" class="template-unitsInput"><br>
                    <input onclick="templateModal.selectAll('snob')" id="max_snob" type="checkbox"> Összes
                </div>
            </div>
            <div class="template-buttons">
                <button class="btn" onclick="templateModal.addTemplate()">add</button>
                <button class="btn" onclick="templateModal.removeTemplate()">remove</button>
            </div>
        </div>
    `
}

window.templateModal = {
    templateRef:[],
    addTemplate: ()=> {
        let template:template ={
            name:$('#temp_name').val().toString(),
            units:{spear:0,sword:0,archer:0,axe:0,spy:0,light:0,marcher:0,heavy:0,ram:0,catapult:0,knight:0,snob:0}
        } 

        Object.keys(template.units).forEach((unit)=>{
            
            let val = parseInt($(`#palnner_unit_input_${unit}`).val().toString()) ;
            console.log($(`#max_${unit}`).is(":checked"));
            
            if($(`#max_${unit}`).is(":checked")){
                val=99999
            }

            if(val==null){
                val=0;
            }

            template.units[unit as keyof unitConfig]=val;

        })
        console.log(template);
    
        if(template.name==""){
            return
        }
        let ind=window.templateModal.templateRef.findIndex((temp)=>{ return temp.name==template.name});
    
        if(ind>-1){
            window.templateModal.templateRef[ind]=template;
        }else{
            window.templateModal.templateRef.push(template);
        }
        $('#temp_name').val('');
        Object.keys(template.units).forEach((unit)=>{
            $(`#palnner_unit_input_${unit}`).val('0')
            $(`#palnner_unit_input_${unit}`).prop('disabled',false);
            $(`#max_${unit}`).prop("checked",false);
        })
    
        let select="";
        window.templateModal.templateRef.forEach((temp)=>{
            select+=`<option value="${temp.name}">${temp.name}</option>`;
        });
        $('#template_select').html(select);
        window.launchDialog.stepCheck();
    },
    removeTemplate:()=> {
        let val=$('#template_select').val();
    
        let ind=window.templateModal.templateRef.findIndex((temp)=>{ return temp.name==val})
        
        if(ind>-1){
            window.templateModal.templateRef.splice(ind,1);
        }
    
        let select="";
        window.templateModal.templateRef.forEach((temp)=>{
            select+=`<option value="${temp.name}">${temp.name}</option>`;
        });
    
        $('#template_select').html(select);
        window.launchDialog.stepCheck();
    },
    selectTemplate:()=> {
        let val=$('#template_select').val();
    
        let ind=window.templateModal.templateRef.findIndex((temp)=>{ return temp.name==val})
        console.log(ind,val,window.templateModal.templateRef);
        
        if(ind>-1){
            let temp=window.templateModal.templateRef[ind]
            console.log(temp);
            $('#temp_name').val(temp.name);
            Object.keys(temp.units).forEach((unit)=>{
                let val=temp.units[unit as keyof unitConfig];
                if(val==99999){
                    $(`#max_${unit}`).prop("checked",true);
                    $(`#palnner_unit_input_${unit}`).prop('disabled',true);
                    $(`#palnner_unit_input_${unit}`).val('');
                }else{
                    $(`#palnner_unit_input_${unit}`).val(val);
                    $(`#palnner_unit_input_${unit}`).prop('disabled',false);
                    $(`#max_${unit}`).prop("checked",false);
                }
            })
        }
    },
    selectAll:(unit:string)=>{
        if($(`#max_${unit}`).prop("checked")){
            $(`#palnner_unit_input_${unit}`).val('');
        }else{
            $(`#palnner_unit_input_${unit}`).val('0');
        }

        $(`#palnner_unit_input_${unit}`).prop('disabled',$(`#max_${unit}`).prop("checked"));
    }
}


