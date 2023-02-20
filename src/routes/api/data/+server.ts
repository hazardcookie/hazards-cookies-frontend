// This file is used to get the data from the contract and return it as a json object
import { ethers } from 'ethers';
import { json } from '@sveltejs/kit';
import { contract, rpc } from '../../../constants';
import abi from '../../../constants/cookie_abi.json';
import type { RequestHandler } from './$types';
import { eth_address_shortener } from '../../../lib/utils';
import type { Cookie_metadata, Cookie_collection } from '../../../types';

// takes encoded metadata json and returns a json object
function decode_metadata(encoded_json: string): Cookie_metadata {
  try {
    const buff_json = Buffer.from(encoded_json.substring(29), 'base64').toString();
    const result = JSON.parse(buff_json);
    const new_json = { name: result.name, image: result.image };
    return new_json;
  } catch (error) {
    console.log('error decoding metadata', error);
    return { name: 'unknown', image: 'unknown' };
  }
}

// gets the keys from the contract and returns them as a json object
export const GET: RequestHandler = async () => {
  const cookies_abi = abi;
  const contract_address = contract;
  const owners_promises: string[] = [];
  const metadata_promises: Cookie_metadata[] = [];

  // connects to the contract
  const provider = new ethers.JsonRpcProvider(rpc);
  const HazardsCookies = new ethers.Contract(contract_address, cookies_abi, provider);

  // gets the metadata and owner of all the keys
  const multicall = await HazardsCookies.getCookieURIsAndOwners();
  const owners_multicall = await multicall[1];
  const metadata_multicall = await multicall[0];

  // loops through the 5 keys and pushes the promises to the array
  for (let i = 0; i < 5; i++) {
    owners_promises.push(eth_address_shortener(owners_multicall[i]));
    metadata_promises.push(decode_metadata(metadata_multicall[i]));
  }

  // waits for all the promises to resolve
  const [owners, metadata] = await Promise.all([owners_promises, metadata_promises]);

  // loads all the keys and assigns them to a loaded_keys variable
  const loaded_keys: Cookie_collection = {
    Power: { owner: owners[0], metadata: metadata[0] },
    Wisdom: { owner: owners[1], metadata: metadata[1] },
    Time: { owner: owners[2], metadata: metadata[2] },
    War: { owner: owners[3], metadata: metadata[3] },
    Wealth: { owner: owners[4], metadata: metadata[4] }
  };

  // returns the variable as a json object
  return json(loaded_keys);
};
