import { OpenAPIHono } from "@hono/zod-openapi";
import * as dotenv from "dotenv";
import { route } from "./routes";
import { apiReference } from "@scalar/hono-api-reference";
import { customTheme } from "@scalar/hono-api-reference/dist/honoApiReference";

dotenv.config();

const app = new OpenAPIHono();

app.openapi(route, (c) => {
  return c.json({ id: "1", name: "John Doe", age: 30 });
});

app.use("/openapi.json");

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
  "/",
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
