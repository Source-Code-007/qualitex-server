import mongoose, { model } from "mongoose";
import { TWorkPermit } from "./workPermit.interface";
import { generateRandomString } from "../../utils/generateRandomString";

const workPermitSchema = new mongoose.Schema<TWorkPermit>(
  {
    lubaNr: { type: String, default: Math.random().toString(36).substring(7) },
    barcodeText: { type: String, required: true },
    tootajaTeave: {
      nimi: { type: String, required: true },
      isaNimi: { type: String, required: true },
      emainimi: { type: String, required: true },
      sunnipaev: { type: String, required: true },
      passiNumber: { type: String, required: true },
      pusivAadress: { type: String, required: true },
      ePost: { type: String, required: true },
    },
    tooandmiseDetailid: {
      ametikoht: { type: String, required: true },
      tooKirjeldus: { type: String, required: true },
      contractStartDate: { type: String, required: true },
      contractEndDate: { type: String, required: true },
      palkJaKasu: {
        kuuPalk: { type: String, required: true },
      },
    },
    tooloaDetailid: {
      workPermitStartDate: { type: String, required: true },
      workPermitEndDate: { type: String, required: true },
    },
  },
  { timestamps: true }
);

workPermitSchema.pre("save", async function (next) {
  const workPermit = this;
  const count = await WorkPermit.find().countDocuments();
  let id;
  if (count === 0) {
    id = 1;
  } else {
    id = count + 1;
  }
  workPermit.lubaNr = `WP-2024-7897-X${generateRandomString(2)}${id}`;
  next();
});

const WorkPermit = model<TWorkPermit>("workPermit", workPermitSchema);

export default WorkPermit;
