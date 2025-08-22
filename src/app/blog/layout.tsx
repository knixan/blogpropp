import BlogNavbar from "@/components/blog-navbar";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BlogNavbar />

      {children}
    </>
  );
}
