import { Router } from "express";
import { expressRouteAdapter } from "../adapters";
import { makeListGiftsController } from "../factories";
import { makeCreateGiftController } from "../factories/controllers/create-gift";
import { makeDeleteGiftController } from "../factories/controllers/delete-gift";

export default (router: Router): void => {
  router.post('/gift', expressRouteAdapter(makeCreateGiftController()))
  router.get('/gift', expressRouteAdapter(makeListGiftsController()))
  router.delete('/gift/:giftId', expressRouteAdapter(makeDeleteGiftController()))
}
