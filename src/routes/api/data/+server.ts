import type { RequestHandler } from './$types';
import type { Cookie_metadata } from '../../../types';
import { json } from '@sveltejs/kit';
import { contract } from '../../../constants';
import abi from '../../cookie_abi.json';
import { ethers } from 'ethers';
import type { Cookie_collection } from '../../../types';

// gets encoded svg from contract and decodes it to a string and returns it
function getTokenSVG(svg: string): Cookie_metadata {
	const buff_json = Buffer.from(svg.substring(29), 'base64').toString();
	const result = JSON.parse(buff_json);
	const new_json = { name: result.name, image: result.image };
	return new_json;
}

// gets the keys from the contract and returns them as a json object
export const GET: RequestHandler = async () => {
	const cookies_abi = abi;
	const contract_address = contract;
	const provider = new ethers.JsonRpcProvider('https://rpc-evm-sidechain.xrpl.org');
	const HazardsCookies = new ethers.Contract(contract_address, cookies_abi, provider);
	const multicall = await HazardsCookies.getCookieURIsAndOwners();
	const metadata_multicall = multicall[0];
	const owners_multicall = multicall[1];

	// loads all the keys and assigns them to a loaded_keys variable
	const loaded_keys: Cookie_collection = {
		Power: { owner: owners_multicall[0], metadata: getTokenSVG(metadata_multicall[0]) },
		Wisdom: { owner: owners_multicall[1], metadata: getTokenSVG(metadata_multicall[1]) },
		Time: { owner: owners_multicall[2], metadata: getTokenSVG(metadata_multicall[2]) },
		War: { owner: owners_multicall[3], metadata: getTokenSVG(metadata_multicall[3]) },
		Wealth: { owner: owners_multicall[4], metadata: getTokenSVG(metadata_multicall[4]) }
	};

	// returns the variable as a json object
	return json(loaded_keys);
};
