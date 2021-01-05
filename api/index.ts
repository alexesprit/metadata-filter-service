import type { NowRequest, NowResponse } from '@vercel/node';

import { processApiRequest } from './ServerlessFunction';

export default (req: NowRequest, res: NowResponse): void => {
	const response = processApiRequest(req.url, req.query);

	switch (response.status) {
		case 'success':
			res.status(200).json(response);
			break;

		case 'error':
			res.status(500).json(response);
			break;
	}
};
