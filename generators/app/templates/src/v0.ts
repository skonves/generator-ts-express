import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as swaggerUi from 'swagger-ui-express';
import { Router, errorHandler, OpenAPI } from 'openapi-router';

export const app: express.Express = express();
const spec = require('../specs/v0.json') as OpenAPI.Schema;
const router = new Router(spec, app);

app.use(bodyParser.json());

// Documentation routes
app.get('/spec', (req, res) => {
  res.send(spec);
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));

// TODO: implement routes

router.addCatchAllRoutes();

// Sub-application specific route handlers
app.use(errorHandler);
