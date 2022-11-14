import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x039e8E607a1044f5a75a674400de488DBF970002"
);

export default instance;
