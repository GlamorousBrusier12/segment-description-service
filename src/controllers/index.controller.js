import { generateResponse } from "../helpers/generate-response.js";
import { SegmentDescription } from "../models/SegmentDescription.js";

export const getSegmentDescription = async (req, res) => {
  let response;
  try {
    const { agency, version, segment } = req.body;
    const query = {
      Agency: agency,
      Version: version,
      SegmentID: segment,
    };
    const SegmentDescriptionResult = await SegmentDescription.find(query);
    console.log(`total ${SegmentDescriptionResult.length} documents`);

    if (SegmentDescriptionResult.length > 0) {
      response = generateResponse(
        true,
        "found sucessfully",
        SegmentDescriptionResult
      );
    } else if (SegmentDescriptionResult.length === 0) {
      response = generateResponse(true, "no segment description found");
    }
    res.send(response);
  } catch (err) {
    console.log(`error in fetching in all versions ${err}`);
    // throw new error(err);
    response = generateResponse(false, `there is some error: ${error}`);
    res.status(500).send(response);
  }
};
