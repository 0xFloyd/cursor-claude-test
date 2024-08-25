# ChatGPT Clone with Cursor + Claude 3.5 Sonnet

![Cursor Claude Demo](https://github.com/0xFloyd/cursor-claude-test/blob/main/cursor-claude-gif.gif)

This project demonstrates the power of AI-assisted development by recreating the ChatGPT web application using only natural language prompts with [Claude 3.5 Sonnet](https://www.anthropic.com/news/claude-3-5-sonnet) in the [Cursor IDE](https://www.cursor.com/).

**❗ NO MANUAL CODING OR EDITS ALLOWED ❗**

## Inspiration

Heavily inspired by [@mcckay](https://twitter.com/mcckay) and his YouTube video: [How To Build An AI Chat App With Cursor Using Natural Language](https://youtu.be/9yS0dR0kP-s?si=AQ5pIYQzhyuETUSm)

## Project Overview

- Built using Next.js, the [Vercel AI SDK](https://sdk.vercel.ai/), and the [OpenAI API](https://platform.openai.com/)
- Developed entirely through natural language prompts to Claude 3.5 Sonnet in Cursor IDE
- Minimal manual code changes, focusing on [applying AI-suggested code changes without manual edits](https://www.cursor.com/features)

## Features

- Streaming message support
- Multiple chat sessions
- Local storage for chat history
- Responsive UI similar to ChatGPT

## Development Process

The development flow consisted of:

1. Using Cursor IDE and its chat interface with Claude 3.5 Sonnet
2. Articulating features and bugs in natural language
3. Applying AI-suggested code changes without manual edits

This approach proved highly effective for both implementing new features and debugging existing code.

## Local Usage

To run this project locally:

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your OpenAI API key:
   - Get your API key from [OpenAI's platform](https://platform.openai.com/docs/overview)
   - Create a `.env` file based on `.env.example` and add your API key
4. Start the development server:
   ```
   npm run dev
   ```

## For Non-Technical Users

If you're not familiar with the technical aspects, you can ask the AI to explain the code changes and functionality in simpler terms. Just prompt with "I'm not technical, can you explain what you did here?"

## Conclusion

This project showcases the potential of AI-assisted development, demonstrating that complex web applications can be built primarily through natural language interaction with AI models.
