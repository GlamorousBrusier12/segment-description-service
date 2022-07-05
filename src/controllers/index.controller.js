import { generateResponse } from "../helpers/generate-response.js";
import { SegmentDescription } from "../models/SegmentDescription.js";
import { SegmentUsage } from "../models/SegmentUsage.js";
import { getSegment } from "./segmentDescription.controller.js";

// api for segment description
export const getSegmentDescription = async (req, res) => {
  let response;
  try {
    const { agency, version, segment } = req.body;
    const query = {
      Agency: agency,
      Version: version,
      SegmentID: segment,
    };
    await getSegment(query, function (msg, data) {
      if (data) {
        return res.send(msg);
      }
    });
  } catch (err) {
    console.log(`error in fetching in all segment descriptions ${err}`);
    // throw new error(err);
    response = generateResponse(false, `there is some error: ${err}`);
    res.status(500).send(response);
  }
};

// api for segment usage

// get segment usage based on segment-id
export const getSegmentUsage = async (req, res) => {
  let response;
  try {
    const { agency, version, segment, transactionSet } = req.body;
    const query = {
      Agency: agency,
      Version: version,
      SegmentID: segment,
      TransactionSetID: transactionSet,
    };
    const SegmentUsageResult = await SegmentUsage.find(query);
    console.log(
      `querying in seg usage...\ntotal ${SegmentUsageResult.length} documents`
    );

    if (SegmentUsageResult.length > 0) {
      response = generateResponse(
        true,
        "found sucessfully",
        SegmentUsageResult
      );
    } else if (SegmentUsageResult.length === 0) {
      response = generateResponse(true, "no segment usage found");
    }
    return res.send(response);
  } catch (err) {
    console.log(`error in fetching in segmentusage using segment-id ${err}`);
    // throw new error(err);
    response = generateResponse(false, `there is some error: ${err}`);
    return res.status(500).send(response);
  }
};

// get all segmentusage
export const getAllSegmentUsage = async (req, res) => {
  let response;
  try {
    const { agency, version, segment, transactionSet } = req.body;
    const query = {
      Agency: agency,
      Version: version,
      TransactionSetID: transactionSet,
    };
    const SegmentUsageResult = await SegmentUsage.find(query);
    console.log(
      `querying in seg usage...\ntotal ${SegmentUsageResult.length} documents`
    );

    if (SegmentUsageResult.length > 0) {
      response = generateResponse(
        true,
        "found sucessfully",
        SegmentUsageResult
      );
    } else if (SegmentUsageResult.length === 0) {
      response = generateResponse(true, "no segment usage found");
    }
    res.send(response);
  } catch (err) {
    console.log(`error in fetching in all segment usage ${err}`);
    // throw new error(err);
    response = generateResponse(false, `there is some error: ${err}`);
    res.status(500).send(response);
  }
};

// get all segment from postion
export const getSegmentFromPosition = async (req, res) => {
  let response;
  try {
    const { agency, version, segment, transactionSet } = req.body;
    let query = {
      Agency: agency,
      Version: version,
      TransactionSetID: transactionSet,
    };
    console.log(query);
    const SegmentUsageResult = await SegmentUsage.find(query);
    console.log(
      `querying in seg usage...\ntotal ${SegmentUsageResult.length} documents`
    );

    if (SegmentUsageResult.length > 0) {
      response = generateResponse(
        true,
        "found sucessfully",
        SegmentUsageResult
      );
      response = JSON.parse(response);
      query = {
        Agency: agency,
        Version: version,
        SegmentID: SegmentUsageResult[0].SegmentID,
      };
      console.log(query);
      await getSegment(query, function (msg, data) {
        // console.log(msg);
        let msgObj = JSON.parse(msg);
        msgObj = JSON.parse(msg);
        // console.log(msgObj);
        response.status = msgObj.status;
        response.message = msgObj.message;
        response.description = data[0].Description;
        return res.send(JSON.stringify(response));
      });
    } else {
      console.log("No segment found");
      response = generateResponse(true, "no segment found");
      return res.send(JSON.stringify(response));
    }
  } catch (error) {
    console.log(`error in fetching in segment with position ${error}`);
    // throw new error(err);
    response = generateResponse(false, `there is some error: ${error}`);
    res.status(500).send(response);
  }
};
