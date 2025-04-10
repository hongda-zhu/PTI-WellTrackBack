import { Context } from "hono";
import { db } from "../../lib/db";

export const change_email_handler = async (c: Context) => {
  const { email, id }: { email: string; id: string } = await c.req.json();
  try {
    const sameemail =
      await db`SELECT * FROM users WHERE id = ${id} AND email = ${email}`;
    if (sameemail.length > 0) {
      return c.json(
        { message: "New email cannot be the same as the old email" },
        400
      );
    }
    const result = await db`UPDATE users SET email = ${email} WHERE id = ${id}`;
    if (result.affectedRows === 0) {
      return c.json({ message: "User not found" }, 404);
    }
    return c.json({ message: "Email changed successfully" });
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "An unknown error occurred";
    return c.json({ message: errorMessage }, 500);
  }
};

export const change_password_handler = async (c: Context) => {
  const { password, id }: { password: string; id: string } = await c.req.json();
  try {
    const samepassword =
      await db`SELECT * FROM users WHERE id = ${id} AND password = ${password}`;
    if (samepassword.length > 0) {
      return c.json(
        { message: "New password cannot be the same as the old password" },
        400
      );
    }
    const result =
      await db`UPDATE users SET password = ${password} WHERE id = ${id}`;
    if (result.affectedRows === 0) {
      return c.json({ message: "User not found" }, 404);
    }

    return c.json({ message: "Password changed successfully" });
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "An unknown error occurred";
    return c.json({ message: errorMessage }, 500);
  }
};

export const update_usrer_settings_handler = async (c: Context) => {
    const userSettings = await c.req.json();
    const { id } = userSettings;
    