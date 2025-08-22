import { notFound, redirect } from "next/navigation";
import BackButton from "./back-button";
import DeleteButton from "./delete-button";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export type Params = Promise<{
  blogId: string;
}>;

// async function deleteBlog(id: number, formData: FormData) {
//   "use server";

//   // const idStr = formData.get("id");
//   // if (!idStr) throw new Error();

//   // const id = parseInt(idStr.toString());
//   const deletedBlog = await prisma.blog.delete({
//     where: { id },
//   });

//   console.log("Deleted blog with id:", deletedBlog.id);

//   redirect("/blog");
// }

export default async function BlogDetailsPage(props: { params: Params }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const params = await props.params;
  const blogId = parseInt(params.blogId);

  if (isNaN(blogId) || blogId <= 0) {
    // return notFound();
    return redirect("/blog");
  }

  // Make a database call to get the blog with
  // the specific ID

  const blog = await prisma.blog.findUnique({
    where: { id: blogId },
    include: {
      user: {
        select: { id: true, name: true },
      },
    },
  });

  if (!blog) {
    return notFound();
  }

  return (
    <div className="space-y-4">
      <BackButton />

      <h1 className="font-bold text-3xl">{blog.title}</h1>
      <p className="text-sm text-muted-foreground">{blog.user.name}</p>

      {blog.user.id === session?.user.id && (
        <div className="flex gap-2">
          <DeleteButton
            onDelete={async () => {
              "use server";

              const deletedBlog = await prisma.blog.delete({
                where: { id: blogId, userId: session.user.id },
              });

              console.log("Deleted blog with id:", deletedBlog.id);

              redirect("/blog");
            }}
          />

          <Button asChild>
            <Link href={`/blog/${blog.id}/edit`}>Edit Blog</Link>
          </Button>
        </div>
      )}

      {/* (id: number, formData: FormData) => void */}
      {/* (formData: FormData) => void */}
      {/* <form action={deleteBlog.bind(null, blog.id)}>
        <input readOnly type="hidden" name="id" value={blog.id} />
        <button type="submit">Delete Blog</button>
      </form> */}
    </div>
  );
}
