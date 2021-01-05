import { FilterResult } from './model/FilterResult';
import { ErrorResponse, SuccessResponse } from './model/Response';

export function createSuccessResponse(
	filterResult: FilterResult
): SuccessResponse {
	return { status: 'success', data: filterResult };
}

export function createErrorResponse(message: string): ErrorResponse {
	return { status: 'error', message: message };
}
