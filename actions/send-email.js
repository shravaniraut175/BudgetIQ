"use server";

import { Resend } from "resend";
import { render } from "@react-email/render";

// Ensure API key exists before creating the client
if (!process.env.RESEND_API_KEY) {
  console.error("❌ RESEND_API_KEY is missing in environment variables!");
}

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

/**
 * Sends an email using a React email template
 * @param {Object} params
 * @param {string} params.to - Recipient email
 * @param {string} params.subject - Email subject
 * @param {JSX.Element} params.react - React email component
 */
export async function sendEmail({ to, subject, react }) {
  try {
    if (!resend) {
      throw new Error(
        "Resend client not initialized. Check RESEND_API_KEY in environment variables."
      );
    }

    if (!to) throw new Error("Missing recipient email address");
    if (!subject) throw new Error("Missing subject line");

    // Convert React template to HTML string
    const html = render(react);

    // Send email via Resend
    const data = await resend.emails.send({
      from: "BudgetIQ <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    console.log(`✅ Email sent to ${to}`);
    return { success: true, data };
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}:`, error.message);
    return { success: false, error: error.message };
  }
}
