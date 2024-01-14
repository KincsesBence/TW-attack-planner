import { group, loadPages } from "./Api";
import { Model } from "./Model";

export class LaunchVillagesModel extends Model{

    static instance:LaunchVillagesModel=null;
    static group:number=0;
    static groups:group[]=[];

    static init (group:number=0) {
      if(LaunchVillagesModel.instance==null || this.group!=group){
        return (async function () {
          LaunchVillagesModel.instance = new LaunchVillagesModel()
          await LaunchVillagesModel.instance.loadlaunchVillages(group)
          return LaunchVillagesModel.instance;
        }())
      }else{
        return (async function () {
            return LaunchVillagesModel.instance;
        }())
      }
    }

    async loadlaunchVillages(group:number){
       let {groups,villages} = await loadPages(0,group);
       this.items=villages;
       LaunchVillagesModel.groups=groups;
    } 
}