"use client";

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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createBlog } from "./actions";

export default function CreateBlogForm() {
  const form = useForm<BlogValues>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      title: "",
    },
    // mode: "onTouched",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(createBlog)} className="space-y-6">
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

        <Button disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Loading..." : "Create Blog"}
        </Button>
      </form>
    </Form>
  );
}
