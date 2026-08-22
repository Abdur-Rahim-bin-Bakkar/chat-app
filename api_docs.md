# Chat Application API Documentation

This document describes the API endpoints for the chat application feature. 
Since the provided Swagger UI was unreachable, this documentation represents the expected API interface that the application expects. The frontend has been designed to use a service layer that implements these exact endpoints. If the real API differs, the service layer can be updated to match the real backend.

## Base URL
`/api`

## Authentication
Authentication is handled via a lightweight session cookie or token returned upon login.

---

### 1. Login / Register
Logs in a user, or registers them if the phone number is new.

**Endpoint**: `POST /auth/login`

**Request Body**:
```json
{
  "phone": "string (required, E.164 format or simple string)",
  "name": "string (required, display name)"
}
```

**Response**: `200 OK`
```json
{
  "user": {
    "id": "string",
    "name": "string",
    "phone": "string"
  },
  "token": "string"
}
```

---

### 2. Search Users
Search for users by name or phone number to start a conversation.

**Endpoint**: `GET /users`

**Query Parameters**:
- `q`: string (Search query for name or phone)

**Response**: `200 OK`
```json
{
  "users": [
    {
      "id": "string",
      "name": "string",
      "phone": "string"
    }
  ]
}
```

---

### 3. List Conversations
Fetch all conversations (1-on-1 and groups) for the currently authenticated user.

**Endpoint**: `GET /conversations`

**Response**: `200 OK`
```json
{
  "conversations": [
    {
      "id": "string",
      "name": "string (Group name, or null for 1-on-1)",
      "isGroup": "boolean",
      "participants": [
        {
          "id": "string",
          "name": "string"
        }
      ],
      "lastMessage": {
        "id": "string",
        "content": "string",
        "timestamp": "string (ISO 8601)",
        "senderId": "string"
      },
      "unreadCount": "integer"
    }
  ]
}
```

---

### 4. Create Conversation
Start a new conversation (either 1-on-1 or group).

**Endpoint**: `POST /conversations`

**Request Body**:
```json
{
  "participantIds": ["string"],
  "isGroup": "boolean",
  "name": "string (optional, required if isGroup is true)"
}
```

**Response**: `201 Created`
```json
{
  "id": "string",
  "name": "string",
  "isGroup": "boolean",
  "participants": [
    {
      "id": "string",
      "name": "string"
    }
  ]
}
```

---

### 5. Get Messages
Fetch the message history for a specific conversation.

**Endpoint**: `GET /conversations/:id/messages`

**Response**: `200 OK`
```json
{
  "messages": [
    {
      "id": "string",
      "conversationId": "string",
      "senderId": "string",
      "content": "string",
      "timestamp": "string (ISO 8601)"
    }
  ]
}
```

---

### 6. Send Message
Send a message to a conversation.

**Endpoint**: `POST /conversations/:id/messages`

**Request Body**:
```json
{
  "content": "string (required, cannot be empty)"
}
```

**Response**: `201 Created`
```json
{
  "id": "string",
  "conversationId": "string",
  "senderId": "string",
  "content": "string",
  "timestamp": "string (ISO 8601)"
}
```
