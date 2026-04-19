"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import * as quizClient from "../../client";
import QuizDetailsEditor from "./DetailsEditor";
import QuizQuestionsEditor from "./QuestionsEditor";

export default function QuizEditorPage() {
    const { courseId, quizId } = useParams();
    const router = useRouter();
    const [quiz, setQuiz] = useState<any>(null);
    const [activeTab, setActiveTab] = useState("details");
    const [totalPoints, setTotalPoints] = useState(0);

    useEffect(() => {
        const fetch = async () => {
            const q = await quizClient.findQuizById(quizId as string);
            setQuiz(q);
            const questions = await quizClient.findQuestionsForQuiz(quizId as string);
            const pts = questions.reduce((sum: number, q: any) => sum + (q.points || 0), 0);
            setTotalPoints(pts);
        };
        fetch();
    }, [quizId]);

    const handleSave = async () => {
        await quizClient.updateQuiz(quizId as string, { ...quiz, points: totalPoints });
        router.push(`/kambaz/courses/${courseId}/quizzes/${quizId}`);
    };

    const handleSaveAndPublish = async () => {
        await quizClient.updateQuiz(quizId as string, { ...quiz, points: totalPoints, published: true });
        router.push(`/kambaz/courses/${courseId}/quizzes`);
    };

    const handleCancel = () => {
        router.push(`/kambaz/courses/${courseId}/quizzes`);
    };

    if (!quiz) return <div className="p-3">Loading...</div>;

    return (
        <div className="p-3">
            <div className="d-flex justify-content-end align-items-center mb-3">
                <span className="me-3">Points {totalPoints}</span>
                <span className={quiz.published ? "text-success" : "text-secondary"}>
                    {quiz.published ? "Published" : "Not Published"}
                </span>
            </div>
            <ul className="nav nav-tabs mb-3">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "details" ? "active" : ""}`}
                        onClick={() => setActiveTab("details")}
                    >
                        Details
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "questions" ? "active" : ""}`}
                        onClick={() => setActiveTab("questions")}
                    >
                        Questions
                    </button>
                </li>
            </ul>

            {activeTab === "details" && (
                <QuizDetailsEditor quiz={quiz} setQuiz={setQuiz} />
            )}
            {activeTab === "questions" && (
                <QuizQuestionsEditor
                    quizId={quizId as string}
                    onPointsChange={setTotalPoints}
                />
            )}

            <hr />
            <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-secondary" onClick={handleCancel}>
                    Cancel
                </button>
                <button className="btn btn-danger" onClick={handleSaveAndPublish}>
                    Save & Publish
                </button>
                <button className="btn btn-success" onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    );
}