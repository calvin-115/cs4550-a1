import Link from "next/link";

export default function Lab1Landing() {
    return (
        <main style={{ padding: 24, fontFamily: "system-ui" }}>
            <h1>Lab 1 - Landing Page</h1>

            <p><b>Full Name:</b> Calvin Liang</p>
            <p><b>Section:</b> CS4550 Section 02</p>

            <h2>Links to Lab Assignments</h2>
            <ul>
                <li><Link href="/labs/lab1">Lab 1 (this page)</Link></li>
                <li><Link href="/labs/lab2">Lab 2</Link></li>
            </ul>

            <h2>Kambaz Application</h2>
            <ul>
                <li><Link href="/kambaz">Go to Kambaz</Link></li>
            </ul>

            <h2>Source Code Repositories</h2>
            <ul>
                <li>
                    <a
                        href="https://github.com/calvin-115/cs4550-a1"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Main Repository
                    </a>
                </li>
            </ul>
        </main>
    );
}
