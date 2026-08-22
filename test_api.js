const { io } = require("socket.io-client");
const BASE_URL = 'https://frontend-task-chatapp.onrender.com/api';

async function test() {
  try {
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: "555-1000", name: "User A" })
    });
    const { token, user: userA } = await loginRes.json();

    const searchRes = await fetch(`${BASE_URL}/users/search?q=User`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const searchData = await searchRes.json();
    console.log("Search 'User':", searchData.slice(0, 3)); // show first 3
    
    // Connect socket
    const socket = io('https://frontend-task-chatapp.onrender.com', { auth: { token } });
    socket.on('connect', () => console.log('Socket connected'));
    socket.on('message:new', msg => console.log('Socket message:new ->', msg));

    // Get conversations
    const chatRes = await fetch(`${BASE_URL}/conversations`, { headers: { Authorization: `Bearer ${token}` } });
    const chatData = await chatRes.json();
    const conv = chatData.data ? chatData.data[0] : chatData[0];
    
    console.log("First Conv:", conv._id, "type:", conv.type, "participants:", conv.participants || conv.participant);

    if (conv) {
      console.log(`Sending message to ${conv._id}...`);
      const msgRes = await fetch(`${BASE_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ conversationId: conv._id, text: "Ping!" })
      });
      const msgData = await msgRes.json();
      console.log("REST msg response:", msgData);
    }

    await new Promise(r => setTimeout(r, 2000));
    socket.disconnect();

  } catch (e) {
    console.error(e);
  }
}

test();
