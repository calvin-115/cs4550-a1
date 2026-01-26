import Link from "next/link";

const assignments = [
    { id: "a1", title: "A1 - Kambaz HTML" },
    { id: "a2", title: "A2 - CSS" },
    { id: "a3", title: "A3 - React" },
];

export default function Assignments({ params }: { params: { courseId: string } }) {
    const { courseId } = params;

    return (
        <div>
            <h2>Assignments</h2>

            <input
                placeholder="Search for Assignments"
                style={{ width: "100%", maxWidth: 520, padding: 8, marginBottom: 12 }}
            />

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
                <button>+ Group</button>
                <button>+ Assignment</button>
                <button>Edit</button>
            </div>

            <h3>Assignments</h3>
            <ul>
                {assignments.map((a) => (
                    <li key={a.id}>
                        <Link href={`/kambaz/courses/${courseId}/assignments/${a.id}`}>
                            {a.title}
                        </Link>
                    </li>
                ))}
            </ul>

            <h3>Quizzes</h3>
            <ul>
                <li>Q1 - Placeholder</li>
            </ul>

            <h3>Exams</h3>
            <ul>
                <li>Midterm - Placeholder</li>
            </ul>

            <h3>Project</h3>
            <ul>
                <li>Final Project - Placeholder</li>
            </ul>
        </div>
    );
}
