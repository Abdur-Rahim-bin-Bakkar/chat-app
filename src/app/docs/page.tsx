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
            A real-time 1-to-1 and group chat API (REST + WebSocket) used by this application.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">Base URL</h2>
          <code className="bg-gray-100 text-blue-600 px-3 py-1.5 rounded-lg font-mono text-sm block w-fit mb-8">
            https://frontend-task-chatapp.onrender.com/api
          </code>

          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">Authentication</h2>
          <p className="mb-4"><code>POST /auth/login</code> with a phone number and a name. There is no separate signup — a new phone number is registered automatically; an existing one logs in.</p>
          <p className="mb-8">Send the returned token on every protected request: <code>Authorization: Bearer &lt;token&gt;</code>.</p>

          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">WebSocket (Socket.io)</h2>
          <p className="mb-4">Connect to the server's root origin: <code>https://frontend-task-chatapp.onrender.com</code> with the JWT in the handshake auth.</p>
          <ul className="list-disc pl-5 mb-8">
            <li><strong>message:new</strong> (server → client): a new message arrived for you.</li>
            <li><strong>conversation:updated</strong> (server → client): a group you're in changed.</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">REST Endpoints</h2>

          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-3">
                <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-md text-xs tracking-wider uppercase">POST</span>
                /auth/login
              </h3>
              <p className="text-sm text-gray-600 mb-2">Log in or register.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-3">
                <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-md text-xs tracking-wider uppercase">GET</span>
                /auth/me
              </h3>
              <p className="text-sm text-gray-600 mb-2">Current user.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-3">
                <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-md text-xs tracking-wider uppercase">GET</span>
                /users/search
              </h3>
              <p className="text-sm text-gray-600 mb-2">Search users by name or phone. Query: <code>?q=&lt;string&gt;</code></p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-3">
                <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-md text-xs tracking-wider uppercase">GET</span>
                /conversations
              </h3>
              <p className="text-sm text-gray-600 mb-2">List my conversations.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-3">
                <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-md text-xs tracking-wider uppercase">POST</span>
                /conversations
              </h3>
              <p className="text-sm text-gray-600 mb-2">Start a direct conversation. Body: <code>{`{ userId }`}</code></p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-3">
                <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-md text-xs tracking-wider uppercase">POST</span>
                /conversations/group
              </h3>
              <p className="text-sm text-gray-600 mb-2">Create a group. Body: <code>{`{ userIds, name }`}</code></p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-3">
                <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-md text-xs tracking-wider uppercase">GET</span>
                /conversations/:id/messages
              </h3>
              <p className="text-sm text-gray-600 mb-2">Get message history.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-3">
                <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-md text-xs tracking-wider uppercase">POST</span>
                /messages
              </h3>
              <p className="text-sm text-gray-600 mb-2">Send a message. Body: <code>{`{ conversationId, text }`}</code></p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
