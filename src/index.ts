import { googleAuth } from "@hono/oauth-providers/google";
import { OpenAPIHono } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";
import * as dotenv from "dotenv";
import ENV from "../config/env";
import { login, register, verifyemail } from "./routes/login";
import { calculate_perc_posture } from "./routes/main";
import { getReport } from "./routes/report_conf";

dotenv.config();

const app = new OpenAPIHono();

// app.openapi(route, (c) => {
//   return c.json({ id: "1", username: "John Doe", password: "examplePassword" });
// });

app.openapi(login, async (c) => {
  const res = await login.handler(c);
  return res;
});

app.openapi(register, async (c) => {
  const res = await register.handler(c);
  return res;
});

app.openapi(verifyemail, async (c) => {
  const res = await verifyemail.handler(c);
  return res;
});

app.openapi(calculate_perc_posture, (c) => {
  return c.json({
    number: 75,
  });
});

app.openapi(getReport, async (c) => {
  const res = await getReport.handler(c);
  return c.json(res);
});

// Google OAuth for login
app.use(
  "/google",
  googleAuth({
    client_id: ENV.GOOGLE_CLIENT_ID,
    client_secret: ENV.GOOGLE_CLIENT_SECRET,
    scope: ["openid", "email", "profile"],
  })
);

app.get("/google", (c) => {
  const token = c.get("token");
  const grantedScopes = c.get("granted-scopes");
  const user = c.get("user-google");

  return c.json({
    token,
    grantedScopes,
    user,
  });
});

app.doc("/openapi.json", {
  openapi: "3.1.0",
  info: {
    title: "Example",
    description: "The API reference for the PTI - WellTrack",
    version: "v1",
  },
});

// Load the middleware
app.get(
  "/api-reference",
  apiReference({
    spec: {
      url: "/openapi.json",
    },
    theme: "solarized",
    pageTitle: "PTI API Reference",
  })
);

// Set up Swagger UI
export default app;
