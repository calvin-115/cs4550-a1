"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment } from "../reducer";
import { FormControl, Button, Row, Col } from "react-bootstrap";

export default function AssignmentEditor() {
    const { courseId, assignmentsId } = useParams();
    const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
    const dispatch = useDispatch();
    const router = useRouter();
    const isNew = assignmentsId === "new";

    const existing = assignments.find((a: any) => a._id === assignmentsId);

    const [assignment, setAssignment] = useState<any>({
        title: "New Assignment",
        description: "New Assignment Description",
        points: 100,
        dueDate: "",
        availableFrom: "",
        availableUntil: "",
        course: courseId,
    });

    useEffect(() => {
        if (existing) {
            setAssignment(existing);
        }
    }, [existing]);

    const handleSave = () => {
        if (isNew) {
            dispatch(addAssignment(assignment));
        } else {
            dispatch(updateAssignment(assignment));
        }
        router.push(`/kambaz/courses/${courseId}/assignments`);
    };

    const handleCancel = () => {
        router.push(`/kambaz/courses/${courseId}/assignments`);
    };

    return (
        <div id="wd-assignments-editor" className="p-3">
            <label htmlFor="wd-name">Assignment Name</label>
            <FormControl id="wd-name" className="mb-3"
                         value={assignment.title}
                         onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} />

            <label htmlFor="wd-description">Description</label>
            <FormControl as="textarea" id="wd-description" className="mb-3" rows={4}
                         value={assignment.description}
                         onChange={(e) => setAssignment({ ...assignment, description: e.target.value })} />

            <Row className="mb-3">
                <Col md={3} className="text-end pt-2">
                    <label htmlFor="wd-points">Points</label>
                </Col>
                <Col md={9}>
                    <FormControl id="wd-points" type="number"
                                 value={assignment.points}
                                 onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) })} />
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={3} className="text-end pt-2">
                    <label>Assign</label>
                </Col>
                <Col md={9}>
                    <div className="border rounded p-3">
                        <label htmlFor="wd-due-date">Due</label>
                        <FormControl id="wd-due-date" type="date" className="mb-3"
                                     value={assignment.dueDate}
                                     onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })} />
                        <Row>
                            <Col>
                                <label htmlFor="wd-available-from">Available from</label>
                                <FormControl id="wd-available-from" type="date"
                                             value={assignment.availableFrom}
                                             onChange={(e) => setAssignment({ ...assignment, availableFrom: e.target.value })} />
                            </Col>
                            <Col>
                                <label htmlFor="wd-available-until">Until</label>
                                <FormControl id="wd-available-until" type="date"
                                             value={assignment.availableUntil}
                                             onChange={(e) => setAssignment({ ...assignment, availableUntil: e.target.value })} />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>

            <hr />
            <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                <Button variant="danger" onClick={handleSave}>Save</Button>
            </div>
        </div>
    );
}