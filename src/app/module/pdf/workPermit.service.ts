import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/appError";
import { TWorkPermit } from "./workPermit.interface";
import WorkPermit from "./workPermit.model";

const createWorkPermit = async (payload: TWorkPermit) => {
  const isExistWorkPermit = await WorkPermit.findOne({
    lubaNr: payload?.lubaNr,
  });
  if (isExistWorkPermit) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "Work permit already exists with this Luba nr!"
    );
  }
  const result = await WorkPermit.create(payload);
  return result;
};
const getAllWorkPermit = async (query: Record<string, unknown>) => {
  const workPermitQuery = new QueryBuilder(WorkPermit.find(), query)
    .searchQuery(["lubaNr", "tootajaTeave.nimi"])
    .filterQuery()
    .paginateQuery()
    .sortQuery()
    .fieldFilteringQuery();

  const workPermits = await workPermitQuery.queryModel;

  // Fetch total count of documents that match the query without pagination
  const totalWorkPermits = await WorkPermit.countDocuments();

  return { workPermits, totalWorkPermits };
};
const getSingleWorkPermit = async (id: string) => {
  const result = await WorkPermit.findOne({ lubaNr: id });
  return result;
};
const deleteWorkPermit = async (id: string) => {
  const result = await WorkPermit.findByIdAndDelete(id);
  return result;
};
const updateWorkPermit = async (id: string, payload: Partial<TWorkPermit>) => {
  const { tootajaTeave, tooandmiseDetailid, tooloaDetailid, ...restPayload } =
    payload;
  const modifiedPayload: Record<string, unknown> = {
    ...restPayload,
  };

  // Update tootajaTeave
  if (tootajaTeave && Object.keys(tootajaTeave)?.length > 0) {
    for (const [key, value] of Object.entries(tootajaTeave)) {
      modifiedPayload[`tootajaTeave.${key}`] = value;
    }
  }

  // Update tooandmiseDetailid
  if (tooandmiseDetailid && Object.keys(tooandmiseDetailid)?.length > 0) {
    for (const [key, value] of Object.entries(tooandmiseDetailid)) {
      // Check if palkJaKasu is being updated
      if (key === "palkJaKasu" && value && typeof value === "object") {
        for (const [subKey, subValue] of Object.entries(value)) {
          modifiedPayload[`tooandmiseDetailid.palkJaKasu.${subKey}`] = subValue;
        }
      } else {
        modifiedPayload[`tooandmiseDetailid.${key}`] = value;
      }
    }
  }

  // Update tooloaDetailid
  if (tooloaDetailid && Object.keys(tooloaDetailid)?.length > 0) {
    for (const [key, value] of Object.entries(tooloaDetailid)) {
      modifiedPayload[`tooloaDetailid.${key}`] = value;
    }
  }

  const result = await WorkPermit.findByIdAndUpdate(id, modifiedPayload, {
    new: true,
  });
  return result;
};

export const workPermitServices = {
  createWorkPermit,
  getAllWorkPermit,
  getSingleWorkPermit,
  deleteWorkPermit,
  updateWorkPermit,
};
