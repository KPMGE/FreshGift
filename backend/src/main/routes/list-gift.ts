import { Router } from "express";
import { expressRouteAdapter } from "../adapters";
import { makeListGiftController } from "../factories/gift";

export default (router: Router): void => {
  router.get('/gifts/list', expressRouteAdapter(makeListGiftController()))
}
