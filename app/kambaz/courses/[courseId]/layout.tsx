import { ReactNode } from "react";
import Link from "next/link";

export default async function CourseLayout({
                                               children,
                                               params,
                                           }: Readonly<{ children: ReactNode; params: Promise<{ courseId: string }> }>) {
    const { courseId } = await params;

    return (
        <div id="wd-courses">
            <h2>Course {courseId}</h2>
            <hr />
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
                        <Link href={`/kambaz/courses/${courseId}/home`} id="wd-course-home-link"
                              className="list-group-item active border-0">Home</Link><br />
                        <Link href={`/kambaz/courses/${courseId}/modules`} id="wd-course-modules-link"
                              className="list-group-item text-danger border-0">Modules</Link><br />
                        <Link href={`/kambaz/courses/${courseId}/piazza`} id="wd-course-piazza-link"
                              className="list-group-item text-danger border-0">Piazza</Link><br />
                        <Link href={`/kambaz/courses/${courseId}/zoom`} id="wd-course-zoom-link"
                              className="list-group-item text-danger border-0">Zoom</Link><br />
                        <Link href={`/kambaz/courses/${courseId}/assignments`} id="wd-course-assignments-link"
                              className="list-group-item text-danger border-0">Assignments</Link><br />
                        <Link href={`/kambaz/courses/${courseId}/quizzes`} id="wd-course-quizzes-link"
                              className="list-group-item text-danger border-0">Quizzes</Link><br />
                        <Link href={`/kambaz/courses/${courseId}/grades`} id="wd-course-grades-link"
                              className="list-group-item text-danger border-0">Grades</Link><br />
                        <Link href={`/kambaz/courses/${courseId}/people`} id="wd-course-people-link"
                              className="list-group-item text-danger border-0">People</Link><br />
                    </div>
                </div>
                <div className="flex-fill">
                    {children}
                </div>
            </div>
        </div>
    );
}