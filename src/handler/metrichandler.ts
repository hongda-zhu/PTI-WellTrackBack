import { Context } from "hono";
import { db } from "../../lib/db";

export const ShowDataMetricHandler = async (c: Context) => {
  const { user_id }: { user_id: number } = await c.req.json();
  const today = new Date();
  today.setDate(today.getDate() + 1); // Increment the date by 1 to include today in the range
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekAgoString = weekAgo.toISOString().split("T")[0];
  const todayString = today.toISOString().split("T")[0];
  try {
    const result =
      await db`SELECT hydration, breaks, concentration_time, last_updated
                                  FROM user_data
                                  WHERE user_id = ${user_id} AND last_updated BETWEEN ${weekAgoString} AND ${todayString}
                                  ORDER BY last_updated ASC`;
    if (result.length === 0) {
      return c.json({ message: "No data found for the last week" }, 400);
    }
    const datas = result.map((item: any) => ({
      posture_correction: item.posture_correction,
      hydration: item.hydration,
      breaks: item.breaks,
      concentration_time: item.concentration_time,
      created_at: new Date(item.last_updated).toISOString().split("T")[0],
    }));
    return c.json({ datas });
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "An unknown error occurred";
    return c.json({ message: errorMessage }, 400);
  }
};
