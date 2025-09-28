"use server";

import { Resend } from "resend";
import { render } from "@react-email/render";

const resend = new Resend(process.env.RESEND_API_KEY || "");

/**
 * Sends an email with a React template.
 * @param {Object} params
 * @param {string} params.to - Recipient email
 * @param {string} params.subject - Email subject
 * @param {JSX.Element} params.react - React email template component
 */
export async function sendEmail({ to, subject, react }) {
  try {
    if (!to) throw new Error("Missing recipient email address");
    if (!subject) throw new Error("Missing subject line");

    // Convert React template → HTML string
    const html = render(react);

    // Send via Resend
    const data = await resend.emails.send({
      from: "BudgetIQ <onboarding@resend.dev>", 
      to,
      subject,
      html,
    });

    console.log(`✅ Email sent to ${to}`);
    return { success: true, data };
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}:`, error);
    return { success: false, error: error.message };
  }
}
