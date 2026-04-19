"use client";

export default function TrueFalseEditor({
                                            question,
                                            onChange,
                                        }: {
    question: any;
    onChange: (q: any) => void;
}) {
    return (
        <div>
            <label className="form-label fw-bold">Answers</label>
            <div className="form-check mb-2">
                <input
                    type="radio"
                    className="form-check-input"
                    name={`tf-${question._id}`}
                    id={`true-${question._id}`}
                    checked={question.correctAnswer === true}
                    onChange={() => onChange({ ...question, correctAnswer: true })}
                />
                <label className={`form-check-label ${question.correctAnswer === true ? "text-success fw-bold" : ""}`} htmlFor={`true-${question._id}`}>
                    True
                </label>
            </div>
            <div className="form-check">
                <input
                    type="radio"
                    className="form-check-input"
                    name={`tf-${question._id}`}
                    id={`false-${question._id}`}
                    checked={question.correctAnswer === false}
                    onChange={() => onChange({ ...question, correctAnswer: false })}
                />
                <label className={`form-check-label ${question.correctAnswer === false ? "text-success fw-bold" : ""}`} htmlFor={`false-${question._id}`}>
                    False
                </label>
            </div>
        </div>
    );
}