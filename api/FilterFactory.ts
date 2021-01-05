import {
	MetadataFilter,
	getYoutubeFilter,
	getSpotifyFilter,
} from 'metadata-filter';

type Endpoint = 'youtube' | 'spotify';

const filters: Record<Endpoint, MetadataFilter> = {
	youtube: getYoutubeFilter(),
	spotify: getSpotifyFilter(),
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
