import mongoose, { model } from "mongoose";
import { TWorkPermit } from "./workPermit.interface";

const workPermitSchema = new mongoose.Schema<TWorkPermit>(
  {
    lubaNr: { type: String, required: true },
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

const WorkPermit = model<TWorkPermit>("workPermit", workPermitSchema);

export default WorkPermit;
