"use client";
import { FaTrash, FaPlus } from "react-icons/fa";

export default function MultipleChoiceEditor({
                                                 question,
                                                 onChange,
                                             }: {
    question: any;
    onChange: (q: any) => void;
}) {
    const choices = question.choices || [];

    const updateChoice = (index: number, field: string, value: any) => {
        const updated = choices.map((c: any, i: number) =>
            i === index ? { ...c, [field]: value } : field === "isCorrect" && value ? { ...c, isCorrect: false } : c
        );
        onChange({ ...question, choices: updated });
    };

    const addChoice = () => {
        onChange({
            ...question,
            choices: [...choices, { text: "", isCorrect: false }],
        });
    };

    const removeChoice = (index: number) => {
        onChange({
            ...question,
            choices: choices.filter((_: any, i: number) => i !== index),
        });
    };

    return (
        <div>
            <label className="form-label fw-bold">Answers</label>
            {choices.map((choice: any, index: number) => (
                <div key={index} className="d-flex align-items-center mb-2 gap-2">
                    <input
                        type="radio"
                        name={`correct-${question._id}`}
                        checked={choice.isCorrect}
                        onChange={() => updateChoice(index, "isCorrect", true)}
                        className="form-check-input"
                    />
                    <span className={`small ${choice.isCorrect ? "text-success fw-bold" : "text-muted"}`}>
                        {choice.isCorrect ? "Correct Answer" : "Possible Answer"}
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        value={choice.text}
                        onChange={(e) => updateChoice(index, "text", e.target.value)}
                    />
                    <FaTrash
                        className="text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => removeChoice(index)}
                    />
                </div>
            ))}
            <button className="btn btn-link btn-sm text-decoration-none" onClick={addChoice}>
                <FaPlus className="me-1" /> Add Another Answer
            </button>
        </div>
    );
}