"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./Table";
import * as coursesClient from "../../client";

export default function People() {
    const { courseId } = useParams();
    const [users, setUsers] = useState<any[]>([]);

    const fetchUsersForCourse = async () => {
        const users = await coursesClient.findUsersForCourse(courseId as string);
        setUsers(users);
    };

    useEffect(() => {
        fetchUsersForCourse();
    }, [courseId]);

    return (
        <div>
            <h3>People</h3>
            <PeopleTable users={users} fetchUsers={fetchUsersForCourse} />
        </div>
    );
}