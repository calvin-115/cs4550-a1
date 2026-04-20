"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/kambaz/store";

interface PazzaNavBarProps {
    courseId: string;
    courseName: string;
    activeTab: string;
    onTabChange: (tab: string) => void;
    userRole: string;
}

export default function PazzaNavBar({ courseId, courseName, activeTab, onTabChange, userRole }: PazzaNavBarProps) {
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const tabs = [
        { id: "qa", label: "Q & A" },
        { id: "resources", label: "Resources", disabled: true },
        { id: "statistics", label: "Statistics", disabled: true },
    ];
    if (userRole === "FACULTY") {
        tabs.push({ id: "manage", label: "Manage Class", disabled: false });
    }

    return (
        <div className="bg-dark text-white px-3 py-2 d-flex align-items-center justify-content-between"
             style={{ position: "sticky", top: 0, zIndex: 100 }}>
            <div className="d-flex align-items-center gap-3">
                <span className="fw-bold fs-5" style={{ fontFamily: "monospace", letterSpacing: "1px" }}>pazza</span>
                <span className="text-light opacity-75">{courseName}</span>
            </div>
            <div className="d-flex align-items-center gap-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`btn btn-sm ${activeTab === tab.id ? "btn-light text-dark fw-bold" : "btn-outline-light border-0"}`}
                        onClick={() => !tab.disabled && onTabChange(tab.id)}
                        disabled={tab.disabled}
                        style={{ opacity: tab.disabled ? 0.5 : 1 }}
                    >
                        {tab.label}
                    </button>
                ))}
                <span className="ms-3 d-flex align-items-center gap-1">
                    <span className="badge bg-secondary rounded-circle" style={{ width: 24, height: 24, lineHeight: "16px", fontSize: 11 }}>
                        {currentUser?.firstName?.[0]}
                    </span>
                    <span className="small">{currentUser?.firstName} {currentUser?.lastName}</span>
                </span>
            </div>
        </div>
    );
}