import Link from "next/link";

export default function TOC() {
    return (
        <ul className="nav nav-pills">
            <li className="nav-item">
                <Link href="/labs" className="nav-link">Labs</Link>
            </li>
            <li className="nav-item">
                <Link href="/labs/lab1" className="nav-link">Lab 1</Link>
            </li>
            <li className="nav-item">
                <Link href="/labs/lab2" className="nav-link">Lab 2</Link>
            </li>
            <li className="nav-item">
                <Link href="/labs/lab3" className="nav-link">Lab 3</Link>
            </li>
            <li className="nav-item">
                <Link href="/kambaz" className="nav-link">Kambaz</Link>
            </li>
            <li className="nav-item">
                <a id="wd-github" href="https://github.com/calvin-115/cs4550-a1" className="nav-link">My GitHub</a>
            </li>
        </ul>
    );
}