import { z } from "@hono/zod-openapi";

export const ParamsSchema = z.object({
  id: z.string().openapi({
    param: {
      name: "id",
      in: "path",
    },
    example: "1212121",
  }),
});

export const UserSchema = z.object({
  id: z.string().openapi({
    example: "123",
  }),
  username: z.string().min(3).openapi({
    example: "John Doe",
  }),
  email: z.string().email().openapi({
    example: "john@gmail.com",
  }),
  password: z.string().min(8).openapi({
    example: "password",
  }),
});

export const LoginParamsSchema = z.object({
  email: z.string().email().openapi({ example: "john@gmail.com" }),
  password: z.string().min(8).openapi({
    example: "password",
  }),
});

export const RegisterParamsSchema = z.object({
  email: z.string().email().openapi({ example: "john@gmail.com" }),
  password: z.string().min(8).openapi({
    example: "password",
  }),
});

export const NumberSchema = z.object({
  number: z.number().openapi({
    example: 90,
  }),
});

export const StringSchema = z.object({
  string: z.string().openapi({
    example: "Tired",
  }),
});

export const PostureCorrectionSchema = z.object({
  postures: z.array(
    z.object({
      posture_correction: z.number().openapi({
        example: 90,
      }),
      created_at: z.string().openapi({
        example: "2022-01-01",
      }),
    })
  ),
});

export const CalendarSchema = z.object({
  month: z.string().openapi({
    example: "2022-01",
  }),
  completed_challenges: z.array(
    z.object({
      date: z.string().openapi({
        example: "2022-01-01",
      }),
      completed: z.boolean().openapi({
        example: true,
      }),
    })
  ),
});

export const ChallengeSchema = z.object({
  user_id: z.string().openapi({ example: "123" }),
  name: z.string().openapi({ example: "Challenge 1" }),
  description: z.string().openapi({ example: "Description of challenge" }),
  progress: z.number().openapi({ example: 90 }),
  criteria: z.string().openapi({ example: "Criteria of challenge" }),
  metric: z.string().openapi({ example: "Metric of challenge" }),
  completed: z.boolean().openapi({ example: true }),
});

export const ShowChallengesSchema = ChallengeSchema.pick({
  name: true,
  description: true,
  progress: true,
  criteria: true,
  metric: true,
});

export const UpdateUserSettingsSchema = z
  .object({
    user_id: z.number().openapi({ example: 123 }),
    auto_monitoring: z.boolean().openapi({ example: true }),
    camera: z.boolean().openapi({ example: true }),
    alert_frequency: z.number().openapi({ example: 90 }),
    duration: z.number().openapi({ example: 90 }),
    data_retention: z.number().openapi({ example: 90 }),
    light_theme: z.boolean().openapi({ example: true }),
  })
  .partial();

export const UpdateReportSettingsSchema = z
  .object({
    permitted: z.boolean().openapi({ example: true }),
    deep_think: z.boolean().openapi({ example: true }),
    auto_send: z.boolean().openapi({ example: true }),
    day_freq: z.boolean().openapi({ example: true }),
    week_freq: z.boolean().openapi({ example: true }),
    month_freq: z.boolean().openapi({ example: true }),
    trimester_freq: z.boolean().openapi({ example: true }),
  })
  .partial();

export const PomodoroSchema = z.object({
  work_time: z.number().openapi({ example: 25 }),
  short_break: z.number().openapi({ example: 5 }),
  long_break: z.number().openapi({ example: 15 }),
});

export const UpdatePomodoroSettingsSchema = z
  .object({
    user_id: z.number().openapi({ example: 123 }),
    alert: z.boolean().openapi({ example: true }),
    pomodoro_restart: z.boolean().openapi({ example: true }),
    break_restart: z.boolean().openapi({ example: true }),
  })
  .partial();

export const AiDataSchema = z.object({
  posture_correction: z.number().openapi({
    example: 90,
  }),
  hydration: z.boolean().openapi({
    example: true,
  }),
  breaks: z.boolean().openapi({
    example: true,
  }),
  nivel_of_stress: z.number().openapi({
    example: 90,
  }),
  concentrated: z.boolean().openapi({
    example: true,
  }),
});

export const MainDataSchema = z.object({
  posture_correction: z.number().openapi({
    example: 90,
  }),
  hydration: z.number().openapi({
    example: 90,
  }),
  breaks: z.number().openapi({
    example: 90,
  }),
  nivel_of_stress: z.number().openapi({
    example: 90,
  }),
});

export const SetupSchema = z.object({
  user_id: z.string().openapi({
    example: "123",
  }),
  setup: z.number().openapi({
    example: 1,
  }),
  work_time: z.number().openapi({
    example: 25,
  }),
  short_break: z.number().openapi({
    example: 5,
  }),
  long_break: z.number().openapi({
    example: 15,
  }),
  name_challenge: z.string().openapi({
    example: "Challenge 1",
  }),
});
