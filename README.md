 Database Backup Utility

A robust and easy-to-use utility for creating and restoring backups for various types of databases, including MongoDB. This project is designed to work seamlessly with cloud-hosted databases like MongoDB Atlas and local database servers. The tool allows you to automate backup and restoration tasks using Node.js, ensuring data safety and integrity.

---

Features
- Supports backup and restore operations for MongoDB.
- Works with both local and remote (e.g., MongoDB Atlas) databases.
- Outputs database backups in a structured format for easy restoration.
- CLI-based tool for ease of use and automation.

---



Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/<your-username>/database-backup-utility.git
   cd database-backup-utility
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Ensure MongoDB Tools are Installed**
   - Install MongoDB tools (for `mongodump` and `mongorestore`) from the [MongoDB Tools](https://www.mongodb.com/try/download/database-tools) page.

4. **Set Up Your MongoDB Connection**
   - Replace connection details (`url` and `dbName`) in the CLI commands with your MongoDB Atlas or local connection string.

---

### **Usage**

#### **Backup Command**
Create a backup for your MongoDB database.

```bash
node start.js backup --dbType mongodb --url "<your-mongodb-url>" --dbName "<database-name>" --output "<output-directory>"
```

**Example:**
```bash
node start.js backup --dbType mongodb --url "mongodb+srv://<username>:<password>@cluster.mongodb.net" --dbName "testing" --output "./backups"
```

#### **Restore Command**
Restore a MongoDB database from a backup.

```bash
node start.js restore --dbType mongodb --url "<your-mongodb-url>" --dbName "<database-name>" --backupFile "<path-to-backup>"
```

**Example:**
```bash
node start.js restore --dbType mongodb --url "mongodb+srv://<username>:<password>@cluster.mongodb.net" --dbName "testing" --backupFile "./backups/testing_backup_2024-12-21T08-42-26"
```

---

### **Configuration**
- The tool uses `mongodump` for backups and `mongorestore` for restorations.
- Ensure your system recognizes the `mongodump` and `mongorestore` commands by adding MongoDB Tools to your PATH.

---

### **How It Works**
1. **Backup**:
   - Executes `mongodump` with the provided database name and URL.
   - Stores the backup files in the specified output directory.

2. **Restore**:
   - Executes `mongorestore` to restore the database from the specified backup directory.

---

