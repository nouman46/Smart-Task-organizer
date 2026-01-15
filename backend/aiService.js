// backend/aiService.js
import OpenAI from "openai";

// We use the OpenAI client but point it at DeepSeek's API
const deepseek = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
});

export const getSmartTaskDetails = async (title) => {
  
  const now = new Date();
  const localDate = now.toLocaleDateString('en-CA'); // YYYY-MM-DD

  const prompt = `
    Analyze the following task. 
    Today's local date is: ${localDate} (YYYY-MM-DD)

    Return a JSON object with:
    1. "category": (e.g., "Work", "Personal", "Errand", "Learning", "Finance", "Health")
    2. "priority": ("Low", "Medium", "High")
    3. "dueDate": A suggested due date in ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ).
       
       - "today" means ${localDate}. "tomorrow" means the day after ${localDate}.
       
       - **Rule 1:** If the user specifies a time (e.g., "today at 4pm"), return the full ISO 8601 string for that *exact* time.
       - **Rule 2:** If the user does *not* specify a time (e.g., "food today"), set the time to **noon (12:00:00)** for that date and return the full ISO 8601 string.
       - **Rule 3:** If no specific date is implied, return null.

    Base your analysis on the task title: "${title}"
    Return *only* the JSON object.
  `;

  try {
    const completion = await deepseek.chat.completions.create({
      model: "deepseek-chat", 
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const aiResponse = completion.choices[0].message.content;
    const smartDetails = JSON.parse(aiResponse);

    if (smartDetails.dueDate && new Date(smartDetails.dueDate).toString() === "Invalid Date") {
      smartDetails.dueDate = null;
    }

    return smartDetails;

  } catch (error) {
    console.error("AI Service Error (DeepSeek):", error);
    // Fallback in case AI fails
    return {
      category: "Uncategorized",
      priority: "Medium",
      dueDate: null,
    };
  }
};