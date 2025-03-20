#!/usr/bin/env python3
"""a module for chat recommendations"""
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)

model_name = "microsoft/DialoGPT-medium"  # You can also use "small" or "large"
tokenizer = AutoTokenizer.from_pretrained(model_name, force_download=True)
model = AutoModelForCausalLM.from_pretrained(model_name, force_download=True)


chat_history_ids = None

CORS(app)


@app.route('/chat', methods=['POST'], strict_slashes=False)
def main():
    """a function to chat with the model"""
    # Get user input
    user_input = request.json['user_input']

    # Encode user input and append to chat history
    new_input_ids = tokenizer.encode(user_input + tokenizer.eos_token, return_tensors='pt')

    # If chat history is empty, initialize with user input
    # Otherwise, concatenate the new user input with the chat history
    chat_history_ids = torch.cat([chat_history_ids, new_input_ids], dim=-1) if chat_history_ids is not None else new_input_ids

    # Generate response
    response_ids = model.generate(chat_history_ids, max_length=1000, pad_token_id=tokenizer.eos_token_id)

    # Decode the response and return it
    response = tokenizer.decode(response_ids[:, chat_history_ids.shape[-1]:][0], skip_special_tokens=True)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(port=5000)