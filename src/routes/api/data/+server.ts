// This file is used to get the data from the contract and return it as a json object
// Fetches the live owners from the contract
// Also loads the images from the images.json file to improve performance
// Currently the evm sidechain devnet nodes are too slow to handle loading
// on chain nfts and metadata quickly
import { ethers } from 'ethers';
import { json } from '@sveltejs/kit';
import { contract, rpc } from '../../../lib/constants';
import { eth_address_shortener } from '../../../lib/utils';
import abi from '../../../lib/constants/cookie_abi.json';
import images from '../../../lib/constants/images.json';
import type { RequestHandler } from './$types';
import type { Cookie_collection } from '../../../lib/types';

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

  const [owners] = await Promise.all([owners_promises]);

  // loads all the keys and assigns them to a loaded_keys variable
  // in this example we are using the images from the images.json file to improve performance
  // but you can also use the metadata from the contract
  const loaded_keys: Cookie_collection = {
    Power: { owner: owners[0], metadata: { name: 'Power', image: images.power } },
    Wisdom: { owner: owners[1], metadata: { name: 'Wisdom', image: images.wisdom } },
    Time: { owner: owners[2], metadata: { name: 'Time', image: images.time } },
    War: { owner: owners[3], metadata: { name: 'War', image: images.war } },
    Wealth: { owner: owners[4], metadata: { name: 'Wealth', image: images.wealth } }
  };

  // returns the variable as a json object
  return json(loaded_keys);
};
