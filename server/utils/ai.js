import { ChatGroq } from "@langchain/groq";
import "dotenv/config";
const apiKey = process.env.GROQ_API_KEY;

const llm = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  temperature: 0,
  apiKey,
});

const response = await llm.invoke("What is payzee");
console.log(response.content);
