import Link from "next/link";
import { Row, Col, Card, CardBody, CardTitle, CardText, CardImg, Button } from "react-bootstrap";

const courses = [
    { id: "cs4550", title: "CS4550 Web Development", desc: "Full Stack software developer", img: "/images/reactjs.jpg" },
    { id: "cs3000", title: "CS3000 Algorithms", desc: "Algorithm design and analysis", img: "/images/reactjs.jpg" },
    { id: "cs2500", title: "CS2500 Fundamentals", desc: "Fundamentals of Computer Science", img: "/images/reactjs.jpg" },
    { id: "cs3500", title: "CS3500 Object-Oriented Design", desc: "OOD principles and patterns", img: "/images/reactjs.jpg" },
    { id: "cs1800", title: "CS1800 Discrete Structures", desc: "Logic, proofs, and combinatorics", img: "/images/reactjs.jpg" },
    { id: "cs4400", title: "CS4400 Programming Languages", desc: "Language design and implementation", img: "/images/reactjs.jpg" },
    { id: "cs4500", title: "CS4500 Software Development", desc: "Software engineering practices", img: "/images/reactjs.jpg" },
];

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
            <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {courses.map((c) => (
                        <Col key={c.id} className="wd-dashboard-course" style={{ width: "300px" }}>
                            <Card>
                                <Link href={`/kambaz/courses/${c.id}/home`}
                                      className="wd-dashboard-course-link text-decoration-none text-dark">
                                    <CardImg variant="top" src={c.img} width="100%" height={160} />
                                    <CardBody>
                                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                            {c.title}
                                        </CardTitle>
                                        <CardText className="wd-dashboard-course-description overflow-hidden"
                                                  style={{ height: "100px" }}>
                                            {c.desc}
                                        </CardText>
                                        <Button variant="primary">Go</Button>
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