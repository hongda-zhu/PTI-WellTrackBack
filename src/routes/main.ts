import { createRoute } from "@hono/zod-openapi";
import {
  CalendarSchema,
  NumberSchema,
  PostureCorrectionSchema,
  ShowChallengesSchema,
  StringSchema,
} from "../../doc/schemas";

export const calculate_perc_posture = createRoute({
  method: "get",
  path: "/calculate_perc_posture",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: NumberSchema,
        },
      },
      description: "Percentage of posture correct",
    },
  },
});

export const calculate_breaks = createRoute({
  method: "get",
  path: "/calculate_breaks",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: NumberSchema,
        },
      },
      description: "Number of breaks",
    },
  },
});

export const calculate_hydration_attempts = createRoute({
  method: "get",
  path: "/calculate_hydration_attempts",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: NumberSchema,
        },
      },
      description: "Number of hydration attempts",
    },
  },
});

export const calculate_level_tiredness = createRoute({
  method: "get",
  path: "/calculate_level_tiredness",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: StringSchema,
        },
      },
      description: "Level of tiredness",
    },
  },
});

export const show_weekly_analysis = createRoute({
  method: "get",
  path: "/show_weekly_analysis",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: PostureCorrectionSchema,
        },
      },
      description: "Show weekly analysis",
    },
  },
});

export const show_calendar = createRoute({
  method: "get",
  path: "/show_calendar",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: CalendarSchema,
        },
      },
      description: "User challenge completion calendar",
    },
  },
});

export const show_challenges = createRoute({
  method: "get",
  path: "/show_challenges",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: ShowChallengesSchema,
        },
      },
      description: "Show challenges",
    },
  },
});

export const show_concentration_time = createRoute({
  method: "get",
  path: "/show_concentration_time",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: NumberSchema,
        },
      },
      description: "Show concentration time",
    },
  },
});
