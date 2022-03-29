import { Router } from "express";
import { expressRouteAdapter } from "../adapters";
import { makeDeleteGiftController } from "../factories/gift";

export default (router: Router): void => {
  router.delete('/gifts/delete/:giftId', expressRouteAdapter(makeDeleteGiftController()))
}
