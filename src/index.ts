import { fetchGroups, loadScriptOptions, loadWorldApi, storeName } from "./core/Api";
import { IndexedDBHandler } from "./core/IndexedDBhandler";
import { determineLang, Lang } from "./core/Language";
import { launchDialog } from "./view/launchDialog";

(async ()=>{
    window.Lang=determineLang();
    if(!window.game_data.features.Premium.active){
        window.UI.ErrorMessage(Lang('needPremiumFeature'))
        return;
    }
    window.scriptOptions=loadScriptOptions()
    window.DB = await IndexedDBHandler.init(storeName,[
        {
            name:'players',
            keyName:'id',
            AI:false,
        },
        {
            name:'villages',
            keyName:'id',
            AI:false,
        },
        {
            name:'plans',
            keyName:'id',
            AI:false,
        },
    ],1);
    
    await loadWorldApi()
    window.Plans = await window.DB.getAllData('plans'); 
    window.Groups = await fetchGroups();
    window.Dialog.show("launchDialog",launchDialog());
    $('.popup_box_container').append('<div style="position: fixed;width: 100%;height: 100%;top:0;left:0;z-index:12001"></div>');
})();

