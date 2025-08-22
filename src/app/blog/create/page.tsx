import { auth } from "@/lib/auth";
import CreateBlogForm from "./form";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function CreateBlogPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create Blog</h1>

      <CreateBlogForm />
    </div>
  );
}
