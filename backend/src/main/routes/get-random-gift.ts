import { Router } from "express";
import { expressRouteAdapter } from "../adapters";
import { makeGetRandomGiftController } from "../factories/gift/get-random-gift";

export default (router: Router): void => {
  router.get('/gifts/random', expressRouteAdapter(makeGetRandomGiftController()))
}
