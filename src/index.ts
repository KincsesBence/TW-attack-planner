import { fetchGroups, getServerConifg, getUnitConfig } from "./core/Api";
import { determineLang } from "./core/Language";
import { PlayersModel } from "./core/PlayersModel";
import { VillageModel } from "./core/VillageModel";
import { planDB } from "./core/planDB";
import { launchDialog } from "./view/launchDialog";

(async ()=>{
    window.Lang=determineLang();
    window.DB = new planDB();
    await window.DB.init();
    window.Plans = await window.DB.loadPlans()
    window.gameConfig = await getServerConifg();
    window.unitConfig = await getUnitConfig();
    window.Villages = await VillageModel.init();
    window.Players = await PlayersModel.init();
    window.Groups = await fetchGroups();
    window.Dialog.show("launchDialog",launchDialog());
    $('.popup_box_container').append('<div style="position: fixed;width: 100%;height: 100%;top:0;left:0;z-index:12001"></div>');
})();

