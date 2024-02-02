
export const editArrivalsModal = ()=>{
    return /* html */`
    <div class="modal-input-group">
        <label for="">Arrivals:</label>
        <select id="plan_arrivals_select" size="5">
        ${window.attackPlan.arrivals.map((arrival)=>{
            return /* html */`
            <option value="${arrival}">${arrival}</option>
            `
        })

        }
        </select>
        <input id="plan_arrivals_input" type="datetime-local" type="text"/>
    </div>
    <div class="modal-input-inline">
        <button class="btn" onclick="addArrival()" >add</button>
        <button class="btn" onclick="removeArrival()">remove</button>
    </div>
    <div class="modal-input-inline">
        <button class="btn" onclick="window.closeModal()">Bezár</button>
    </div>
    `
}

window.addArrival = ()=> {
    let val = $('#plan_arrivals_input').val().toString().replace('T',' ');
    console.log(val);

    if(val==""){
        return;
    }
    
    if(!window.attackPlan.arrivals.includes(val)){
        window.attackPlan.arrivals.push(val);
    }

    window.attackPlan.arrivals.sort((a,b)=>{return a>b? 1:-1})

    let select="";

    window.attackPlan.arrivals.forEach((arrival)=>{
        select+=`<option value="${arrival}">${arrival}</option>`;
    });
    $('#plan_arrivals_select').html(select);
}


window.removeArrival = ()=> {
    let val = $('#plan_arrivals_select').val().toString().replace('T',' ');
    console.log(val);

    if(val==""){
        return;
    }

    let ind=window.attackPlan.arrivals.findIndex((arrival)=>{ return arrival==val})

    if(ind>-1){
        window.attackPlan.arrivals.splice(ind,1);
    }

    let select="";
    window.attackPlan.arrivals.forEach((arrival)=>{
        select+=`<option value="${arrival}">${arrival}</option>`;
    });
    $('#plan_arrivals_select').html(select);
}
