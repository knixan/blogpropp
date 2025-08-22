import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type SearchParams = Promise<{
  q?: string;
}>;

async function BlogPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const blogs = await prisma.blog.findMany({
    where: {
      title: {
        contains: searchParams.q,
        mode: "insensitive",
      },
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 block md:hidden">Blogs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <Card key={blog.id}>
            <CardHeader>
              <CardTitle>{blog.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href={`/blog/${blog.id}`}>View</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default BlogPage;
