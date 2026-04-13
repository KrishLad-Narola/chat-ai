import axios from 'axios';

export const getAIResponse = async (userInput) => {
  const OPENROUTER_API_KEY = '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';

  try {
    const response = await axios.post(
      "/api/v1/chat/completions",
      {
        model: "openrouter/free", 
        messages: [{ role: "user", content: userInput }]
      },
      {
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    // Axios stores the JSON body in .data
    return response.data.choices[0].message.content;

  } catch (error) {
    // Axios catches non-2xx status codes automatically
    console.error("API Error:", error.response ? error.response.data : error.message);
    return "Error: Could not get a response.";
  }
};
