import * as express from 'express';
import * as uuid from 'uuid';

export type JsonApiError = {
  id?: string;
  status?: string;
  code?: string;
  title?: string;
  detail?: string;
  source?: {
    pointer?: string;
    parameter?: string;
  };
  meta?: any;
};

export function catchAllErrorHandler(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  if (!res.headersSent) {
    if (!res.headersSent) {
      const error: JsonApiError = {
        id: uuid.v4(),
        code: 'INTERNAL_SERVER_ERROR',
        title: 'Internal server error',
        detail:
          err.code && err.message
            ? `Unhandled exception - ${err.code}: ${err.message}`
            : 'Unhandled exception',
      };

      if (err.stack && process.env.NODE_ENV !== 'production') {
        error.meta = {
          stack: err.stack,
        };
      }
      res.status(500).json({ errors: [error] });
    }
  }
}
