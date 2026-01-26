import Link from "next/link";

export default function TOC() {
    return (
        <section>
            <h2>Labs Table of Contents</h2>
            <ul>
                <li><Link href="/labs/lab1">Lab 1</Link></li>
                <li><Link href="/labs/lab2">Lab 2</Link></li>
                <li><Link href="/kambaz">Kambaz</Link></li>
            </ul>
        </section>
    );
}
