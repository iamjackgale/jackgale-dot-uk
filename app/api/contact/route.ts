import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Contact form API is intentionally disabled in this refactor. Use direct email instead." },
    { status: 410 }
  );
}
