# 3D Language Tutor (Beta)

> **AI Powered by Gemini 2.5 Flash**

Welcome to your personal 3D AI Language Tutor. This interactive web application allows you to practice any language through voice conversation with a friendly 3D avatar.

![Beta](https://img.shields.io/badge/status-beta-orange)
![Gemini](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-blue)

## Features

- **Interactive 3D Professor**: A friendly, animated 3D avatar that reacts to your voice and emotions.
- **Real-time Conversation**: Talk naturally to the AI to practice pronunciation, vocabulary, and fluency.
- **Multi-language Support**: Automatically detects your browser language and can teach/practice ANY language you ask for.
- **Voice-First Experience**:
  - **Speech-to-Text**: Just speak to the microphone.
  - **Text-to-Speech**: The professor replies with a natural voice.
- **Educational Focus**: The AI is strictly prompted to act as a language teacher, keeping conversations focused on learning.

## Tech Stack

- **Frontend**: React, Vite
- **3D Engine**: Three.js, React Three Fiber, Drei
- **AI Model**: Google Gemini 2.5 Flash
- **Voice**: Web Speech API (Native Browser Support)

## Getting Started

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Set up environment variables**:
    - Create a `.env` file based on `.env.example`.
    - Add your Google Gemini API Key:
      ```
      VITE_GEMINI_API_KEY=your_api_key_here
      ```
4.  **Run the development server**:
    ```bash
    npm run dev
    ```
5.  **Start Learning**: Open your browser and start chatting!

## Version

Current Version: **0.1.0-beta**

---
*Created with ❤️ for language learners.*
