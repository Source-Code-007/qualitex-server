import express from "express";
import cors from "cors";
import "dotenv/config";
import {
  globalErrHandler,
  notFoundErrHandler,
} from "./app/middleware/errHandler";
import cron from "node-cron";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { workPermitRouter } from "./app/module/pdf/workPermit.route";

//   15 minute
//   */15 * * * *
// Self-ping task
cron.schedule("*/15 * * * *", () => {
  axios
    .get(`https://serbia-evisa-portal-server.onrender.com`) //TODO: Change to your server URL
    .then((response) => console.log("Self-ping successful:", response.status))
    .catch((error) => console.error("Self-ping failed:", error.message));
});

const app = express();

// Parser
app.get("/", (req, res) =>
  res.send({
    success: true,
    status: StatusCodes.OK,
    message: "Qualitex server is running!",
    data: null,
  })
);
app.use(cors());
app.use(express.json());

// Router
app.use("/api/v1/work-permit", workPermitRouter);

// Err handler
app.use(notFoundErrHandler);
app.use(globalErrHandler);

export default app;
