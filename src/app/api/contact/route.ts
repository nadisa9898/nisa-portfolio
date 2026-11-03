import { validateContact } from "@/lib/validation";

/** Same-origin check so the endpoint can't be driven from other sites' browsers. */
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  return origin === new URL(request.url).origin;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return Response.json({ error: "Forbidden." }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field; pretend success without sending.
  if (typeof body === "object" && body !== null && (body as Record<string, unknown>).website) {
    return Response.json({ ok: true });
  }

  const result = validateContact(body);
  if (!result.ok) {
    return Response.json({ error: "Please fix the highlighted fields.", errors: result.errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) {
    return Response.json(
      { error: "Messaging isn't set up yet. Please email directly instead." },
      { status: 503 },
    );
  }

  const { name, email, message } = result.data;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      html: `<p><strong>${escapeHtml(name)}</strong> (${escapeHtml(email)})</p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
    }),
  });

  if (!response.ok) {
    return Response.json({ error: "Couldn't send your message. Please try again later." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
