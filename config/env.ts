import "dotenv/config";

interface EnvVars {
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;

  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_REDIRECT_URL: string;

  MAIL_USER: string;
  MAIL_PASS: string;
}

// Function to parse environment variables safely
const getEnv = (): EnvVars => {
  return {
    POSTGRES_USER: process.env.POSTGRES_USER || "",
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || "",
    POSTGRES_DB: process.env.POSTGRES_DB || "",
    POSTGRES_HOST: process.env.POSTGRES_HOST || "localhost",
    POSTGRES_PORT: Number(process.env.POSTGRES_PORT) || 5432,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
    GOOGLE_REDIRECT_URL: process.env.GOOGLE_REDIRECT_URL || "",

    MAIL_USER: process.env.MAIL_USER || "",
    MAIL_PASS: process.env.MAIL_PASS || "",
  };
};

// Typed environment variables
const ENV = getEnv();

export default ENV;
