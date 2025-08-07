import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, company, role } = await req.json();

  const LIST_ID = process.env.MAILCHIMP_LIST_ID!;
  const API_KEY = process.env.MAILCHIMP_API_KEY!;
  const DATACENTER = API_KEY.split("-")[1];

  const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `apikey ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: name,
        MERGE7: company, // ✔ Correct "Company"
        MMERGE2: role,
      },
    }),
  });

  const data = await response.json();

  if (response.status >= 400) {
    console.error("Mailchimp error:", data);
    return NextResponse.json(
      { error: data.detail || "Mailchimp error" },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true });
}
