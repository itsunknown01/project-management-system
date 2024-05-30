import { ProjectSchema } from "@/schemas/project";
import axios from "axios";
import toast from "react-hot-toast";
import * as z from "zod";

export const project = async (values: z.infer<typeof ProjectSchema>) => {
  const validation = ProjectSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid Fields" };
  }

  const response = await axios.post(`/api/project`, values);
  const data = await response.data;
  if (!data.success) {
    return { error: "Something went wrong" };
  }

  window.location.assign(`/${data.id}`);

  return { success: "Project Created Successfully" };
};
