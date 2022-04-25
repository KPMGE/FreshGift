import { CreateGift } from "../../../domain/useCases";
import { Controller, HttpResponse, Validator } from "../../contracts";
import { badRequest, created, serverError } from "../../helpers";

export namespace CreateGiftController {
  export type Request = {
    name: string;
    price: number;
    description: string;
    imageUrl: string;
  }
}

export class CreateGiftController implements Controller {
  constructor(private readonly createGiftService: CreateGift, private readonly validator: Validator) { }

  async handle(request: CreateGiftController.Request): Promise<HttpResponse> {
    const error = this.validator.validate(request)
    if (error) return badRequest(error)
    try {
      const createdGift = await this.createGiftService.execute(request)
      return created(createdGift)
    } catch (err) {
      return serverError(err)
    }
  }
}
