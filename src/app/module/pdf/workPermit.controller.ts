import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { TWorkPermit } from "./workPermit.interface";
import { workPermitServices } from "./workPermit.service";

const createWorkPermit: RequestHandler = catchAsync(async (req, res, next) => {
  const payload = req.body as TWorkPermit;
  const workPermit = await workPermitServices.createWorkPermit(payload);
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: "Work permit inserted successfully!",
    data: workPermit,
  });
});

const getAllWorkPermits: RequestHandler = catchAsync(async (req, res, next) => {
  const { workPermits, totalWorkPermits } =
    await workPermitServices.getAllWorkPermit(req.query);

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: "Work permits retrieved successfully!",
    data: workPermits,
    meta: { query: req.query, total: totalWorkPermits },
  });
});

const getSingleWorkPermit: RequestHandler = catchAsync(
  async (req, res, next) => {
    const workPermit = await workPermitServices.getSingleWorkPermit(
      req.params?.id as string
    );
    if (!workPermit) {
      throw new Error("Work permit not found!");
    }
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: "Work permit retrieved successfully!",
      data: workPermit,
    });
  }
);

const deleteWorkPermit: RequestHandler = catchAsync(async (req, res, next) => {
  const workPermit = await workPermitServices.deleteWorkPermit(
    req.params?.id as string
  );
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: "Work permit deleted successfully!",
    data: workPermit,
  });
});

const updateWorkPermit: RequestHandler = catchAsync(async (req, res, next) => {
  const payload = req.body;
  const id = req.params?.id as string;
  const workPermit = await workPermitServices.updateWorkPermit(id, payload);
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: "Work permit updated successfully!",
    data: workPermit,
  });
});

export const workPermitControllers = {
  createWorkPermit,
  getAllWorkPermits,
  getSingleWorkPermit,
  deleteWorkPermit,
  updateWorkPermit,
};
