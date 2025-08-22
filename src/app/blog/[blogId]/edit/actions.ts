"use server";

import { redirect } from "next/navigation";
import { BlogSchema, BlogValues } from "./schema";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function editBlog(values: BlogValues) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const data = await BlogSchema.parseAsync(values);

  const updatedBlog = await prisma.blog.update({
    where: { id: data.id, userId: session.user.id },
    data: {
      title: data.title,
    },
    select: { id: true },
  });

  redirect(`/blog/${updatedBlog.id}`);
}
