import React from "react";
import { Link } from "react-router-dom";

export function Login() {
    return (
        <div>
            <h1>Welcome to Memoboard App!</h1>
            <Link
                to = "/home"
                role = "button"
                >
                    Continue to Memoboard
                </Link>
        </div>
    )
}