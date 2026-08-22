const BASE_URL = 'https://frontend-task-chatapp.onrender.com/api';

async function test() {
  try {
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: "555-1000", name: "User A" })
    });
    const { token } = await loginRes.json();

    const chatRes = await fetch(`${BASE_URL}/conversations`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const chatData = await chatRes.json();
    const convId = chatData.data[0]._id;

    console.log("Fetching messages for conversation:", convId);
    const msgRes = await fetch(`${BASE_URL}/conversations/${convId}/messages`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const msgData = await msgRes.json();
    
    console.log("Message History Response:", JSON.stringify(msgData, null, 2));

  } catch (e) {
    console.error(e);
  }
}

test();
