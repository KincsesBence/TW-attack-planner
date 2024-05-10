import { getAllPlayer } from "./Api";
import { Model } from "./Model";

export class PlayersModel extends Model{
    static instance:PlayersModel=null;
    static init () {
        if(PlayersModel.instance==null){
            return (async function () {
                PlayersModel.instance = new PlayersModel()
                await PlayersModel.instance.loadPlayers()
                return PlayersModel.instance;
            }())
        }else{
            return (async function () {
                return PlayersModel.instance;
            }())
        }
    }
    async loadPlayers(){
        this.items = await getAllPlayer();
    } 
}