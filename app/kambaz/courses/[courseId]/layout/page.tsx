import Link from "next/link";

const navStyle: React.CSSProperties = {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    borderBottom: "1px solid #ddd",
    paddingBottom: 10,
    marginBottom: 16,
};

export default function CourseLayout({
                                         children,
                                         params,
                                     }: {
    children: React.ReactNode;
    params: { courseId: string };
}) {
    const { courseId } = params;

    return (
        <div>
            <h1>Course: {courseId.toUpperCase()}</h1>

            <nav style={navStyle}>
                <Link href={`/kambaz/courses/${courseId}/home`}>Home</Link>
                <Link href={`/kambaz/courses/${courseId}/modules`}>Modules</Link>
                <Link href={`/kambaz/courses/${courseId}/piazza`}>Piazza</Link>
                <Link href={`/kambaz/courses/${courseId}/zoom`}>Zoom</Link>
                <Link href={`/kambaz/courses/${courseId}/quizzes`}>Quizzes</Link>
                <Link href={`/kambaz/courses/${courseId}/assignments`}>Assignments</Link>
                <Link href={`/kambaz/courses/${courseId}/grades`}>Grades</Link>
            </nav>

            {children}
        </div>
    );
}
