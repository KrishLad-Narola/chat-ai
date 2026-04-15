import axios from 'axios';

export const getAIResponse = async (userInput) => {
  const OPENROUTER_API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY;

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

    return response.data.choices[0].message.content;

  } catch (error) {
    console.error("API Error:", error.response ? error.response.data : error.message);
    return "Error: Could not get a response.";
  }
};