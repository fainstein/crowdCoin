export const CAMPAIGNS_URL = "/";
const CAMPAIGNS_BASE_URL = "/campaigns";
const REQUESTS_BASE_URL = "/requests";
export const CREATE_CAMPAIGN_URL = CAMPAIGNS_BASE_URL + "/new";
export const CAMPAIGN_ADDRESS_URL = (address) =>
  CAMPAIGNS_BASE_URL + "/" + address;
export const CAMPAIGN_REQUESTS_URL = (address) =>
  CAMPAIGN_ADDRESS_URL(address) + REQUESTS_BASE_URL;
export const CREATE_REQUEST_URL = (address) =>
  CAMPAIGN_REQUESTS_URL(address) + "/new";
