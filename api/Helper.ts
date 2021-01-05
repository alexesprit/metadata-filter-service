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

export function getFilterName(url: string): string {
	const lastElement = url.split('/').pop();
	if (lastElement) {
		return lastElement;
	}

	throw new Error(`Invalid URL: ${url}`);
}
