import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogList } from "./blog-list";

export const metadata: Metadata = {
  title: "Blog - CPG Founders Group",
  description:
    "Insights on fundraising, retail, margins, and scaling CPG brands from Jeff Church and the CPG Founders Group.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Blog</h1>
          <p className="mt-4 text-lg text-muted">
            Insights on fundraising, retail, margins, and scaling CPG brands from Jeff Church and the
            CPG Founders Group.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-muted">No posts yet. Check back soon.</p>
        ) : (
          <BlogList posts={posts} postsPerPage={6} />
        )}
      </div>
    </section>
  );
}
