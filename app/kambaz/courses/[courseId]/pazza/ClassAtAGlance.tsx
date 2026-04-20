"use client";
import { useState, useEffect } from "react";
import * as pazzaClient from "./client";

interface ClassAtAGlanceProps {
    courseId: string;
    enrolledCount: number;
}

export default function ClassAtAGlance({ courseId, enrolledCount }: ClassAtAGlanceProps) {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await pazzaClient.getCourseStats(courseId);
                setStats(data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchStats();
    }, [courseId]);

    if (!stats) return <div className="p-4 text-muted">Loading...</div>;

    return (
        <div className="p-4">
            <h4 className="mb-3">
                <span className="me-2">📋</span>
                Class at a Glance
            </h4>
            <hr />
            <div className="mb-3">
                <div className="d-flex align-items-center gap-2 mb-1">
                    <span className="text-success">✅</span>
                    <span>no unread posts</span>
                </div>
                {stats.unansweredPosts === 0 ? (
                    <div className="d-flex align-items-center gap-2 mb-1">
                        <span className="text-success">✅</span>
                        <span>no unanswered posts</span>
                    </div>
                ) : (
                    <div className="d-flex align-items-center gap-2 mb-1">
                        <span className="text-danger">❌</span>
                        <span>{stats.unansweredPosts} unanswered post{stats.unansweredPosts > 1 ? "s" : ""}</span>
                    </div>
                )}
            </div>
            <table className="table table-sm w-auto">
                <tbody>
                <tr>
                    <td className="text-end pe-3 fw-bold">{stats.totalPosts}</td>
                    <td>total posts</td>
                </tr>
                <tr>
                    <td className="text-end pe-3 fw-bold">{stats.instructorResponses}</td>
                    <td>instructors&apos; responses</td>
                </tr>
                <tr>
                    <td className="text-end pe-3 fw-bold">{stats.studentResponses}</td>
                    <td>students&apos; responses</td>
                </tr>
                <tr>
                    <td className="text-end pe-3 fw-bold">{enrolledCount}</td>
                    <td>students enrolled</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}