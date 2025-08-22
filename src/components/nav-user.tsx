"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NavUser({
  isAuthenticated = false,
}: {
  isAuthenticated?: boolean;
}) {
  const router = useRouter();

  if (isAuthenticated) {
    return (
      <li className="ml-auto">
        <Button
          onClick={() => {
            if (confirm("Are you sure you want to sign out?")) {
              authClient.signOut({
                fetchOptions: {
                  onResponse: () => {
                    router.push("/");
                    router.refresh();
                  },
                },
              });
            }
          }}
        >
          Sign Out
        </Button>
      </li>
    );
  }

  return (
    <>
      <li className="ml-auto">
        <Button asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
      </li>

      <li>
        <Button asChild variant="outline">
          <Link href="sign-up">Register</Link>
        </Button>
      </li>
    </>
  );
}
