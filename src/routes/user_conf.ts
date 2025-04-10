import { createRoute, z } from "@hono/zod-openapi";
import { UpdateUserSettingsSchema } from "../../doc/schemas";
import {
  change_email_handler,
  change_password_handler,
} from "../handler/user_conf_handler";

export const change_email = createRoute({
  method: "post",
  path: "/change_email",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({ email: z.string().email(), id: z.string() }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Email changed",
    },
    401: {
      content: {
        "application/json": {
          schema: { message: "Invalid email" },
        },
      },
      description: "Invalid email",
    },
  },
  handler: change_email_handler,
});

export const change_password = createRoute({
  method: "post",
  path: "/change_password",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({ password: z.string().min(8), id: z.string() }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Password changed",
    },
    401: {
      content: {
        "application/json": {
          schema: { message: "Invalid password" },
        },
      },
      description: "Invalid password",
    },
  },
  handler: change_password_handler,
});

export const updateUserSettings = createRoute({
  method: "patch",
  path: "/update_user_settings",
  request: {
    body: {
      content: {
        "application/json": {
          schema: UpdateUserSettingsSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "User settings updated",
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
  handler: update_usrer_settings_handler,
});
