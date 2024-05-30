import React, { useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectSchema } from "@/schemas/project";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { project } from "@/helpers/project-action";
import toast from "react-hot-toast";

interface ProjectFormProps {
  onClose: () => void;
}

const ProjectForm = ({ onClose }: ProjectFormProps) => {
  const [loading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      name: "",
    },
  });

  const ProjectSubmit = async (values: z.infer<typeof ProjectSchema>) => {
    startTransition(() => {
      project(values).then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success(data.success as string);
        }
      });
    });
  };
  return (
    <div className="space-y-4 py-2 pb-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(ProjectSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Enter the project name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button disabled={loading} variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={loading} type="submit">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProjectForm;
