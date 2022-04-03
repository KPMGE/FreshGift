import { Request, Response } from 'express'
import { Controller } from "../../presentation/contracts/controller";

export const expressRouteAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
      accountId: req.accountId
    }
    const httpResponse = await controller.handle(request)

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      return res.status(httpResponse.statusCode).json({ data: httpResponse.body })
    }

    return res.status(httpResponse.statusCode).json({ error: httpResponse.body.message })
  }
} 
