import { createRoute, z } from "@hono/zod-openapi";
import {
  ShowCalendarHandler,
  ShowChallengesHandler,
  ShowUserDataHandler,
  WeeklyAnalysisHandler,
  HealthCheckHandler,
} from "../handler/mainhandler";

export const healthCheckRoute = createRoute({
  method: "get",
  path: "/health",
  tags: ["Health"],
  summary: "Performs a health check",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({ 
            message: z.string(),
          }).openapi({example: { message: "has hecho bien" }}),
        },
      },
      description: "Service is healthy",
    },
  },
  handler: HealthCheckHandler,
});

export const show_data = createRoute({
  method: "post",
  path: "/show_data",
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
  handler: ShowUserDataHandler,
});

// export const calculate_perc_posture = createRoute({
//   method: "get",
//   path: "/calculate_perc_posture",
//   responses: {
//     200: {
//       content: {
//         "application/json": {
//           schema: NumberSchema,
//         },
//       },
//       description: "Percentage of posture correct",
//     },
//   },
// });

// export const calculate_breaks = createRoute({
//   method: "get",
//   path: "/calculate_breaks",
//   responses: {
//     200: {
//       content: {
//         "application/json": {
//           schema: NumberSchema,
//         },
//       },
//       description: "Number of breaks",
//     },
//   },
// });

// export const calculate_hydration_attempts = createRoute({
//   method: "get",
//   path: "/calculate_hydration_attempts",
//   responses: {
//     200: {
//       content: {
//         "application/json": {
//           schema: NumberSchema,
//         },
//       },
//       description: "Number of hydration attempts",
//     },
//   },
// });

// export const calculate_level_tiredness = createRoute({
//   method: "get",
//   path: "/calculate_level_tiredness",
//   responses: {
//     200: {
//       content: {
//         "application/json": {
//           schema: StringSchema,
//         },
//       },
//       description: "Level of tiredness",
//     },
//   },
// });

export const show_weekly_analysis = createRoute({
  method: "post",
  path: "/show_weekly_analysis",
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
      description: "Show weekly analysis",
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
  handler: WeeklyAnalysisHandler,
});

export const show_calendar = createRoute({
  method: "post",
  path: "/show_calendar",
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
      description: "User challenge completion calendar",
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
  handler: ShowCalendarHandler,
});

export const show_challenges = createRoute({
  method: "post",
  path: "/show_challenges",
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
      description: "Show challenges",
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
  handler: ShowChallengesHandler,
});
