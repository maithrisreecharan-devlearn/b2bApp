import { NextResponse } from "next/server";
import { env } from "process";

export async function POST() {
  try {
    const params = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.SALESFORCE_CLIENT_ID || '',
      client_secret: process.env.SALESFORCE_CLIENT_SECRET || "",
    });

    

    const res = await fetch("https://awcomputing-1b8-dev-ed.develop.my.salesforce.com/services/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });
    console.log('res ', res.toString());

    if (!res.ok) {
      const errorBody = await res.text();
      return NextResponse.json(
        { error: "Salesforce Token Error", detail: errorBody },
        { status: 500 }
      );
    }

    const data = await res.json();
    
    return NextResponse.json({ access_token: data.access_token });
  } catch (err: 'error' | any) {
    return NextResponse.json(
      { error: "Unexpected server error", detail: err.message },
      { status: 500 }
    );
  }
}
