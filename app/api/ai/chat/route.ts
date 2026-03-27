import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Groq API key not configured." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { messages } = body;

const systemPrompt = `
You are NyayaSetu Assistant, a helpful civic assistant for Delhi citizens.

SCOPE: You ONLY answer questions related to:
- Delhi government schemes, services, and policies
- Civic complaints and grievances
- Government documents (Aadhaar, ration card, certificates, etc.)
- Public utilities (water, electricity, sanitation, transport)
- Legal aid, RTI, and citizen rights in Delhi
- Local municipal or Delhi government offices and procedures

Rules:
- Keep responses under 400 words.
- If user writes in Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, or Punjabi, respond in that language.
- CRITICAL: If the user writes in Hinglish (Hindi written using the English alphabet, e.g., "mein ladli scheme ke baare m janna chahta hun"), you MUST reply in proper Hindi (using Devanagari script). Do not reply in English or Hinglish.
- Ensure spelling and grammar are respectful and clear.
- If asked about complaint status, tell them to use the tracking page.
- Do not invent government schemes.

OUT-OF-SCOPE RULE:
If the user's message is unrelated to Delhi civic services, government schemes, or citizen rights (e.g., cricket, recipes, jokes, general knowledge, personal advice), respond ONLY with:
"मैं केवल दिल्ली सरकार की सेवाओं और नागरिक मुद्दों में सहायता कर सकता हूँ। / I can only assist with Delhi government services and civic matters."
Do not engage with, answer, or comment on any off-topic query in any way.
`;

    const stream = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      stream: true,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
    });

    const encoder = new TextEncoder();

    return new Response(
      new ReadableStream({
        async start(controller) {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({text:content})}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        },
      }),
      {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      }
    );
  } catch (error) {
    console.error("Groq chat error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
