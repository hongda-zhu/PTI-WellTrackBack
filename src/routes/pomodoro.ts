import { createRoute } from "@hono/zod-openapi";
import {
  ChallengeSchema,
  ParamsSchema,
  PomodoroSchema,
  UpdatePomodoroSettingsSchema,
} from "../../doc/schemas";

export const setPomodoro = createRoute({
  method: "post",
  path: "/set_pomodoro",
  request: {
    body: {
      content: {
        "application/json": {
          schema: PomodoroSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Pomodoro set",
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
});

export const update_pomodoro_settings = createRoute({
  method: "patch",
  path: "/update_pomodoro_settings",
  request: {
    body: {
      content: {
        "application/json": {
          schema: UpdatePomodoroSettingsSchema,
        },
      },
    },
  },
  responses: {
    200: { description: "Pomodoro settings updated" },
    401: {
      content: {
        "application/json": { schema: { message: "Invalid request" } },
      },
      description: "Invalid request",
    },
  },
});

export const create_challenge = createRoute({
  method: "post",
  path: "/challenge",
  request: {
    body: {
      content: {
        "application/json": {
          schema: ChallengeSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Challenge created",
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
});

export const modify_challenge = createRoute({
  method: "patch",
  path: "/challenge/{id}",
  request: {
    params: ParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: ChallengeSchema.partial(),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Challenge modified",
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
});

export const delete_challenge = createRoute({
  method: "delete",
  path: "/challenge/{id}",
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      description: "Challenge deleted",
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
});
