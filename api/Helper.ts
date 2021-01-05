import { MetadataFilter } from 'metadata-filter';
import { FilterResult } from './model/FilterResult';
import { FilterQuery } from './model/FilterQuery';

export function filterQuery(
	filter: MetadataFilter,
	filterQuery: FilterQuery
): FilterResult {
	for (const field in filterQuery) {
		if (!filter.canFilterField(field)) {
			throw new Error(
				`Filtering ${field} field is not supported by the filter`
			);
		}
	}

	const result: FilterResult = {};
	for (const field in filterQuery) {
		const fieldValue = filterQuery[field];

		result[field] = filter.filterField(field, fieldValue);
	}

	return result;
}

export function getFilterName(urlStr: string): string {
	const urlPath = urlStr.split('?').shift();
	if (!urlPath) {
		throw new Error(`Invalid URL: ${urlStr}`);
	}

	// Format is /api/:filter
	const urlPaths = urlPath.split('/');
	if (urlPaths.length < 3) {
		throw new Error('Missing filter name in URL');
	}

	const lastElement = urlPaths.pop();
	if (lastElement) {
		return lastElement;
	}

	throw new Error(`Invalid URL: ${urlStr}`);
}
