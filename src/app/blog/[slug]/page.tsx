import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { BlogContent } from "./blog-content";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} - CPG Founders Group`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      ...(post.image ? { images: [post.image] } : {}),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-muted hover:text-foreground transition-colors mb-8"
        >
          &larr; Back to Blog
        </Link>

        <header>
          <div className="flex items-center gap-3 text-sm text-muted mb-4">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>&middot;</span>
            <span>{post.readingTime}</span>
            <span>&middot;</span>
            <span>{post.author}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted">{post.description}</p>
        </header>

        {post.image && (
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden mt-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        )}

        <div className="mt-10 prose prose-lg prose-stone max-w-none">
          <BlogContent content={post.content} />
        </div>

        {post.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-border flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs bg-background rounded-full text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-10 p-6 bg-card-flagship border border-accent/30 rounded-xl text-center">
          <p className="font-semibold text-lg">Want more insights like this?</p>
          <p className="mt-2 text-muted">
            Get Jeff&rsquo;s take on what&rsquo;s actually working in CPG. Direct to your inbox.
          </p>
          <Link
            href="/#email-signup"
            className="inline-flex items-center mt-4 px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors"
          >
            Subscribe to the newsletter
          </Link>
        </div>
      </div>
    </article>
  );
}
