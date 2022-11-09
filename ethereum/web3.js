import Web3 from "web3";

let web3;

// First, we'll check if we are running code on the browser, or on a server.
// Also, we'll check if metamask has already injected web3 onto the browser.
if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // We are in the browser and Metamask is running.
  web3 = new Web3(window.currentProvider); // Remember. Here we use our own copy of web3
  // To ensure the version we are handling. In other case, metamask could use a different
  // version.
} else {
  // We are on the server *OR* the user is not running Metamask. Let's make our own prvdr.
  const provider = new Web3.providers.HttpProvider(
    // It needs a remote node url that we own
    "https://goerli.infura.io/v3/ec495d92f72d4439901be15922a7535a"
  );
  web3 = new Web3(provider);
}
export default web3;
