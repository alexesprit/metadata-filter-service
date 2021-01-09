import type { NowRequest, NowResponse } from '@vercel/node';

import { processApiRequest } from './ServerlessFunction';

export default (req: NowRequest, res: NowResponse): void => {
	const response = processApiRequest(req.url, req.query);

	const responseCode = response.status === 'error' ? 500 : 200;
	res.status(responseCode).json(response);
};
