import { Router } from "express";
import zodValidateHandler from "../../middleware/zodValidateHandler";
import { workPermitZodValidation } from "./workPermit.validation";
import { workPermitControllers } from "./workPermit.controller";

const router = Router();

// Need update and create qr code zod schema
router.post(
  "/",
  zodValidateHandler(workPermitZodValidation.createWorkPermitZodValidation),
  workPermitControllers.createWorkPermit
);
router.get("/", workPermitControllers.getAllWorkPermits);
router.get("/:id", workPermitControllers.getSingleWorkPermit); //By visa id
router.delete("/:id", workPermitControllers.deleteWorkPermit); //By Object Id
router.patch(
  "/:id",
  zodValidateHandler(workPermitZodValidation.updateWorkPermitZodValidation),
  workPermitControllers.updateWorkPermit
); //By Object Id

export { router as workPermitRouter };
