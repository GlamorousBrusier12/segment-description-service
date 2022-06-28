import { validationResult } from "express-validator";
import NodeLogger from "simple-node-logger";
import { generateResponse } from "../helpers/generate-response.js";
const errorLog = NodeLogger.createSimpleLogger({
  logFilePath: `./src/log/error/${new Date()
    .toLocaleDateString()
    .split("/")
    .join("-")}.log`,
  timestampFormat: "YYYY-MM-DD HH:mm:ss",
});
/**
 *
 * @param error
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export default (error, req, res, next) => {
  errorLog.error(error.message);
  return res
    .status(process.env.EXCEPTION_CODE)
    .send(generateResponse(false, error.message));
};

export function validateRequest(req, res, next) {
  const errors = validationResult(req);

  //  throw a error if there is a validation error
  // if (!errors.isEmpty()) console.log(errors.array()[0]?.msg);
  if (!errors.isEmpty()) {
    const response = generateResponse(false, errors.array()[0]?.msg);
    res.status(400).send(response);
  }

  next();
}
