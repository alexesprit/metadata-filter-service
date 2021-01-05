import { Expect, Test } from 'alsatian';

import { processApiRequest } from '../../api/ServerlessFunction';
import { isErrorResponse, isSuccesResponse } from '../Helper';

export class ServerlessFunctionTest {
	@Test('should return error when receive undefined URL')
	testUndefinedUrl(): void {
		const response = processApiRequest(undefined, {});
		Expect(response.status).toBe('error');

		if (isErrorResponse(response)) {
			Expect(response.message).toBe('Invalid request URL');
		}
	}

	@Test('should return error when receive invalid URL')
	testInvalidUrl(): void {
		const response = processApiRequest('?foo=bar', {});
		Expect(response.status).toBe('error');

		if (isErrorResponse(response)) {
			Expect(response.message).toBe('Invalid URL: ?foo=bar');
		}
	}

	@Test('should return error when receive incomplete URL')
	testIncompleteUrl(): void {
		const response = processApiRequest('/api', {});
		Expect(response.status).toBe('error');

		if (isErrorResponse(response)) {
			Expect(response.message).toBe('Missing filter name in URL');
		}
	}

	@Test('should return error when receive incomplete URL with slash')
	testIncompleteUrlWithSlash(): void {
		const response = processApiRequest('/api/', {});
		Expect(response.status).toBe('error');

		if (isErrorResponse(response)) {
			Expect(response.message).toBe('Invalid URL: /api/');
		}
	}

	@Test('should return error when receive URL with unknown filter')
	testUrlWithUnknownFilter(): void {
		const response = processApiRequest('/api/unknown', {});
		Expect(response.status).toBe('error');

		if (isErrorResponse(response)) {
			Expect(response.message).toBe('Unknown filter name: unknown');
		}
	}

	@Test('should return error when receive empty query')
	testEmptyQuery(): void {
		const response = processApiRequest('/api/youtube', {});
		Expect(response.status).toBe('error');

		if (isErrorResponse(response)) {
			Expect(response.message).toBe('Filter query is empty');
		}
	}

	@Test('should return error when filter unknown field')
	testFilteringInvalidField(): void {
		const response = processApiRequest('/api/youtube?foo=bar', {
			foo: 'bar',
		});
		Expect(response.status).toBe('error');

		if (isErrorResponse(response)) {
			Expect(response.message).toBe(
				'Filtering foo field is not supported by the filter'
			);
		}
	}

	@Test('should return success response')
	testFilteringValidField(): void {
		const response = processApiRequest('/api/youtube?track=title', {
			track: 'title',
		});
		Expect(response.status).toBe('success');

		if (isSuccesResponse(response)) {
			Expect(response.data.track).toBe('title');
		}
	}
}
