export default function CourseHome() {
    return (
        <div>
            <h2>Home</h2>

            <section style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12, marginBottom: 16 }}>
                <h3>Course Status</h3>
                <p>Published</p>
            </section>

            <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
                <button>Import Existing Content</button>
                <button>Import From Commons</button>
                <button>Choose Home Page</button>
                <button>View Course Stream</button>
                <button>New Announcement</button>
            </div>

            <h3>Modules (sample)</h3>
            <ul>
                <li>Module 1 - Intro</li>
                <li>Module 2 - HTML Basics</li>
            </ul>
        </div>
    );
}
