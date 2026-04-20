"use client";
import { useState } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

interface PostsSidebarProps {
    posts: any[];
    selectedPostId: string | null;
    onSelectPost: (postId: string) => void;
    onNewPost: () => void;
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

function groupPostsByDate(posts: any[]) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 86400000);
    const lastWeekStart = new Date(today.getTime() - 7 * 86400000);

    const groups: { label: string; posts: any[] }[] = [];
    const todayPosts: any[] = [];
    const yesterdayPosts: any[] = [];
    const lastWeekPosts: any[] = [];
    const weekBuckets: { [key: string]: any[] } = {};

    posts.forEach((post) => {
        const d = new Date(post.createdAt);
        const postDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());

        if (postDate.getTime() >= today.getTime()) {
            todayPosts.push(post);
        } else if (postDate.getTime() >= yesterday.getTime()) {
            yesterdayPosts.push(post);
        } else if (postDate.getTime() >= lastWeekStart.getTime()) {
            lastWeekPosts.push(post);
        } else {
            const day = postDate.getDay();
            const monday = new Date(postDate.getTime() - ((day === 0 ? 6 : day - 1) * 86400000));
            const sunday = new Date(monday.getTime() + 6 * 86400000);
            const key = `${monday.getMonth() + 1}/${monday.getDate()} - ${sunday.getMonth() + 1}/${sunday.getDate()}`;
            if (!weekBuckets[key]) weekBuckets[key] = [];
            weekBuckets[key].push(post);
        }
    });

    if (todayPosts.length > 0) groups.push({ label: "TODAY", posts: todayPosts });
    if (yesterdayPosts.length > 0) groups.push({ label: "YESTERDAY", posts: yesterdayPosts });
    if (lastWeekPosts.length > 0) groups.push({ label: "LAST WEEK", posts: lastWeekPosts });
    Object.keys(weekBuckets).sort((a, b) => {
        const parseDate = (s: string) => {
            const parts = s.split(" - ")[0].split("/");
            return new Date(now.getFullYear(), parseInt(parts[0]) - 1, parseInt(parts[1]));
        };
        return parseDate(b).getTime() - parseDate(a).getTime();
    }).forEach((key) => {
        groups.push({ label: key, posts: weekBuckets[key] });
    });

    return groups;
}

function formatTime(dateStr: string) {
    const d = new Date(dateStr);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const postDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());

    if (postDate.getTime() >= today.getTime()) {
        return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    if (postDate.getTime() >= today.getTime() - 7 * 86400000) {
        return days[d.getDay()];
    }
    return `${d.getMonth() + 1}/${d.getDate()}`;
}

function stripHtml(html: string) {
    return html?.replace(/<[^>]*>/g, "") || "";
}

export default function PostsSidebar({ posts, selectedPostId, onSelectPost, onNewPost, searchTerm, onSearchChange }: PostsSidebarProps) {
    const [visible, setVisible] = useState(true);
    const [collapsedGroups, setCollapsedGroups] = useState<{ [key: string]: boolean }>({});

    const filteredPosts = searchTerm
        ? posts.filter((p) =>
            p.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
            stripHtml(p.details).toLowerCase().includes(searchTerm.toLowerCase())
        )
        : posts;

    const groups = groupPostsByDate(filteredPosts);

    const toggleGroup = (label: string) => {
        setCollapsedGroups((prev) => ({ ...prev, [label]: !prev[label] }));
    };

    if (!visible) {
        return (
            <div style={{ width: 30, cursor: "pointer", borderRight: "1px solid #dee2e6" }}
                 className="d-flex align-items-start pt-2 justify-content-center"
                 onClick={() => setVisible(true)}>
                <FaCaretRight className="text-muted" />
            </div>
        );
    }

    return (
        <div style={{ width: 320, minWidth: 320, borderRight: "1px solid #dee2e6", height: "calc(100vh - 200px)", overflowY: "auto" }}>
            <div className="p-2 border-bottom d-flex align-items-center gap-2">
                <FaCaretLeft className="text-muted" style={{ cursor: "pointer", flexShrink: 0 }} onClick={() => setVisible(false)} />
                <button className="btn btn-warning btn-sm fw-bold text-nowrap" onClick={onNewPost}>
                    New Post
                </button>
                <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Search or add a post..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            {groups.map((group) => (
                <div key={group.label}>
                    <div
                        className="px-3 py-1 bg-light border-bottom fw-bold small text-muted"
                        style={{ cursor: "pointer", userSelect: "none" }}
                        onClick={() => toggleGroup(group.label)}
                    >
                        {collapsedGroups[group.label] ? "▸" : "▾"} {group.label}
                    </div>
                    {!collapsedGroups[group.label] && group.posts.map((post: any) => (
                        <div
                            key={post._id}
                            className={`px-3 py-2 border-bottom ${selectedPostId === post._id ? "bg-primary bg-opacity-10 border-start border-primary border-3" : ""}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => onSelectPost(post._id)}
                        >
                            <div className="d-flex justify-content-between align-items-start">
                                <div className="flex-fill" style={{ minWidth: 0 }}>
                                    <div className="d-flex align-items-center gap-1 mb-1">
                                        {post.authorRole === "FACULTY" ? (
                                            <span className="badge bg-warning text-dark" style={{ fontSize: 9, flexShrink: 0 }}>Instr</span>
                                        ) : (
                                            <span className="badge bg-secondary" style={{ fontSize: 9, flexShrink: 0 }}>Stud</span>
                                        )}
                                        <span className="fw-bold small text-truncate">{post.summary}</span>
                                    </div>
                                    <div className="text-muted" style={{ fontSize: 12, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>
                                        {stripHtml(post.details).substring(0, 120)}
                                    </div>
                                </div>
                                <div className="text-muted ms-2 text-nowrap" style={{ fontSize: 11 }}>
                                    {formatTime(post.createdAt)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}

            {filteredPosts.length === 0 && (
                <div className="text-center text-muted py-4 small">No posts found</div>
            )}
        </div>
    );
}