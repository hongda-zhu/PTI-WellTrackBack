import { createRoute, z } from "@hono/zod-openapi";
import {
  ChallengeSchema,
  PomodoroSchema,
  UpdatePomodoroSettingsSchema,
} from "../../doc/schemas";
import {
  create_challenge_handler,
  delete_challenge_handler,
  modify_challenge_handler,
} from "../handler/pomodorohandler";

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
  handler: create_challenge_handler,
});

export const modify_challenge = createRoute({
  method: "patch",
  path: "/modify_challenge",
  request: {
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
  handler: modify_challenge_handler,
});

export const delete_challenge = createRoute({
  method: "post",
  path: "/delete_challenge",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            user_id: z.string(),
            name: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Challenge deleted",
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
  handler: delete_challenge_handler,
});
