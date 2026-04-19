"use client";
import { useState } from "react";

export default function QuizTaker({
                                      questions,
                                      oneAtATime,
                                      onSubmit,
                                      existingAnswers,
                                  }: {
    questions: any[];
    oneAtATime: boolean;
    onSubmit: (answers: any[]) => void;
    existingAnswers?: any[];
}) {
    const [answers, setAnswers] = useState<Record<string, any>>(
        existingAnswers
            ? existingAnswers.reduce((acc: any, a: any) => ({ ...acc, [a.question]: a.answer }), {})
            : {}
    );
    const [currentIndex, setCurrentIndex] = useState(0);

    const setAnswer = (questionId: string, answer: any) => {
        setAnswers({ ...answers, [questionId]: answer });
    };

    const handleSubmit = () => {
        const formatted = questions.map((q) => ({
            question: q._id,
            answer: answers[q._id] ?? null,
        }));
        onSubmit(formatted);
    };

    const renderQuestion = (q: any, index: number) => (
        <div key={q._id} className="card mb-3">
            <div className="card-header d-flex justify-content-between">
                <span className="fw-bold">Question {index + 1}</span>
                <span>{q.points} pts</span>
            </div>
            <div className="card-body">
                <p>{q.question}</p>

                {q.type === "MULTIPLE_CHOICE" && (
                    <div>
                        {(q.choices || []).map((choice: any, ci: number) => (
                            <div key={ci} className="form-check mb-2">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name={`q-${q._id}`}
                                    id={`q-${q._id}-${ci}`}
                                    checked={answers[q._id] === choice.text}
                                    onChange={() => setAnswer(q._id, choice.text)}
                                />
                                <label className="form-check-label" htmlFor={`q-${q._id}-${ci}`}>
                                    {choice.text}
                                </label>
                            </div>
                        ))}
                    </div>
                )}

                {q.type === "TRUE_FALSE" && (
                    <div>
                        <div className="form-check mb-2">
                            <input
                                type="radio"
                                className="form-check-input"
                                name={`q-${q._id}`}
                                id={`q-${q._id}-true`}
                                checked={answers[q._id] === true}
                                onChange={() => setAnswer(q._id, true)}
                            />
                            <label className="form-check-label" htmlFor={`q-${q._id}-true`}>
                                True
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                name={`q-${q._id}`}
                                id={`q-${q._id}-false`}
                                checked={answers[q._id] === false}
                                onChange={() => setAnswer(q._id, false)}
                            />
                            <label className="form-check-label" htmlFor={`q-${q._id}-false`}>
                                False
                            </label>
                        </div>
                    </div>
                )}

                {q.type === "FILL_IN_BLANK" && (
                    <div>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Type your answer here"
                            value={answers[q._id] || ""}
                            onChange={(e) => setAnswer(q._id, e.target.value)}
                        />
                    </div>
                )}
            </div>
        </div>
    );

    if (oneAtATime) {
        const q = questions[currentIndex];
        if (!q) return <p>No questions in this quiz.</p>;
        return (
            <div>
                {renderQuestion(q, currentIndex)}
                <div className="d-flex justify-content-between mt-3">
                    <button
                        className="btn btn-secondary"
                        disabled={currentIndex === 0}
                        onClick={() => setCurrentIndex(currentIndex - 1)}
                    >
                        Previous
                    </button>
                    {currentIndex < questions.length - 1 ? (
                        <button
                            className="btn btn-primary"
                            onClick={() => setCurrentIndex(currentIndex + 1)}
                        >
                            Next
                        </button>
                    ) : (
                        <button className="btn btn-danger" onClick={handleSubmit}>
                            Submit Quiz
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div>
            {questions.length === 0 && <p>No questions in this quiz.</p>}
            {questions.map((q, i) => renderQuestion(q, i))}
            {questions.length > 0 && (
                <div className="text-end mt-3">
                    <button className="btn btn-danger" onClick={handleSubmit}>
                        Submit Quiz
                    </button>
                </div>
            )}
        </div>
    );
}