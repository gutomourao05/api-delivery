import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ApiError } from '../helpers/ApiError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware = (error: ErrorRequestHandler & Partial<ApiError>, request: Request, response: Response, _next: NextFunction) => {

	const statusCode = error.statusCode ?? 500;
	const message = error.statusCode ? error.message : 'Internal Server Error';

	return response.status(statusCode).json({
		success: false,
		message
	});
};