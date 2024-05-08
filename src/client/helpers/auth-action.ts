import { LoginSchema, RegisterSchema } from "@/schemas";
import * as z from "zod";
import axios from "axios";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validation = RegisterSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid Fields" };
  }

  const response = await axios.post("/api/auth/register", values);

  const data = response.data;

  if (!data.success) {
    return { error: data.message };
  }
  return { success: data.message };
};

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validation = LoginSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid Fields" };
  }
  const response = await axios.post("/api/auth/login", values);
  const data = response.data;

  if (!data.success) {
    return { error: data.message };
  }
  return { success: data.message };
};
