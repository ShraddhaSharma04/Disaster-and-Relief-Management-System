<<<<<<< HEAD
# 🔄 How to Restart the Server

## Quick Method:

### 1. Find the Server Window
Look for a PowerShell or Command Prompt window that shows:
```
🚀 Server running at http://localhost:3000
```

### 2. Stop the Server
- Click on that window
- Press `Ctrl + C`
- Wait for it to stop

### 3. Start the Server Again
In the same window, type:
```powershell
node server.js
```

---

## Alternative Method (If you can't find the window):

### Step 1: Stop the Server
Open PowerShell and run:
```powershell
# Find the process
netstat -ano | findstr :3000
```

You'll see something like:
```
TCP    0.0.0.0:3000    LISTENING    15860
```

The last number (15860) is the Process ID (PID).

### Step 2: Kill the Process
```powershell
taskkill /PID 15860 /F
```
(Replace 15860 with your actual PID)

### Step 3: Start the Server
```powershell
cd "C:\Users\MY PC\OneDrive\Desktop\ddd\backend"
node server.js
```

---

## Quick Restart Script:

Save this as `restart_server.ps1` in the backend folder:

```powershell
# Stop any existing server
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

# Wait a moment
Start-Sleep -Seconds 2

# Start server
cd "C:\Users\MY PC\OneDrive\Desktop\ddd\backend"
node server.js
```

Then just run: `.\restart_server.ps1`

---

## After Restart:

You should see:
```
✅ Connected to MySQL Database
📊 Database ready with X records
🚀 Server running at http://localhost:3000
🌐 Network access: http://10.108.94.166:3000
```

Then your URL **http://10.108.94.166:3000** will work with the database!

=======
# 🔄 How to Restart the Server

## Quick Method:

### 1. Find the Server Window
Look for a PowerShell or Command Prompt window that shows:
```
🚀 Server running at http://localhost:3000
```

### 2. Stop the Server
- Click on that window
- Press `Ctrl + C`
- Wait for it to stop

### 3. Start the Server Again
In the same window, type:
```powershell
node server.js
```

---

## Alternative Method (If you can't find the window):

### Step 1: Stop the Server
Open PowerShell and run:
```powershell
# Find the process
netstat -ano | findstr :3000
```

You'll see something like:
```
TCP    0.0.0.0:3000    LISTENING    15860
```

The last number (15860) is the Process ID (PID).

### Step 2: Kill the Process
```powershell
taskkill /PID 15860 /F
```
(Replace 15860 with your actual PID)

### Step 3: Start the Server
```powershell
cd "C:\Users\MY PC\OneDrive\Desktop\ddd\backend"
node server.js
```

---

## Quick Restart Script:

Save this as `restart_server.ps1` in the backend folder:

```powershell
# Stop any existing server
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

# Wait a moment
Start-Sleep -Seconds 2

# Start server
cd "C:\Users\MY PC\OneDrive\Desktop\ddd\backend"
node server.js
```

Then just run: `.\restart_server.ps1`

---

## After Restart:

You should see:
```
✅ Connected to MySQL Database
📊 Database ready with X records
🚀 Server running at http://localhost:3000
🌐 Network access: http://10.108.94.166:3000
```

Then your URL **http://10.108.94.166:3000** will work with the database!

>>>>>>> 20a75fbeb2859c4cd17c73b82a1176f28adae41e
