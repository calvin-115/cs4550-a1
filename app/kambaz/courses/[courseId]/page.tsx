import { redirect } from "next/navigation";

export default function CourseIndex({ params }: { params: { courseId: string } }) {
    redirect(`/kambaz/courses/${params.courseId}/home`);
}
