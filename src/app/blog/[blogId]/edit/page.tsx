import { notFound, redirect } from "next/navigation";
import { Params } from "../page";
import { prisma } from "@/lib/prisma";
import BlogEditForm from "./form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function BlogEditPage(props: { params: Params }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const params = await props.params;
  const blogId = parseInt(params.blogId);

  if (isNaN(blogId) || blogId <= 0) {
    return redirect("/blog");
  }

  const blog = await prisma.blog.findUnique({
    where: { id: blogId },
  });

  if (!blog) {
    return notFound();
  }

  if (blog.userId !== session.user.id) {
    return notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Edit Blog</h1>

      <BlogEditForm blog={blog} />
    </div>
  );
}
