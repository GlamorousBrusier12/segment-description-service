import { Router } from "express";
import { body } from "express-validator";
const router = Router();

import { getSegmentDescription } from "../controllers/index.controller.js";
import { validateRequest } from "../middlewares/error.middleware.js";

router.post(
  "/segmentDescription/get",
  [
    body("segment").notEmpty().withMessage("provide a non empty segment"),
    body("version").notEmpty().withMessage("provide a non empty version"),
    body("agency").notEmpty().withMessage("provide a non empty agency"),
  ],
  validateRequest,
  getSegmentDescription
);

export default router;
