"use client";

interface FolderFiltersProps {
    folders: any[];
    selectedFolder: string | null;
    onSelectFolder: (folder: string | null) => void;
}

export default function FolderFilters({ folders, selectedFolder, onSelectFolder }: FolderFiltersProps) {
    return (
        <div className="d-flex flex-wrap align-items-center gap-1 px-3 py-2 bg-light border-bottom"
             style={{ position: "sticky", top: 46, zIndex: 99 }}>
            {folders.map((f: any) => (
                <button
                    key={f._id}
                    className={`btn btn-sm ${selectedFolder === f.name ? "btn-primary" : "btn-outline-secondary"}`}
                    onClick={() => onSelectFolder(selectedFolder === f.name ? null : f.name)}
                >
                    {f.name}
                </button>
            ))}
        </div>
    );
}