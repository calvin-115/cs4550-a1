"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { setAssignments } from "./reducer";
import { BsGripVertical } from "react-icons/bs";
import { FaSearch, FaPlus, FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdAssignment } from "react-icons/md";
import GreenCheckmark from "../modules/GreenCheckmark";
import { ListGroup, ListGroupItem, FormControl, InputGroup, Button, Modal } from "react-bootstrap";
import * as coursesClient from "../../client";

export default function Assignments() {
    const { courseId } = useParams();
    const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const dispatch = useDispatch();
    const [showDialog, setShowDialog] = useState(false);
    const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);

    const fetchAssignments = async () => {
        const assignments = await coursesClient.findAssignmentsForCourse(courseId as string);
        dispatch(setAssignments(assignments));
    };

    const confirmDelete = (id: string) => {
        setAssignmentToDelete(id);
        setShowDialog(true);
    };

    const handleDelete = async () => {
        if (assignmentToDelete) {
            await coursesClient.deleteAssignment(assignmentToDelete);
            dispatch(setAssignments(assignments.filter((a: any) => a._id !== assignmentToDelete)));
        }
        setShowDialog(false);
        setAssignmentToDelete(null);
    };

    useEffect(() => {
        fetchAssignments();
    }, []);

    const courseAssignments = assignments.filter((a: any) => a.course === courseId);

    return (
        <div id="wd-assignments" className="p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <InputGroup className="w-50">
                    <InputGroup.Text><FaSearch /></InputGroup.Text>
                    <FormControl placeholder="Search for Assignment" />
                </InputGroup>
                <div>
                    <Button variant="secondary" className="me-2">
                        <FaPlus className="me-1" />Group
                    </Button>
                    {currentUser?.role === "FACULTY" && (
                        <Link href={`/kambaz/courses/${courseId}/assignments/new`}
                              className="btn btn-danger">
                            <FaPlus className="me-1" />Assignment
                        </Link>
                    )}
                </div>
            </div>
            <ListGroup className="rounded-0" id="wd-assignment-list">
                <ListGroupItem className="wd-module p-0 mb-1 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
                        <div>
                            <BsGripVertical className="me-2 fs-3" />
                            ASSIGNMENTS
                        </div>
                        <div>
                            <span className="border rounded-pill px-2 py-1 me-2">40% of Total</span>
                            <FaPlus className="me-2" />
                            <IoEllipsisVertical className="fs-4" />
                        </div>
                    </div>
                    <ListGroup className="wd-lessons rounded-0">
                        {courseAssignments.map((a: any) => (
                            <ListGroupItem key={a._id}
                                           className="wd-lesson p-3 ps-1 d-flex align-items-center"
                                           style={{ borderLeft: "4px solid green" }}>
                                <BsGripVertical className="me-2 fs-3" />
                                <MdAssignment className="me-2 text-success fs-4" />
                                <div className="flex-grow-1">
                                    <Link href={`/kambaz/courses/${courseId}/assignments/${a._id}`}
                                          className="text-decoration-none text-dark fw-bold">
                                        {a.title}
                                    </Link>
                                    <br />
                                    <small className="text-muted">
                                        Multiple Modules | Due {a.dueDate} | {a.points} pts
                                    </small>
                                </div>
                                {currentUser?.role === "FACULTY" && (
                                    <FaTrash className="text-danger me-2"
                                             style={{ cursor: "pointer" }}
                                             onClick={() => confirmDelete(a._id)} />
                                )}
                                <GreenCheckmark />
                                <IoEllipsisVertical className="fs-4" />
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </ListGroupItem>
            </ListGroup>

            <Modal show={showDialog} onHide={() => setShowDialog(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Assignment</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to remove this assignment?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDialog(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handleDelete}>Yes, Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}