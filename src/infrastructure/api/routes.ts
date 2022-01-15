import { Request, Response, Router } from 'express'
import { OrganisationHandler } from '../../domain/organisation.interface'

const router = Router()

export class Routes {
  private Handler: OrganisationHandler

  constructor(Handler: OrganisationHandler) {
    this.Handler = Handler
  }

  public Organisation(): Router {
    router.route('/:id?')
      .get(async (request: Request, response: Response) =>
              this.handler('list', request, response))
      .post(async (request: Request, response: Response) =>
              this.handler('create', request, response))

    return router
  }

  private async handler(
    type: string, request: Request, response: Response
  ): Promise<void> {
    try {
      await this.Handler[type](request)

      response.status(200)
        .send('Hello World')
    } catch (error) {
      response.status(500)
        .send('Hello Mad World')
    }
  }
}
