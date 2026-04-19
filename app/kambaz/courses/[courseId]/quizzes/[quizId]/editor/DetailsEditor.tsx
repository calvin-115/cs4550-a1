"use client";

export default function QuizDetailsEditor({
                                              quiz,
                                              setQuiz,
                                          }: {
    quiz: any;
    setQuiz: (q: any) => void;
}) {
    const update = (field: string, value: any) => {
        setQuiz({ ...quiz, [field]: value });
    };

    return (
        <div>
            <div className="mb-3">
                <label className="form-label fw-bold">Title</label>
                <input
                    type="text"
                    className="form-control"
                    value={quiz.title || ""}
                    onChange={(e) => update("title", e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label fw-bold">Quiz Instructions</label>
                <textarea
                    className="form-control"
                    rows={4}
                    value={quiz.description || ""}
                    onChange={(e) => update("description", e.target.value)}
                />
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <label className="form-label fw-bold">Quiz Type</label>
                    <select
                        className="form-select"
                        value={quiz.quizType || "Graded Quiz"}
                        onChange={(e) => update("quizType", e.target.value)}
                    >
                        <option>Graded Quiz</option>
                        <option>Practice Quiz</option>
                        <option>Graded Survey</option>
                        <option>Ungraded Survey</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label fw-bold">Assignment Group</label>
                    <select
                        className="form-select"
                        value={quiz.assignmentGroup || "Quizzes"}
                        onChange={(e) => update("assignmentGroup", e.target.value)}
                    >
                        <option>Quizzes</option>
                        <option>Exams</option>
                        <option>Assignments</option>
                        <option>Project</option>
                    </select>
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label fw-bold">Options</label>
                <div className="form-check mb-2">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="shuffleAnswers"
                        checked={quiz.shuffleAnswers ?? true}
                        onChange={(e) => update("shuffleAnswers", e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="shuffleAnswers">
                        Shuffle Answers
                    </label>
                </div>

                <div className="d-flex align-items-center mb-2">
                    <input
                        type="checkbox"
                        className="form-check-input me-2"
                        id="timeLimitCheck"
                        checked={(quiz.timeLimit || 0) > 0}
                        onChange={(e) => update("timeLimit", e.target.checked ? 20 : 0)}
                    />
                    <label className="form-check-label me-2" htmlFor="timeLimitCheck">
                        Time Limit
                    </label>
                    {(quiz.timeLimit || 0) > 0 && (
                        <div className="d-flex align-items-center">
                            <input
                                type="number"
                                className="form-control"
                                style={{ width: "80px" }}
                                value={quiz.timeLimit || 20}
                                onChange={(e) => update("timeLimit", parseInt(e.target.value) || 0)}
                            />
                            <span className="ms-2">Minutes</span>
                        </div>
                    )}
                </div>

                <div className="form-check mb-2">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="multipleAttempts"
                        checked={quiz.multipleAttempts ?? false}
                        onChange={(e) => update("multipleAttempts", e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="multipleAttempts">
                        Allow Multiple Attempts
                    </label>
                </div>

                {quiz.multipleAttempts && (
                    <div className="ms-4 mb-2 d-flex align-items-center">
                        <label className="form-label me-2 mb-0">How Many Attempts</label>
                        <input
                            type="number"
                            className="form-control"
                            style={{ width: "80px" }}
                            value={quiz.howManyAttempts || 1}
                            onChange={(e) => update("howManyAttempts", parseInt(e.target.value) || 1)}
                        />
                    </div>
                )}

                <div className="mb-2">
                    <label className="form-label fw-bold">Show Correct Answers</label>
                    <select
                        className="form-select"
                        value={quiz.showCorrectAnswers || "Immediately"}
                        onChange={(e) => update("showCorrectAnswers", e.target.value)}
                    >
                        <option>Immediately</option>
                        <option>After Due Date</option>
                        <option>Never</option>
                    </select>
                </div>

                <div className="mb-2">
                    <label className="form-label fw-bold">Access Code</label>
                    <input
                        type="text"
                        className="form-control"
                        value={quiz.accessCode || ""}
                        onChange={(e) => update("accessCode", e.target.value)}
                        placeholder="Leave blank for no access code"
                    />
                </div>

                <div className="form-check mb-2">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="oneQuestion"
                        checked={quiz.oneQuestionAtATime ?? true}
                        onChange={(e) => update("oneQuestionAtATime", e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="oneQuestion">
                        One Question at a Time
                    </label>
                </div>

                <div className="form-check mb-2">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="webcam"
                        checked={quiz.webcamRequired ?? false}
                        onChange={(e) => update("webcamRequired", e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="webcam">
                        Webcam Required
                    </label>
                </div>

                <div className="form-check mb-2">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="lockQuestions"
                        checked={quiz.lockQuestionsAfterAnswering ?? false}
                        onChange={(e) => update("lockQuestionsAfterAnswering", e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="lockQuestions">
                        Lock Questions After Answering
                    </label>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-4">
                    <label className="form-label fw-bold">Due</label>
                    <input
                        type="date"
                        className="form-control"
                        value={quiz.dueDate ? quiz.dueDate.substring(0, 10) : ""}
                        onChange={(e) => update("dueDate", e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label fw-bold">Available from</label>
                    <input
                        type="date"
                        className="form-control"
                        value={quiz.availableDate ? quiz.availableDate.substring(0, 10) : ""}
                        onChange={(e) => update("availableDate", e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label fw-bold">Until</label>
                    <input
                        type="date"
                        className="form-control"
                        value={quiz.untilDate ? quiz.untilDate.substring(0, 10) : ""}
                        onChange={(e) => update("untilDate", e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}