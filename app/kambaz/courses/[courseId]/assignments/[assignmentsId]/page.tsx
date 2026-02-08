import Link from "next/link";
import { FormControl, FormSelect, FormCheck, Row, Col, Button } from "react-bootstrap";

export default async function AssignmentEditor({
                                                   params,
                                               }: {
    params: Promise<{ courseId: string; assignmentsId: string }>;
}) {
    const { courseId, assignmentsId } = await params;

    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name" className="form-label">Assignment Name</label>
            <FormControl id="wd-name" defaultValue="A1 - ENV + HTML" className="mb-3" />

            <FormControl
                as="textarea"
                id="wd-description"
                rows={6}
                className="mb-3"
                defaultValue="The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section. Links to each of the lab assignments. Link to the Kanbas application. Links to all relevant source code repositories. The Kanbas application should include a link to navigate back to the landing page."
            />

            <Row className="mb-3">
                <Col sm={4} className="text-end">
                    <label htmlFor="wd-points" className="form-label">Points</label>
                </Col>
                <Col sm={8}>
                    <FormControl id="wd-points" type="number" defaultValue={100} />
                </Col>
            </Row>

            <Row className="mb-3">
                <Col sm={4} className="text-end">
                    <label htmlFor="wd-group" className="form-label">Assignment Group</label>
                </Col>
                <Col sm={8}>
                    <FormSelect id="wd-group" defaultValue="ASSIGNMENTS">
                        <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                        <option value="QUIZZES">QUIZZES</option>
                        <option value="EXAMS">EXAMS</option>
                        <option value="PROJECT">PROJECT</option>
                    </FormSelect>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col sm={4} className="text-end">
                    <label htmlFor="wd-display-grade-as" className="form-label">Display Grade as</label>
                </Col>
                <Col sm={8}>
                    <FormSelect id="wd-display-grade-as" defaultValue="Percentage">
                        <option value="Percentage">Percentage</option>
                        <option value="Points">Points</option>
                        <option value="Letter">Letter Grade</option>
                    </FormSelect>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col sm={4} className="text-end">
                    <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
                </Col>
                <Col sm={8}>
                    <FormSelect id="wd-submission-type" defaultValue="Online">
                        <option value="Online">Online</option>
                        <option value="On Paper">On Paper</option>
                        <option value="No Submission">No Submission</option>
                    </FormSelect>

                    <div className="mt-3">
                        <label className="fw-bold mb-2">Online Entry Options</label>
                        <FormCheck type="checkbox" id="wd-text-entry" label="Text Entry" />
                        <FormCheck type="checkbox" id="wd-website-url" label="Website URL" defaultChecked />
                        <FormCheck type="checkbox" id="wd-media-recordings" label="Media Recordings" />
                        <FormCheck type="checkbox" id="wd-student-annotation" label="Student Annotation" />
                        <FormCheck type="checkbox" id="wd-file-uploads" label="File Uploads" />
                    </div>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col sm={4} className="text-end">
                    <label className="form-label">Assign</label>
                </Col>
                <Col sm={8}>
                    <label htmlFor="wd-assign-to" className="fw-bold">Assign to</label>
                    <FormControl id="wd-assign-to" defaultValue="Everyone" className="mb-3" />

                    <label htmlFor="wd-due-date" className="fw-bold">Due</label>
                    <FormControl id="wd-due-date" type="date" defaultValue="2024-05-13" className="mb-3" />

                    <Row>
                        <Col>
                            <label htmlFor="wd-available-from" className="fw-bold">Available from</label>
                            <FormControl id="wd-available-from" type="date" defaultValue="2024-05-06" />
                        </Col>
                        <Col>
                            <label htmlFor="wd-available-until" className="fw-bold">Until</label>
                            <FormControl id="wd-available-until" type="date" defaultValue="2024-05-20" />
                        </Col>
                    </Row>
                </Col>
            </Row>

            <hr />
            <div className="d-flex justify-content-end">
                <Link href={`/kambaz/courses/${courseId}/assignments`} className="btn btn-secondary me-2">
                    Cancel
                </Link>
                <Link href={`/kambaz/courses/${courseId}/assignments`} className="btn btn-danger">
                    Save
                </Link>
            </div>
        </div>
    );
}