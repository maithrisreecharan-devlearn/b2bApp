import { NextResponse } from "next/server";

export async function POST() {
  try {
    const params = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: "3MVG91oqviqJKoEHkImb6k.AkO_iEibSyn6Nd0Cho3GqJkDHqvk6gNhylsmiUHtr5wyK2Jxy23ZlMn.Pw0o8E",
      client_secret: "05DA9CA94D0B2CC0622EE349440EEE62D1518F7DDC3D30BCCD0E2712B451F1E5",
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
