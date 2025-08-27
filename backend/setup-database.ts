#!/usr/bin/env ts-node

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function setupDatabase() {
  try {
    console.log('🚀 Starting database setup...\n');

    // Step 1: Build the project
    console.log('📦 Building project...');
    await execAsync('npm run build');
    console.log('✅ Build completed\n');

    // Step 2: Run migration
    console.log('🗄️ Running database migration...');
    await execAsync('node dist/database/migrate.js');
    console.log('✅ Migration completed\n');

    // Step 3: Run seeding
    console.log('🌱 Seeding database with consolidated data...');
    await execAsync('node dist/database/seed.js');
    console.log('✅ Seeding completed\n');

    console.log('🎉 Database setup completed successfully!');
    console.log('📊 All scattered information has been consolidated into the database as a single source of truth.');
    console.log('🔗 Your API endpoints are now ready to serve data from the database.');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

setupDatabase();
