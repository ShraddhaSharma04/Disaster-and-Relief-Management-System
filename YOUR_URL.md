# 🌐 Your URL with Database Connection

## Single URL (Works from Any Device):

```
http://10.108.94.166:3000
```

## ✅ This URL Will Work Once Database is Connected

The URL is the same - it just needs the database connection configured.

## 🔧 Quick Connection Steps:

### Option 1: Interactive Setup (Easiest)
```powershell
cd backend
node quick_db_setup.js
```
Then enter the IP address of the laptop with MySQL when prompted.

### Option 2: Manual Setup
1. Get the IP address of the laptop with MySQL:
   - On that laptop, run: `ipconfig`
   - Copy the IPv4 Address

2. Edit `backend/server.js`:
   - Find line 18: `host: "localhost",`
   - Change to: `host: "192.168.1.XXX",` (use the actual IP)

3. Restart server:
   ```powershell
   node server.js
   ```

## ✅ Success Check:

When server starts, you should see:
```
✅ Connected to MySQL Database
📊 Database ready with X records
```

## 🎯 Your Working URL:

**http://10.108.94.166:3000**

This URL will:
- ✅ Work from this laptop
- ✅ Work from other laptops on same network  
- ✅ Work from mobile phones on same network
- ✅ Show real data from MySQL database (once connected)

## 📱 All Pages:

- Dashboard: `http://10.108.94.166:3000/`
- Disasters: `http://10.108.94.166:3000/disasters.html`
- Analytics: `http://10.108.94.166:3000/analytics.html`
- Search: `http://10.108.94.166:3000/search.html`

