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
            width:600px;
            grid-template-columns: 1fr 0.5fr 50px 50px 0.5fr 50px 50px;
            grid-template-rows: 30px;
            gap: 0px 0px;
            grid-auto-flow: row;
            grid-template-areas:
                "target-village nuke-template nuke-count noble-count fake-template fake-count checkbox";
        }
        .target-village { grid-area: target-village; }
        .nuke-template { grid-area: nuke-template; }
        .nuke-count { grid-area: nuke-count; }
        .noble-count { grid-area: noble-count; }
        .fake-template { grid-area: fake-template; }
        .fake-count { grid-area: fake-count; }
        .checkbox { grid-area: checkbox;}
        .assigner-row input{ width:40px }
        .assigner-row input{ width:40px }
        .assigner-target-villages{
            max-height:300px;
            overflow-y:auto;
        }
    </style>
    <div class="assigner-row">
        <div class="target-village"></div>
        <div class="nuke-template">
            <select id='assigner-main-nuke-template'>
                ${templates}
            </select>
        </div>
        <div class="nuke-count">
            <input id='assigner-main-nuke-count' value="0" max="50" min="0" type="number">
        </div>
        <div class="noble-count">
            <select id='assigner-main-noble-count'>
                <option>1x4</option>
                <option>2x2</option>
                <option>4x1</option>
            </select>
        </div>
        <div class="fake-template">
            <select id='assigner-main-fake-template'>
                ${templates}
            </select>
        </div>
        <div class="fake-count">
            <input id='assigner-main-fake-count' value="0" max="50" min="0" type="number">
        </div>
        <div class="checkbox"></div>
    </div>
    <div class="assigner-row">
        <div class="target-village"></div>
        <div class="nuke-template"><button onclick="window.autoAssign.loadNukeTemplates()" class="btn">-↓-</button></div>
        <div class="nuke-count"><button onclick="window.autoAssign.loadNukeCount()" class="btn">-↓-</button></div>
        <div class="noble-count"><button onclick="window.autoAssign.loadNobleCount()" class="btn">-↓-</button></div>
        <div class="fake-template"><button onclick="window.autoAssign.loadFakeTemplates()" class="btn">-↓-</button></div>
        <div class="fake-count"><button onclick="window.autoAssign.loadFakeCount()" class="btn">-↓-</button></div>
        <div class="checkbox"></div>
    </div>
    <div class="assigner-row">
        <div class="target-village">Name</div>
        <div class="nuke-template">Nuke template</div>
        <div class="nuke-count">Nuke</div>
        <div class="noble-count">Noble</div>
        <div class="fake-template">Fake template</div>
        <div class="fake-count">Fake</div>
        <div class="checkbox"><input onclick="window.autoAssign.checkAll()" id="assigner-main-checkbox" type="checkbox"></div>
    </div>
    <div class="assigner-target-villages">
        ${window.attackPlan.targetPool.map((target:target)=>{
            return /* html */`
            <div class="assigner-row" id="assigner-row-${target.village.id}">
                <div class="target-village">
                <a target="_blank" href="/game.php?village=${game.village.id}&screen=info_village&id=${target.village.id}">${target.village.name}(${target.village.coord.text}) K${target.village.kontinent}</a>
                </div>
                <div class="nuke-template">
                    <select class="assigner-nuke-template">
                        ${templates} 
                    </select>
                </div>
                <div class="nuke-count">
                    <input class="assigner-nuke-count" value="0" max="50" min="0" type="number">
                </div>
                <div class="noble-count">
                    <select class="assigner-noble-count">
                        <option>1x4</option>
                        <option>2x2</option>
                        <option>4x1</option>
                    </select>
                </div>
                <div class="fake-template">
                    <select class="assigner-fake-template">
                        ${templates} 
                    </select>
                </div>
                <div class="fake-count">
                    <input class="assigner-fake-count" value="0" max="50" min="0" type="number">
                </div>
                <div class="checkbox">
                    <input class="assigner-target-check" value="${target.village.id}" type="checkbox">
                </div>
            </div>
            `
        }).join('')}
        
    </div>
    `
}

window.autoAssign = {
    loadNukeTemplates:()=> {
        let val= $('#assigner-main-nuke-template').val();
        let checked = $('.assigner-target-villages').find('input[type=checkbox]:checked').get();
        checked.forEach((check)=>{
            let row = $(check).parent().parent();
            row.find('.assigner-nuke-template').val(val);
        })
    },
    loadNukeCount:() => {
        let val= $('#assigner-main-nuke-count').val();
        let checked = $('.assigner-target-villages').find('input[type=checkbox]:checked').get();
        checked.forEach((check)=>{
            let row = $(check).parent().parent();
            row.find('.assigner-nuke-count').val(val);
        })
    },
    loadFakeTemplates:()=> {
        let val= $('#assigner-main-fake-template').val();
        let checked = $('.assigner-target-villages').find('input[type=checkbox]:checked').get();
        checked.forEach((check)=>{
            let row = $(check).parent().parent();
            row.find('.assigner-fake-template').val(val);
        })
    },
    loadFakeCount:() => {
        let val= $('#assigner-main-fake-count').val();
        let checked = $('.assigner-target-villages').find('input[type=checkbox]:checked').get();
        checked.forEach((check)=>{
            let row = $(check).parent().parent();
            row.find('.assigner-fake-count').val(val);
        })
    },
    loadNobleCount:() => {
        let val= $('#assigner-main-noble-count').val();
        let checked = $('.assigner-target-villages').find('input[type=checkbox]:checked').get();
        checked.forEach((check)=>{
            let row = $(check).parent().parent();
            row.find('.assigner-noble-count').val(val);
        })
    },
    checkAll:() =>{
        let checked = $('.assigner-target-villages').find('input[type=checkbox]').get();
        checked.forEach((check)=>{
                $(check).prop( "checked", $('#assigner-main-checkbox').prop('checked'));
        })
    }
}