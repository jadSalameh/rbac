// // src/scripts/seed.ts
// import { DataSource } from 'typeorm';
// import { User } from '../modules/entities/user.entity';
// import { Organization } from '../modules/entities/organization.entity';
// import { Permission } from '../modules/entities/permission.entity';
// import { Resource } from '../modules/entities/resource.entity';
// import { Role } from 'src/auth/auth/role.enum';

// async function seed() {
//   const dataSource = new DataSource({
//     type: 'postgres',
//     host: process.env.DB_HOST,
//     port: Number(process.env.DB_PORT),
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     entities: [User, Organization, Permission, Resource],
//     synchronize: true, // Use synchronize for simplicity in this challenge context
//     logging: ['error'], // Log only errors during seeding
//   });

//   try {
//     console.log('Initializing database connection...');
//     await dataSource.initialize();
//     console.log('Database connection initialized.');

//     const userRepository = dataSource.getRepository(User);
//     const organizationRepository = dataSource.getRepository(Organization);
//     const permissionRepository = dataSource.getRepository(Permission);
//     const resourceRepository = dataSource.getRepository(Resource);

//     // --- 1. Create Organizations (2 Levels) ---
//     console.log('Creating organizations...');
//     const orgA = organizationRepository.create({
//       name: 'Veteran Health Services A',
//     });
//     const orgA_Child1 = organizationRepository.create({
//       name: 'Veterans Clinic A1',
//       parent: orgA,
//     });
//     const orgB = organizationRepository.create({
//       name: 'Veteran Health Services B',
//     });

//     await organizationRepository.save([orgA, orgA_Child1, orgB]);
//     console.log('Organizations created.');

//     // --- 2. Create Users ---
//     console.log('Creating users...');

//     const ownerUser = userRepository.create({
//       firstName: 'OrgA',
//       lastName: 'Owner',
//       email: 'owner@orga.com',
//       password: "password123",
//       role: Role.OWNER,
//       organization: orgA,
//     });

//     const adminUserA1 = userRepository.create({
//       firstName: 'OrgA1',
//       lastName: 'Admin',
//       email: 'admin@orga1.com',
//       password: "hashedPasswordAdmin",
//       role: Role.ADMIN,
//       organization: orgA_Child1,
//     });

//     const adminUserB = userRepository.create({
//       firstName: 'OrgB',
//       lastName: 'Admin',
//       email: 'admin@orgb.com',
//       password: "hashedPasswordAdmin",
//       role: Role.ADMIN,
//       organization: orgB,
//     });

//     const viewerUserA1 = userRepository.create({
//       firstName: 'OrgA1',
//       lastName: 'Viewer',
//       email: 'viewer@orga1.com',
//       password: "hashedPasswordViewer",
//       role: Role.VIEWER,
//       organization: orgA_Child1,
//     });

//     await userRepository.save([
//       ownerUser,
//       adminUserA1,
//       adminUserB,
//       viewerUserA1,
//     ]);
//     console.log('Users created.');

//     // --- 3. Create Permissions ---
//     console.log('Creating permissions...');
//     const readPatientPermission = permissionRepository.create({
//       name: 'read:patient',
//     });
//     const writePatientPermission = permissionRepository.create({
//       name: 'write:patient',
//     });
//     const deletePatientPermission = permissionRepository.create({
//       name: 'delete:patient',
//     });
//     const manageUsersPermission = permissionRepository.create({
//       name: 'manage:users',
//     });
//     const manageRolesPermission = permissionRepository.create({
//       name: 'manage:roles',
//     });

//     await permissionRepository.save([
//       readPatientPermission,
//       writePatientPermission,
//       deletePatientPermission,
//       manageUsersPermission,
//       manageRolesPermission,
//     ]);
//     console.log('Permissions created.');

//     // NOTE: Permissions are typically linked to Roles or Users in a separate table (e.g., role_permissions, user_permissions)
//     // This seed file creates the permission entities themselves. You'll need to implement the linking logic.

//     // --- 4. Create Resources (Patient Records) ---
//     console.log('Creating resources (patients)...');
//     const patient1 = resourceRepository.create({

//       name: 'Patient Record 1',
//       type: 'patient',
//       organization: orgA_Child1, // Patient belonging to Clinic A1
//     });

//     const patient2 = resourceRepository.create({
//       name: 'Patient Record 2',
//       type: 'patient',
//       organization: orgA_Child1, // Patient belonging to Clinic A1
//     });

//     const patient3 = resourceRepository.create({
//       name: 'Patient Record 3',
//       type: 'patient',
//       organization: orgB, // Patient belonging to Clinic B
//     });

//     await resourceRepository.save([patient1, patient2, patient3]);
//     console.log('Resources (patients) created.');

//     console.log('Database seeding complete!');
//   } catch (error) {
//     console.error('Database seeding failed:', error);
//   } finally {
//     console.log('Closing database connection...');
//     await dataSource.destroy();
//     console.log('Database connection closed.');
//   }
// }

// seed();
