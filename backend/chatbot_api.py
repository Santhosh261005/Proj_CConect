from flask import Flask, request, jsonify
import google.generativeai as genai
import os
from flask_cors import CORS
from dotenv import load_dotenv

# Load API key from .env file
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Initialize Gemini API
genai.configure(api_key=GEMINI_API_KEY)

# Flask App
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Your website description for Gemini context
website_info = """
Campus Connect is an AI-powered donation platform designed for students and faculty 
to donate books, clothes, and essential items to verified NGOs, orphanages, and shelters. 
It offers real-time tracking, a chatbot for guidance, and gamified rewards for active donors. 
Built with React.js, Node.js, and MongoDB, the platform ensures secure transactions 
and seamless communication between donors and NGOs. It also suggests donations 
based on user preferences and historical contributions.
"""

# Define common questions and answers for better chatbot responses
faq_responses = {
    "how to donate": "To donate, sign in, choose an NGO, select items to donate, and schedule a pickup or drop-off.",
    "what can i donate": "You can donate books, clothes, shoes, stationery, and electronics. Consider donating lightly used items in good condition.",
    "how does the donation process work": "After selecting items and an NGO, the NGO verifies your donation, and you receive a confirmation.",
    "is there a reward system": "Yes! Active donors earn points and badges that can be redeemed for benefits."
}

# Chatbot route
@app.route("/chatbot", methods=["POST"])
def chatbot():
    try:
        user_input = request.json.get("message", "").lower()

        # Check if the question matches predefined FAQs
        for question, answer in faq_responses.items():
            if question in user_input:
                return jsonify({"response": answer})

        # If not in FAQs, send query to Gemini
        prompt = f"""
        User: {user_input}
        Context: {website_info}
        Answer the user's question in a helpful and friendly manner.
        """
        response = genai.chat(prompt)
        return jsonify({"response": response.text})

    except Exception as e:
        print("Error:", e)
        return jsonify({"response": "Sorry, I couldn't process your request at the moment."})

if __name__ == "__main__":
    app.run(debug=True)
