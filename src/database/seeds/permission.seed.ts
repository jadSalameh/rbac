import { DataSource } from 'typeorm';
import { Permission } from '../../modules/entities/permission.entity';
import { Role } from '../../auth/auth/role.enum';

export async function seedPermissions(dataSource: DataSource): Promise<void> {
  const permissionRepository = dataSource.getRepository(Permission);

  const defaultPermissions = [
    {
      name: 'read',
      description: 'Allows reading resources',
      roles: [Role.OWNER, Role.ADMIN, Role.VIEWER],
    },
    {
      name: 'write',
      description: 'Allows creating and updating resources',
      roles: [Role.OWNER, Role.ADMIN],
    },
    {
      name: 'delete',
      description: 'Allows deleting resources',
      roles: [Role.OWNER],
    },
  ];

  for (const permission of defaultPermissions) {
    const existingPermission = await permissionRepository.findOne({
      where: { name: permission.name },
    });

    if (!existingPermission) {
      await permissionRepository.save(permission);
      console.log(`Created permission: ${permission.name}`);
    } else {
      console.log(`Permission already exists: ${permission.name}`);
    }
  }
}
