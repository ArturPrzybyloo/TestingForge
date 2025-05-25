import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Wraps an asynchronous request handler to catch any errors and pass them to the next middleware (error handler).
 * @param fn The asynchronous request handler function.
 * @returns A RequestHandler function.
 */
const asyncHandler = (fn: RequestHandler) => 
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler; 