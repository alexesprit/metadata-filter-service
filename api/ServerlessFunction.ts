import { NowRequestQuery } from '@vercel/node';

import { getFilter } from './FilterFactory';
import { filterQuery, getFilterName } from './Helper';

import { FilterQuery } from './model/FilterQuery';
import { Response } from './model/Response';
import { createErrorResponse, createSuccessResponse } from './ResponseFactory';

export function processApiRequest(
	url: string | undefined,
	query: NowRequestQuery
): Response {
	if (!url) {
		return createErrorResponse('Invalid request URL');
	}

	let filterName: string;
	try {
		filterName = getFilterName(url);
	} catch (err) {
		return createErrorResponse(err);
	}

	const filter = getFilter(filterName);
	if (!filter) {
		return createErrorResponse(`Unknown filter name: ${filterName}`);
	}

	if (Object.keys(query).length === 0) {
		return createErrorResponse('Filter query is empty');
	}

	try {
		const result = filterQuery(filter, query as FilterQuery);
		return createSuccessResponse(result);
	} catch (err) {
		return createErrorResponse(err);
	}
}
