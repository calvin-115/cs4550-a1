import Link from "next/link";

export default function Lab2() {
    return (
        <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 950 }}>
            <h1>Lab 2 - HTML Elements Playground</h1>

            <p>
                <Link href="/labs/lab1">Back to Lab 1 Landing</Link> |{" "}
                <Link href="/kambaz">Back to Kambaz</Link>
            </p>

            <hr />


            <h2>Text Basics</h2>

            <h3>Heading Tags</h3>
            <div style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12 }}>
                <h1 style={{ marginTop: 0 }}>h1 Heading</h1>
                <h2>h2 Heading</h2>
                <h3>h3 Heading</h3>
                <h4>h4 Heading</h4>
                <h5>h5 Heading</h5>
                <h6>h6 Heading</h6>
            </div>

            <h3>Paragraph Tag</h3>
            <p>
                This page intentionally mixes a bunch of HTML elements together so the grader can
                quickly verify headings, lists, tables, images, forms, and navigation.
            </p>


            <h2>Lists</h2>

            <h3>Ordered List</h3>
            <ol>
                <li>Wake up</li>
                <li>Go to class</li>
                <li>Study</li>
            </ol>

            <h4>Favorite Recipe (Ordered)</h4>
            <ol>
                <li>Boil water</li>
                <li>Add noodles</li>
                <li>Add seasoning</li>
                <li>Serve</li>
            </ol>

            <h3>Unordered List</h3>
            <ul>
                <li>Apples</li>
                <li>Bananas</li>
                <li>Oranges</li>
            </ul>

            <h4>Favorite Books (Unordered)</h4>
            <ul>
                <li>Atomic Habits</li>
                <li>Deep Work</li>
                <li>The Pragmatic Programmer</li>
            </ul>


            <h2>Table</h2>
            <p>Sample table showing some made-up quiz scores:</p>
            <table border={1} cellPadding={8} style={{ borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Quiz</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>2026-01-10</td>
                    <td>Q3</td>
                    <td>9/10</td>
                </tr>
                <tr>
                    <td>2026-01-17</td>
                    <td>Q4</td>
                    <td>10/10</td>
                </tr>
                <tr>
                    <td>2026-02-28</td>
                    <td>Q10</td>
                    <td>8/10</td>
                </tr>
                </tbody>
            </table>


            <h2>Images</h2>
            <p>
                These are loaded from <code>public/images/</code>.
            </p>

            <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
                <figure style={{ margin: 0 }}>
                    <figcaption style={{ fontWeight: 600, marginBottom: 6 }}>
                        Starship
                    </figcaption>
                    <img
                        src="/images/starship.jpg"
                        alt="Starship"
                        width={420}
                        style={{ display: "block" }}
                    />
                </figure>

                <figure style={{ margin: 0 }}>
                    <figcaption style={{ fontWeight: 600, marginBottom: 6 }}>
                        Teslabot (Optimus)
                    </figcaption>
                    <img
                        src="/images/teslabot.jpg"
                        alt="Teslabot (Optimus)"
                        width={420}
                        style={{ display: "block" }}
                    />
                </figure>
            </div>


            <h2>Forms</h2>
            <p>Below is a mini “everything form” to demonstrate common input types.</p>

            <div style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12 }}>
                <div style={{ display: "grid", gap: 10, maxWidth: 520 }}>
                    <label>
                        Username:
                        <input type="text" defaultValue="calvin" style={{ marginLeft: 8, width: "100%" }} />
                    </label>

                    <label>
                        Password:
                        <input type="password" defaultValue="password123" style={{ marginLeft: 8, width: "100%" }} />
                    </label>

                    <label>
                        First Name:
                        <input type="text" defaultValue="Calvin" style={{ marginLeft: 8, width: "100%" }} />
                    </label>

                    <label>
                        Last Name:
                        <input type="text" defaultValue="Liang" style={{ marginLeft: 8, width: "100%" }} />
                    </label>

                    <label>
                        Textarea:
                        <textarea
                            defaultValue="This is a sample textarea."
                            rows={4}
                            style={{ display: "block", width: "100%", marginTop: 6 }}
                        />
                    </label>

                    <fieldset style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12 }}>
                        <legend>Radio Buttons (pick one)</legend>
                        <label><input type="radio" name="genre" defaultChecked /> Comedy</label><br />
                        <label><input type="radio" name="genre" /> Drama</label><br />
                        <label><input type="radio" name="genre" /> SciFi</label><br />
                        <label><input type="radio" name="genre" /> Fantasy</label><br />
                    </fieldset>

                    <fieldset style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12 }}>
                        <legend>Checkboxes (pick many)</legend>
                        <label><input type="checkbox" defaultChecked /> Comedy</label><br />
                        <label><input type="checkbox" /> Drama</label><br />
                        <label><input type="checkbox" /> SciFi</label><br />
                        <label><input type="checkbox" /> Fantasy</label><br />
                    </fieldset>

                    <label>
                        Select one option:
                        <select defaultValue="comedy" style={{ marginLeft: 8 }}>
                            <option value="comedy">Comedy</option>
                            <option value="drama">Drama</option>
                            <option value="scifi">SciFi</option>
                            <option value="fantasy">Fantasy</option>
                        </select>
                    </label>

                    <label>
                        Select many options:
                        <select multiple defaultValue={["comedy", "scifi"]} size={4} style={{ display: "block", marginTop: 6 }}>
                            <option value="comedy">Comedy</option>
                            <option value="drama">Drama</option>
                            <option value="scifi">SciFi</option>
                            <option value="fantasy">Fantasy</option>
                        </select>
                    </label>

                    <label>
                        Email:
                        <input type="email" defaultValue="calvin@example.com" style={{ marginLeft: 8, width: "100%" }} />
                    </label>

                    <label>
                        Salary:
                        <input type="number" defaultValue={120000} style={{ marginLeft: 8 }} />
                    </label>

                    <label>
                        Rating slider:
                        <input type="range" min={0} max={10} defaultValue={7} style={{ marginLeft: 8 }} />
                    </label>

                    <label>
                        DOB date picker:
                        <input type="date" defaultValue="2004-01-01" style={{ marginLeft: 8 }} />
                    </label>
                </div>
            </div>


            <h2>Links & Navigation</h2>

            <h3>Anchor Tag (external)</h3>
            <a href="https://www.northeastern.edu" target="_blank" rel="noreferrer">
                Northeastern University
            </a>

            <h3>SPA Navigation (internal)</h3>
            <p>
                This uses Next.js client navigation with{" "}
                <Link href="/labs/lab1">Link</Link> and routes, e.g.{" "}
                <Link href="/kambaz">Kambaz</Link>.
            </p>
        </main>
    );
}
