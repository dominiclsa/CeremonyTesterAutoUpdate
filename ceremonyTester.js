import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const TOKEN = process.env.TOKEN;
const BASE_URL = process.env.BASE_URL;
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL; // Discord Webhook

if (!TOKEN) {
  console.error("Error: TOKEN is not set in .env file");
  process.exit(1);
}

if (!DISCORD_WEBHOOK_URL) {
  console.error("Error: DISCORD_WEBHOOK_URL is not set in .env file");
  process.exit(1);
}

// Function to send a webhook notification to Discord
const sendDiscordNotification = async (message) => {
  try {
    await axios.post(DISCORD_WEBHOOK_URL, {
      content: message, // Message content
    });

    console.log("✅ Notification sent to Discord!");
  } catch (error) {
    console.error(
      "❌ Error sending Discord notification:",
      error.response?.data || error.message
    );
  }
};

// Function to decode the token and check expiry
const timeUntilExpiry = (token) => {
  const [, payload] = token.split(".");
  const decodedPayload = JSON.parse(
    Buffer.from(payload, "base64").toString("utf-8")
  );
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  const timeLeft = decodedPayload.exp - currentTime;

  console.log(
    timeLeft > 0
      ? `Token is valid. Time left: ${timeLeft} seconds`
      : "Token has expired. Please refresh your token."
  );

  return Math.max(timeLeft, 0);
};

// Ping to keep the session alive
const pingToken = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/ceremony/ping`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    console.log("Ping Response:", response.data);
  } catch (error) {
    console.error(
      "Error pinging the token:",
      error.response?.data || error.message
    );
  }
};

// Check queue position
const checkQueuePosition = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/ceremony/position`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    console.log("Queue Position Response:", response.data);
    return response.data.behind; // Return the number of users in the queue
  } catch (error) {
    console.error(
      "Error fetching queue position:",
      error.response?.data || error.message
    );
    return null;
  }
};

// Main function to monitor, ping, and contribute
const main = async () => {
  const timeLeft = timeUntilExpiry(TOKEN);

  if (timeLeft <= 0) {
    console.error("Token has expired. Exiting...");
    return;
  }

  const pingInterval = 300000; // Ping every 5 minutes
  const monitorInterval = 60000; // Check queue position every 1 minute

  console.log("Starting queue monitoring and pinging...");

  // Ping the server periodically to keep the token alive
  const pingTimer = setInterval(() => {
    console.log("Pinging to keep the session alive...");
    pingToken();
  }, pingInterval);

  // Monitor queue position periodically
  const monitorTimer = setInterval(async () => {
    const behind = await checkQueuePosition();

    if (behind !== null && behind <= 10) {
      const message = `🚀 You are within the top 10! Visit [Ceremony Page](https://ceremony.silentprotocol.org/ceremonies) to contribute now!`;
      console.log(message);
      sendDiscordNotification(message);

      clearInterval(monitorTimer); // Stop monitoring
      clearInterval(pingTimer); // Stop pinging
    }
  }, monitorInterval);

  // Automatically stop monitoring and pinging when the token expires
  setTimeout(() => {
    console.log("Token expired. Stopping monitoring and pinging...");
    clearInterval(monitorTimer);
    clearInterval(pingTimer);
  }, timeLeft * 1000);
};

main();
