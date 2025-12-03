import { NextResponse } from "next/server";

export async function POST(req: Request  ) {

  const reqBody = await req.json();
  

  try {
    const convertedBody = reqBody.inputFormData;
    console.log("Converted Lead Body:", convertedBody);

    const res = await fetch("https://awcomputing-1b8-dev-ed.develop.my.salesforce.com/services/data/v65.0/sobjects/Lead", 
      {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + reqBody.accessToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(convertedBody)
    });

    if (!res.ok) {
      const errorBody = await res.text();
      return NextResponse.json(
        { error: "Salesforce API error", status: res.status, detail: errorBody },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ result: data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("insertLead unexpected error:", message);
    return NextResponse.json(
      { error: "Unexpected server error", detail: message },
      { status: 500 }
    );
  }
}
