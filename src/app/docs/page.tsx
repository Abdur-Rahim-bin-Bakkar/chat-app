import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "API Documentation | ChatApp",
  description: "API documentation for the Chat Application.",
};

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden ring-1 ring-gray-900/5">
        <div className="bg-gray-900 px-8 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Chat Application API Documentation</h1>
          <Link href="/" className="text-gray-300 hover:text-white flex items-center text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
        </div>
        
        <div className="p-8 prose prose-blue max-w-none text-gray-700">
          <p className="text-lg mb-8 leading-relaxed">
            This document describes the API endpoints for the chat application feature. Since the provided Swagger UI was unreachable, this documentation represents the expected API interface that the application expects. The frontend has been designed to use a service layer that implements these exact endpoints.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">Base URL</h2>
          <code className="bg-gray-100 text-blue-600 px-3 py-1.5 rounded-lg font-mono text-sm block w-fit mb-8">
            /api
          </code>

          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">Authentication</h2>
          <p className="mb-8">Authentication is handled via a lightweight session cookie or token returned upon login.</p>

          <div className="space-y-12">
            {/* Endpoint 1 */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-3">
                <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-md text-xs tracking-wider uppercase">POST</span>
                /auth/login
              </h3>
              <p className="mb-4 text-gray-600">Logs in a user, or registers them if the phone number is new.</p>
              
              <h4 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Request Body</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 text-sm font-mono leading-relaxed">
{`{
  "phone": "string (required, E.164 format or simple string)",
  "name": "string (required, display name)"
}`}
              </pre>

              <h4 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Response <span className="text-green-600 font-normal normal-case ml-2">200 OK</span></h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
{`{
  "user": {
    "id": "string",
    "name": "string",
    "phone": "string"
  },
  "token": "string"
}`}
              </pre>
            </section>

            {/* Endpoint 2 */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-3">
                <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-md text-xs tracking-wider uppercase">GET</span>
                /users
              </h3>
              <p className="mb-4 text-gray-600">Search for users by name or phone number to start a conversation.</p>
              
              <h4 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Query Parameters</h4>
              <ul className="list-disc pl-5 mb-4 text-gray-600">
                <li><code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm text-gray-800">q</code>: string (Search query for name or phone)</li>
              </ul>

              <h4 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Response <span className="text-green-600 font-normal normal-case ml-2">200 OK</span></h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
{`{
  "users": [
    {
      "id": "string",
      "name": "string",
      "phone": "string"
    }
  ]
}`}
              </pre>
            </section>

            {/* Endpoint 3 */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-3">
                <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-md text-xs tracking-wider uppercase">GET</span>
                /conversations
              </h3>
              <p className="mb-4 text-gray-600">Fetch all conversations (1-on-1 and groups) for the currently authenticated user.</p>

              <h4 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Response <span className="text-green-600 font-normal normal-case ml-2">200 OK</span></h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
{`{
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
}`}
              </pre>
            </section>

            {/* Endpoint 4 */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-3">
                <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-md text-xs tracking-wider uppercase">POST</span>
                /conversations
              </h3>
              <p className="mb-4 text-gray-600">Start a new conversation (either 1-on-1 or group).</p>
              
              <h4 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Request Body</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 text-sm font-mono leading-relaxed">
{`{
  "participantIds": ["string"],
  "isGroup": "boolean",
  "name": "string (optional, required if isGroup is true)"
}`}
              </pre>

              <h4 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Response <span className="text-blue-600 font-normal normal-case ml-2">201 Created</span></h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
{`{
  "id": "string",
  "name": "string",
  "isGroup": "boolean",
  "participants": [
    {
      "id": "string",
      "name": "string"
    }
  ]
}`}
              </pre>
            </section>

            {/* Endpoint 5 */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-3">
                <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-md text-xs tracking-wider uppercase">GET</span>
                /conversations/:id/messages
              </h3>
              <p className="mb-4 text-gray-600">Fetch the message history for a specific conversation.</p>

              <h4 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Response <span className="text-green-600 font-normal normal-case ml-2">200 OK</span></h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
{`{
  "messages": [
    {
      "id": "string",
      "conversationId": "string",
      "senderId": "string",
      "content": "string",
      "timestamp": "string (ISO 8601)"
    }
  ]
}`}
              </pre>
            </section>

            {/* Endpoint 6 */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-3">
                <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-md text-xs tracking-wider uppercase">POST</span>
                /conversations/:id/messages
              </h3>
              <p className="mb-4 text-gray-600">Send a message to a conversation.</p>
              
              <h4 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Request Body</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 text-sm font-mono leading-relaxed">
{`{
  "content": "string (required, cannot be empty)"
}`}
              </pre>

              <h4 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Response <span className="text-blue-600 font-normal normal-case ml-2">201 Created</span></h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
{`{
  "id": "string",
  "conversationId": "string",
  "senderId": "string",
  "content": "string",
  "timestamp": "string (ISO 8601)"
}`}
              </pre>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
