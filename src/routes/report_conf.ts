import { createRoute } from "@hono/zod-openapi";
import { UpdateReportSettingsSchema } from "../../doc/schemas";
import {
  get_report_handler,
  update_report_settings_handler,
} from "../handler/reporthandler";

export const updateReportSettings = createRoute({
  method: "patch",
  path: "/update_Report_settings",
  request: {
    body: {
      content: {
        "application/json": {
          schema: UpdateReportSettingsSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Report settings updated",
    },
    401: {
      content: {
        "application/json": {
          schema: { message: "Invalid request" },
        },
      },
      description: "Invalid request",
    },
  },
  handler: update_report_settings_handler,
});

export const getReport = createRoute({
  method: "get",
  path: "/get_report",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: { message: "Report retrieved successfully" },
        },
      },
      description: "Report retrieved successfully",
    },
    404: {
      content: {
        "application/json": {
          schema: { message: "Report not found" },
        },
      },
      description: "Report not found",
    },
  },
  handler: get_report_handler,
});
