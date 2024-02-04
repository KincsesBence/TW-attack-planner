import { addPlan, getAllPlayer, getServerConifg, getUnitConfig, loadPlans } from "./core/Api";
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
    window.LaunchVillages = await LaunchVillagesModel.init();
    initlaunchDialog();
    
    function initlaunchDialog(){
        let plans = loadPlans();  
        window.Dialog.show("launchDialog",launchDialog(plans));
        $('.popup_box_container').append('<div style="position: fixed;width: 100%;height: 100%;top:0;left:0;z-index:12001"></div>');
    } 
})();

