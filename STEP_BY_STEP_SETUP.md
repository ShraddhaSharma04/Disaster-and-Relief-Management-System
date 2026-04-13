<<<<<<< HEAD
# 📋 Step-by-Step Database Connection Guide

## Step 1: Get MySQL Server IP Address

### On the laptop that has MySQL with the dataset:

1. **Open Command Prompt:**
   - Press `Win + R`
   - Type `cmd` and press Enter

2. **Run this command:**
   ```cmd
   ipconfig
   ```

3. **Find the IPv4 Address:**
   - Look for a line like: `IPv4 Address. . . . . . . . . . . : 192.168.1.100`
   - **Copy this IP address** (e.g., `192.168.1.100`)

---

## Step 2: Enter MySQL Server IP Address

### On THIS laptop (where the server is running):

1. **Open PowerShell or Command Prompt**

2. **Navigate to backend folder:**
   ```powershell
   cd "C:\Users\MY PC\OneDrive\Desktop\ddd\backend"
   ```

3. **Run the setup script:**
   ```powershell
   node quick_db_setup.js
   ```

4. **When prompted, enter the IP address:**
   ```
   MySQL Server IP Address: 192.168.1.100
   ```
   (Replace `192.168.1.100` with the actual IP you copied)

5. **Press Enter**

You should see:
```
✅ Server configuration updated!
📊 MySQL will connect to: 192.168.1.100
```

---

## Step 3: Restart the Server

### Option A: If server is running in a terminal window

1. **Go to the terminal window where server is running**
2. **Press `Ctrl + C`** to stop the server
3. **Start it again:**
   ```powershell
   node server.js
   ```

### Option B: If server is running in background

1. **Find and stop the server process:**
   ```powershell
   # Find the process
   netstat -ano | findstr :3000
   
   # Stop it (replace PID with the number from above)
   taskkill /PID <PID> /F
   ```

2. **Start the server:**
   ```powershell
   cd "C:\Users\MY PC\OneDrive\Desktop\ddd\backend"
   node server.js
   ```

### Option C: Start fresh

1. **Open a new PowerShell window**

2. **Navigate and start:**
   ```powershell
   cd "C:\Users\MY PC\OneDrive\Desktop\ddd\backend"
   node server.js
   ```

---

## Step 4: Verify Connection

When the server starts, you should see:
```
✅ Connected to MySQL Database
📊 Database ready with X records
```

If you see this, the database is connected! ✅

---

## Your URL:

**http://10.108.94.166:3000**

This URL will now show real data from your MySQL database!

---

## Troubleshooting

### If you see "Database connection failed":
- Check if MySQL server IP is correct
- Make sure both laptops are on the same WiFi network
- Verify MySQL is running on the other laptop
- Check if MySQL allows remote connections

### If server won't start:
- Make sure you're in the `backend` folder
- Check if port 3000 is already in use
- Try: `netstat -ano | findstr :3000` to see what's using it

=======
# 📋 Step-by-Step Database Connection Guide

## Step 1: Get MySQL Server IP Address

### On the laptop that has MySQL with the dataset:

1. **Open Command Prompt:**
   - Press `Win + R`
   - Type `cmd` and press Enter

2. **Run this command:**
   ```cmd
   ipconfig
   ```

3. **Find the IPv4 Address:**
   - Look for a line like: `IPv4 Address. . . . . . . . . . . : 192.168.1.100`
   - **Copy this IP address** (e.g., `192.168.1.100`)

---

## Step 2: Enter MySQL Server IP Address

### On THIS laptop (where the server is running):

1. **Open PowerShell or Command Prompt**

2. **Navigate to backend folder:**
   ```powershell
   cd "C:\Users\MY PC\OneDrive\Desktop\ddd\backend"
   ```

3. **Run the setup script:**
   ```powershell
   node quick_db_setup.js
   ```

4. **When prompted, enter the IP address:**
   ```
   MySQL Server IP Address: 192.168.1.100
   ```
   (Replace `192.168.1.100` with the actual IP you copied)

5. **Press Enter**

You should see:
```
✅ Server configuration updated!
📊 MySQL will connect to: 192.168.1.100
```

---

## Step 3: Restart the Server

### Option A: If server is running in a terminal window

1. **Go to the terminal window where server is running**
2. **Press `Ctrl + C`** to stop the server
3. **Start it again:**
   ```powershell
   node server.js
   ```

### Option B: If server is running in background

1. **Find and stop the server process:**
   ```powershell
   # Find the process
   netstat -ano | findstr :3000
   
   # Stop it (replace PID with the number from above)
   taskkill /PID <PID> /F
   ```

2. **Start the server:**
   ```powershell
   cd "C:\Users\MY PC\OneDrive\Desktop\ddd\backend"
   node server.js
   ```

### Option C: Start fresh

1. **Open a new PowerShell window**

2. **Navigate and start:**
   ```powershell
   cd "C:\Users\MY PC\OneDrive\Desktop\ddd\backend"
   node server.js
   ```

---

## Step 4: Verify Connection

When the server starts, you should see:
```
✅ Connected to MySQL Database
📊 Database ready with X records
```

If you see this, the database is connected! ✅

---

## Your URL:

**http://10.108.94.166:3000**

This URL will now show real data from your MySQL database!

---

## Troubleshooting

### If you see "Database connection failed":
- Check if MySQL server IP is correct
- Make sure both laptops are on the same WiFi network
- Verify MySQL is running on the other laptop
- Check if MySQL allows remote connections

### If server won't start:
- Make sure you're in the `backend` folder
- Check if port 3000 is already in use
- Try: `netstat -ano | findstr :3000` to see what's using it

>>>>>>> 20a75fbeb2859c4cd17c73b82a1176f28adae41e
