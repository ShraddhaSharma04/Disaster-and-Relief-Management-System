# Database Setup Instructions

## Step 1: Check MySQL Installation

### Option A: If MySQL is installed but not running
1. Open Command Prompt as Administrator
2. Check MySQL service name:
   ```cmd
   sc query | findstr MySQL
   ```
3. Start MySQL service:
   ```cmd
   net start MySQL80
   ```
   (Replace `MySQL80` with your actual MySQL service name)

### Option B: If MySQL is not installed
1. Download MySQL from: https://dev.mysql.com/downloads/installer/
2. Install MySQL Server
3. During installation, set root password to: `Shraddha_247`
4. Make sure MySQL service starts automatically

## Step 2: Run Database Setup

### Method 1: Using Node.js Script (Recommended)
```powershell
cd backend
node setup_database.js
```

### Method 2: Using MySQL Command Line
1. Open MySQL Command Line Client
2. Enter your password when prompted
3. Run:
   ```sql
   source C:\Users\MY PC\OneDrive\Desktop\ddd\backend\setup_database.sql
   ```

### Method 3: Using MySQL Workbench
1. Open MySQL Workbench
2. Connect to your MySQL server
3. Open and run `setup_database.sql` file

## Step 3: Verify Connection

Run the test script:
```powershell
cd backend
node test_connection.js
```

## Step 4: Update Password (if needed)

If your MySQL password is different, update it in:
- `backend/server.js` (line 20)
- `backend/setup_database.js` (line 6)
- `backend/test_connection.js` (line 6)

## Troubleshooting

### Error: "Access denied for user 'root'"
- Check if password is correct
- Try resetting MySQL root password

### Error: "Can't connect to MySQL server"
- Make sure MySQL service is running
- Check if MySQL is listening on port 3306
- Verify firewall settings

### Error: "Unknown database"
- Run `setup_database.js` to create the database

## Quick Test

After setup, restart your server:
```powershell
cd backend
node server.js
```

Then visit: http://localhost:3000

