
export const editTemplatesModal = ()=>{
    return /* html */`
        <div class="modal-input-group">
            <label for="template_select">Templates:</label>
            <select onclick="selectTemplate()" id="template_select" size="5">
                ${window.attackPlan.templates.map((template)=>{
                    return /* html */`
                    <option value="${template.name}">${template.name}</option>
                    `
                })
                }
            </select>
        </div>
        <div class="modal-input-group">
            <label for="temp_name">name:</label>
            <input id="temp_name" type="text" />
        </div>
        <div class="modal-input-group">
        <label >units:</label>
            <table>
                <tbody>
                    <tr>
                        <td valign="top">
                            <table class="vis" width="100%">
                                    <tbody>
                                        <tr>
                                            <th>Gyalogság</th>
                                        </tr>
                                        <tr>
                                            <td class="nowrap">
                                            <img
                                                src="https://dshu.innogamescdn.com/asset/5b5eb006/graphic/unit/unit_spear.png"
                                                class="" data-title="Lándzsás">
                                                <input value="0" style="width:60px" id="palnner_unit_input_spear" type="number" min="0">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap">
                                            <img
                                                src="https://dshu.innogamescdn.com/asset/5b5eb006/graphic/unit/unit_sword.png"
                                                class="" data-title="Lándzsás">
                                                <input value="0" style="width:60px" id="palnner_unit_input_sword" type="number" min="0">
                                            </td>
                                        </tr> 
                                        <tr>
                                            <td class="nowrap">
                                            <img
                                                src="https://dshu.innogamescdn.com/asset/5b5eb006/graphic/unit/unit_axe.png"
                                                class="" data-title="Lándzsás">
                                                <input value="0" style="width:60px" id="palnner_unit_input_axe" type="number" min="0">
                                            </td>
                                        </tr> 
                                        <tr>
                                            <td class="nowrap">
                                            <img
                                                src="https://dshu.innogamescdn.com/asset/5b5eb006/graphic/unit/unit_archer.png"
                                                class="" data-title="Lándzsás">
                                                <input value="0" style="width:60px" id="palnner_unit_input_archer" type="number" min="0">
                                            </td>
                                        </tr> 
                                    </tbody>
                            </table>
                        </td>
                        <td valign="top">
                            <table class="vis" width="100%">
                                    <tbody>
                                        <tr>
                                            <th>Lovasság</th>
                                        </tr>
                                        <tr>
                                            <td class="nowrap">
                                            <img
                                                src="https://dshu.innogamescdn.com/asset/5b5eb006/graphic/unit/unit_spy.png"
                                                class="" data-title="Lándzsás">
                                                <input value="0" style="width:60px" id="palnner_unit_input_spy" type="number" min="0">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap">
                                            <img
                                                src="https://dshu.innogamescdn.com/asset/5b5eb006/graphic/unit/unit_light.png"
                                                class="" data-title="Lándzsás">
                                                <input value="0" style="width:60px" id="palnner_unit_input_light" type="number" min="0">
                                            </td>
                                        </tr> 
                                        <tr>
                                            <td class="nowrap">
                                            <img
                                                src="https://dshu.innogamescdn.com/asset/5b5eb006/graphic/unit/unit_marcher.png"
                                                class="" data-title="Lándzsás">
                                                <input value="0" style="width:60px" id="palnner_unit_input_marcher" type="number" min="0">
                                            </td>
                                        </tr> 
                                        <tr>
                                            <td class="nowrap">
                                            <img
                                                src="https://dshu.innogamescdn.com/asset/5b5eb006/graphic/unit/unit_heavy.png"
                                                class="" data-title="Lándzsás">
                                                <input value="0" style="width:60px" id="palnner_unit_input_heavy" type="number" min="0">
                                            </td>
                                        </tr> 
                                    </tbody>
                            </table>
                        </td>
                    <tr>
                    <tr>
                        <td valign="top">
                            <table class="vis" width="100%">
                                    <tbody>
                                        <tr>
                                            <th>Hadászat</th>
                                        </tr>
                                        <tr>
                                            <td class="nowrap">
                                            <img
                                                src="https://dshu.innogamescdn.com/asset/5b5eb006/graphic/unit/unit_ram.png"
                                                class="" data-title="Lándzsás">
                                                <input value="0" style="width:60px" id="palnner_unit_input_ram" type="number" min="0">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap">
                                            <img
                                                src="https://dshu.innogamescdn.com/asset/5b5eb006/graphic/unit/unit_catapult.png"
                                                class="" data-title="Lándzsás">
                                                <input value="0" style="width:60px" id="palnner_unit_input_catapult" type="number" min="0">
                                            </td>
                                        </tr> 
                                    </tbody>
                            </table>
                        </td>
                        <td valign="top">
                            <table class="vis" width="100%">
                                    <tbody>
                                        <tr>
                                            <th>Egyéb</th>
                                        </tr>
                                        <tr>
                                            <td class="nowrap">
                                            <img
                                                src="https://dshu.innogamescdn.com/asset/5b5eb006/graphic/unit/unit_knight.png"
                                                class="" data-title="Lándzsás">
                                                <input value="0" style="width:60px" id="palnner_unit_input_knight" type="number" min="0">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="nowrap">
                                            <img
                                                src="https://dshu.innogamescdn.com/asset/5b5eb006/graphic/unit/unit_snob.png"
                                                class="" data-title="Lándzsás">
                                                <input value="0" style="width:60px" id="palnner_unit_input_snob" type="number" min="0">
                                            </td>
                                        </tr> 
                                    </tbody>
                            </table>
                        </td>
                    </tr>
                <tbody>
            </table>
        </div>
        <div class="modal-input-inline">
            <button class="btn" onclick="addTemplate()">add</button>
            <button class="btn" onclick="removeTemplate()">remove</button>
        </div>
        <div class="modal-input-inline">
            <button class="btn" onclick="window.closeModal()">Bezár</button>
        </div>
    `
}


window.addTemplate = ()=> {
    let template:template ={
        name:$('#temp_name').val().toString(),
        units:{
            spear:parseInt($('#palnner_unit_input_spear').val().toString()),
            sword:parseInt($('#palnner_unit_input_sword').val().toString()),
            archer:parseInt($('#palnner_unit_input_archer').val().toString()),
            axe:parseInt($('#palnner_unit_input_axe').val().toString()),
            spy:parseInt($('#palnner_unit_input_spy').val().toString()),
            light:parseInt($('#palnner_unit_input_light').val().toString()),
            marcher:parseInt($('#palnner_unit_input_marcher').val().toString()),
            heavy:parseInt($('#palnner_unit_input_heavy').val().toString()),
            ram:parseInt($('#palnner_unit_input_ram').val().toString()),
            catapult:parseInt($('#palnner_unit_input_catapult').val().toString()),
            knight:parseInt($('#palnner_unit_input_knight').val().toString()),
            snob:parseInt($('#palnner_unit_input_snob').val().toString()),
        }
    } 
    console.log(template);

    if(template.name==""){
        return
    }

    let ind=window.attackPlan.templates.findIndex((temp)=>{ return temp.name==template.name});

    if(ind>-1){
        window.attackPlan.templates[ind]=template;
    }else{
        window.attackPlan.templates.push(template);
    }
    $('#temp_name').val('');
    $('#palnner_unit_input_spear').val('0')
    $('#palnner_unit_input_sword').val('0')
    $('#palnner_unit_input_archer').val('0')
    $('#palnner_unit_input_axe').val('0')
    $('#palnner_unit_input_spy').val('0')
    $('#palnner_unit_input_light').val('0')
    $('#palnner_unit_input_marcher').val('0')
    $('#palnner_unit_input_heavy').val('0')
    $('#palnner_unit_input_ram').val('0')
    $('#palnner_unit_input_catapult').val('0')
    $('#palnner_unit_input_knight').val('0')
    $('#palnner_unit_input_snob').val('0')


    let select="";
    window.attackPlan.templates.forEach((temp)=>{
        select+=`<option value="${temp.name}">${temp.name}</option>`;
    });

    $('#template_select').html(select);
    window.launchDialog.step4Check();
}
window.removeTemplate = ()=> {
    let val=$('#template_select').val();

    let ind=window.attackPlan.templates.findIndex((temp)=>{ return temp.name==val})
    
    if(ind>-1){
        window.attackPlan.templates.splice(ind,1);
    }

    let select="";
    window.attackPlan.templates.forEach((temp)=>{
        select+=`<option value="${temp.name}">${temp.name}</option>`;
    });

    $('#template_select').html(select);
    window.launchDialog.step4Check();
}
window.selectTemplate = ()=> {
    let val=$('#template_select').val();

    let ind=window.attackPlan.templates.findIndex((temp)=>{ return temp.name==val})
    console.log(ind,val,window.attackPlan.templates);
    
    if(ind>-1){
        
        let temp=window.attackPlan.templates[ind]
        console.log(temp);
        $('#temp_name').val(temp.name),
        $('#palnner_unit_input_spear').val(temp.units.spear)
        $('#palnner_unit_input_sword').val(temp.units.sword)
        $('#palnner_unit_input_archer').val(temp.units.archer)
        $('#palnner_unit_input_axe').val(temp.units.axe)
        $('#palnner_unit_input_spy').val(temp.units.spy)
        $('#palnner_unit_input_light').val(temp.units.light)
        $('#palnner_unit_input_marcher').val(temp.units.marcher)
        $('#palnner_unit_input_heavy').val(temp.units.heavy)
        $('#palnner_unit_input_ram').val(temp.units.ram)
        $('#palnner_unit_input_catapult').val(temp.units.catapult)
        $('#palnner_unit_input_knight').val(temp.units.knight)
        $('#palnner_unit_input_snob').val(temp.units.snob)
    }
}