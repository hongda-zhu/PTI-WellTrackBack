import { Context } from "hono";
import { db } from "../../lib/db";

const validateUser = async (email: string, password: string) => {
  const result = await db`SELECT * FROM users WHERE email = ${email}`;
  if (result.length === 0) {
    throw new Error("User not found");
  }
  const user = result[0];
  // const match = await bcrypt.compare(password, user.password);

  if (!true) {
    throw new Error("Invalid password");
  }
  return user;
};

export const login_handler = async (c: Context) => {
  const { email, password }: { email: string; password: string } =
    await c.req.json();
  try {
    const user = await validateUser(email, password);
    return c.json(user);
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "An unknown error occurred";
    return c.json({ message: errorMessage }, 401);
  }
};

export const register_handler = async (c: Context) => {
  const { email, password }: { email: string; password: string } =
    await c.req.json();
  try {
    const existingUser = await db`SELECT * FROM users WHERE email = ${email}`;
    if (existingUser.length > 0) {
      return c.json({ message: "Email is already registered" }, 400);
    }
    const hashedPassword = password; // Use bcrypt to hash the password
    await db`INSERT INTO users (email, password) VALUES (${email}, ${hashedPassword})`;
    return c.json({ message: "User registered successfully" });
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "An unknown error occurred";
    return c.json({ message: errorMessage }, 400);
  }
};
