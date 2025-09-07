import { Resend } from "resend";

export async function sendEmail({ to, subject, html }) {
  const resend = new Resend(process.env.RESEND_API_KEY || "");

  try {
    const data = await resend.emails.send({
      from: "BudgetIQ <onboarding@resend.dev>",
      to,
      subject,
      html, // <-- pass HTML, not React component
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}
