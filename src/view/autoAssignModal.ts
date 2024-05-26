import { game } from "../core/Api";

export const autoAssignModal = ()=>{
    let templates='';

    window.attackPlan.templates.forEach((template)=>{
        templates+=/* html */`
            <option value='${template.name}'>${template.name}</option>
        `;
    });

    

    return /* html */`
    <style>
        .assigner-row {  display: grid;
            display: grid;
            grid-template-columns: 200px repeat(auto-fill, 80px);
        }

        .assigner-row input{
            width:30px;
        }

        .item{
            margin:5px;
        }

        .add-assignment{
            display:inline-grid;
        }

        .assigner-target-villages{
            width:1100px;
            max-height:300px;
            overflow-y:auto;
        }
        .assigner-target-btn{
            display:block;
            width: 20px;
            height: 20px;
            background: url(https://dshu.innogamescdn.com/asset/80b013af/graphic/login_close.png) top left no-repeat;
            cursor: pointer;
            background-size: 20px;
            margin-right: 10px;
        }

        .assigner-date div{
            transform: rotate(290deg) translateX(20px);
            text-wrap: nowrap;
        }
    </style>
    
    <div class="assigner">
        <div class="add-assignment">
            dátum:
            <select id="assignmentArrival">
                ${window.attackPlan.arrivals.map((arrival)=>{
                    return /* html */`<option value='${arrival}'>${arrival}</option>`
                }).join('')}
            </select>
            temlate:
            <select id="assignmentTemplates">
                ${templates}
            </select>
            nemes:
            <input type="checkbox" id="assignmentNoble">
            <button onclick="autoAssign.addAssignment()">+</button>
        </div>
        <div class="assigner-header">
            <div class="assigner-row assigner-date">
                    <div class="item"></div>
                    <div class="item checkbox"></div>
            </div>
            <div class="assigner-row assigner-remover">
                    <div class="item"></div>
                    <div class="item checkbox"></div>
            </div>
            <div class="assigner-row assigner-loader">
                    <div class="item"></div>
                    <div class="item checkbox"></div>
            </div>
            <div class="assigner-row assigner-name">
                <div class="item">falu</div>
                <div class="item checkbox">
                    <input id="assigner-main-checkbox" onclick="autoAssign.checkAll()" type="checkbox">
                </div>
            </div>
        <div>
        <div class="assigner-target-villages">
            ${window.attackPlan.targetPool.map((target:target)=>{
            return /* html */`
                <div class="assigner-row" id="assigner-row-${target.village.id}">
                    <div class="item"><a target="_blank" href="/game.php?village=${game.village.id}&screen=info_village&id=${target.village.id}">${target.village.name}(${target.village.coord.text}) K${target.village.kontinent}</a></div>
                    <div class="item checkbox">
                        <input class="assigner-target-check" value="${target.village.id}" type="checkbox">
                    </div>
                </div>
            `
        }).join('')}
        </div>
        <div>
            <label>Egyenletes</label><input value="1" type="radio" name="assignmentAlg">
            <label>Egyenként random</label><input value="2" type="radio" name="assignmentAlg">
            <label>Egyenként legközelebb</label><input value="3"  type="radio" name="assignmentAlg">
            <label>Célpothoz legközelebb</label><input value="4" type="radio" name="assignmentAlg">
        </div>
        <div>
            <button onclick="autoAssign.startAssignment()" class="btn">Start Assignment</button>
        </div>
        
    </div>
    `
}

window.autoAssign = {
    assignTypes:[],
    removeAssignment:(id) =>{
        let ind = window.autoAssign.assignTypes.findIndex((type)=>{return type.id==id.toString()})
        if(ind==-1){
            return
        }
        window.autoAssign.assignTypes.splice(ind,1);

        $('.ar-'+id).remove();
    },
    fillAssignment:(id) =>{
        $(`.assigner-target-villages .assigner-target-check`).get().forEach((elem)=>{
            if(!$(elem).is(':checked')){
                return
            }
            let val= $(`.assigner-loader .ar-${id}`).find('.ass-inp').val();
            
            $(elem).parent().parent().find(`.ar-${id} .ass-inp`).val(val);
        })
    },
    addAssignment:() =>{
        if(window.autoAssign.assignTypes.length>=10){
            return;
        }
        let arrival= $('#assignmentArrival').val().toString();
        let templateName= $('#assignmentTemplates').val().toString();
        let noble= $('#assignmentNoble').is(':checked');
        console.log(arrival,templateName,noble);
        let temp= window.attackPlan.templates.find((template)=>{
            return template.name==templateName;
        })
        let villages:village[]=[];
        let newAssignment = {
            id:new Date().getTime().toString(),
            arrival:arrival,
            filtered:villages,
            required:0,
            noble:noble,
            template:temp
        }
        window.autoAssign.assignTypes.push(newAssignment);
        $('.assigner-header .assigner-loader .checkbox').before(/* html */`<div class="item ar-${newAssignment.id}" >
        ${newAssignment.noble? 
            /* html */`<select class="ass-inp">
                            <option value="4">4x1</option>
                            <option value="2">2x2</option>
                            <option value="1">1x4</option>
                        </select>`
            :
            /* html */`<input class="ass-inp" value="0" type="number" min="0">`
        }
        <button onclick="autoAssign.fillAssignment(${newAssignment.id})">↓</button></div>
        `)
        $('.assigner-header .assigner-name .checkbox').before(/* html */`
            <div class="item ar-${newAssignment.id}" >${newAssignment.template.name}</div>
        `);
        $('.assigner-header .assigner-remover .checkbox').before(/* html */`
            <div class="item ar-${newAssignment.id}" ><a onclick="autoAssign.removeAssignment(${newAssignment.id})" class="assigner-target-btn"></a></div>
        `);
        $('.assigner-header .assigner-date .checkbox').before(/* html */`
        <div class="item ar-${newAssignment.id}" >${newAssignment.arrival}</div>
    `);
        $('.assigner-target-villages').find('.assigner-row').get().forEach((row)=>{
            $(row).find('.checkbox').before(/* html */`<div class="item ar-${newAssignment.id}" >
                ${newAssignment.noble? 
                /* html */`<select class="ass-inp">
                            <option value="4">4x1</option>
                            <option value="2">2x2</option>
                            <option value="1">1x4</option>
                            </select>`
                :
                /* html */`<input class="ass-inp" value="0" type="number" min="0">`}</div>`);
        })
    },
    startAssignment:()=>{
        let alg=$('input[name="assignmentAlg"]:checked').val();
        window.autoAssign.assignTypes.forEach((elem)=>{
            elem.required=0;
            let inputs= $(`.assigner-target-villages .ar-${elem.id}`).find('.ass-inp').get();
            inputs.forEach((input)=>{
                elem.required+=parseInt($(input).val().toString());
            })
        })
        /** todo: start with noble **/
        /** todo: filter launch villages **/
        /** todo: iterate on filtered and create troop transactions based on seleted algorithm **/
        console.log(window.autoAssign.assignTypes);
        
    },
    checkAll:() =>{
        let checked = $('.assigner-target-villages').find('input[type=checkbox]').get();
        checked.forEach((check)=>{
                $(check).prop( "checked", $('#assigner-main-checkbox').prop('checked'));
        })
    }
}