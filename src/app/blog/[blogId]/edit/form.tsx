"use client";

import type { Blog } from "@/generated/prisma";
import { useForm } from "react-hook-form";
import { BlogSchema, BlogValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { editBlog } from "./actions";

export default function BlogEditForm({ blog }: { blog: Blog }) {
  const form = useForm<BlogValues>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      id: blog.id,
      title: blog.title,
    },
  });

  async function onSubmit(values: BlogValues) {
    await editBlog(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Loading..." : "Save Blog"}
        </Button>
      </form>
    </Form>
  );
}
