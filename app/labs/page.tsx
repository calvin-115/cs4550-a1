import TOC from "./TOC";

export default function LabsHome() {
    return (
        <main style={{ padding: 24, fontFamily: "system-ui" }}>
            <h1>Labs</h1>

            <p><b>Full Name:</b> Calvin Liang</p>
            <p><b>Section:</b> CS4550 Section 02</p>

            <TOC />

            <hr />

            <p>
                <a
                    id="wd-github"
                    href="https://github.com/your-username/cs4550-a1"
                    target="_blank"
                    rel="noreferrer"
                >
                    Source Code Repository (GitHub)
                </a>
            </p>
        </main>
    );
}
