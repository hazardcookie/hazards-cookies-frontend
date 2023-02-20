export interface Cookie_metadata {
	name: string;
	image: string;
}

export type Cookie_collection = {
	Power: { owner: string; metadata: Cookie_metadata };
	Wisdom: { owner: string; metadata: Cookie_metadata };
	Time: { owner: string; metadata: Cookie_metadata };
	War: { owner: string; metadata: Cookie_metadata };
	Wealth: { owner: string; metadata: Cookie_metadata };
};

export type Owners = {
	Power: string;
	Wisdom: string;
	Time: string;
	War: string;
	Wealth: string;
};
