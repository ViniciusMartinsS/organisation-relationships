import { Request, Response, Router } from 'express';
import { Handler } from '../../domain/organisation.interface';

const router = Router();

class Routes {
  private handler: Handler;

  public constructor(Handler: Handler) {
    this.handler = Handler;
  }

  public Organisation(): Router {
    router
      .route('/:id?')
      .get(async (request: Request, response: Response) =>
        this.requestHandler('list', request, response),
      )
      .post(async (request: Request, response: Response) =>
        this.requestHandler('create', request, response),
      );

    return router;
  }

  private async requestHandler(
    type: string,
    request: Request,
    response: Response
  ): Promise<void> {
    try {
      await this.handler[type](request);

      response.status(200).send('Hello World');
    } catch (error) {
      response.status(500).send('Hello Mad World');
    }
  }
}
export default Routes;
