# 🔗 Connect to Database - Quick Guide

## Your URL (After Database Connection):
```
http://10.108.94.166:3000
```

## Quick Setup Steps:

### Step 1: Get MySQL Server IP
On the laptop that has MySQL with the dataset:
- Open Command Prompt
- Run: `ipconfig`
- Note the IPv4 Address (e.g., `192.168.1.100`)

### Step 2: Configure Connection
Run this command:
```powershell
cd backend
node quick_db_setup.js
```

Enter the IP address when prompted.

### Step 3: Restart Server
```powershell
node server.js
```

You should see: `✅ Connected to MySQL Database`

## Manual Setup (Alternative):

Edit `backend/server.js` and change line 18:
```javascript
host: "192.168.1.100", // Replace with MySQL server IP
```

## Test Connection:

```powershell
cd backend
node connect_to_remote_mysql.js
```

## Your Working URL:
Once connected, use: **http://10.108.94.166:3000**

