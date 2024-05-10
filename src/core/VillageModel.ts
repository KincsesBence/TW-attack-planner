import { getAllVillages } from "./Api";
import { Model } from "./Model";

export class VillageModel extends Model{
    static instance:VillageModel=null;
    static init () {
        if(VillageModel.instance==null){
            return (async function () {
                VillageModel.instance = new VillageModel()
                await VillageModel.instance.loadVillages()
                return VillageModel.instance;
            }())
        }else{
            return VillageModel.instance;
        }
    }

    async loadVillages(){
        this.items = await getAllVillages();
    } 
}