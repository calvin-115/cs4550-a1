import Link from "next/link";

const courses = [
    { id: "cs4550", title: "CS4550 - Web Development" },
    { id: "cs3000", title: "CS3000 - Algorithms" },
    { id: "cs2500", title: "CS2500 - Fundamentals" },
];

export default function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Published Courses</h2>

            <ul>
                {courses.map((c) => (
                    <li key={c.id} style={{ marginBottom: 8 }}>
                        <Link href={`/kambaz/courses/${c.id}/home`}>{c.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
