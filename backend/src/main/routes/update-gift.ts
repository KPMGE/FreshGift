import { Router } from "express";
import { expressRouteAdapter } from "../adapters";
import { makeUpdateGiftController } from "../factories/gift/update-gift";

export default (router: Router): void => {
  router.put('/gifts/update/:giftId', expressRouteAdapter(makeUpdateGiftController()))
}

