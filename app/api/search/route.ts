import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    
    const apiKey = process.env.MOUSER_API_KEY || ""; // (move this to env later)

    const req_body = await req.json();

    // Build the Mouser SearchByKeywordRequest body when caller provides a partNumber
  // use unknown then narrow to avoid `any` lint
  let mouserBody: unknown = req_body;
    if (!req_body?.SearchByKeywordRequest) {
      const keyword = req_body?.partNumber || req_body?.keyword || "";
      mouserBody = {
        SearchByKeywordRequest: {
          keyword: keyword,
          records: 0,
          startingRecord: 0,
          searchOptions: "",
          searchWithYourSignUpLanguage: "",
        },
      };
    }

    console.log("outgoing mouserBody", JSON.stringify(mouserBody));

    const mouserRes = await fetch(`https://api.mouser.com/api/v1/search/keyword?apiKey=${apiKey}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mouserBody),
    });

    // If Mouser returned non-2xx, capture the body text and forward it
    if (!mouserRes.ok) {
      const text = await mouserRes.text();
      console.error("Mouser API returned non-OK:", mouserRes.status, text);
      // forward status and body so the client can see more details
      return NextResponse.json(
        { error: "Mouser API error", status: mouserRes.status, body: text },
        { status: mouserRes.status }
      );
    }

    const data = await mouserRes.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Mouser API error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}