import { Context } from "hono";
import { db } from "../../lib/db";

export const get_report_handler = async (c: Context) => {
  const { user_id, report_date } = await c.req.json();
  try {
    const result =
      await db`SELECT * FROM report WHERE user_id = ${user_id} AND created_at::date = ${report_date}`;
    if (result.length === 0) {
      return c.json({ message: "Report not found" }, 404);
    }
    const report = result[0];
    // Create a PDF document
    return c.json(report.content);
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "An unknown error occurred";
    return c.json({ message: errorMessage }, 500);
  }
};

export const update_report_settings_handler = async (c: Context) => {
  const reportSettings = await c.req.json();
  const { user_id, ...settings } = reportSettings;
  if (!user_id || Object.keys(settings).length === 0) {
    return c.json({ message: "Invalid request" }, 400);
  }
  try {
    const result = await db`UPDATE conf_report SET ${db(
      reportSettings
    )} WHERE user_id = ${user_id}`;
    if (result.affectedRows === 0) {
      return c.json({ message: "Report not found" }, 404);
    }
    return c.json({ message: "Report settings updated successfully" });
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "An unknown error occurred";
    return c.json({ message: errorMessage }, 500);
  }
};

const create_daily_report = async (user_id: number) => {
  const today = new Date().toISOString().split("T")[0];
  const result =
    await db`SELECT * FROM user_data WHERE user_id = ${user_id} AND last_updated::date = ${today}`;
  if (result.length === 0) {
    return null;
  }
  const userData = result[0];
  const reportContent = {
    user_id,
    content: JSON.stringify(userData),
  };
  await db`INSERT INTO report (user_id, content) VALUES (${user_id}, ${reportContent.content})`;
  return reportContent;
};

export const generate_daily_report_handler = async (c: Context) => {
  const today = new Date().toISOString().split("T")[0];
  try {
    const users = await db`SELECT user_id FROM users`;
    for (const user of users) {
      const user_id = user.user_id;
      await create_daily_report(user_id);
    }
    return c.json({ message: "Daily reports generated successfully" });
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "An unknown error occurred";
    return c.json({ message: errorMessage }, 500);
  }
};
