CeremonyTesterAutoUpdate

A simple script that monitors your queue position for the Silent Protocol ceremony and alerts you via Discord when you are ready to contribute.

📌 Features

Automatically checks your queue position every minute.
Sends a Discord webhook notification when you're in the top 10.
Keeps the session alive with periodic pings.
Helps you contribute at the right time.
🔧 Setup Instructions

1️⃣ Clone the Repository
git clone https://github.com/your-repo/CeremonyTesterAutoUpdate.git
cd CeremonyTesterAutoUpdate
2️⃣ Install Dependencies
Make sure you have Node.js installed, then install the required packages:

npm install
3️⃣ Retrieve Your Silent JWT Token
You need your Silent Protocol JWT Token to authenticate.

Go to the Ceremony Page:
👉 https://ceremony.silentprotocol.org/ceremonies
Open Developer Tools:
On Chrome/Edge: Press F12 or Ctrl + Shift + I (Windows/Linux) or Cmd + Opt + I (Mac).
On Firefox: Press F12 or Cmd + Opt + I (Mac).
Go to the "Application" Tab
In the top menu, find the "Application" tab.
Find Local Storage:
On the left panel, expand Local Storage.
Click on https://ceremony.silentprotocol.org.
Locate the Token:
Find the key silent_jwt.
Copy the value (this is your token).
![Image Description](https://ibb.co/xSSjsFGg)

4️⃣ Set Up Environment Variables
Create a .env file and add your token:

cp .env.example .env
Then edit the .env file and fill in your token and Discord webhook URL:

TOKEN=your_silent_jwt_token_here
BASE_URL=https://ceremony-backend.silentprotocol.org
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/your-webhook-id/your-webhook-token
📌 Add an image here showing the .env setup.

5️⃣ Run the Script
Start monitoring your queue position:

node ceremonyTester.js
🔔 How It Works

The script checks your queue position every minute.
If you are within the top 10, you will get a Discord notification.
Once notified, go to 👉 https://ceremony.silentprotocol.org/ceremonies and complete your contribution.
![Image Description](https://ibb.co/tT5Ng2MY)

🛠️ Troubleshooting

❌ Token is undefined!
Ensure your .env file is correctly set up.
Make sure to restart your terminal after adding the token.
Run:
node -r dotenv/config ceremonyTester.js
❌ No Discord Notification
Double-check that your Discord webhook URL is correct in .env.
Test your webhook manually by sending a message:
📌 Add an image here showing webhook troubleshooting.

🎯 Next Steps

Add Telegram bot support.
Improve UI notifications.
Automate token refreshing.
🚀 Happy contributing! 🎉
