import app from "../../index.js";
import request from "supertest";
import { SegmentDescription } from "../../models/SegmentDescription.js";

it("invalid req obj", async () => {
  const SegmentDesObj = {
    Agency: "X",
    Version: "006040RAIL",
    SegmentID: "EI",
  };

  const newAgency = new SegmentDescription(SegmentDesObj);
  await newAgency.save();

  await request(app)
    .post("/api/segmentDescription/get")
    .send({
      version: "006040RAIL",
      segment: "EI",
    })
    .expect(400);
  await request(app)
    .post("/api/segmentDescription/get")
    .send({
      agency: "X",
      segment: "EI",
    })
    .expect(400);
  await request(app)
    .post("/api/segmentDescription/get")
    .send({
      agency: "X",
      version: "006040RAIL",
    })
    .expect(400);
});
it("get all details of a segment with a valid req obj", async () => {
  const SegmentDesObj = {
    Agency: "X",
    Version: "006040RAIL",
    SegmentID: "EI",
  };

  const newAgency = new SegmentDescription(SegmentDesObj);
  await newAgency.save();

  const agencyResponse = await request(app)
    .post("/api/segmentDescription/get")
    .send({
      agency: "X",
      version: "006040RAIL",
      segment: "EI",
    })
    .expect(200);
  const data = JSON.parse(agencyResponse.text).data[0];
  expect(data.SegmentID).toEqual(SegmentDesObj.SegmentID);
  expect(data.Agency).toEqual(SegmentDesObj.Agency);
  expect(data.Version).toEqual(SegmentDesObj.Version);
});
