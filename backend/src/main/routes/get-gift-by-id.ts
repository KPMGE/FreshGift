import { Router } from "express";
import { expressRouteAdapter } from "../adapters";
import { makeGetGiftByIdController } from "../factories/gift/get-gitf-by-id";

export default (router: Router): void => {
  router.get('/gifts/get/:giftId', expressRouteAdapter(makeGetGiftByIdController()))
}
