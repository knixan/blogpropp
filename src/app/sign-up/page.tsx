import { auth } from "@/lib/auth";
import SignUpForm from "./form";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    // If we are already logged in
    // redirect to home
    console.log(session);
    redirect("/");
  }

  // NOT AUTHENTICATED

  return (
    <div>
      <SignUpForm />
    </div>
  );
}
