"use client";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

export default function CourseNavigation() {
    const { courseId } = useParams();
    const pathname = usePathname();
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((link) => (
                <Link
                    key={link}
                    href={`/kambaz/courses/${courseId}/${link.toLowerCase()}`}
                    className={`list-group-item border-0 ${
                        pathname.includes(link.toLowerCase()) ? "active text-black" : "text-danger"
                    }`}
                >
                    {link}
                </Link>
            ))}
        </div>
    );
}