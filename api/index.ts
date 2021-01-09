import type { NowRequest, NowResponse } from '@vercel/node';

import type { FilterQuery } from './model/FilterQuery';

import { processApiRequest } from './ServerlessFunction';

export default (req: NowRequest, res: NowResponse): void => {
	const response = processApiRequest(req.url, req.query as FilterQuery);

	const responseCode = response.status === 'error' ? 500 : 200;
	res.status(responseCode).json(response);
};
