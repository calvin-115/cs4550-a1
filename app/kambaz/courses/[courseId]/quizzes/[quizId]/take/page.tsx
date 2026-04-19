"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import * as quizClient from "../../client";
import QuizTaker from "../QuizTaker";

export default function TakeQuizPage() {
    const { courseId, quizId } = useParams();
    const router = useRouter();
    const [quiz, setQuiz] = useState<any>(null);
    const [questions, setQuestions] = useState<any[]>([]);
    const [latestAttempt, setLatestAttempt] = useState<any>(null);
    const [attemptCount, setAttemptCount] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [accessInput, setAccessInput] = useState("");
    const [accessGranted, setAccessGranted] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const q = await quizClient.findQuizById(quizId as string);
            setQuiz(q);
            const qs = await quizClient.findQuestionsForQuiz(quizId as string);
            setQuestions(qs);
            const attempts = await quizClient.findAttemptsForQuiz(quizId as string);
            setAttemptCount(attempts.length);
            if (attempts.length > 0) {
                setLatestAttempt(attempts[0]);
            }
            if (!q.accessCode) {
                setAccessGranted(true);
            }
            setLoading(false);
        };
        fetchData();
    }, [quizId]);

    const handleSubmit = async (answers: any[]) => {
        const attempt = await quizClient.submitAttempt(quizId as string, answers);
        setResult(attempt);
        setSubmitted(true);
    };

    const handleAccessCode = () => {
        if (accessInput === quiz.accessCode) {
            setAccessGranted(true);
        } else {
            alert("Incorrect access code.");
        }
    };

    if (loading) {
        return <div className="p-3">Loading...</div>;
    }

    if (!quiz) {
        return <div className="p-3">Quiz not found.</div>;
    }

    const maxAttempts = quiz.multipleAttempts ? quiz.howManyAttempts : 1;
    const canTake = attemptCount < maxAttempts;
    const totalPoints = questions.reduce((sum: number, q: any) => sum + (q.points || 0), 0);

    const renderResults = (answers: any[], score: number, attemptNum?: number) => (
        <div>
            <div className="alert alert-success">
                <h5>Score: {score} / {totalPoints}</h5>
                {attemptNum && <p>Attempt {attemptNum} of {maxAttempts}</p>}
            </div>
            {questions.map((q: any, i: number) => {
                const userAnswer = answers.find((a: any) => a.question === q._id);
                let isCorrect = false;
                if (q.type === "MULTIPLE_CHOICE") {
                    const correct = q.choices.find((c: any) => c.isCorrect);
                    isCorrect = correct && userAnswer?.answer === correct.text;
                } else if (q.type === "TRUE_FALSE") {
                    isCorrect = userAnswer?.answer === q.correctAnswer;
                } else if (q.type === "FILL_IN_BLANK") {
                    isCorrect = q.blanks.some(
                        (b: any) =>
                            b.text.toLowerCase().trim() ===
                            String(userAnswer?.answer || "").toLowerCase().trim()
                    );
                }
                return (
                    <div
                        key={q._id}
                        className={`card mb-3 ${isCorrect ? "border-success" : "border-danger"}`}
                    >
                        <div className="card-header d-flex justify-content-between">
                            <span>Question {i + 1}: {q.title}</span>
                            <span>{q.points} pts {isCorrect ? "✅" : "❌"}</span>
                        </div>
                        <div className="card-body">
                            <p>{q.question}</p>
                            <p>
                                Your answer:{" "}
                                <strong>{String(userAnswer?.answer ?? "No answer")}</strong>
                            </p>
                        </div>
                    </div>
                );
            })}
            <button
                className="btn btn-secondary"
                onClick={() => router.push(`/kambaz/courses/${courseId}/quizzes`)}
            >
                Back to Quizzes
            </button>
        </div>
    );

    if (!accessGranted) {
        return (
            <div className="p-3">
                <h3>{quiz.title}</h3>
                <div className="card p-4" style={{ maxWidth: "400px" }}>
                    <label className="form-label fw-bold">Enter Access Code</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        value={accessInput}
                        onChange={(e) => setAccessInput(e.target.value)}
                    />
                    <button className="btn btn-danger" onClick={handleAccessCode}>
                        Submit
                    </button>
                </div>
            </div>
        );
    }

    if (submitted && result) {
        return (
            <div className="p-3">
                <h3>{quiz.title} — Results</h3>
                {renderResults(result.answers, result.score, result.attemptNumber)}
            </div>
        );
    }

    if (!canTake && latestAttempt) {
        return (
            <div className="p-3">
                <h3>{quiz.title} — Last Attempt Results</h3>
                <div className="alert alert-warning">
                    You have used all {maxAttempts} attempt(s).
                </div>
                {renderResults(latestAttempt.answers, latestAttempt.score)}
            </div>
        );
    }

    return (
        <div className="p-3">
            <h3>{quiz.title}</h3>
            {quiz.description && <p>{quiz.description}</p>}
            <p className="text-muted">
                Attempt {attemptCount + 1} of {maxAttempts}
                {quiz.timeLimit > 0 && ` | Time Limit: ${quiz.timeLimit} minutes`}
            </p>
            <hr />
            <QuizTaker
                questions={questions}
                oneAtATime={quiz.oneQuestionAtATime}
                onSubmit={handleSubmit}
            />
        </div>
    );
}