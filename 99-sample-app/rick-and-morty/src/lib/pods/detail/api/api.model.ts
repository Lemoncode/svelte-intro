export interface Character {
	id: number;
	name: string;
	status: string;
	species: string;
	type: string;
	gender: string;
	origin: Origin;
	location: Location;
	image: string;
	episode: string[];
	url: string;
	created: string;
}

export interface Origin {
	name: string;
	url: string;
}

export interface Location {
	name: string;
	url: string;
}
