"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import * as quizClient from "./client";
import QuizListItem from "./QuizListItem";
import { FaPlus } from "react-icons/fa";

export default function QuizzesPage() {
    const { courseId } = useParams();
    const router = useRouter();
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const isFaculty = currentUser?.role === "FACULTY";
    const [quizzes, setQuizzes] = useState<any[]>([]);

    const fetchQuizzes = useCallback(async () => {
        const data = await quizClient.findQuizzesForCourse(courseId as string);
        setQuizzes(data);
    }, [courseId]);

    useEffect(() => {
        fetchQuizzes();
    }, [fetchQuizzes]);

    const handleAddQuiz = async () => {
        const newQuiz = await quizClient.createQuiz(courseId as string, {
            title: "Unnamed Quiz",
            course: courseId,
        });
        router.push(`/kambaz/courses/${courseId}/quizzes/${newQuiz._id}/editor`);
    };

    const handleDelete = async (quizId: string) => {
        await quizClient.deleteQuiz(quizId);
        fetchQuizzes();
    };

    const handleTogglePublish = async (quizId: string) => {
        await quizClient.togglePublish(quizId);
        fetchQuizzes();
    };

    const visibleQuizzes = isFaculty
        ? quizzes
        : quizzes.filter((q: any) => q.published);

    return (
        <div id="wd-quizzes" className="p-3">
            {isFaculty && (
                <div className="d-flex justify-content-end mb-3">
                    <button className="btn btn-danger" onClick={handleAddQuiz}>
                        <FaPlus className="me-1" /> Quiz
                    </button>
                </div>
            )}
            <h3 className="mb-3">Assignment Quizzes</h3>
            <ul className="list-group">
                {visibleQuizzes.length === 0 && (
                    <li className="list-group-item text-muted">
                        No quizzes yet.{" "}
                        {isFaculty && "Click + Quiz to add one."}
                    </li>
                )}
                {visibleQuizzes.map((quiz: any) => (
                    <QuizListItem
                        key={quiz._id}
                        quiz={quiz}
                        isFaculty={isFaculty}
                        courseId={courseId as string}
                        onDelete={handleDelete}
                        onTogglePublish={handleTogglePublish}
                    />
                ))}
            </ul>
        </div>
    );
}