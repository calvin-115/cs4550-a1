"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import * as quizClient from "../../client";
import QuizTaker from "../QuizTaker";

export default function QuizPreviewPage() {
    const { courseId, quizId } = useParams();
    const router = useRouter();
    const [quiz, setQuiz] = useState<any>(null);
    const [questions, setQuestions] = useState<any[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState<any[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const q = await quizClient.findQuizById(quizId as string);
            setQuiz(q);
            const qs = await quizClient.findQuestionsForQuiz(quizId as string);
            setQuestions(qs);
        };
        fetch();
    }, [quizId]);

    const handleSubmit = (userAnswers: any[]) => {
        let s = 0;
        for (const a of userAnswers) {
            const q = questions.find((q) => q._id === a.question);
            if (!q) continue;
            if (q.type === "MULTIPLE_CHOICE") {
                const correct = q.choices.find((c: any) => c.isCorrect);
                if (correct && a.answer === correct.text) s += q.points;
            } else if (q.type === "TRUE_FALSE") {
                if (a.answer === q.correctAnswer) s += q.points;
            } else if (q.type === "FILL_IN_BLANK") {
                const match = q.blanks.some(
                    (b: any) => b.text.toLowerCase().trim() === String(a.answer).toLowerCase().trim()
                );
                if (match) s += q.points;
            }
        }
        setAnswers(userAnswers);
        setScore(s);
        setSubmitted(true);
    };

    if (!quiz) return <div className="p-3">Loading...</div>;

    const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

    return (
        <div className="p-3">
            <div className="alert alert-info">
                This is a preview of the published version of the quiz.
            </div>
            <h3>{quiz.title}</h3>
            {quiz.description && <p>{quiz.description}</p>}

            {!submitted ? (
                <QuizTaker
                    questions={questions}
                    oneAtATime={quiz.oneQuestionAtATime}
                    onSubmit={handleSubmit}
                />
            ) : (
                <div>
                    <div className="alert alert-success">
                        <h5>Score: {score} / {totalPoints}</h5>
                    </div>
                    {questions.map((q, i) => {
                        const userAnswer = answers.find((a) => a.question === q._id);
                        let isCorrect = false;
                        if (q.type === "MULTIPLE_CHOICE") {
                            const correct = q.choices.find((c: any) => c.isCorrect);
                            isCorrect = correct && userAnswer?.answer === correct.text;
                        } else if (q.type === "TRUE_FALSE") {
                            isCorrect = userAnswer?.answer === q.correctAnswer;
                        } else if (q.type === "FILL_IN_BLANK") {
                            isCorrect = q.blanks.some(
                                (b: any) => b.text.toLowerCase().trim() === String(userAnswer?.answer || "").toLowerCase().trim()
                            );
                        }
                        return (
                            <div key={q._id} className={`card mb-3 border-${isCorrect ? "success" : "danger"}`}>
                                <div className="card-header d-flex justify-content-between">
                                    <span>Question {i + 1}: {q.title}</span>
                                    <span>{q.points} pts — {isCorrect ? "✅" : "❌"}</span>
                                </div>
                                <div className="card-body">
                                    <p>{q.question}</p>
                                    <p>Your answer: <strong>{String(userAnswer?.answer ?? "No answer")}</strong></p>
                                </div>
                            </div>
                        );
                    })}
                    <button
                        className="btn btn-secondary me-2"
                        onClick={() => { setSubmitted(false); setAnswers([]); }}
                    >
                        Retake
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => router.push(`/kambaz/courses/${courseId}/quizzes/${quizId}/editor`)}
                    >
                        Keep Editing This Quiz
                    </button>
                </div>
            )}
        </div>
    );
}