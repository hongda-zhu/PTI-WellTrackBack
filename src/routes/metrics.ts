import { createRoute, z } from "@hono/zod-openapi";
import { ShowDataMetricHandler } from "../handler/metrichandler";

export const show_data_metrics = createRoute({
  method: "post",
  path: "/show_data_metrics",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            user_id: z.number(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Data updated",
    },
    400: {
      content: {
        "application/json": {
          schema: { message: "Invalid request" },
        },
      },
      description: "Invalid request",
    },
  },
  handler: ShowDataMetricHandler,
});
