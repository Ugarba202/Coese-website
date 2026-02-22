import { NextResponse } from "next/server";
import { Resend } from "resend";
import * as z from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);
const supportEmail = process.env.SUPPORT_EMAIL || "[EMAIL_ADDRESS";

const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    subject: z.string().min(4),
    message: z.string().min(10),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const result = contactSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: "Invalid data", details: result.error.flatten() }, { status: 400 });
        }

        const { name, email, subject, message } = result.data;

        // Simulate successful email sending if in mock mode (no API key)
        if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "re_your_resend_key") {
            console.log("Mock email sent:");
            console.log({ name, email, subject, message });
            return NextResponse.json({ success: true, mock: true });
        }

        // Send email via Resend
        const { data, error } = await resend.emails.send({
            from: "COESA Website <onboarding@resend.dev>", // Needs verified domain in production
            to: supportEmail,
            replyTo: email,
            subject: `New Contact Form Submission: ${subject}`,
            html: `
        <h2>New Message from COESA Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
        });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
