# 3D AI Professor (Beta)

> **AI Powered by Gemini 2.5 Flash**

Welcome to your interactive 3D AI Professor. This open-source project combines the power of Generative AI with immersive 3D web technologies to create engaging educational experiences.

## Project Scope: The "Glot" Use Case & Beyond

Currently, this codebase is configured to demonstrate the **"Glot"** use case: a **Language Tutor**. The 3D avatar acts as a friendly language teacher, helping users practice pronunciation, vocabulary, and fluency through natural conversation.

However, this project is designed as a flexible **3D AI Educational Platform**. By simply adjusting the system prompt within the code, you can transform this 3D professor into an expert in **any subject**—history, mathematics, coding, or specialized corporate training.

**Experience the live "Glot" use case here:** [https://class.glot.school/](https://class.glot.school/)

![Beta](https://img.shields.io/badge/status-beta-orange)
![Gemini](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-blue)

## Features

- **Interactive 3D Professor**: A friendly, animated 3D avatar that reacts to your voice and emotions.
- **Real-time Conversation**: Talk naturally to the AI to practice, learn, and discuss topics fluently.
- **Multi-language Support**: Automatically detects your browser language and can teach or interact in ANY language you ask for.
- **Voice-First Experience**:
  - **Speech-to-Text**: Just speak to the microphone.
  - **Text-to-Speech**: The professor replies with a natural voice.
- **Adaptable Educational Focus**: The AI is configured by default as a language teacher (Glot), but can be prompted to act as any educational guide, keeping conversations focused on learning.

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
5.  **Start Learning**: Open your browser and start interacting!

## Version

Current Version: **0.1.0-beta**

---
*Created with ❤️ for the future of education.*
