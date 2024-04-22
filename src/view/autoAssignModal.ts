export const autoAssignModal = ()=>{
    return /* html */`
    <style>
        .assigner-row {  display: grid;
            width:500px;
            grid-template-columns: 1fr 0.5fr 50px 50px 50px;
            grid-template-rows: 30px;
            gap: 0px 0px;
            grid-auto-flow: row;
            grid-template-areas:
                "target-village target-template nuke-count noble-count checkbox";
        }
        .target-village { grid-area: target-village; }
        .target-template { grid-area: target-template; }
        .noble-count { grid-area: noble-count; }
        .nuke-count { grid-area: nuke-count; }
        .checkbox { grid-area: checkbox;}
        .noble-count input{ width:40px }
        .nuke-count input{ width:40px }
    </style>
    <div class="assigner-row">
        <div class="target-village">Name</div>
        <div class="target-template">Template</div>
        <div class="nuke-count">Nuke</div>
        <div class="noble-count">Noble</div>
        <div class="checkbox"><input type="checkbox"></div>
    </div>
    <div class="">
        <div class="assigner-row">
            <div class="target-village">A 0001 (498|482) K44</div>
            <div class="target-template">
                <select>
                    
                </select>
            </div>
            <div class="nuke-count"><input type="number"></div>
            <div class="noble-count">
            <select>
                <option>1x4</option>
                <option>2x2</option>
                <option>4x1</option>
            </select>
            </div>
            <div class="checkbox"><input type="checkbox"></div>
        </div>
        <div class="assigner-row">
            <div class="target-village">A 0001 (498|482) K44</div>
            <div class="target-template">
                <select>
                    
                </select>
            </div>
            <div class="nuke-count"><input type="number"></div>
            <div class="noble-count">
            <select>
                <option>1x4</option>
                <option>2x2</option>
                <option>4x1</option>
            </select>
            </div>
            <div class="checkbox"><input type="checkbox"></div>
        </div>
        <div class="assigner-row">
            <div class="target-village">A 0001 (498|482) K44</div>
            <div class="target-template">
                <select>
                    
                </select>
            </div>
            <div class="nuke-count"><input type="number"></div>
            <div class="noble-count">
            <select>
                <option>1x4</option>
                <option>2x2</option>
                <option>4x1</option>
            </select>
            </div>
            <div class="checkbox"><input type="checkbox"></div>
        </div>
        <div class="assigner-row">
            <div class="target-village">A 0001 (498|482) K44</div>
            <div class="target-template">
                <select>
                    
                </select>
            </div>
            <div class="nuke-count"><input type="number"></div>
            <div class="noble-count">
            <select>
                <option>1x4</option>
                <option>2x2</option>
                <option>4x1</option>
            </select>
            </div>
            <div class="checkbox"><input type="checkbox"></div>
        </div>
    </div>
    `
}