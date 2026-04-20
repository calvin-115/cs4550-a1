"use client";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/kambaz/store";
import RichTextEditor from "./RichTextEditor";
import FollowUpDiscussions from "./FollowUpDiscussions";
import * as pazzaClient from "./client";

interface PostViewProps {
    postId: string;
    onPostUpdated: (post: any) => void;
    onPostDeleted: (postId: string) => void;
}

export default function PostView({ postId, onPostUpdated, onPostDeleted }: PostViewProps) {
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const [post, setPost] = useState<any>(null);
    const [editing, setEditing] = useState(false);
    const [editSummary, setEditSummary] = useState("");
    const [editDetails, setEditDetails] = useState("");
    const [studentAnswerText, setStudentAnswerText] = useState("");
    const [instructorAnswerText, setInstructorAnswerText] = useState("");
    const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);
    const [editAnswerText, setEditAnswerText] = useState("");

    const isInstructor = currentUser?.role === "FACULTY";
    const isStudent = !isInstructor;
    const isAuthor = post?.author === currentUser?._id || post?.authorName === `${currentUser?.firstName} ${currentUser?.lastName}`;

    const fetchPost = useCallback(async () => {
        try {
            const data = await pazzaClient.findPostById(postId);
            setPost(data);
        } catch (e) {
            console.error(e);
        }
    }, [postId]);

    useEffect(() => {
        fetchPost();
        setEditing(false);
        setEditingAnswerId(null);
        setStudentAnswerText("");
        setInstructorAnswerText("");
    }, [fetchPost]);

    if (!post) return <div className="p-4 text-muted">Loading...</div>;

    const studentAnswers = post.answers?.filter((a: any) => a.role === "STUDENT") || [];
    const instructorAnswers = post.answers?.filter((a: any) => a.role === "FACULTY" || a.role === "INSTRUCTOR") || [];
    const hasStudentAnswer = studentAnswers.length > 0;
    const hasInstructorAnswer = instructorAnswers.length > 0;

    const handleEditPost = () => {
        setEditSummary(post.summary);
        setEditDetails(post.details);
        setEditing(true);
    };

    const handleSaveEdit = async () => {
        try {
            const updated = await pazzaClient.updatePost(postId, { summary: editSummary, details: editDetails });
            setPost(updated);
            onPostUpdated(updated);
            setEditing(false);
        } catch (e) {
            console.error(e);
        }
    };

    const handleDeletePost = async () => {
        if (!confirm("Are you sure you want to delete this post?")) return;
        try {
            await pazzaClient.deletePost(postId);
            onPostDeleted(postId);
        } catch (e) {
            console.error(e);
        }
    };

    const handleSubmitAnswer = async (role: string) => {
        const text = role === "STUDENT" ? studentAnswerText : instructorAnswerText;
        if (!text.replace(/<[^>]*>/g, "").trim()) return;
        try {
            const updated = await pazzaClient.addAnswer(postId, { text, role: role === "STUDENT" ? "STUDENT" : "FACULTY" });
            setPost(updated);
            onPostUpdated(updated);
            if (role === "STUDENT") setStudentAnswerText("");
            else setInstructorAnswerText("");
        } catch (e) {
            console.error(e);
        }
    };

    const handleEditAnswer = (answer: any) => {
        setEditingAnswerId(answer._id);
        setEditAnswerText(answer.text);
    };

    const handleSaveAnswer = async (answerId: string) => {
        try {
            const updated = await pazzaClient.updateAnswer(postId, answerId, { text: editAnswerText });
            setPost(updated);
            onPostUpdated(updated);
            setEditingAnswerId(null);
            setEditAnswerText("");
        } catch (e) {
            console.error(e);
        }
    };

    const handleDeleteAnswer = async (answerId: string) => {
        if (!confirm("Delete this answer?")) return;
        try {
            const updated = await pazzaClient.deleteAnswer(postId, answerId);
            setPost(updated);
            onPostUpdated(updated);
        } catch (e) {
            console.error(e);
        }
    };

    const handlePostRefresh = (updatedPost: any) => {
        setPost(updatedPost);
        onPostUpdated(updatedPost);
    };

    const canEditPost = isInstructor || isAuthor;
    const canEditAnswer = (answer: any) => {
        return isInstructor || answer.author === currentUser?._id || answer.authorName === `${currentUser?.firstName} ${currentUser?.lastName}`;
    };

    const renderAnswer = (answer: any, borderColor: string) => (
        <div key={answer._id} className={`ms-2 mb-3 border-start border-2 ps-3 py-1`} style={{ borderColor }}>
            {editingAnswerId === answer._id ? (
                <div>
                    <RichTextEditor value={editAnswerText} onChange={setEditAnswerText} />
                    <div className="mt-2 d-flex gap-2">
                        <button className="btn btn-primary btn-sm" onClick={() => handleSaveAnswer(answer._id)}>Save</button>
                        <button className="btn btn-secondary btn-sm" onClick={() => setEditingAnswerId(null)}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div>
                    <div dangerouslySetInnerHTML={{ __html: answer.text }} />
                    <div className="d-flex align-items-center gap-2 mt-1">
                        {canEditAnswer(answer) && (
                            <button className="btn btn-sm btn-outline-primary py-0 px-1" style={{ fontSize: 12 }} onClick={() => handleEditAnswer(answer)}>
                                Edit
                            </button>
                        )}
                        <small className="text-muted">
                            <strong>{answer.authorName}</strong> &middot; {new Date(answer.updatedAt || answer.createdAt).toLocaleString()}
                        </small>
                        {canEditAnswer(answer) && (
                            <div className="dropdown">
                                <button className="btn btn-sm btn-link text-muted p-0 dropdown-toggle" data-bs-toggle="dropdown" style={{ fontSize: 12 }}>
                                    Actions
                                </button>
                                <ul className="dropdown-menu">
                                    <li><button className="dropdown-item" onClick={() => handleEditAnswer(answer)}>Edit</button></li>
                                    <li><button className="dropdown-item text-danger" onClick={() => handleDeleteAnswer(answer._id)}>Delete</button></li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="p-4" style={{ maxWidth: 850 }}>
            {/* Post Header */}
            <div className="d-flex justify-content-between align-items-start mb-2">
                <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-secondary">{post.type === "Question" ? "question" : "note"}</span>
                    <span className="text-muted small">{post.views} view{post.views !== 1 ? "s" : ""}</span>
                </div>
                {canEditPost && (
                    <div className="dropdown">
                        <button className="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                            Actions
                        </button>
                        <ul className="dropdown-menu">
                            <li><button className="dropdown-item" onClick={handleEditPost}>Edit</button></li>
                            <li><button className="dropdown-item text-danger" onClick={handleDeletePost}>Delete</button></li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Post Content */}
            {editing ? (
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control mb-2 fw-bold fs-4"
                        value={editSummary}
                        onChange={(e) => setEditSummary(e.target.value)}
                        maxLength={100}
                    />
                    <RichTextEditor value={editDetails} onChange={setEditDetails} />
                    <div className="mt-2 d-flex gap-2">
                        <button className="btn btn-primary btn-sm" onClick={handleSaveEdit}>Save</button>
                        <button className="btn btn-secondary btn-sm" onClick={() => setEditing(false)}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div className="mb-3">
                    <h3 className="fw-bold">{post.summary}</h3>
                    <div dangerouslySetInnerHTML={{ __html: post.details }} />
                    <div className="mt-2 d-flex flex-wrap gap-1">
                        {post.folders?.map((f: string) => (
                            <span key={f} className="badge bg-info text-dark">{f}</span>
                        ))}
                    </div>
                    <div className="mt-2 d-flex align-items-center gap-2">
                        {canEditPost && (
                            <button className="btn btn-sm btn-outline-primary" onClick={handleEditPost}>Edit</button>
                        )}
                        <span className="text-muted small">
                            Posted by <strong>{post.authorName}</strong>
                            {post.authorRole === "FACULTY" && <span className="badge bg-warning text-dark ms-1" style={{ fontSize: 9 }}>Instructor</span>}
                            {post.authorRole === "STUDENT" && <span className="badge bg-secondary ms-1" style={{ fontSize: 9 }}>Student</span>}
                            <span className="ms-1">&middot; {new Date(post.createdAt).toLocaleString()}</span>
                        </span>
                    </div>
                </div>
            )}

            {/* Answers - only for Questions */}
            {post.type === "Question" && (
                <>
                    <hr />
                    {/* Student Answers */}
                    <div className="mb-4">
                        <h6 className="fw-bold text-muted border-bottom pb-1">
                            <span className="text-success me-1">●</span>
                            the students&apos; answer, <span className="fw-normal fst-italic">where students collectively construct a single answer</span>
                        </h6>
                        {studentAnswers.map((answer: any) => renderAnswer(answer, "#198754"))}
                        {!hasStudentAnswer && isStudent && (
                            <div className="ms-2">
                                <RichTextEditor value={studentAnswerText} onChange={setStudentAnswerText} placeholder="Write your answer..." />
                                <div className="mt-2 d-flex gap-2">
                                    <button className="btn btn-primary btn-sm" onClick={() => handleSubmitAnswer("STUDENT")}>Submit</button>
                                    <button className="btn btn-secondary btn-sm" onClick={() => setStudentAnswerText("")}>Cancel</button>
                                </div>
                            </div>
                        )}
                        {!hasStudentAnswer && isInstructor && (
                            <p className="text-muted small ms-2 fst-italic">No student answers yet.</p>
                        )}
                    </div>

                    {/* Instructor Answers */}
                    <div className="mb-4">
                        <h6 className="fw-bold text-muted border-bottom pb-1">
                            <span className="text-warning me-1">●</span>
                            the instructors&apos; answer, <span className="fw-normal fst-italic">where instructors collectively construct a single answer</span>
                        </h6>
                        {instructorAnswers.map((answer: any) => renderAnswer(answer, "#ffc107"))}
                        {!hasInstructorAnswer && isInstructor && (
                            <div className="ms-2">
                                <RichTextEditor value={instructorAnswerText} onChange={setInstructorAnswerText} placeholder="Write the instructor's answer..." />
                                <div className="mt-2 d-flex gap-2">
                                    <button className="btn btn-primary btn-sm" onClick={() => handleSubmitAnswer("FACULTY")}>Submit</button>
                                    <button className="btn btn-secondary btn-sm" onClick={() => setInstructorAnswerText("")}>Cancel</button>
                                </div>
                            </div>
                        )}
                        {!hasInstructorAnswer && isStudent && (
                            <p className="text-muted small ms-2 fst-italic">No instructor answers yet.</p>
                        )}
                    </div>
                </>
            )}

            {/* Follow Up Discussions */}
            <hr />
            <FollowUpDiscussions post={post} postId={postId} onPostRefresh={handlePostRefresh} />
        </div>
    );
}