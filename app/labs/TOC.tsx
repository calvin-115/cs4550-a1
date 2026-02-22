"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TOC() {
    const pathname = usePathname();
    return (
        <ul className="nav nav-pills">
            <li className="nav-item">
                <Link href="/labs" className={`nav-link ${pathname.endsWith("labs") ? "active" : ""}`}>Labs</Link>
            </li>
            <li className="nav-item">
                <Link href="/labs/lab1" className={`nav-link ${pathname.endsWith("lab1") ? "active" : ""}`}>Lab 1</Link>
            </li>
            <li className="nav-item">
                <Link href="/labs/lab2" className={`nav-link ${pathname.endsWith("lab2") ? "active" : ""}`}>Lab 2</Link>
            </li>
            <li className="nav-item">
                <Link href="/labs/lab3" className={`nav-link ${pathname.endsWith("lab3") ? "active" : ""}`}>Lab 3</Link>
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