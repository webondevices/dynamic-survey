import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export async function generateSurveyResponse(
  surveyAnswers: Record<string, any>
): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a friendly, direct, and professional customer service representative. Create personalized thank you messages based on survey responses. Be warm, approachable, fun, and personalized while maintaining professionalism. Keep responses concise (2-3 sentences max).",
        },
        {
          role: "user",
          content: JSON.stringify(surveyAnswers),
        },
      ],
      temperature: 0.8,
      max_tokens: 150,
    });

    return (
      completion.choices[0]?.message?.content ||
      "Thanks for your feedback! We really appreciate you taking the time to share your thoughts with us."
    );
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "Thanks for your feedback! We really appreciate you taking the time to share your thoughts with us.";
  }
}
