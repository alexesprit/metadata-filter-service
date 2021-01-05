import { FilterResult } from './FilterResult';

export interface Response {
	status: string;
}

export interface SuccessResponse extends Response {
	status: 'success';
	data: FilterResult;
}

export interface ErrorResponse extends Response {
	status: 'error';
	message: string;
}
