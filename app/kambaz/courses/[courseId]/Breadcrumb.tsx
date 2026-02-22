"use client";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
    const pathname = usePathname();
    return <span>{pathname.split("/").pop()}</span>;
}