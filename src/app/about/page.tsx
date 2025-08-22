import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      <h1>Hello from /about</h1>

      <Link href="/about/contact">Contact us</Link>
    </div>
  );
}
