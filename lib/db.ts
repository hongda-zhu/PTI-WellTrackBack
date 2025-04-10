import { SQL } from "bun";
import ENV from "../config/env";

export const db = new SQL({
  // Required
  url: `postgres://${ENV.POSTGRES_USER}:${ENV.POSTGRES_PASSWORD}@localhost:5432/${ENV.POSTGRES_DB}`,

  // Optional configuration
  // hostname: ENV.POSTGRES_HOST,
  // port: ENV.POSTGRES_PORT,
  // database: ENV.POSTGRES_DB,
  // username: ENV.POSTGRES_USER,
  // password: ENV.POSTGRES_PASSWORD,

  // Connection pool settings
  max: 1, // Maximum connections in pool
  idleTimeout: 30, // Close idle connections after 30s
  maxLifetime: 0, // Connection lifetime in seconds (0 = forever)
  connectionTimeout: 30, // Timeout when establishing new connections

  // SSL/TLS options
  tls: false,
  // tls: {
  //   rejectUnauthorized: true,
  //   requestCert: true,
  //   ca: "path/to/ca.pem",
  //   key: "path/to/key.pem",
  //   cert: "path/to/cert.pem",
  //   checkServerIdentity(hostname, cert) {
  //     ...
  //   },
  // },

  // Callbacks
  onconnect: (client) => {
    console.log("Connected to database");
  },
  onclose: (client) => {
    console.log("Connection closed");
  },
});
