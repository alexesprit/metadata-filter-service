import { Test } from 'alsatian';

import { ExpectResponse as Expect } from '../ResponseMatcher';

import { processApiRequest } from '../../api/ServerlessFunction';

export class ServerlessFunctionTest {
	@Test('should return error when receive undefined URL')
	testUndefinedUrl(): void {
		const response = processApiRequest(undefined, {});

		Expect(response).toBeError('Invalid request URL');
	}

	@Test('should return error when receive invalid URL')
	testInvalidUrl(): void {
		const response = processApiRequest('?foo=bar', {});

		Expect(response).toBeError('Invalid URL: ?foo=bar');
	}

	@Test('should return error when receive incomplete URL')
	testIncompleteUrl(): void {
		const response = processApiRequest('/api', {});

		Expect(response).toBeError('Missing filter name in URL');
	}

	@Test('should return error when receive incomplete URL with slash')
	testIncompleteUrlWithSlash(): void {
		const response = processApiRequest('/api/', {});

		Expect(response).toBeError('Invalid URL: /api/');
	}

	@Test('should return error when receive URL with unknown filter')
	testUrlWithUnknownFilter(): void {
		const response = processApiRequest('/api/unknown', {});

		Expect(response).toBeError('Unknown filter name: unknown');
	}

	@Test('should return error when receive empty query')
	testEmptyQuery(): void {
		const response = processApiRequest('/api/youtube', {});

		Expect(response).toBeError('Filter query is empty');
	}

	@Test('should return error when filter unknown field')
	testFilteringInvalidField(): void {
		const response = processApiRequest('/api/youtube', {
			foo: 'bar',
		});

		Expect(response).toBeError(
			'Filtering foo field is not supported by the filter'
		);
	}

	@Test('should return success response')
	testFilteringValidField(): void {
		const response = processApiRequest('/api/youtube', {
			track: 'title',
		});

		Expect(response).toBeSuccess({ track: 'title' });
	}
}
