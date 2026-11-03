export interface ContactInput {
  name: string;
  email: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export const contactLimits = { name: 80, email: 120, message: 2000 } as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Trims and validates the contact payload; shared by the form and the API route. */
export function validateContact(raw: unknown):
  | { ok: true; data: ContactInput }
  | { ok: false; errors: ContactErrors } {
  const source = (typeof raw === "object" && raw !== null ? raw : {}) as Record<string, unknown>;
  const read = (key: keyof ContactInput) => (typeof source[key] === "string" ? (source[key] as string).trim() : "");

  const data: ContactInput = { name: read("name"), email: read("email"), message: read("message") };
  const errors: ContactErrors = {};

  if (data.name.length < 2) errors.name = "Please enter your name.";
  else if (data.name.length > contactLimits.name) errors.name = `Name must be ${contactLimits.name} characters or fewer.`;

  if (!emailPattern.test(data.email) || data.email.length > contactLimits.email) {
    errors.email = "Please enter a valid email address.";
  }

  if (data.message.length < 10) errors.message = "Please write at least 10 characters.";
  else if (data.message.length > contactLimits.message) {
    errors.message = `Message must be ${contactLimits.message} characters or fewer.`;
  }

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
