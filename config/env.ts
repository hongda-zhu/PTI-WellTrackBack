import "dotenv/config";

interface EnvVars {
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
}

// Function to parse environment variables safely
const getEnv = (): EnvVars => {
  return {
    POSTGRES_USER: process.env.POSTGRES_USER || "",
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || "",
    POSTGRES_DB: process.env.POSTGRES_DB || "",
    POSTGRES_HOST: process.env.POSTGRES_HOST || "localhost",
    POSTGRES_PORT: Number(process.env.POSTGRES_PORT) || 5432,
  };
};

// Typed environment variables
const ENV = getEnv();

export default ENV;
