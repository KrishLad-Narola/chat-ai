export async function sendMsgToOpenAI(message) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer AIzaSyB40-HZQREFkzM3tGYZ_HOGekMfdysAlxE",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b:free", 
      messages: [
        { role: "user", content: message }
      ],
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(data);
    return data.error?.message || "Something went wrong";
  }

  return data.choices?.[0]?.message?.content || "No response";
}