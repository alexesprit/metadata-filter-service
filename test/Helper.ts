import {
	ErrorResponse,
	Response,
	SuccessResponse,
} from '../api/model/Response';

export function isErrorResponse(response: Response): response is ErrorResponse {
	return response.status === 'error';
}

export function isSuccesResponse(
	response: Response
): response is SuccessResponse {
	return response.status === 'success';
}
