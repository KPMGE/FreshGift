import { Router } from "express";
import { expressRouteAdapter } from "../adapters";
import { makeCreateGifController } from "../factories/gift";

export default (router: Router) => {
  router.post('/gifts/new', expressRouteAdapter(makeCreateGifController()))
}
