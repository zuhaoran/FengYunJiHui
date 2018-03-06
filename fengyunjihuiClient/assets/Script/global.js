import Http from "./data/http";
import PlayerData from './data/player-data'
const global={};
global.http=Http();
global.playerData = PlayerData();
module.exports = global;
export default global;