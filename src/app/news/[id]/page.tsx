"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Share2, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";
import { Badge } from "@/components/ui/Badge";
import { CountdownTimer } from "@/components/features/CountdownTimer";
import { MOCK_NEWS_EVENTS, MOCK_MEMBERS } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function SingleNewsPage({
    params,
}: {
    params: { id: string };
}) {
    const post = MOCK_NEWS_EVENTS.find((p) => p.id === params.id || p.slug === params.id);

    if (!post || !post.published) {
        notFound();
    }

    const author = MOCK_MEMBERS.find((m) => m.id === post.author_id);
    const isEvent = post.type === "event";
    const isPastEvent = isEvent && post.event_date
        ? new Date(post.event_date) < new Date()
        : false;

    // Find next/prev for navigation
    const currentIndex = MOCK_NEWS_EVENTS.findIndex(p => p.id === post.id);
    const nextPost = MOCK_NEWS_EVENTS[currentIndex - 1] || null;
    const prevPost = MOCK_NEWS_EVENTS[currentIndex + 1] || null;

    return (
        <div className="pt-[72px] min-h-screen bg-coesa-navy font-body font-light">
            {/* Cover Image */}
            <div className="relative h-[40vh] md:h-[50vh] min-h-[300px] w-full bg-coesa-midnight">
                {post.cover_image_url ? (
                    <Image
                        src={post.cover_image_url}
                        alt={post.title}
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-coesa-radial to-coesa-navy opacity-80" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-coesa-navy via-coesa-navy/40 to-transparent" />
            </div>

            <main className="relative -mt-24 lg:-mt-32 pb-24">
                <div className="max-w-3xl mx-auto px-6">
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-semibold mb-8 backdrop-blur-md bg-white/5 px-4 py-2 rounded-full border border-white/10"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to News
                    </Link>

                    {/* Article Header */}
                    <header className="mb-12">
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <Badge variant={isEvent ? "warning" : "default"} className="bg-coesa-navy/80 backdrop-blur-md">
                                {isEvent ? "Event" : "News"}
                            </Badge>
                            <div className="flex items-center gap-2 text-white/70 text-sm">
                                <Calendar className="w-4 h-4" />
                                <time>{formatDate(post.created_at)}</time>
                            </div>
                        </div>

                        <h1 className="font-display text-3xl md:text-5xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
                            {post.title}
                        </h1>

                        {/* Event specific details */}
                        {isEvent && post.event_date && (
                            <div className="bg-coesa-midnight/80 backdrop-blur-xl border border-coesa-divider p-6 rounded-2xl mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <div className="text-coesa-muted text-xs uppercase tracking-widest mb-1.5 font-mono">Date & Time</div>
                                    <div className="text-white font-medium">{formatDate(post.event_date)}</div>
                                </div>
                                {!isPastEvent ? (
                                    <div className="text-right">
                                        <div className="text-coesa-electric text-xs uppercase tracking-widest mb-1.5 font-mono">Starting In</div>
                                        <CountdownTimer targetDate={post.event_date} className="text-lg" />
                                    </div>
                                ) : (
                                    <Badge variant="error">Event Concluded</Badge>
                                )}
                            </div>
                        )}

                        {/* Author & Share */}
                        <div className="flex items-center justify-between border-b border-coesa-divider pb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-coesa-midnight overflow-hidden border border-white/10">
                                    {author?.photo_url ? (
                                        <Image src={author.photo_url} alt={author.full_name} width={40} height={40} className="object-cover w-full h-full" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-coesa-royal text-white text-sm font-bold">
                                            {author?.full_name.charAt(0) || "C"}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div className="text-white font-semibold text-sm">{author?.full_name || "COESA IT Committee"}</div>
                                    <div className="text-coesa-muted text-xs">{author?.role_short || "Author"}</div>
                                </div>
                            </div>

                            <button className="w-10 h-10 rounded-full glass hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors" aria-label="Share article">
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>
                    </header>

                    {/* Article Content */}
                    <article
                        className="prose prose-invert prose-lg max-w-none prose-a:text-coesa-electric hover:prose-a:text-coesa-sky prose-a:no-underline hover:prose-a:underline prose-headings:font-display prose-headings:font-bold prose-h2:text-white prose-p:text-white/80 prose-p:leading-relaxed prose-img:rounded-2xl prose-img:border prose-img:border-white/10 mb-16"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content || "") }}
                    />

                    {/* Tags */}
                    <div className="flex items-center gap-3 pt-8 border-t border-coesa-divider">
                        <Tag className="w-4 h-4 text-coesa-muted" />
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/70 transition-colors hover:bg-white/10 cursor-pointer">COESA</span>
                            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/70 transition-colors hover:bg-white/10 cursor-pointer">{isEvent ? "Event" : "Update"}</span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="grid sm:grid-cols-2 gap-4 mt-16">
                        {prevPost ? (
                            <Link href={`/news/${prevPost.id}`} className="p-6 rounded-2xl glass border border-white/5 hover:border-white/20 transition-all group block text-left">
                                <div className="flex items-center gap-2 text-coesa-muted text-xs uppercase tracking-widest mb-2 font-mono">
                                    <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Previous
                                </div>
                                <div className="text-white font-display font-medium line-clamp-2">{prevPost.title}</div>
                            </Link>
                        ) : <div />}

                        {nextPost && (
                            <Link href={`/news/${nextPost.id}`} className="p-6 rounded-2xl glass border border-white/5 hover:border-white/20 transition-all group block text-right">
                                <div className="flex items-center justify-end gap-2 text-coesa-muted text-xs uppercase tracking-widest mb-2 font-mono">
                                    Next <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </div>
                                <div className="text-white font-display font-medium line-clamp-2">{nextPost.title}</div>
                            </Link>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
}
