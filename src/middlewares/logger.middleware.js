import NodeLogger from "simple-node-logger";
const accessLog = NodeLogger.createSimpleLogger({
  logFilePath: `./src/log/access/${new Date()
    .toLocaleDateString()
    .split("/")
    .join("-")}.log`,
  timestampFormat: "YYYY-MM-DD HH:mm:ss",
});

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export default (req, res, next) => {
  let reqObject = {
    method: req.method,
    path: req.path,
    param: req.params,
    body: req.body,
  };

  let resObject = {
    statusCode: res.statusCode,
  };

  accessLog.info(
    JSON.stringify({
      reqObject,
      resObject,
    })
  );

  next();
};
