"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import * as quizClient from "../client";

export default function QuizDetailsPage() {
    const { courseId, quizId } = useParams();
    const router = useRouter();
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const isFaculty = currentUser?.role === "FACULTY";
    const [quiz, setQuiz] = useState<any>(null);
    const [questionCount, setQuestionCount] = useState(0);

    useEffect(() => {
        const fetch = async () => {
            const q = await quizClient.findQuizById(quizId as string);
            setQuiz(q);
            const questions = await quizClient.findQuestionsForQuiz(quizId as string);
            setQuestionCount(questions.length);
        };
        fetch();
    }, [quizId]);

    if (!quiz) return <div className="p-3">Loading...</div>;

    const rows = [
        ["Quiz Type", quiz.quizType],
        ["Points", quiz.points],
        ["Assignment Group", quiz.assignmentGroup],
        ["Shuffle Answers", quiz.shuffleAnswers ? "Yes" : "No"],
        ["Time Limit", `${quiz.timeLimit} Minutes`],
        ["Multiple Attempts", quiz.multipleAttempts ? "Yes" : "No"],
        ...(quiz.multipleAttempts ? [["How Many Attempts", quiz.howManyAttempts]] : []),
        ["Show Correct Answers", quiz.showCorrectAnswers],
        ["Access Code", quiz.accessCode || "None"],
        ["One Question at a Time", quiz.oneQuestionAtATime ? "Yes" : "No"],
        ["Webcam Required", quiz.webcamRequired ? "Yes" : "No"],
        ["Lock Questions After Answering", quiz.lockQuestionsAfterAnswering ? "Yes" : "No"],
        ["Number of Questions", questionCount],
    ];

    return (
        <div className="p-3">
            {isFaculty && (
                <div className="d-flex justify-content-center mb-3 gap-2">
                    <button
                        className="btn btn-secondary"
                        onClick={() => router.push(`/kambaz/courses/${courseId}/quizzes/${quizId}/preview`)}
                    >
                        Preview
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => router.push(`/kambaz/courses/${courseId}/quizzes/${quizId}/editor`)}
                    >
                        Edit
                    </button>
                </div>
            )}

            <h3>{quiz.title}</h3>
            <hr />

            <table className="table">
                <tbody>
                {rows.map(([label, value]: any, i: number) => (
                    <tr key={i}>
                        <td className="text-end fw-bold" style={{ width: "40%" }}>
                            {label}
                        </td>
                        <td>{String(value)}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <table className="table mt-3">
                <thead>
                <tr>
                    <th>Due</th>
                    <th>Available From</th>
                    <th>Until</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{quiz.dueDate ? new Date(quiz.dueDate).toLocaleDateString() : "—"}</td>
                    <td>{quiz.availableDate ? new Date(quiz.availableDate).toLocaleDateString() : "—"}</td>
                    <td>{quiz.untilDate ? new Date(quiz.untilDate).toLocaleDateString() : "—"}</td>
                </tr>
                </tbody>
            </table>

            {!isFaculty && (
                <div className="text-center mt-4">
                    <button
                        className="btn btn-danger btn-lg"
                        onClick={() => router.push(`/kambaz/courses/${courseId}/quizzes/${quizId}/take`)}
                    >
                        Start Quiz
                    </button>
                </div>
            )}
        </div>
    );
}