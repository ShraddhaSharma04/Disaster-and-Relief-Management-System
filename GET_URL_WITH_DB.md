# 🌐 URL with Database Connection

## Your Single URL (Works with Database):

```
http://10.108.94.166:3000
```

## ⚡ Quick Setup (2 Steps):

### 1. Get MySQL IP from Other Laptop
On the laptop with MySQL:
```cmd
ipconfig
```
Copy the IPv4 Address (e.g., `192.168.1.100`)

### 2. Configure Connection
```powershell
cd backend
node quick_db_setup.js
```
Enter the IP address when asked.

### 3. Restart Server
```powershell
node server.js
```

## ✅ Success Indicators:

When server starts, you should see:
```
✅ Connected to MySQL Database
📊 Database ready with X records
```

## 🎯 Your Working URL:

**http://10.108.94.166:3000**

This URL will:
- ✅ Work from any device on same network
- ✅ Be connected to MySQL database
- ✅ Show real data from the dataset

