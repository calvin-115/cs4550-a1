"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setCourses } from "../courses/reducer";
import { Row, Col, Card, CardBody, CardImg, CardTitle, CardText, Button, FormControl } from "react-bootstrap";
import * as coursesClient from "../courses/client";

export default function Dashboard() {
    const { courses } = useSelector((state: RootState) => state.coursesReducer);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const dispatch = useDispatch();
    const [course, setCourse] = useState<any>({
        _id: "0", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        image: "/images/reactjs.jpg", description: "New Description",
    });
    const [showAllCourses, setShowAllCourses] = useState(false);
    const [enrolledIds, setEnrolledIds] = useState<string[]>([]);

    const fetchCourses = async () => {
        try {
            const myCourses = await coursesClient.findMyCourses();
            const enrolled = myCourses.map((c: any) => c._id);
            setEnrolledIds(enrolled);
            dispatch(setCourses(myCourses));
        } catch (error) {
            console.error(error);
        }
    };

    const fetchAllCourses = async () => {
        try {
            const allCourses = await coursesClient.fetchAllCourses();
            dispatch(setCourses(allCourses));
        } catch (error) {
            console.error(error);
        }
    };

    const toggleEnrollments = () => {
        if (showAllCourses) {
            setShowAllCourses(false);
            fetchCourses();
        } else {
            setShowAllCourses(true);
            fetchAllCourses();
        }
    };

    const handleEnroll = async (courseId: string) => {
        await coursesClient.enrollInCourse(courseId);
        setEnrolledIds([...enrolledIds, courseId]);
    };

    const handleUnenroll = async (courseId: string) => {
        await coursesClient.unenrollFromCourse(courseId);
        setEnrolledIds(enrolledIds.filter((id) => id !== courseId));
    };

    const isEnrolled = (courseId: string) => {
        return enrolledIds.includes(courseId);
    };

    const onAddNewCourse = async () => {
        const newCourse = await coursesClient.createCourse(course);
        dispatch(setCourses([...courses, newCourse]));
    };

    const onDeleteCourse = async (courseId: string) => {
        await coursesClient.deleteCourse(courseId);
        dispatch(setCourses(courses.filter((c: any) => c._id !== courseId)));
    };

    const onUpdateCourse = async () => {
        await coursesClient.updateCourse(course);
        dispatch(setCourses(courses.map((c: any) => (c._id === course._id ? course : c))));
    };

    useEffect(() => {
        fetchCourses();
    }, [currentUser]);

    return (
        <div id="wd-dashboard" className="p-4">
            <h1 id="wd-dashboard-title">
                Dashboard
                <Button variant="primary" className="float-end" onClick={toggleEnrollments}>
                    Enrollments
                </Button>
            </h1>
            <hr />
            {currentUser?.role === "FACULTY" && (
                <>
                    <h5>New Course
                        <button className="btn btn-primary float-end"
                                id="wd-add-new-course-click" onClick={onAddNewCourse}>
                            Add
                        </button>
                        <button className="btn btn-warning float-end me-2"
                                id="wd-update-course-click" onClick={onUpdateCourse}>
                            Update
                        </button>
                    </h5>
                    <br />
                    <FormControl value={course.name} className="mb-2"
                                 onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                    <FormControl as="textarea" value={course.description} rows={3}
                                 onChange={(e) => setCourse({ ...course, description: e.target.value })} />
                    <hr />
                </>
            )}
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
            <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {courses.map((c: any) => (
                        <Col key={c._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                            <Card>
                                <Link href={isEnrolled(c._id) ? `/kambaz/courses/${c._id}/home` : "#"}
                                      className="wd-dashboard-course-link text-decoration-none text-dark"
                                      onClick={(e) => { if (!isEnrolled(c._id)) e.preventDefault(); }}>
                                    <CardImg variant="top" src={c.image || "/images/reactjs.jpg"} width="100%" height={160} />
                                    <CardBody>
                                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                            {c.name}
                                        </CardTitle>
                                        <CardText className="wd-dashboard-course-description overflow-hidden"
                                                  style={{ height: "100px" }}>
                                            {c.description}
                                        </CardText>
                                        {showAllCourses && (
                                            isEnrolled(c._id) ? (
                                                <Button variant="danger" className="me-2"
                                                        onClick={(e) => { e.preventDefault(); handleUnenroll(c._id); }}>
                                                    Unenroll
                                                </Button>
                                            ) : (
                                                <Button variant="success" className="me-2"
                                                        onClick={(e) => { e.preventDefault(); handleEnroll(c._id); }}>
                                                    Enroll
                                                </Button>
                                            )
                                        )}
                                        {isEnrolled(c._id) && <Button variant="primary">Go</Button>}
                                        {currentUser?.role === "FACULTY" && (
                                            <>
                                                <button onClick={(e) => { e.preventDefault(); setCourse(c); }}
                                                        className="btn btn-warning me-2 float-end" id="wd-edit-course-click">
                                                    Edit
                                                </button>
                                                <button onClick={(e) => { e.preventDefault(); onDeleteCourse(c._id); }}
                                                        className="btn btn-danger float-end me-2" id="wd-delete-course-click">
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </CardBody>
                                </Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}