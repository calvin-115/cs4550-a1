"use client";
import { ReactNode, useState } from "react";
import CourseNavigation from "./Navigation";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";
import { FaAlignJustify } from "react-icons/fa";
import Breadcrumb from "./Breadcrumb";

interface Course {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    description: string;
    image?: string;
}

export default function CoursesLayout({ children }: { children: ReactNode }) {
    const { courseId } = useParams();
    const { courses } = useSelector((state: RootState) => state.coursesReducer);
    const course = courses.find((c: Course) => c._id === courseId);
    const [showNav, setShowNav] = useState(true);
    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1"
                                onClick={() => setShowNav(!showNav)}
                                style={{ cursor: "pointer" }} />
                {course?.name}
                <Breadcrumb />
            </h2>
            <hr />
            <div className="d-flex">
                {showNav && (
                    <div className="d-none d-md-block">
                        <CourseNavigation />
                    </div>
                )}
                <div className="flex-fill">{children}</div>
            </div>
        </div>
    );
}