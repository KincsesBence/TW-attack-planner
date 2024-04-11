import { group, loadPages } from "./Api";
import { Model } from "./Model";

export class LaunchVillagesModel extends Model{

    static instance:LaunchVillagesModel=null;

    static init (groupIDs:number[]) {
      if(LaunchVillagesModel.instance==null){
        return (async function () {
          LaunchVillagesModel.instance = new LaunchVillagesModel()
          await LaunchVillagesModel.instance.loadlaunchVillages(groupIDs)
          return LaunchVillagesModel.instance;
        }())
      }else{
        return (async function () {
            return LaunchVillagesModel.instance;
        }())
      }
    }

    async loadlaunchVillages(groupIDs:number[]){
       this.items = await loadPages(groupIDs);
    } 
}