import { Router } from "express";
import { body } from "express-validator";
const router = Router();

import {
  getAllSegmentUsage,
  getSegmentDescription,
  getSegmentFromPosition,
} from "../controllers/index.controller.js";
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

router.post(
  "/segmentUsage/getAll",
  [
    body("transactionSet")
      .notEmpty()
      .withMessage("provide a non empty transaction-set"),
    body("version").notEmpty().withMessage("provide a non empty version"),
    body("agency").notEmpty().withMessage("provide a non empty agency"),
  ],
  validateRequest,
  getAllSegmentUsage
);

router.post(
  "/segmentUsage/get",
  [
    body("segment").notEmpty().withMessage("provide a non empty segment"),
    body("transactionSet")
      .notEmpty()
      .withMessage("provide a non empty transaction-set"),
    body("version").notEmpty().withMessage("provide a non empty version"),
    body("agency").notEmpty().withMessage("provide a non empty agency"),
  ],
  validateRequest,
  getSegmentDescription
);
router.post(
  "/segmentUsage/getFromPosition",
  [
    body("segment").notEmpty().withMessage("provide a non empty segment"),
    body("transactionSet")
      .notEmpty()
      .withMessage("provide a non empty transaction-set"),
    body("version").notEmpty().withMessage("provide a non empty version"),
    body("agency").notEmpty().withMessage("provide a non empty agency"),
  ],
  validateRequest,
  getSegmentFromPosition
);

export default router;
