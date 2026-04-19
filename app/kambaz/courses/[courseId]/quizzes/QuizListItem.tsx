"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaEllipsisV, FaCheckCircle, FaBan, FaRocket } from "react-icons/fa";
import * as quizClient from "./client";

function getAvailability(quiz: any) {
    const now = new Date();
    const available = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const until = quiz.untilDate ? new Date(quiz.untilDate) : null;
    if (until && now > until) return "Closed";
    if (available && now >= available) return "Available";
    if (available && now < available) {
        return `Not available until ${new Date(quiz.availableDate).toLocaleDateString()}`;
    }
    return "Available";
}

export default function QuizListItem({
                                         quiz,
                                         isFaculty,
                                         courseId,
                                         onDelete,
                                         onTogglePublish,
                                     }: {
    quiz: any;
    isFaculty: boolean;
    courseId: string;
    onDelete: (id: string) => void;
    onTogglePublish: (id: string) => void;
}) {
    const [showMenu, setShowMenu] = useState(false);
    const [questionCount, setQuestionCount] = useState(0);
    const [lastScore, setLastScore] = useState<number | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchMeta = async () => {
            const questions = await quizClient.findQuestionsForQuiz(quiz._id);
            setQuestionCount(questions.length);
            if (!isFaculty) {
                try {
                    const attempt = await quizClient.findLatestAttempt(quiz._id);
                    if (attempt) setLastScore(attempt.score);
                } catch {
                    // no attempt
                }
            }
        };
        fetchMeta();
    }, [quiz._id, isFaculty]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const availability = getAvailability(quiz);

    return (
        <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="d-flex align-items-start">
                <FaRocket className="text-success me-3 mt-1" />
                <div>
                    <Link
                        href={`/kambaz/courses/${courseId}/quizzes/${quiz._id}`}
                        className="fw-bold text-decoration-none text-dark"
                    >
                        {quiz.title}
                    </Link>
                    <div className="text-muted small">
                        <span className="me-3">{availability}</span>
                        {quiz.dueDate && (
                            <span className="me-3">
                                Due {new Date(quiz.dueDate).toLocaleDateString()}
                            </span>
                        )}
                        <span className="me-3">{quiz.points} pts</span>
                        <span className="me-3">{questionCount} Questions</span>
                        {lastScore !== null && (
                            <span className="fw-bold">Score: {lastScore}</span>
                        )}
                    </div>
                </div>
            </div>
            <div className="d-flex align-items-center">
                {isFaculty && (
                    <>
                        <span
                            className="me-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => onTogglePublish(quiz._id)}
                            title={quiz.published ? "Unpublish" : "Publish"}
                        >
                            {quiz.published ? (
                                <FaCheckCircle className="text-success fs-5" />
                            ) : (
                                <FaBan className="text-secondary fs-5" />
                            )}
                        </span>
                        <div className="position-relative" ref={menuRef}>
                            <FaEllipsisV
                                className="text-secondary"
                                style={{ cursor: "pointer" }}
                                onClick={() => setShowMenu(!showMenu)}
                            />
                            {showMenu && (
                                <div
                                    className="dropdown-menu show position-absolute end-0"
                                    style={{ zIndex: 1000 }}
                                >
                                    <Link
                                        href={`/kambaz/courses/${courseId}/quizzes/${quiz._id}/editor`}
                                        className="dropdown-item"
                                        onClick={() => setShowMenu(false)}
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => {
                                            onDelete(quiz._id);
                                            setShowMenu(false);
                                        }}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => {
                                            onTogglePublish(quiz._id);
                                            setShowMenu(false);
                                        }}
                                    >
                                        {quiz.published ? "Unpublish" : "Publish"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </li>
    );
}