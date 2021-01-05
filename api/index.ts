import { NowRequest, NowResponse } from '@vercel/node';

import { getFilter } from './FilterFactory';
import { filterQuery, getFilterName } from './Helper';

import { FilterQuery } from './model/FilterQuery';

export default (request: NowRequest, response: NowResponse): void => {
	if (!request.url) {
		response.status(500).json({ error: 'Invalid request URL' });
		return;
	}

	const query = request.query;
	const filterName = getFilterName(request.url);

	const filter = getFilter(filterName);
	if (!filter) {
		response
			.status(500)
			.json({ error: `Unknown filter name: ${filterName}` });
		return;
	}

	try {
		const result = filterQuery(filter, query as FilterQuery);
		response.status(200).json(result);
	} catch (err) {
		if (err instanceof Error) {
			response.status(500).json({ error: err.message });
		}
	}
};
