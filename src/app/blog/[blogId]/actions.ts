"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function deleteBlog(id: number) {
  const deletedBlog = await prisma.blog.delete({
    where: { id },
  });

  console.log("Deleted blog with id:", deletedBlog.id);

  redirect("/blog");
}
