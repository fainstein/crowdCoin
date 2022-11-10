import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
	JSON.parse(CampaignFactory.interface),
	"0x3AFdE2c6E19834d21D1De79A3455b31C72BEC3E8",
);

export default instance;