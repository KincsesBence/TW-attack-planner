import { addPlan, fetchGroups, getAllPlayer, getServerConifg, getUnitConfig, loadPlans } from "./core/Api";
import { LaunchVillagesModel } from "./core/LaunchVillagesModel";
import { PlayersModel } from "./core/PlayersModel";
import { VillageModel } from "./core/VillageModel";
import { launchDialog } from "./view/launchDialog";

(async ()=>{    
    window.gameConfig = await getServerConifg();
    window.unitConfig = await getUnitConfig();
    console.log(window.unitConfig);
    
    window.Villages = await VillageModel.init();
    window.Players = await PlayersModel.init();
    window.Groups = await fetchGroups();
    window.Plans = loadPlans();
    initlaunchDialog();
    
    function initlaunchDialog(){ 
        window.Dialog.show("launchDialog",launchDialog());
        $('.popup_box_container').append('<div style="position: fixed;width: 100%;height: 100%;top:0;left:0;z-index:12001"></div>');
    } 
})();

