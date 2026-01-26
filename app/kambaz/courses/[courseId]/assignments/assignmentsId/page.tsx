export default function AssignmentEditor({
                                             params,
                                         }: {
    params: { courseId: string; assignmentId: string };
}) {
    const { courseId, assignmentId } = params;

    return (
        <div style={{ maxWidth: 820 }}>
            <h2>Assignment Editor</h2>
            <p>
                Course: <b>{courseId}</b> | Assignment: <b>{assignmentId}</b>
            </p>

            <div style={{ display: "grid", gap: 12 }}>
                <label>
                    Assignment Name:
                    <input
                        type="text"
                        defaultValue="A1 - Web Development Intro"
                        style={{ marginLeft: 8, width: "100%" }}
                    />
                </label>

                <label>
                    Description:
                    <br />
                    <textarea
                        defaultValue="Build the Kambaz and Lab pages using HTML form elements and navigation."
                        rows={5}
                        style={{ width: "100%" }}
                    />
                </label>

                <label>
                    Points:
                    <input type="number" defaultValue={100} style={{ marginLeft: 8 }} />
                </label>

                <label>
                    Assignment Group:
                    <select defaultValue="ASSIGNMENTS" style={{ marginLeft: 8 }}>
                        <option value="ASSIGNMENTS">Assignments</option>
                        <option value="QUIZZES">Quizzes</option>
                        <option value="EXAMS">Exams</option>
                        <option value="PROJECT">Project</option>
                    </select>
                </label>

                <label>
                    Display Grade as:
                    <select defaultValue="PERCENTAGE" style={{ marginLeft: 8 }}>
                        <option value="PERCENTAGE">Percentage</option>
                        <option value="POINTS">Points</option>
                        <option value="LETTER">Letter Grade</option>
                    </select>
                </label>

                <label>
                    Submission Type:
                    <select defaultValue="ONLINE" style={{ marginLeft: 8 }}>
                        <option value="ONLINE">Online</option>
                        <option value="ON_PAPER">On Paper</option>
                        <option value="NO_SUBMISSION">No Submission</option>
                    </select>
                </label>

                <fieldset style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12 }}>
                    <legend>Online Entry Options</legend>
                    <label><input type="checkbox" defaultChecked /> Text Entry</label><br />
                    <label><input type="checkbox" defaultChecked /> Website URL</label><br />
                    <label><input type="checkbox" /> Media Recordings</label><br />
                    <label><input type="checkbox" /> Student Annotation</label><br />
                    <label><input type="checkbox" /> File Uploads</label>
                </fieldset>

                <label>
                    Assign to:
                    <input type="text" defaultValue="Everyone" style={{ marginLeft: 8 }} />
                </label>

                <label>
                    Due:
                    <input type="date" defaultValue="2026-02-15" style={{ marginLeft: 8 }} />
                </label>

                <label>
                    Available from:
                    <input type="date" defaultValue="2026-02-01" style={{ marginLeft: 8 }} />
                </label>

                <label>
                    Until:
                    <input type="date" defaultValue="2026-02-28" style={{ marginLeft: 8 }} />
                </label>
            </div>
        </div>
    );
}
