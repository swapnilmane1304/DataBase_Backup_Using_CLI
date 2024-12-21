const { Command } = require('commander');

const { backupDatabase,restoreDatabase } = require('./createBackup.js');

const program = new Command();






program
  .command('backup')
  .description('Create a database backup')
  .requiredOption('--dbType <type>', 'Database type (mongodb)')
  .requiredOption('--url <url>', 'MongoDB Atlas connection URL')
  .requiredOption('--dbName <name>', 'Database name')
  .requiredOption('--output <path>', 'Output directory')
  .action(async (options) => {
    try {
      if (options.dbType === 'mongodb') {
        console.log(`Starting backup for MongoDB database: ${options.dbName}`);
        await backupDatabase(options.dbType, options.output, options.dbName, options.url); // Call backup function
        console.log('Backup completed!');
      } else {
        console.error('Unsupported database type:', options.dbType);
      }
    } catch (error) {
      console.error('Backup failed:', error.message);
    }
  });

//program.parse();


program
  .command('restore')
  .description('Restore a MongoDB database from a backup')
  .requiredOption('--dbType <type>', 'Database type (mongodb)')
  .requiredOption('--url <url>', 'MongoDB connection URL')
  .requiredOption('--dbName <name>', 'Target database name')
  .requiredOption('--backupFile <path>', 'Path to the backup file or directory')
  .action(async (options) => {
    try {
      console.log(`Starting restore for MongoDB database: ${options.dbName}`);
      await restoreDatabase(options.dbType, options.backupFile, options.dbName, options.url);
      console.log('Restore completed successfully!');
    } catch (error) {
      console.error('Restore failed:', error.message);
    }
  });

program.parse(process.argv);
