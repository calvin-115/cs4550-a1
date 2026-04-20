"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/kambaz/store";
import PazzaNavBar from "./PazzaNavBar";
import FolderFilters from "./FolderFilters";
import PostsSidebar from "./PostsSidebar";
import ClassAtAGlance from "./ClassAtAGlance";
import NewPostScreen from "./NewPostScreen";
import PostView from "./PostView";
import ManageFolders from "./ManageFolders";
import * as pazzaClient from "./client";
import * as coursesClient from "../../client";

interface Course {
    _id: string;
    name: string;
    number: string;
}

export default function PazzaScreen() {
    const { courseId } = useParams();
    const cid = courseId as string;
    const { courses } = useSelector((state: RootState) => state.coursesReducer);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const course = courses.find((c: Course) => c._id === cid);
    const isInstructor = currentUser?.role === "FACULTY";

    const [activeTab, setActiveTab] = useState("qa");
    const [folders, setFolders] = useState<any[]>([]);
    const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
    const [posts, setPosts] = useState<any[]>([]);
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showNewPost, setShowNewPost] = useState(false);
    const [enrolledCount, setEnrolledCount] = useState(0);

    const fetchFolders = useCallback(async () => {
        try {
            const data = await pazzaClient.findFoldersForCourse(cid);
            setFolders(data);
        } catch (e) { console.error(e); }
    }, [cid]);

    const fetchPosts = useCallback(async () => {
        try {
            const data = await pazzaClient.findPostsForCourse(cid, selectedFolder || undefined);
            setPosts(data);
        } catch (e) { console.error(e); }
    }, [cid, selectedFolder]);

    const fetchEnrolledCount = useCallback(async () => {
        try {
            const users = await coursesClient.findUsersForCourse(cid);
            setEnrolledCount(users.length);
        } catch (e) { console.error(e); }
    }, [cid]);

    useEffect(() => {
        fetchFolders();
        fetchEnrolledCount();
    }, [fetchFolders, fetchEnrolledCount]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const handleTabChange = (tab: string) => {
        if (tab === "manage" && !isInstructor) return;
        setActiveTab(tab);
        if (tab === "qa") {
            setShowNewPost(false);
        }
    };

    const handleSelectPost = async (postId: string) => {
        setSelectedPostId(postId);
        setShowNewPost(false);
        try {
            await pazzaClient.incrementViews(postId);
        } catch (e) { console.error(e); }
    };

    const handleNewPost = () => {
        setShowNewPost(true);
        setSelectedPostId(null);
    };

    const handlePostCreated = (newPost: any) => {
        setPosts((prev) => [newPost, ...prev]);
        setSelectedPostId(newPost._id);
        setShowNewPost(false);
    };

    const handlePostUpdated = (updatedPost: any) => {
        setPosts((prev) => prev.map((p) => (p._id === updatedPost._id ? updatedPost : p)));
    };

    const handlePostDeleted = (postId: string) => {
        setPosts((prev) => prev.filter((p) => p._id !== postId));
        if (selectedPostId === postId) {
            setSelectedPostId(null);
        }
    };

    if (activeTab === "manage" && isInstructor) {
        return (
            <div>
                <PazzaNavBar
                    courseId={cid}
                    courseName={course?.number || course?.name || cid}
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                    userRole={currentUser?.role || "STUDENT"}
                />
                <ManageFolders courseId={cid} folders={folders} onFoldersChange={fetchFolders} />
            </div>
        );
    }

    return (
        <div>
            <PazzaNavBar
                courseId={cid}
                courseName={course?.number || course?.name || cid}
                activeTab={activeTab}
                onTabChange={handleTabChange}
                userRole={currentUser?.role || "STUDENT"}
            />
            <FolderFilters
                folders={folders}
                selectedFolder={selectedFolder}
                onSelectFolder={setSelectedFolder}
            />
            <div className="d-flex" style={{ height: "calc(100vh - 200px)" }}>
                <PostsSidebar
                    posts={posts}
                    selectedPostId={selectedPostId}
                    onSelectPost={handleSelectPost}
                    onNewPost={handleNewPost}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                />
                <div className="flex-fill" style={{ overflowY: "auto" }}>
                    {showNewPost ? (
                        <NewPostScreen
                            courseId={cid}
                            folders={folders}
                            onPostCreated={handlePostCreated}
                            onCancel={() => setShowNewPost(false)}
                        />
                    ) : selectedPostId ? (
                        <PostView
                            postId={selectedPostId}
                            onPostUpdated={handlePostUpdated}
                            onPostDeleted={handlePostDeleted}
                        />
                    ) : (
                        <ClassAtAGlance courseId={cid} enrolledCount={enrolledCount} />
                    )}
                </div>
            </div>
        </div>
    );
}