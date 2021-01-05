import {
	MetadataFilter,
	getYoutubeFilter,
	getSpotifyFilter,
	getTidalFilter,
	getAmazonFilter,
	getRemasteredFilter,
} from 'metadata-filter';

type Endpoint = 'youtube' | 'spotify' | 'tidal' | 'amazon' | 'remastered';

const filters: Record<Endpoint, MetadataFilter> = {
	amazon: getAmazonFilter(),
	remastered: getRemasteredFilter(),
	spotify: getSpotifyFilter(),
	tidal: getTidalFilter(),
	youtube: getYoutubeFilter(),
};

export function getFilter(endpoint: string): MetadataFilter | null {
	if (isValidEndpoint(endpoint)) {
		return filters[endpoint];
	}

	return null;
}

function isValidEndpoint(endpoint: string): endpoint is Endpoint {
	return endpoint in filters;
}
