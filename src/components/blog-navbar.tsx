"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";

export default function BlogNavbar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleSearch(query?: string) {
    if (query) {
      router.push(`/blog?q=${query}`);
    } else {
      router.push("/blog");
    }
  }

  return (
    <nav className="p-2 rounded-lg bg-muted mb-4">
      <ul className="flex gap-4 items-center justify-between">
        <li>
          <Button asChild variant="link" size="sm">
            <Link href="/blog/create">Create blog</Link>
          </Button>
        </li>

        <li>
          <Input
            defaultValue={searchParams.get("q") ?? ""}
            type="search"
            onChange={(ev) => {
              handleSearch(ev.target.value);
            }}
            className="bg-white"
            placeholder="Search blogs..."
          />
        </li>
      </ul>
    </nav>
  );
}
