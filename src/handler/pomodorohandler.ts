import { Context } from "hono";
import { db } from "../../lib/db";

export const create_challenge_handler = async (c: Context) => {
  const { user_id, name, description, progress, criteria, metric, completed } =
    await c.req.json();
  if (!user_id) {
    return c.json({ message: "Invalid request" }, 400);
  }
  try {
    const result =
      await db`INSERT INTO challenge (user_id, name, description, progress, criteria, metric, completed) VALUES (${user_id}, ${name}, ${description}, ${progress}, ${criteria}, ${metric}, ${completed})`;
    if (result.affectedRows === 0) {
      return c.json({ message: "Challenge creation failed" }, 400);
    }
    return c.json({ message: "Challenge created successfully" });
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "An unknown error occurred";
    return c.json({ message: errorMessage }, 500);
  }
};

export const modify_challenge_handler = async (c: Context) => {
  const { user_id, name, ...data } = await c.req.json();
  if (!user_id || !name) {
    return c.json({ message: "Invalid request" }, 400);
  }
  try {
    const result = await db`UPDATE challenge SET name = ${name}, ${db(
      data
    )} WHERE user_id = ${user_id} AND name = ${name}`;
    if (result.affectedRows === 0) {
      return c.json({ message: "Challenge modification failed" }, 400);
    }
    return c.json({ message: "Challenge modified successfully" });
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "An unknown error occurred";
    return c.json({ message: errorMessage }, 500);
  }
};

export const delete_challenge_handler = async (c: Context) => {
  const { user_id, name } = await c.req.json();
  if (!user_id || !name) {
    return c.json({ message: "Invalid request" }, 400);
  }
  try {
    const result =
      await db`DELETE FROM challenge WHERE user_id = ${user_id} AND name = ${name}`;
    if (result.affectedRows === 0) {
      return c.json({ message: "Challenge deletion failed" }, 400);
    }
    return c.json({ message: "Challenge deleted successfully" });
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "An unknown error occurred";
    return c.json({ message: errorMessage }, 500);
  }
};
