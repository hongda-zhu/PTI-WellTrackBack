import { Context } from "hono";
import { db } from "../../lib/db";

export const delete_account_handler = async (c: Context) => {
  const { email }: { email: string } = await c.req.json();
  try {
    const result = await db`DELETE FROM users WHERE email = ${email}`;
    if (result.affectedRows === 0) {
      return c.json({ message: "User not found" }, 404);
    }
    return c.json({ message: "Account deleted successfully" });
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

export const update_user_settings_handler = async (c: Context) => {
  const userSettings = await c.req.json();
  const { id } = userSettings;
  try {
    const result =
      await db`UPDATE conf_user SET ${userSettings} WHERE id = ${id}`;
    if (result.affectedRows === 0) {
      return c.json({ message: "User not found" }, 404);
    }
    return c.json({ message: "User settings updated successfully" });
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "An unknown error occurred";
    return c.json({ message: errorMessage }, 500);
  }
};
