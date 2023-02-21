// This file is used to get the data from the contract and return it as a json object
import type { PageLoad } from './$types';
export const ssr = false;
export const load: PageLoad = async ({ fetch, depends }) => {
  const response = await fetch(`/api/data`);
  const cookies = await response.json();
  return { cookies };
};
