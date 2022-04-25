import { Router } from "express";
import { expressRouteAdapter } from "../adapters";
import { makeCreateGiftController } from "../factories/controllers/create-gift";

export default (router: Router): void => {
  router.post('/gifts', expressRouteAdapter(makeCreateGiftController()))
}
