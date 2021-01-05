import { FilterResult } from './model/FilterResult';
import { ErrorResponse, SuccessResponse } from './model/Response';

export function createSuccessResponse(
	filterResult: FilterResult
): SuccessResponse {
	return { status: 'success', data: filterResult };
}

export function createErrorResponse(err: string | Error): ErrorResponse {
	const message = err instanceof Error ? err.message : err;
	return { status: 'error', message: message };
}
