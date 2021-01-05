import { Expect, MatchError } from 'alsatian';

import { isErrorResponse, isSuccesResponse } from './Helper';

import type { Response } from '../api/model/Response';
import type { FilterResult } from '../api/model/FilterResult';

export class ResponseMatcher {
	constructor(private actualValue: Response) {}

	toBeError(message: string): void {
		if (!isErrorResponse(this.actualValue)) {
			throw new MatchError(
				'should have "error" status',
				this.actualValue.status,
				'error'
			);
		}

		Expect(message).toEqual(this.actualValue.message);
	}

	toBeSuccess(data: FilterResult): void {
		if (!isSuccesResponse(this.actualValue)) {
			throw new MatchError(
				'should have "success" status',
				this.actualValue.status,
				'error'
			);
		}

		Expect(data).toEqual(this.actualValue.data);
	}
}

export function ExpectResponse(response: Response): ResponseMatcher {
	return new ResponseMatcher(response);
}
