async function restoreDatabase(dbType, config, backupFile, dbName) {
    return new Promise((resolve, reject) => {
     if (dbType === 'mongodb') {
        const command = await `mongorestore --db ${dbName} --drop ${backupFile}`;
        exec(command, (error) => (error ? reject(error) : resolve('Restore completed')));
      } else {
        reject(new Error('Unsupported database type'));
      }
    });
  }
  
  module.exports={ restoreDatabase }
  
