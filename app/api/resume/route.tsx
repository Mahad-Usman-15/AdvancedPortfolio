import resume from "../../resume.json"
import { NextResponse } from "next/server";

export async function GET() {
    try {
        return NextResponse.json({ resume }, { status: 200 });
    } catch (error) {
        console.log("Error Fetching=>", error);
        return NextResponse.json({ error: "Failed to fetch resume" }, { status: 500 });
    }
}

