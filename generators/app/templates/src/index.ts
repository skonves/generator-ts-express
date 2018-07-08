import * as express from 'express';

import { app as v0 } from './v0';
import { catchAllErrorHandler } from './utils/errors';

const app = express();

// Application level "up route"
app.get('/up', (req, res) => {
  res.sendStatus(204);
});

// Major version sub-applications
app.use('/v0', v0);

// Note: any error handlers added here should not be specific to
// any particular major version's sub-application

// This error handler should always be last!
app.use(catchAllErrorHandler);

const port = process.env.PORT || 8888;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
