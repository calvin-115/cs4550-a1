"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/kambaz/store";
import * as pazzaClient from "./client";

interface FollowUpDiscussionsProps {
    post: any;
    postId: string;
    onPostRefresh: (post: any) => void;
}

export default function FollowUpDiscussions({ post, postId, onPostRefresh }: FollowUpDiscussionsProps) {
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const isInstructor = currentUser?.role === "FACULTY";

    const [newDiscussionText, setNewDiscussionText] = useState("");
    const [replyTexts, setReplyTexts] = useState<{ [key: string]: string }>({});
    const [editingDiscId, setEditingDiscId] = useState<string | null>(null);
    const [editDiscText, setEditDiscText] = useState("");
    const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
    const [editReplyText, setEditReplyText] = useState("");

    const canEdit = (authorId: string, authorName: string) => {
        return isInstructor || authorId === currentUser?._id || authorName === `${currentUser?.firstName} ${currentUser?.lastName}`;
    };

    const handleAddDiscussion = async () => {
        if (!newDiscussionText.trim()) return;
        try {
            const updated = await pazzaClient.addDiscussion(postId, { text: newDiscussionText });
            onPostRefresh(updated);
            setNewDiscussionText("");
        } catch (e) {
            console.error(e);
        }
    };

    const handleToggleResolved = async (discId: string, currentResolved: boolean) => {
        try {
            const updated = await pazzaClient.updateDiscussion(postId, discId, { resolved: !currentResolved });
            onPostRefresh(updated);
        } catch (e) {
            console.error(e);
        }
    };

    const handleEditDiscussion = (disc: any) => {
        setEditingDiscId(disc._id);
        setEditDiscText(disc.text);
    };

    const handleSaveDiscussion = async (discId: string) => {
        try {
            const updated = await pazzaClient.updateDiscussion(postId, discId, { text: editDiscText });
            onPostRefresh(updated);
            setEditingDiscId(null);
        } catch (e) {
            console.error(e);
        }
    };

    const handleDeleteDiscussion = async (discId: string) => {
        if (!confirm("Delete this discussion?")) return;
        try {
            const updated = await pazzaClient.deleteDiscussion(postId, discId);
            onPostRefresh(updated);
        } catch (e) {
            console.error(e);
        }
    };

    const handleAddReply = async (discId: string) => {
        const text = replyTexts[discId];
        if (!text?.trim()) return;
        try {
            const updated = await pazzaClient.addReply(postId, discId, { text });
            onPostRefresh(updated);
            setReplyTexts((prev) => ({ ...prev, [discId]: "" }));
        } catch (e) {
            console.error(e);
        }
    };

    const handleEditReply = (reply: any) => {
        setEditingReplyId(reply._id);
        setEditReplyText(reply.text);
    };

    const handleSaveReply = async (discId: string, replyId: string) => {
        try {
            const updated = await pazzaClient.updateReply(postId, discId, replyId, { text: editReplyText });
            onPostRefresh(updated);
            setEditingReplyId(null);
        } catch (e) {
            console.error(e);
        }
    };

    const handleDeleteReply = async (discId: string, replyId: string) => {
        if (!confirm("Delete this reply?")) return;
        try {
            const updated = await pazzaClient.deleteReply(postId, discId, replyId);
            onPostRefresh(updated);
        } catch (e) {
            console.error(e);
        }
    };

    const discussions = post.discussions || [];

    return (
        <div>
            <h6 className="fw-bold text-muted">followup discussions</h6>

            {discussions.map((disc: any) => (
                <div key={disc._id} className="mb-3 border rounded p-3 bg-light">
                    {/* Resolved / Unresolved buttons */}
                    <div className="d-flex align-items-center gap-2 mb-2">
                        <button
                            className={`btn btn-sm ${disc.resolved ? "btn-success" : "btn-outline-success"}`}
                            onClick={() => handleToggleResolved(disc._id, disc.resolved)}
                        >
                            Resolved
                        </button>
                        <button
                            className={`btn btn-sm ${!disc.resolved ? "btn-danger" : "btn-outline-danger"}`}
                            onClick={() => handleToggleResolved(disc._id, disc.resolved)}
                        >
                            Unresolved
                        </button>
                    </div>

                    {/* Discussion content */}
                    {editingDiscId === disc._id ? (
                        <div className="mb-2">
                            <textarea
                                className="form-control form-control-sm"
                                value={editDiscText}
                                onChange={(e) => setEditDiscText(e.target.value)}
                                rows={2}
                            />
                            <div className="mt-1 d-flex gap-1">
                                <button className="btn btn-primary btn-sm" onClick={() => handleSaveDiscussion(disc._id)}>Save</button>
                                <button className="btn btn-secondary btn-sm" onClick={() => setEditingDiscId(null)}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <div className="mb-2">
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <strong className="small">{disc.authorName}</strong>
                                    <span className="text-muted small ms-2">{new Date(disc.createdAt).toLocaleString()}</span>
                                </div>
                                {canEdit(disc.author, disc.authorName) && (
                                    <div className="dropdown">
                                        <button className="btn btn-sm btn-link text-muted p-0 dropdown-toggle" data-bs-toggle="dropdown">
                                            Actions
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><button className="dropdown-item" onClick={() => handleEditDiscussion(disc)}>Edit</button></li>
                                            <li><button className="dropdown-item text-danger" onClick={() => handleDeleteDiscussion(disc._id)}>Delete</button></li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <p className="mb-1 small">{disc.text}</p>
                        </div>
                    )}

                    {/* Replies */}
                    {disc.replies?.map((reply: any) => (
                        <div key={reply._id} className="ms-4 mb-2 border-start border-2 ps-3 py-1">
                            {editingReplyId === reply._id ? (
                                <div>
                                    <textarea
                                        className="form-control form-control-sm"
                                        value={editReplyText}
                                        onChange={(e) => setEditReplyText(e.target.value)}
                                        rows={2}
                                    />
                                    <div className="mt-1 d-flex gap-1">
                                        <button className="btn btn-primary btn-sm" onClick={() => handleSaveReply(disc._id, reply._id)}>Save</button>
                                        <button className="btn btn-secondary btn-sm" onClick={() => setEditingReplyId(null)}>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <strong className="small">{reply.authorName}</strong>
                                            <span className="text-muted small ms-2">{new Date(reply.createdAt).toLocaleString()}</span>
                                        </div>
                                        {canEdit(reply.author, reply.authorName) && (
                                            <div className="dropdown">
                                                <button className="btn btn-sm btn-link text-muted p-0 dropdown-toggle" data-bs-toggle="dropdown">
                                                    Actions
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li><button className="dropdown-item" onClick={() => handleEditReply(reply)}>Edit</button></li>
                                                    <li><button className="dropdown-item text-danger" onClick={() => handleDeleteReply(disc._id, reply._id)}>Delete</button></li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    <p className="mb-0 small">{reply.text}</p>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Reply input */}
                    <div className="ms-4 mt-2 d-flex gap-2">
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Reply to this followup discussion"
                            value={replyTexts[disc._id] || ""}
                            onChange={(e) => setReplyTexts((prev) => ({ ...prev, [disc._id]: e.target.value }))}
                            onKeyDown={(e) => { if (e.key === "Enter") handleAddReply(disc._id); }}
                        />
                        <button className="btn btn-sm btn-outline-primary" onClick={() => handleAddReply(disc._id)}>
                            Reply
                        </button>
                    </div>
                </div>
            ))}

            {/* New discussion input */}
            <div className="mt-3">
                <label className="form-label small fw-bold">Start a new followup discussion</label>
                <div className="d-flex gap-2">
                    <textarea
                        className="form-control form-control-sm"
                        placeholder="Compose a new followup discussion"
                        value={newDiscussionText}
                        onChange={(e) => setNewDiscussionText(e.target.value)}
                        rows={2}
                    />
                </div>
                <button className="btn btn-sm btn-primary mt-2" onClick={handleAddDiscussion}>
                    Post Discussion
                </button>
            </div>
        </div>
    );
}