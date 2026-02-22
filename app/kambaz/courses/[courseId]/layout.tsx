import { ReactNode } from "react";
import { FaAlignJustify } from "react-icons/fa6";
import { courses } from "../../database";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";

export default async function CourseLayout({
                                               children,
                                               params,
                                           }: Readonly<{ children: ReactNode; params: Promise<{ courseId: string }> }>) {
    const { courseId } = await params;
    const course = courses.find((c) => c._id === courseId);
    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course?.name} &gt; <Breadcrumb />
            </h2>
            <hr />
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CourseNavigation courseId={courseId} />
                </div>
                <div className="flex-fill">
                    {children}
                </div>
            </div>
        </div>
    );
}