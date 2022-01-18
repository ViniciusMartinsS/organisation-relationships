import { Request, Response, Router } from 'express';
import { Handler } from '../../domain/organisation.interface';
import { RouterClass } from '../infrastructure.interface';
import { STATUSES, TRACE_VALIDATE, TYPE_LIST, TYPE_CREATE, INTERNAL_ERROR_CODE } from '../../constants.src';

const router = Router();

class Routes implements RouterClass {
  private handler: Handler;

  public constructor(Handler: Handler) {
    this.handler = Handler;
  }

  public organisation(): Router {
    router
      .route('/:organisation?')
      .get(async (request: Request, response: Response) =>
        this.requestHandler(TYPE_LIST, request, response)
      )
      .post(async (request: Request, response: Response) =>
        this.requestHandler(TYPE_CREATE, request, response)
      );

    return router;
  }

  private async requestHandler(
    type: string, request: Request, response: Response
  ): Promise<Response> {
    try {
      const DEFAULT = {};
      const { body, params = DEFAULT, query = DEFAULT } = request;
      const { organisation } = params;
      const { offset } = query;

      const payload = type === TYPE_LIST
        ? { organisation, offset }
        : body;

      const result = await this.handler[type](payload);
      return response.status(200)
        .send({ status: true, result });
    } catch (error) {
      const { code = INTERNAL_ERROR_CODE, trace = '' } = error;
      const message = trace !== TRACE_VALIDATE
        ? `Unable to handle the ${trace} request`
        : error.message;

      const result = { status: false, code, message };
      response.status(STATUSES[code] || STATUSES[INTERNAL_ERROR_CODE])
        .send(result);
    }
  }
}
export default Routes;
