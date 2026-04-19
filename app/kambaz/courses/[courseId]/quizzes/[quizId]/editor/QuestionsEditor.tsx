"use client";
import { useState, useEffect, useCallback } from "react";
import * as quizClient from "../../client";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import FillInBlankEditor from "./FillInBlankEditor";
import { FaPlus, FaTrash, FaPencilAlt } from "react-icons/fa";

export default function QuizQuestionsEditor({
                                                quizId,
                                                onPointsChange,
                                            }: {
    quizId: string;
    onPointsChange: (pts: number) => void;
}) {
    const [questions, setQuestions] = useState<any[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);

    const fetchQuestions = useCallback(async () => {
        const data = await quizClient.findQuestionsForQuiz(quizId);
        setQuestions(data);
        const pts = data.reduce((sum: number, q: any) => sum + (q.points || 0), 0);
        onPointsChange(pts);
    }, [quizId, onPointsChange]);

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    const handleAddQuestion = async () => {
        const newQ = await quizClient.createQuestion(quizId, {
            title: "New Question",
            type: "MULTIPLE_CHOICE",
            points: 1,
            question: "",
            choices: [
                { text: "Option 1", isCorrect: true },
                { text: "Option 2", isCorrect: false },
            ],
        });
        setQuestions([...questions, newQ]);
        setEditingId(newQ._id);
        onPointsChange(questions.reduce((s: number, q: any) => s + (q.points || 0), 0) + 1);
    };

    const handleDeleteQuestion = async (questionId: string) => {
        await quizClient.deleteQuestion(questionId);
        fetchQuestions();
    };

    const handleSaveQuestion = async (questionId: string, updates: any) => {
        await quizClient.updateQuestion(questionId, updates);
        setEditingId(null);
        fetchQuestions();
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        fetchQuestions();
    };

    const handleTypeChange = (questionId: string, newType: string) => {
        setQuestions(
            questions.map((q) => {
                if (q._id !== questionId) return q;
                const base = { ...q, type: newType };
                if (newType === "MULTIPLE_CHOICE") {
                    base.choices = [
                        { text: "Option 1", isCorrect: true },
                        { text: "Option 2", isCorrect: false },
                    ];
                } else if (newType === "TRUE_FALSE") {
                    base.correctAnswer = true;
                } else if (newType === "FILL_IN_BLANK") {
                    base.blanks = [{ text: "" }];
                }
                return base;
            })
        );
    };

    return (
        <div>
            {questions.length === 0 && (
                <p className="text-muted">No questions yet. Click + New Question to add one.</p>
            )}

            {questions.map((q: any, index: number) => (
                <div key={q._id} className="card mb-3">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                            <span className="fw-bold">Question {index + 1}</span>
                            {editingId === q._id && (
                                <>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        style={{ width: "150px" }}
                                        value={q.title}
                                        onChange={(e) =>
                                            setQuestions(
                                                questions.map((qq) =>
                                                    qq._id === q._id ? { ...qq, title: e.target.value } : qq
                                                )
                                            )
                                        }
                                    />
                                    <select
                                        className="form-select form-select-sm"
                                        style={{ width: "160px" }}
                                        value={q.type}
                                        onChange={(e) => handleTypeChange(q._id, e.target.value)}
                                    >
                                        <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                                        <option value="TRUE_FALSE">True/False</option>
                                        <option value="FILL_IN_BLANK">Fill in the Blank</option>
                                    </select>
                                </>
                            )}
                            {editingId !== q._id && (
                                <span className="text-muted">
                                    {q.title} — {q.type.replace(/_/g, " ")}
                                </span>
                            )}
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <span>pts: {q.points}</span>
                            {editingId !== q._id && (
                                <FaPencilAlt
                                    className="text-primary"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setEditingId(q._id)}
                                />
                            )}
                            <FaTrash
                                className="text-danger"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleDeleteQuestion(q._id)}
                            />
                        </div>
                    </div>

                    {editingId === q._id && (
                        <div className="card-body">
                            <div className="mb-3 d-flex align-items-center gap-2">
                                <label className="form-label mb-0">Points</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    style={{ width: "80px" }}
                                    value={q.points}
                                    onChange={(e) =>
                                        setQuestions(
                                            questions.map((qq) =>
                                                qq._id === q._id
                                                    ? { ...qq, points: parseInt(e.target.value) || 0 }
                                                    : qq
                                            )
                                        )
                                    }
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Question</label>
                                <textarea
                                    className="form-control"
                                    rows={3}
                                    value={q.question || ""}
                                    onChange={(e) =>
                                        setQuestions(
                                            questions.map((qq) =>
                                                qq._id === q._id ? { ...qq, question: e.target.value } : qq
                                            )
                                        )
                                    }
                                />
                            </div>

                            {q.type === "MULTIPLE_CHOICE" && (
                                <MultipleChoiceEditor
                                    question={q}
                                    onChange={(updated: any) =>
                                        setQuestions(
                                            questions.map((qq) => (qq._id === q._id ? updated : qq))
                                        )
                                    }
                                />
                            )}
                            {q.type === "TRUE_FALSE" && (
                                <TrueFalseEditor
                                    question={q}
                                    onChange={(updated: any) =>
                                        setQuestions(
                                            questions.map((qq) => (qq._id === q._id ? updated : qq))
                                        )
                                    }
                                />
                            )}
                            {q.type === "FILL_IN_BLANK" && (
                                <FillInBlankEditor
                                    question={q}
                                    onChange={(updated: any) =>
                                        setQuestions(
                                            questions.map((qq) => (qq._id === q._id ? updated : qq))
                                        )
                                    }
                                />
                            )}

                            <div className="d-flex gap-2 mt-3">
                                <button className="btn btn-secondary btn-sm" onClick={handleCancelEdit}>
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleSaveQuestion(q._id, q)}
                                >
                                    Update Question
                                </button>
                            </div>
                        </div>
                    )}

                    {editingId !== q._id && (
                        <div className="card-body">
                            <p>{q.question || <span className="text-muted">No question text</span>}</p>
                        </div>
                    )}
                </div>
            ))}

            <div className="text-center">
                <button className="btn btn-outline-secondary" onClick={handleAddQuestion}>
                    <FaPlus className="me-1" /> New Question
                </button>
            </div>
        </div>
    );
}