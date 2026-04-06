import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, website } = body;

    // Honeypot — bots fill this hidden field
    if (website) {
      return NextResponse.json({ success: true });
    }

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Send via Web3Forms (free tier, no API key needed for access_key approach)
    // Replace with your Web3Forms access key from https://web3forms.com
    const WEB3FORMS_KEY = process.env.WEB3FORMS_ACCESS_KEY;

    if (!WEB3FORMS_KEY) {
      // Fallback: log to server console if no key configured
      console.log("📬 New contact form submission:", { name, email, message });
      return NextResponse.json({ success: true, fallback: true });
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        name,
        email,
        message,
        from_name: "Portfolio Contact Form",
        subject: `New message from ${name}`,
      }),
    });

    const result = await response.json();

    if (result.success) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
