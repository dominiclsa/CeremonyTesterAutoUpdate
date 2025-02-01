CeremonyTesterAutoUpdate 🚀

A simple script that monitors your queue position for the Silent Protocol Ceremony and alerts you via Discord when you're ready to contribute.

📌 Features

✅ Automatically checks your queue position every minute.

✅ Sends a Discord webhook notification when you're in the top 10.

✅ Keeps the session alive with periodic pings.

✅ Helps you contribute at the right time without constantly checking the website.

🔧 Setup Instructions

1️⃣ Clone the Repository
git clone https://github.com/your-repo/CeremonyTesterAutoUpdate.git
cd CeremonyTesterAutoUpdate
2️⃣ Install Dependencies
Make sure you have Node.js installed, then install the required packages:

npm install
3️⃣ Retrieve Your Silent JWT Token
You need your Silent Protocol JWT Token to authenticate.

📍 Steps to Get the Token:

1️⃣ Go to the Ceremony Page:
👉 https://ceremony.silentprotocol.org/ceremonies

2️⃣ Open Developer Tools:

Chrome/Edge: Press F12 or Ctrl + Shift + I (Windows/Linux) or Cmd + Opt + I (Mac).
Firefox: Press F12 or Cmd + Opt + I (Mac).
3️⃣ Go to the "Application" Tab:

In the top menu, find the "Application" tab.
4️⃣ Find Local Storage:

On the left panel, expand Local Storage.
Click on https://ceremony.silentprotocol.org.
5️⃣ Locate the Token:

Find the key silent_jwt.
Copy the value (this is your token).
📌 Example Image:
![Image Description](https://i.postimg.cc/9f32ymXm/image.png)

4️⃣ Set Up Environment Variables
Create a .env file and add your token:

cp .env.example .env
Then, edit the .env file and fill in your token and Discord webhook URL:

TOKEN=your_silent_jwt_token_here
BASE_URL=https://ceremony-backend.silentprotocol.org
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/your-webhook-id/your-webhook-token

5️⃣ Run the Script
Start monitoring your queue position:

node ceremonyTester.js
🔔 How It Works

🚀 The script automatically checks your queue position every minute.
🔔 If you are within the top 10, you will get a Discord notification.
🌐 Once notified, go to 👉 Silent Protocol Ceremony Page and complete your contribution.

📌 Example Discord Notification:
![Image Description](https://i.postimg.cc/kGMqDTJW/image.png)
