import { Request, Response, Router } from 'express';
import { Handler } from '../../domain/organisation.interface';
import { RouterClass } from '../infrastructure.interface';

const router = Router();

const STATUSES = { SY400: 400, SY500: 500 }

class Routes implements RouterClass {
  private handler: Handler;

  public constructor(Handler: Handler) {
    this.handler = Handler;
  }

  public organisation(): Router {
    router
      .route('/:id?')
      .get(async (request: Request, response: Response) =>
        this.requestHandler('list', request, response)
      )
      .post(async (request: Request, response: Response) =>
        this.requestHandler('create', request, response)
      );

    return router;
  }

  private async requestHandler(
    type: string, request: Request, response: Response
  ): Promise<Response> {
    try {
      const payload = type === 'list'
        ? request.params.id
        : request.body;

      const result = await this.handler[type](payload)
      return response.status(200)
        .send({ status: true, result });
    } catch (error) {
      const { code, trace } = error;
      const message = trace !== 'validate'
        ? `Unable to handle the ${trace} request`
        : error.message

      const result = { status: false, code, message }
      response.status(STATUSES[code])
        .send(result);
    }
  }
}
export default Routes;
