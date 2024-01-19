
export const targetItem = (target:target)=>{
    return /* html */`
    <div class="target-item">
        <div onclick="targetItem.toggleTargetItem(this)" class="target-header">
            <div><input onclick="targetItem.selectTargetItem(event)" type="radio" name="target"/></div>
            <div class="indicator"><span >▶<span></div>
            <div class="target-village-name">${target.village.name}(${target.village.coord.text})</div>
            <div class="target-extras"><a class="add-village-booster"></a></div>
            <div><a class="remove-target-btn"></a></div>
        </div>
        <div class="target-launchers">
        </div>
    </div>
    `
}

window.targetItem = {
    toggleTargetItem:(elem) => {
        $(elem).parent().find('.target-launchers').toggle();
        $(elem).find('.indicator').toggleClass('indicator-open');
        $(elem).find('input').prop('checked', true);
    },
    removeTargetItem:() => {

    },
    selectTargetItem:(e)=>{
        e.stopPropagation();
        $(e.target).parent().parent().parent().find('.target-launchers').toggle();
        $(e.target).parent().parent().find('.indicator').toggleClass('indicator-open');
    }
}

