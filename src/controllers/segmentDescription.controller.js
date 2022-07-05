import { SegmentDescription } from "../models/SegmentDescription.js";
import { generateResponse } from "../helpers/generate-response.js";

export const getSegment = async (query, callback) => {
  try {
    const segmentDescription = await SegmentDescription.find(query);
    console.log(
      `querying in segment description ...\ntotal ${segmentDescription?.length} documents`
    );
    if (segmentDescription.length > 0) {
      let response = generateResponse(
        true,
        "found successfully",
        segmentDescription
      );
      callback(response, segmentDescription);
    } else if (segmentDescription.length == 0) {
      let response = generateResponse(true, "No SegmentDescription found");
      callback(response, null);
    }
  } catch (error) {
    console.log("error in get segment", error);
    let response = generateResponse(
      false,
      "there occured some error : " + error
    );
    callback(response, null);
  }
};
