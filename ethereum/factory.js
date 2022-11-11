import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
	JSON.parse(CampaignFactory.interface),
	"0x2A606d58fe306670899753134c1D1E6fBb4DdAbC",
);

export default instance;