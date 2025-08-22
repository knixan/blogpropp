"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BlogValues, BlogSchema } from "./schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function createBlog(values: BlogValues) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const data = await BlogSchema.parseAsync(values);

  const blog = await prisma.blog.create({
    data: {
      title: data.title,
      user: {
        connect: { id: session.user.id },
      },
    },
  });

  redirect(`/blog/${blog.id}`);
}
