#!/usr/bin/env python3
"""a module for recommendation responses using Google's Gemini model"""
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai # type: ignore
from dotenv import load_dotenv # type: ignore

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure Gemini API
api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    raise ValueError("Missing GEMINI_API_KEY environment variable")

genai.configure(api_key=api_key)

# Define the system prompt for the recommender
RECOMMENDER_PROMPT = """You are a helpful recommendation assistant. Your job is to provide personalized 
recommendations based on user preferences and needs. Follow these guidelines:

1. Ask clarifying questions if you need more information to make better recommendations
2. Provide 3-5 specific recommendations for any request
3. For each recommendation, briefly explain why it might be a good fit
4. Consider factors like user preferences, budget, experience level, and specific requirements 
5. Be concise and focus on quality recommendations rather than general advice
6. If you don't have enough information to provide good recommendations, politely ask for more details

Focus your recommendations on products, media (books, movies, music), activities, or services that match 
the user's needs. Always prioritize the user's stated preferences over general popularity.
"""

model = genai.GenerativeModel('gemini-1.5-flash', 
                            generation_config={
                                "temperature": 0.7, 
                                "max_output_tokens": 1024
                            })

# Store conversation history
conversation_history = {}

@app.route('/chat', methods=['POST'], strict_slashes=False)
def chat():
    """Function to chat with the Gemini model and get personalized recommendations"""
    data = request.json
    user_input = data.get('user_input')
    session_id = data.get('session_id', 'default')
    
    if not user_input:
        return jsonify({"error": "No user input provided"}), 400
    
    # Initialize conversation for new sessions
    if session_id not in conversation_history:
        conversation_history[session_id] = model.start_chat(
            history=[
                {"role": "user", "parts": [RECOMMENDER_PROMPT]},
                {"role": "model", "parts": ["I'll act as a recommendation assistant, providing personalized suggestions based on user preferences."]}
            ]
        )
    
    chat_session = conversation_history[session_id]
    
    try:
        # Send request to Gemini
        response = chat_session.send_message(user_input)
        
        # Extract and format response
        ai_response = response.text
        
        return jsonify({
            "response": ai_response,
            "session_id": session_id
        })
        
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)