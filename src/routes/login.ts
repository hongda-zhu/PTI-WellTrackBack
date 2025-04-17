import { createRoute, z } from "@hono/zod-openapi";
import { LoginParamsSchema, RegisterParamsSchema } from "../../doc/schemas"; // Adjust the import path as necessary
import {
  login_handler,
  register_handler,
  verify_email_handler,
} from "../handler/loginhandler";

export const login = createRoute({
  method: "post",
  path: "/login",
  request: {
    body: {
      content: {
        "application/json": {
          schema: LoginParamsSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Login successful",
    },
    401: {
      content: {
        "application/json": {
          schema: { message: "Invalid username or password" },
        },
      },
      description: "Invalid username or password",
    },
  },
  handler: login_handler,
});

export const register = createRoute({
  method: "post",
  path: "/register",
  request: {
    body: {
      content: {
        "application/json": {
          schema: RegisterParamsSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "User registered successfully",
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
  handler: register_handler,
});

export const verifyemail = createRoute({
  method: "get",
  path: "/verify-email",
  request: {
    query: z.object({
      token: z.string(),
    }),
  },
  responses: {
    200: {
      description: "Email verified successfully",
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
  handler: verify_email_handler,
});
