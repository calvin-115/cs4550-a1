"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { redirect } from "next/navigation";

export default function AccountPage() {
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    if (!currentUser) {
        redirect("/kambaz/account/signin");
    } else {
        redirect("/kambaz/account/profile");
    }
}