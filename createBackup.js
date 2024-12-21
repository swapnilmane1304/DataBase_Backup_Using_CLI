const fs = require('fs');
const { exec } = require('child_process');




/**
 * Backs up a MongoDB database using mongodump.
 * @param {string} dbType - The type of database (mongodb).
 * @param {string} outputDir - The directory to save the backup.
 * @param {string} dbName - The name of the database to back up.
 * @param {string} url - The MongoDB Atlas connection URL.
 * @returns {Promise} - Resolves when the backup is successful.
 */
async function backupDatabase(dbType, outputDir, dbName, url) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = `${outputDir}/${dbName}_backup_${timestamp}`;
  
    return new Promise((resolve, reject) => {
      if (dbType === 'mongodb') {
        // Construct the mongodump command
        const command = `mongodump --uri="${url}" --out="${backupFile}"`;
        console.log('Executing MongoDB Backup command:', command); // Debugging log
  
        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error(`Backup failed with error: ${error.message}`);
            console.error(`stderr: ${stderr}`);
            reject(`Backup failed: ${stderr}`);
          } else {
            console.log('Backup command output:', stdout);
            resolve(`Backup completed successfully! Backup file: ${backupFile}`);
          }
        });
      } else {
        reject(new Error(`Unsupported database type: ${dbType}`));
      }
    });
  }




  async function restoreDatabase(dbType, backupFile, dbName, uri) {
    return new Promise((resolve, reject) => {
      if (dbType === 'mongodb') {
        const command = `mongorestore --uri="${uri}" --drop --nsInclude="${dbName}.*" "${backupFile}"`;
        console.log(`Executing MongoDB Restore command: ${command}`);
        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error('stderr:', stderr);
            return reject(new Error(error));
          }
          console.log('stdout:', stdout);
          resolve('Restore completed successfully');
        });
      } else {
        reject(new Error('Unsupported database type for restore'));
      }
    });
  }
  

module.exports = { backupDatabase, restoreDatabase }
