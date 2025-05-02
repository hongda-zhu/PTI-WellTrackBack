import { Context } from "hono";
import { db } from "../../lib/db";

// export const MainDataHandler = async (c: Context) => {
//   const { user_id } = await c.req.json();
//   try {
//     // Fetch data from the AI service
//     const res = await fetch("http://192.168.1.100:5000/ia/datos");
//     const json = await res.json();
//     const data = AiDataSchema.parse(json);
//     const today = new Date().toISOString().split("T")[0];
//     const existing =
//       await db`SELECT * FROM user_data WHERE user_id = ${user_id} and last_updated = ${today}`;
//     if (existing.length === 0) {
//       await db`INSERT INTO user_data (user_id, hydration, breaks, posture_correction, nivel_of_stress, concentration_time, last_updated) VALUES (${user_id}, 0, 0, ${data.posture_correction}, ${data.nivel_of_stress}, 0, ${today})`;
//     } else {
//       if (data.hydration) {
//         await db`UPDATE user_data SET hydration = hydration + 1 WHERE user_id = ${user_id}`;
//       }
//       if (data.breaks) {
//         await db`UPDATE user_data SET breaks = breaks + 1 WHERE user_id = ${user_id}`;
//       }
//       if (data.concentrated) {
//         await db`UPDATE user_data SET concentration_time = concentration_time + 1 WHERE user_id = ${user_id}`;
//       }
//       await db`UPDATE user_data SET posture_correction = ${data.posture_correction}, nivel_of_stress = ${data.nivel_of_stress} WHERE user_id = ${user_id}`;
//     }
//     const datos = await db`SELECT * FROM users WHERE user_id = ${user_id}`;
//     return c.json({
//       posture_correction: datos[0].posture_correction,
//       hydration: datos[0].hydration,
//       nivel_of_stress: datos[0].nivel_of_stress,
//       breaks: datos[0].breaks,
//       concentration_time: datos[0].concentration_time,
//     });
//   } catch (e) {
//     const errorMessage =
//       e instanceof Error ? e.message : "An unknown error occurred";
//     return c.json({ message: errorMessage }, 400);
//   }
// };

export const ShowUserDataHandler = async (c: Context) => {
  const { user_id } = await c.req.json();
  try {
    const result =
      await db`SELECT * FROM user_data WHERE user_id = ${user_id} ORDER BY LAST_UPDATED DESC LIMIT 1`;
    if (result.length === 0) {
      return c.json({ message: "No data found" }, 404);
    }
    const userData = result[0];
    const {
      hydration,
      breaks,
      posture_correction,
      nivel_of_stress,
      concentration_time,
    } = userData;
    return c.json({
      hydration,
      breaks,
      posture_correction,
      nivel_of_stress,
      concentration_time,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return c.json({ message: "Error fetching user data" }, 500);
  }
};

export const WeeklyAnalysisHandler = async (c: Context) => {
  const { user_id }: { user_id: number } = await c.req.json();
  const today = new Date();
  today.setDate(today.getDate() + 1); // Increment the date by 1 to include today in the range
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekAgoString = weekAgo.toISOString().split("T")[0];
  const todayString = today.toISOString().split("T")[0];
  try {
    const result = await db`SELECT posture_correction, last_updated
                                  FROM user_data
                                  WHERE user_id = ${user_id} AND last_updated BETWEEN ${weekAgoString} AND ${todayString}
                                  ORDER BY last_updated ASC`;
    if (result.length === 0) {
      return c.json({ message: "No data found for the last week" }, 400);
    }
    const postures = result.map((item: any) => ({
      posture_correction: item.posture_correction,
      created_at: new Date(item.last_updated).toISOString().split("T")[0],
    }));
    return c.json({ postures });
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "An unknown error occurred";
    return c.json({ message: errorMessage }, 400);
  }
};

export const ShowCalendarHandler = async (c: Context) => {
  const { user_id } = await c.req.json();
  const today = new Date();
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  try {
    const result = await db`SELECT DATE(created_at) as date,
                                COUNT(*) as total,
                                COUNT(*) FILTER (WHERE completed = true) as completed
                                FROM challenge
                                WHERE user_id = ${user_id} AND created_at >= ${thisMonth.toISOString()}
                                GROUP BY date
                                ORDER BY date ASC`;
    if (result.length === 0) {
      return c.json({ message: "No data found for the current month" }, 404);
    }
    return c.json(result, 200);
  } catch (error) {
    console.error("Error fetching calendar data:", error);
    return c.json({ message: "Error fetching calendar data" }, 500);
  }
};

export const ShowChallengesHandler = async (c: Context) => {
  const { user_id } = await c.req.json();
  const today = new Date().toISOString().split("T")[0];
  try {
    const result =
      await db`SELECT * FROM challenge WHERE user_id = ${user_id} AND DATE(created_at) = ${today}`;
    if (result.length === 0) {
      return c.json({ message: "No challenges found" }, 404);
    }
    const challenges = result.map((item: any) => ({
      name: item.name,
      description: item.description,
      progress: item.progress,
      criteria: item.criteria,
      metric: item.metric,
    }));
    return c.json({ challenges }, 200);
  } catch (error) {
    console.error("Error fetching challenges:", error);
    return c.json({ message: "Error fetching challenges" }, 500);
  }
};
