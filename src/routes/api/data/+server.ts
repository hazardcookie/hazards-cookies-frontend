// This file is used to get the data from the contract and return it as a json object
// Keeping this as a example for future reference
// Currently the evm sidechain devnet nodes are too slow to use this method
import { ethers } from 'ethers';
import { json } from '@sveltejs/kit';
import { contract, rpc } from '../../../lib/constants';
import { eth_address_shortener } from '../../../lib/utils';
import abi from '../../../lib/constants/cookie_abi.json';
import type { RequestHandler } from './$types';
import type {  Owners } from '../../../lib/types';

// gets the keys from the contract and returns them as a json object
export const GET: RequestHandler = async () => {
  const cookies_abi = abi;
  const contract_address = contract;
  const owners_promises: string[] = [];

  // connects to the contract
  const provider = new ethers.JsonRpcProvider(rpc);
  const HazardsCookies = new ethers.Contract(contract_address, cookies_abi, provider);

  // gets the metadata and owner of all the keys
  const fetch_owners = await HazardsCookies.getCookieOwners();

  // loops through the 5 keys and pushes the promises to the array
  for (let i = 0; i < 5; i++) {
    owners_promises.push(eth_address_shortener(fetch_owners[i]));
  }

  // waits for all the promises to resolve
  const [owners] = await Promise.all([owners_promises]);

  // loads all the keys and assigns them to a loaded_keys variable
  const loaded_keys: Owners = {
    Power: owners[0],
    Wisdom: owners[1],
    Time: owners[2],
    War: owners[3],
    Wealth: owners[4]
  };

  // returns the variable as a json object
  return json(loaded_keys);
};
