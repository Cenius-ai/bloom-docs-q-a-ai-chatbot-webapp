# Usage Guide

Bloom is a single-page application that runs in the browser. Once the development server is running, open `http://localhost:4200` in a web browser.

## Main Screens

The application includes the following pages, accessible via the sidebar navigation:

- **Conversations** (`/conversations`): View a list of past conversation threads. Click on a conversation to see its detail.
- **Conversation Detail** (`/conversations/:id`): Engage in a Q&A chat. Type questions in the input box to get AI-generated answers based on your documents. The chat history is displayed using `chat-message` components.
- **Documents** (`/documents`): Browse uploaded documents. Each document can be clicked to view details.
- **Document Detail** (`/documents/:id`): View information about a specific document, such as its name, size, and upload date.
- **Settings** (`/settings`): Toggle between light and dark theme. Other appearance or application settings may be available.

## Theme Toggle

Use the theme toggle in the sidebar or settings page to switch between light and dark mode. The application defaults to the system preference.

## Chat Interaction

In a conversation:

1. Type a question into the chat input at the bottom of the screen.
2. Press Enter or click the send button.
3. The AI assistant will process your query using the document knowledge base and display a response.
4. You can continue the conversation with follow-up questions.

## Demo Data

The application includes seeded demo data for conversations and documents to illustrate functionality without requiring an external backend.

All components and services are located in `src/app/`. For development, you can modify source files and the dev server will hot-reload.