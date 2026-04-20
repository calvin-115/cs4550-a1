"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/kambaz/store";
import RichTextEditor from "./RichTextEditor";
import * as pazzaClient from "./client";
import * as coursesClient from "../../client";

interface NewPostScreenProps {
    courseId: string;
    folders: any[];
    onPostCreated: (post: any) => void;
    onCancel: () => void;
}

export default function NewPostScreen({ courseId, folders, onPostCreated, onCancel }: NewPostScreenProps) {
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);

    const [postType, setPostType] = useState("Question");
    const [postTo, setPostTo] = useState("Entire Class");
    const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
    const [summary, setSummary] = useState("");
    const [details, setDetails] = useState("");
    const [visibleTo, setVisibleTo] = useState<string[]>([]);
    const [courseUsers, setCourseUsers] = useState<any[]>([]);
    const [errors, setErrors] = useState<{ summary?: string; details?: string; folders?: string }>({});

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await coursesClient.findUsersForCourse(courseId);
                setCourseUsers(users);
            } catch (e) {
                console.error(e);
            }
        };
        if (postTo === "Individual") {
            fetchUsers();
        }
    }, [courseId, postTo]);

    const toggleFolder = (folderName: string) => {
        setSelectedFolders((prev) =>
            prev.includes(folderName) ? prev.filter((f) => f !== folderName) : [...prev, folderName]
        );
        if (errors.folders) setErrors((prev) => ({ ...prev, folders: undefined }));
    };

    const toggleVisibleTo = (userId: string) => {
        setVisibleTo((prev) =>
            prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
        );
    };

    const validate = () => {
        const newErrors: { summary?: string; details?: string; folders?: string } = {};
        if (!summary.trim()) newErrors.summary = "Summary is required";
        if (summary.length > 100) newErrors.summary = "Summary must be 100 characters or less";
        const strippedDetails = details.replace(/<[^>]*>/g, "").trim();
        if (!strippedDetails) newErrors.details = "Details are required";
        if (selectedFolders.length === 0) newErrors.folders = "At least one folder is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        try {
            const post = {
                type: postType,
                postTo,
                visibleTo: postTo === "Individual" ? visibleTo : [],
                folders: selectedFolders,
                summary: summary.trim(),
                details,
            };
            const newPost = await pazzaClient.createPost(courseId, post);
            onPostCreated(newPost);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="p-4" style={{ maxWidth: 800 }}>
            {/* Post Type Tabs */}
            <div className="mb-3">
                <label className="form-label fw-bold">
                    Post Type<span className="text-danger">*</span>
                </label>
                <div className="d-flex gap-3">
                    {["Question", "Note"].map((type) => (
                        <div className="form-check" key={type}>
                            <input
                                className="form-check-input"
                                type="radio"
                                name="postType"
                                id={`postType-${type}`}
                                checked={postType === type}
                                onChange={() => setPostType(type)}
                            />
                            <label className="form-check-label" htmlFor={`postType-${type}`}>
                                <strong>{type}</strong>
                                <br />
                                <small className="text-muted">
                                    {type === "Question" ? "if you need an answer" : "if you don't need an answer"}
                                </small>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Post To */}
            <div className="mb-3">
                <label className="form-label fw-bold">
                    Post To<span className="text-danger">*</span>
                </label>
                <div className="d-flex gap-3">
                    {["Entire Class", "Individual"].map((option) => (
                        <div className="form-check" key={option}>
                            <input
                                className="form-check-input"
                                type="radio"
                                name="postTo"
                                id={`postTo-${option}`}
                                checked={postTo === option}
                                onChange={() => setPostTo(option)}
                            />
                            <label className="form-check-label" htmlFor={`postTo-${option}`}>
                                {option === "Entire Class" ? "Entire Class" : "Individual Student(s) / Instructor(s)"}
                            </label>
                        </div>
                    ))}
                </div>
                {postTo === "Individual" && (
                    <div className="mt-2 border rounded p-2" style={{ maxHeight: 150, overflowY: "auto" }}>
                        {courseUsers.map((user: any) => (
                            <div className="form-check" key={user._id}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`user-${user._id}`}
                                    checked={visibleTo.includes(user._id)}
                                    onChange={() => toggleVisibleTo(user._id)}
                                />
                                <label className="form-check-label small" htmlFor={`user-${user._id}`}>
                                    {user.role === "FACULTY" && <span className="badge bg-warning text-dark me-1" style={{ fontSize: 9 }}>Instructor</span>}
                                    {user.firstName} {user.lastName}
                                </label>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Select Folders */}
            <div className="mb-3">
                <label className="form-label fw-bold">
                    Select Folder(s)<span className="text-danger">*</span>
                </label>
                <div className="d-flex flex-wrap gap-1">
                    {folders.map((f: any) => (
                        <button
                            key={f._id}
                            className={`btn btn-sm ${selectedFolders.includes(f.name) ? "btn-primary" : "btn-outline-secondary"}`}
                            onClick={() => toggleFolder(f.name)}
                            type="button"
                        >
                            {f.name}
                        </button>
                    ))}
                </div>
                {errors.folders && <div className="text-danger small mt-1">{errors.folders}</div>}
            </div>

            {/* Summary */}
            <div className="mb-3">
                <label className="form-label fw-bold">
                    Summary<span className="text-danger">*</span>
                </label>
                <input
                    type="text"
                    className={`form-control ${errors.summary ? "is-invalid" : ""}`}
                    placeholder="Enter a one line summary, 100 characters or less"
                    maxLength={100}
                    value={summary}
                    onChange={(e) => {
                        setSummary(e.target.value);
                        if (errors.summary) setErrors((prev) => ({ ...prev, summary: undefined }));
                    }}
                />
                {errors.summary && <div className="invalid-feedback">{errors.summary}</div>}
                <small className="text-muted">{summary.length}/100</small>
            </div>

            {/* Details - Rich Text Editor */}
            <div className="mb-3">
                <label className="form-label fw-bold">
                    Details<span className="text-danger">*</span>
                </label>
                <div className="d-flex align-items-center gap-2 mb-1">
                    <small className="text-muted">
                        <span className="fw-bold text-dark">● Rich text editor</span>
                    </small>
                </div>
                <RichTextEditor
                    value={details}
                    onChange={(val) => {
                        setDetails(val);
                        if (errors.details) setErrors((prev) => ({ ...prev, details: undefined }));
                    }}
                    placeholder="Provide details for your question or note..."
                />
                {errors.details && <div className="text-danger small mt-1">{errors.details}</div>}
            </div>

            {/* Buttons */}
            <div className="d-flex gap-2 mt-4">
                <button className="btn btn-primary fw-bold" onClick={handleSubmit}>
                    Post My {postType} to {courseId}
                </button>
                <button className="btn btn-secondary" onClick={onCancel}>
                    Cancel
                </button>
            </div>
            <small className="text-muted d-block mt-1">* Required fields</small>
        </div>
    );
}