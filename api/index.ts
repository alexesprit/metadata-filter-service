import { NowRequest, NowResponse } from '@vercel/node';

import { getFilter } from './FilterFactory';
import { filterQuery, getFilterName } from './Helper';

import { FilterQuery } from './model/FilterQuery';
import { createErrorResponse, createSuccessResponse } from './ResponseFactory';

export default (request: NowRequest, response: NowResponse): void => {
	if (!request.url) {
		response.status(500).json(createErrorResponse('Invalid request URL'));
		return;
	}

	let filterName: string;
	try {
		filterName = getFilterName(request.url);
	} catch (err) {
		if (err instanceof Error) {
			response.status(500).json(createErrorResponse(err.message));
		}
		return;
	}

	const filter = getFilter(filterName);
	if (!filter) {
		response
			.status(500)
			.json(createErrorResponse(`Unknown filter name: ${filterName}`));
		return;
	}

	const query = request.query;
	if (Object.keys(query).length === 0) {
		response.status(500).json(createErrorResponse('Filter query is empty'));
		return;
	}

	try {
		const result = filterQuery(filter, query as FilterQuery);
		response.status(200).json(createSuccessResponse(result));
	} catch (err) {
		if (err instanceof Error) {
			response.status(500).json(createErrorResponse(err.message));
		}
	}
};
