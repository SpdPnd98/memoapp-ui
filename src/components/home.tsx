import React from "react";
import { Link } from "react-router-dom";

export function Home() {
    return (
        <div>
            <h1>Welcome to Memoboard App!</h1>
            <Link
                to = "/memoboards"
                role = "button"
                >
                    Continue to Memoboard
                </Link>
        </div>
    )
}