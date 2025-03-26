import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/chatbot", { message });
      setResponse(res.data.response);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setResponse("Failed to get response from AI.");
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
      <h2>Ask Campus Connect AI</h2>
      <input
        type="text"
        placeholder="Ask about donations..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "70%", padding: "10px", marginRight: "10px" }}
      />
      <button onClick={handleSend} style={{ padding: "10px", cursor: "pointer" }}>Ask</button>
      <p><strong>AI Response:</strong> {response}</p>
    </div>
  );
};

export default Chatbot;
