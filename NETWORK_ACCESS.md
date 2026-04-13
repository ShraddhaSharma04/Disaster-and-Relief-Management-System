<<<<<<< HEAD
# Network Access Setup

## Your Server IP Address
**10.108.94.166**

## Single URL for All Devices (Same Network)

### Main URL:
```
http://10.108.94.166:3000
```

This URL works from:
- ✅ This laptop (localhost)
- ✅ Any other laptop/device on the same WiFi network
- ✅ Mobile phones on the same network

## All Available Pages

- **Dashboard:** `http://10.108.94.166:3000/`
- **Disasters:** `http://10.108.94.166:3000/disasters.html`
- **Analytics:** `http://10.108.94.166:3000/analytics.html`
- **Search:** `http://10.108.94.166:3000/search.html`

## Database Connection Setup

Since the other laptop has MySQL with the dataset:

### Option 1: Connect to Remote MySQL (Recommended)
Update `backend/server.js` to connect to the other laptop's MySQL:

```javascript
const db = mysql.createConnection({
  host: "10.108.94.XXX", // IP of laptop with MySQL
  user: "root",
  password: "Shraddha_247",
  database: "DisasterReliefManagement"
});
```

### Option 2: Share Database on This Laptop
1. Install MySQL on this laptop
2. Run: `node backend/setup_database.js`
3. Import dataset from the other laptop

## Firewall Configuration

Firewall rule has been added to allow port 3000.

If connection fails from other devices:
1. Make sure both devices are on the same WiFi network
2. Check Windows Firewall settings
3. Verify server is running: `netstat -ano | findstr :3000`

## Testing

1. **From this laptop:** `http://localhost:3000`
2. **From other laptop:** `http://10.108.94.166:3000`
3. **From mobile:** `http://10.108.94.166:3000`

## Important Notes

- Both devices must be on the **same network** (same WiFi)
- The server must be **running** on this laptop
- If IP changes, run `ipconfig` to get new IP address

=======
# Network Access Setup

## Your Server IP Address
**10.108.94.166**

## Single URL for All Devices (Same Network)

### Main URL:
```
http://10.108.94.166:3000
```

This URL works from:
- ✅ This laptop (localhost)
- ✅ Any other laptop/device on the same WiFi network
- ✅ Mobile phones on the same network

## All Available Pages

- **Dashboard:** `http://10.108.94.166:3000/`
- **Disasters:** `http://10.108.94.166:3000/disasters.html`
- **Analytics:** `http://10.108.94.166:3000/analytics.html`
- **Search:** `http://10.108.94.166:3000/search.html`

## Database Connection Setup

Since the other laptop has MySQL with the dataset:

### Option 1: Connect to Remote MySQL (Recommended)
Update `backend/server.js` to connect to the other laptop's MySQL:

```javascript
const db = mysql.createConnection({
  host: "10.108.94.XXX", // IP of laptop with MySQL
  user: "root",
  password: "Shraddha_247",
  database: "DisasterReliefManagement"
});
```

### Option 2: Share Database on This Laptop
1. Install MySQL on this laptop
2. Run: `node backend/setup_database.js`
3. Import dataset from the other laptop

## Firewall Configuration

Firewall rule has been added to allow port 3000.

If connection fails from other devices:
1. Make sure both devices are on the same WiFi network
2. Check Windows Firewall settings
3. Verify server is running: `netstat -ano | findstr :3000`

## Testing

1. **From this laptop:** `http://localhost:3000`
2. **From other laptop:** `http://10.108.94.166:3000`
3. **From mobile:** `http://10.108.94.166:3000`

## Important Notes

- Both devices must be on the **same network** (same WiFi)
- The server must be **running** on this laptop
- If IP changes, run `ipconfig` to get new IP address

>>>>>>> 20a75fbeb2859c4cd17c73b82a1176f28adae41e
