import { DataSource } from 'typeorm';
import { seedPermissions } from './permission.seed';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function runSeeds() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['src/**/*.entity.ts'],
    synchronize: true,
  });

  try {
    await dataSource.initialize();
    console.log('Running seeds...');

    // Run all seeds
    await seedPermissions(dataSource);

    console.log('Seeds completed successfully');
  } catch (error) {
    console.error('Error running seeds:', error);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

// Run the seeds
runSeeds();
