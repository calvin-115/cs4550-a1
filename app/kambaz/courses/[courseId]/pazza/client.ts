import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const PAZZA_API = `${HTTP_SERVER}/api/pazza`;


export const findPostsForCourse = async (courseId: string, folder?: string) => {
    const params = folder ? { folder } : {};
    const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/pazza/posts`, { params });
    return data;
};

export const findPostById = async (postId: string) => {
    const { data } = await axiosWithCredentials.get(`${PAZZA_API}/posts/${postId}`);
    return data;
};

export const createPost = async (courseId: string, post: any) => {
    const { data } = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/pazza/posts`, post);
    return data;
};

export const updatePost = async (postId: string, updates: any) => {
    const { data } = await axiosWithCredentials.put(`${PAZZA_API}/posts/${postId}`, updates);
    return data;
};

export const deletePost = async (postId: string) => {
    const { data } = await axiosWithCredentials.delete(`${PAZZA_API}/posts/${postId}`);
    return data;
};

export const incrementViews = async (postId: string) => {
    const { data } = await axiosWithCredentials.put(`${PAZZA_API}/posts/${postId}/views`);
    return data;
};


export const addAnswer = async (postId: string, answer: any) => {
    const { data } = await axiosWithCredentials.post(`${PAZZA_API}/posts/${postId}/answers`, answer);
    return data;
};

export const updateAnswer = async (postId: string, answerId: string, updates: any) => {
    const { data } = await axiosWithCredentials.put(`${PAZZA_API}/posts/${postId}/answers/${answerId}`, updates);
    return data;
};

export const deleteAnswer = async (postId: string, answerId: string) => {
    const { data } = await axiosWithCredentials.delete(`${PAZZA_API}/posts/${postId}/answers/${answerId}`);
    return data;
};


export const addDiscussion = async (postId: string, discussion: any) => {
    const { data } = await axiosWithCredentials.post(`${PAZZA_API}/posts/${postId}/discussions`, discussion);
    return data;
};

export const updateDiscussion = async (postId: string, discussionId: string, updates: any) => {
    const { data } = await axiosWithCredentials.put(`${PAZZA_API}/posts/${postId}/discussions/${discussionId}`, updates);
    return data;
};

export const deleteDiscussion = async (postId: string, discussionId: string) => {
    const { data } = await axiosWithCredentials.delete(`${PAZZA_API}/posts/${postId}/discussions/${discussionId}`);
    return data;
};


export const addReply = async (postId: string, discussionId: string, reply: any) => {
    const { data } = await axiosWithCredentials.post(`${PAZZA_API}/posts/${postId}/discussions/${discussionId}/replies`, reply);
    return data;
};

export const updateReply = async (postId: string, discussionId: string, replyId: string, updates: any) => {
    const { data } = await axiosWithCredentials.put(`${PAZZA_API}/posts/${postId}/discussions/${discussionId}/replies/${replyId}`, updates);
    return data;
};

export const deleteReply = async (postId: string, discussionId: string, replyId: string) => {
    const { data } = await axiosWithCredentials.delete(`${PAZZA_API}/posts/${postId}/discussions/${discussionId}/replies/${replyId}`);
    return data;
};


export const findFoldersForCourse = async (courseId: string) => {
    const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/pazza/folders`);
    return data;
};

export const createFolder = async (courseId: string, folder: any) => {
    const { data } = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/pazza/folders`, folder);
    return data;
};

export const updateFolder = async (folderId: string, updates: any) => {
    const { data } = await axiosWithCredentials.put(`${PAZZA_API}/folders/${folderId}`, updates);
    return data;
};

export const deleteFolder = async (folderId: string) => {
    const { data } = await axiosWithCredentials.delete(`${PAZZA_API}/folders/${folderId}`);
    return data;
};

export const deleteFolders = async (ids: string[]) => {
    const { data } = await axiosWithCredentials.delete(`${PAZZA_API}/folders`, { data: { ids } });
    return data;
};

// ==================== STATS ====================

export const getCourseStats = async (courseId: string) => {
    const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/pazza/stats`);
    return data;
};