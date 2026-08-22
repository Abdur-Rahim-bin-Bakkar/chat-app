# Chat API 1.0.0 Documentation

A real-time 1-to-1 and group chat API (REST + WebSocket).

## Base URL
Live deployment: `https://frontend-task-chatapp.onrender.com/api`

## Authentication
`POST /auth/login` with a phone number and a name. There is no separate signup — a new phone number is registered automatically; an existing one logs in.
The response includes a JWT. Send the token on every protected request: `Authorization: Bearer <token>`.

---

## WebSocket (Socket.io)
Connect to the server's root origin: `https://frontend-task-chatapp.onrender.com`
Connect with the JWT in the handshake:
```js
const socket = io('https://frontend-task-chatapp.onrender.com', { auth: { token } });
```
### Events
- `message:new` (server → client): a new message arrived for you.
- `conversation:updated` (server → client): a group you're in changed (created, renamed, or members/admins changed).
- `message:send` (client → server): `{ conversationId, text }` (optional ack callback).

---

## REST Endpoints

### Auth
- **POST /auth/login**: Log in or register.
  - Body: `{ "phone": "string", "name": "string" }`
- **GET /auth/me**: Get current user.

### Users
- **GET /users/search**: Search users by name or phone.
  - Query: `?q=<string>`

### Conversations
- **GET /conversations**: List my conversations.
- **POST /conversations**: Start a direct conversation.
  - Body: `{ "userId": "string" }`
- **GET /conversations/{id}/messages**: Get message history.

### Groups
- **POST /conversations/group**: Create a group.
  - Body: `{ "userIds": ["string"], "name": "string" }`
- **POST /conversations/{id}/participants**: Add members to a group.
  - Body: `{ "userIds": ["string"] }`
- **DELETE /conversations/{id}/participants/{userId}**: Remove a member / leave a group.
- **POST /conversations/{id}/admins**: Promote a member to admin.
- **PATCH /conversations/{id}**: Rename a group.

### Messages
- **POST /messages**: Send a message.
  - Body: `{ "conversationId": "string", "text": "string" }`

### System
- **GET /health**: Health check.
