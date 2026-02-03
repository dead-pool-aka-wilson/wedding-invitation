import { RSVPFormData, RSVPResponse, rsvpResponseSchema } from "./schema";

const GOOGLE_SHEETS_ENDPOINT = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;

export async function submitRSVP(data: RSVPFormData): Promise<RSVPResponse> {
  if (!GOOGLE_SHEETS_ENDPOINT) {
    return {
      success: false,
      error: "RSVP service not configured",
    };
  }

  try {
    const response = await fetch(GOOGLE_SHEETS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
      }),
    });

    const result = await response.json();
    return rsvpResponseSchema.parse(result);
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to submit RSVP",
    };
  }
}
