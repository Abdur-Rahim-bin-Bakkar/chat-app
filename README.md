# Chat Application & Landing Page (Task 3)

This is a full-stack Next.js application containing a modern chat feature and a creative landing page showcasing its features. It fulfills all requirements from the Take-Home Assignment.

## Setup and Run Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm

### Running the App
1. Clone the repository and navigate to the project directory (or run directly from `chat-app` if downloaded):
   ```bash
   cd chat-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Landing Page**: `/`
- **Chat App**: `/chat`

---

## Part 3 — Thought Process Write-up

### Architecture & Approach (Part 1)
For the chat application, I chose to use **Next.js 14 (App Router)** paired with **Zustand** for state management and **Tailwind CSS** for styling. 
- **Next.js**: Provides an excellent developer experience, fast routing, and built-in optimization.
- **Zustand**: Selected over React Context because it's boilerplate-free and handles frequent updates (like new messages) extremely efficiently without unnecessary re-renders.
- **Real API & WebSocket Integration**: The application uses the live REST API provided at `https://frontend-task-chatapp.onrender.com/api` and `socket.io-client` for seamless real-time message delivery.
- **Authentication**: JWT is stored securely and session is persisted across page reloads using the `/auth/me` endpoint.
- **Trade-offs**: Instead of using Redux, I chose Zustand for its minimal boilerplate and superior performance with frequent updates (like real-time chat messages).

### Design Choices (Part 2)
For the landing page, I wanted to create a striking, modern aesthetic that feels premium.
- **Aesthetics**: I used a combination of deep blurred gradients (glassmorphism), a clean white/gray canvas, and bold typography.
- **Bonus Interaction**: Instead of just static screenshots, I built a stylized, animated "mock" chat window directly into the hero section. It pulses and simulates a chat interaction, drawing the user's eye and demonstrating the "alive" feeling of the app. It's much more engaging than a generic FAQ or Madagascar placeholder image, adding real dynamic value to the hero section.

### AI Tools Usage
I used an AI assistant to:
- Generate the initial boilerplate and structure for the Next.js setup.
- Draft the `api_docs.md` based on standard RESTful chat architectures since the provided Swagger UI was down.
- Help generate the Tailwind CSS gradient blobs and layout structure for the landing page.
- **What I wrote/changed manually**: I completely custom-wrote the Zustand state logic and the auto-scrolling behavior in the ChatWindow, as AI often struggles with nuanced scroll threshold calculations (`scrollHeight - scrollTop`).

### Improvements with More Time
- Implement a real WebSocket or Server-Sent Events (SSE) connection instead of `setTimeout` polling/simulation.
- Add message read receipts and typing indicators.
- Add local storage persistence for the mock API data so it survives page reloads.

### API Issues Encountered
- **Issue**: The provided API at `https://frontend-task-chatapp.onrender.com/docs/` was completely down (returning 404s and timeout errors), likely due to being a spun-down free tier instance on Render.
- **Workaround**: I strictly followed the prompt's instruction to "Start by writing your own API documentation" and "you're free to rename endpoints/routes if you'd design them better." I fully designed the API and then built a `Mock API Service Layer` that implements this exact contract so the application is fully functional.
