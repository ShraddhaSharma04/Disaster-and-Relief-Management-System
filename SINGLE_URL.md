# 🌐 Single URL for All Devices

## Your Main URL (Works from Any Device on Same Network):

```
http://10.108.94.166:3000
```

## 📱 How to Use:

1. **Make sure server is running** on this laptop
2. **Connect other laptop to the same WiFi network**
3. **Open browser on other laptop** and go to: `http://10.108.94.166:3000`

## 🔗 All Pages Available:

- **Dashboard:** `http://10.108.94.166:3000/`
- **Disasters:** `http://10.108.94.166:3000/disasters.html`
- **Analytics:** `http://10.108.94.166:3000/analytics.html`
- **Search:** `http://10.108.94.166:3000/search.html`

## 🗄️ Connect to Remote MySQL Database:

Since the other laptop has MySQL with the dataset, you need to configure the connection:

### Quick Setup:

1. **Get the IP address of the laptop with MySQL:**
   - On that laptop, open Command Prompt
   - Run: `ipconfig`
   - Note the IPv4 address (e.g., 192.168.1.100)

2. **Configure remote database connection:**
   ```powershell
   cd backend
   node configure_remote_db.js
   ```
   - Enter the MySQL server IP address
   - Enter username (usually: root)
   - Enter password
   - Enter database name (usually: DisasterReliefManagement)

3. **Restart the server:**
   ```powershell
   node server.js
   ```

### Manual Configuration:

Edit `backend/server.js` and update the MySQL connection:

```javascript
const db = mysql.createConnection({
  host: "192.168.1.100", // IP of laptop with MySQL
  user: "root",
  password: "Shraddha_247",
  database: "DisasterReliefManagement"
});
```

## 🔥 Firewall Setup:

If connection fails, allow port 3000 in Windows Firewall:

**Run PowerShell as Administrator:**
```powershell
netsh advfirewall firewall add rule name="Node.js Server Port 3000" dir=in action=allow protocol=TCP localport=3000
```

## ✅ Testing:

1. **From this laptop:** `http://localhost:3000`
2. **From other laptop:** `http://10.108.94.166:3000`
3. **Check server console** - it will show the network URL when started

## 📝 Important:

- Both laptops must be on the **same WiFi network**
- Server must be **running** on this laptop
- If IP address changes, run `ipconfig` to get new IP

