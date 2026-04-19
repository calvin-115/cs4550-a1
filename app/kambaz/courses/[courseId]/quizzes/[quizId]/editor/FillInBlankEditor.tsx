"use client";
import { FaTrash, FaPlus } from "react-icons/fa";

export default function FillInBlankEditor({
                                              question,
                                              onChange,
                                          }: {
    question: any;
    onChange: (q: any) => void;
}) {
    const blanks = question.blanks || [];

    const updateBlank = (index: number, text: string) => {
        const updated = blanks.map((b: any, i: number) =>
            i === index ? { ...b, text } : b
        );
        onChange({ ...question, blanks: updated });
    };

    const addBlank = () => {
        onChange({
            ...question,
            blanks: [...blanks, { text: "" }],
        });
    };

    const removeBlank = (index: number) => {
        onChange({
            ...question,
            blanks: blanks.filter((_: any, i: number) => i !== index),
        });
    };

    return (
        <div>
            <label className="form-label fw-bold">Possible Answers</label>
            {blanks.map((blank: any, index: number) => (
                <div key={index} className="d-flex align-items-center mb-2 gap-2">
                    <span className="text-muted small">Possible Answer</span>
                    <input
                        type="text"
                        className="form-control"
                        value={blank.text}
                        onChange={(e) => updateBlank(index, e.target.value)}
                    />
                    <FaTrash
                        className="text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => removeBlank(index)}
                    />
                </div>
            ))}
            <button className="btn btn-link btn-sm text-decoration-none" onClick={addBlank}>
                <FaPlus className="me-1" /> Add Another Answer
            </button>
        </div>
    );
}