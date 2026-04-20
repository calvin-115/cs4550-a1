"use client";
import { useState } from "react";
import * as pazzaClient from "./client";

interface ManageFoldersProps {
    courseId: string;
    folders: any[];
    onFoldersChange: () => void;
}

export default function ManageFolders({ courseId, folders, onFoldersChange }: ManageFoldersProps) {
    const [newFolderName, setNewFolderName] = useState("");
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState("");

    const handleAddFolder = async () => {
        if (!newFolderName.trim()) return;
        try {
            await pazzaClient.createFolder(courseId, { name: newFolderName.trim() });
            setNewFolderName("");
            onFoldersChange();
        } catch (e) {
            console.error(e);
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleDeleteSelected = async () => {
        if (selectedIds.length === 0) return;
        if (!confirm(`Delete ${selectedIds.length} selected folder(s)?`)) return;
        try {
            for (const id of selectedIds) {
                await pazzaClient.deleteFolder(id);
            }
            setSelectedIds([]);
            onFoldersChange();
        } catch (e) {
            console.error(e);
        }
    };

    const handleStartEdit = (folder: any) => {
        setEditingId(folder._id);
        setEditName(folder.name);
    };

    const handleSaveEdit = async () => {
        if (!editName.trim() || !editingId) return;
        try {
            await pazzaClient.updateFolder(editingId, { name: editName.trim() });
            setEditingId(null);
            setEditName("");
            onFoldersChange();
        } catch (e) {
            console.error(e);
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditName("");
    };

    return (
        <div className="p-4" style={{ maxWidth: 700 }}>
            {/* Manage Class Tabs */}
            <div className="d-flex gap-1 mb-4 flex-wrap">
                {["General Settings", "Customize Q&A", "Manage Folders", "Manage Enrollment", "Create Groups", "Customize Course Page", "Pazza Network Settings"].map((tab) => (
                    <button
                        key={tab}
                        className={`btn btn-sm ${tab === "Manage Folders" ? "btn-dark text-white" : "btn-outline-secondary"}`}
                        disabled={tab !== "Manage Folders"}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <h5 className="fw-bold mb-1">Configure Class Folders</h5>
            <p className="text-muted small mb-4">
                Folders allow you to keep class content organized. When students and instructors add a new post, they will be required to specify at least one folder for their post.
            </p>

            {/* Add new folder */}
            <div className="mb-4">
                <label className="form-label fw-bold small">Create new folders:</label>
                <div className="d-flex gap-2">
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Add a folder(s)"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") handleAddFolder(); }}
                    />
                    <button className="btn btn-sm btn-primary text-nowrap" onClick={handleAddFolder}>
                        Add Folder
                    </button>
                </div>
            </div>

            {/* Manage existing folders */}
            <div className="mb-3">
                <label className="form-label fw-bold small">Manage folders:</label>
                <p className="text-muted small">
                    Reorder, delete, edit folder names. Manually sort folders and subfolders using burger icon.
                </p>
            </div>

            {selectedIds.length > 0 && (
                <button className="btn btn-sm btn-danger mb-2" onClick={handleDeleteSelected}>
                    Delete selected folders ({selectedIds.length})
                </button>
            )}

            <div className="border rounded">
                {folders.map((folder: any) => (
                    <div
                        key={folder._id}
                        className={`d-flex align-items-center gap-2 px-3 py-2 border-bottom ${selectedIds.includes(folder._id) ? "bg-warning bg-opacity-10" : ""}`}
                    >
                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={selectedIds.includes(folder._id)}
                            onChange={() => toggleSelect(folder._id)}
                        />

                        {editingId === folder._id ? (
                            <div className="d-flex align-items-center gap-2 flex-fill">
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === "Enter") handleSaveEdit(); }}
                                    autoFocus
                                />
                                <button className="btn btn-sm btn-success" onClick={handleSaveEdit}>Save</button>
                                <button className="btn btn-sm btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        ) : (
                            <div className="d-flex align-items-center gap-2 flex-fill">
                                <span className="badge bg-secondary">{folder.name}</span>
                                <div className="ms-auto">
                                    <button className="btn btn-sm btn-link text-primary p-0" onClick={() => handleStartEdit(folder)}>
                                        ✏️ Edit
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                {folders.length === 0 && (
                    <div className="text-center text-muted py-3 small">No folders yet. Add one above.</div>
                )}
            </div>
        </div>
    );
}