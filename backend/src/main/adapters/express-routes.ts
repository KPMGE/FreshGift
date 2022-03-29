import { Request, Response } from 'express'
import { Controller } from "../../presentation/contracts/controller";

export const expressRouteAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const response = await controller.handle(req)
    return res.status(response.statusCode).json(response.data)
  }
} 
