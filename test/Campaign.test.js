const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

let accounts; // Unlocked accounts in ganache network
let factory; // Deployed instance of the factory
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  // Deploy an instance of our compileFactory contract
  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: "1400000" });
  // We will use factory to make an instance of the campaign and assign it to the campaign variable
  // Also we will get it's address and assign it to campaignAddress
  await factory.methods
    .createCampaign("100")
    .send({ from: accounts[0], gas: "1000000" });

  // const addresses = await factory.methods.getDeployedCampaigns().call();
  // campaignAddress = addresses[0];
  // Replace with ES15 feature: Array destructuring. This gets the first position of array:
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  // This call doesn't deploy the contract, because it has been already deployed. All I need to do
  // is pass the address of the deployed contract (and the ABI obviously);
  campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe("Campaigns", () => {
  it("deploys a factory and a campaign", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it("marks caller as the campaign manager", async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(manager, accounts[0]);
  });

  it("allows people to contribute money and marks them as approvers", async () => {
    await campaign.methods
      .contribute()
      .send({ from: accounts[1], value: "200" });
    // Passing an address to approvers (mapping structure), it returns a bool as declared in the contract
    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });

  it("requires a minimum contribution", async () => {
    let executed;
    try {
      await campaign.methods
        .contribute()
        .send({ from: accounts[1], value: "50" });
      executed = "success";
    } catch (err) {
      executed = "fail";
    }
    assert.equal("fail", executed);
  });

  it("allows a manager to make a payment request", async () => {
    const description = "Buy batteries";
    await campaign.methods
      .createRequest(description, "100", accounts[1])
      .send({ from: accounts[0], gas: "1000000" });
    const newRequest = await campaign.methods.requests(0).call(); // Need to pass array index
    assert.ok(newRequest.description, description);
  });

  it("processes requests", async () => {
    // Sends 10 eth to the campaign, from the owner address
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei("10", "ether"),
    });
    // The owner creates a requests to send 5 ether to the accounts[1] address
    // This is called by the owner's address because it's a restricted function
    await campaign.methods
      .createRequest(
        "A description...",
        web3.utils.toWei("5", "ether"),
        accounts[1]
      )
      .send({ from: accounts[0], gas: "1000000" });
    // Set one vote from the contributor (owner address in this case also)
    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });
    //Get initial balance of account[1]
    let initialBalance = await web3.eth.getBalance(accounts[1]);
    initialBalance = parseFloat(web3.utils.fromWei(initialBalance, "ether"));
    // Now with 100% of positive votes, finalize it
    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });
    // Assert how account[1] incremented
    let finalBalance = await web3.eth.getBalance(accounts[1]);
    finalBalance = parseFloat(web3.utils.fromWei(finalBalance, "ether"));
    const difference = finalBalance - initialBalance;
    // Because of gas, the difference would be at moust 2 eths, so compare with 1.8 it's fine
    assert(difference > "4.9");
  });
});
