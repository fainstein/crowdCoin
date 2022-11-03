import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
	JSON.parse(CampaignFactory.interface),
	"0x993bd41c73b43F3b1065e1e7C0cd6568A0065274",
);

export default instance;