"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ListGroup, ListGroupItem, FormControl, Button } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus, FaSearch, FaCheckCircle } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import * as db from "../../../database";

export default function Assignments() {
    const { courseId } = useParams();
    const assignments = db.assignments.filter((a: any) => a.course === courseId);
    return (
        <div id="wd-assignments">
            <div className="d-flex mb-3">
                <div className="flex-fill me-2 position-relative">
                    <FaSearch className="position-absolute" style={{ top: "12px", left: "12px" }} />
                    <FormControl placeholder="Search for Assignments" id="wd-search-assignment" className="ps-5" />
                </div>
                <Button variant="secondary" className="me-1" id="wd-add-assignment-group">
                    <FaPlus className="me-1" /> Group
                </Button>
                <Button variant="danger" id="wd-add-assignment">
                    <FaPlus className="me-1" /> Assignment
                </Button>
            </div>
            <h3 id="wd-assignments-title" className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                ASSIGNMENTS
                <span className="ms-auto badge rounded-pill border border-dark text-dark fw-normal">40% of Total</span>
                <FaPlus className="ms-2" />
                <IoEllipsisVertical className="ms-2 fs-4" />
            </h3>
            <ListGroup className="rounded-0" id="wd-assignment-list">
                {assignments.map((assignment: any) => (
                    <ListGroupItem key={assignment._id} className="wd-assignment-list-item wd-lesson p-3 ps-1 d-flex align-items-center">
                        <BsGripVertical className="me-2 fs-3" />
                        <div className="flex-fill">
                            <Link
                                href={`/kambaz/courses/${courseId}/assignments/${assignment._id}`}
                                className="wd-assignment-link fw-bold text-decoration-none text-dark"
                            >
                                {assignment.title}
                            </Link>
                            <br />
                            <span className="text-muted">
                Multiple Modules | <b>Not available until</b> {assignment.availableFrom} |
                Due {assignment.dueDate} | {assignment.points} pts
              </span>
                        </div>
                        <FaCheckCircle className="text-success me-2 fs-5" />
                        <IoEllipsisVertical className="fs-4" />
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    );
}