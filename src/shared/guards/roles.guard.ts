import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/shared/enum/role.enum';
import { ROLES_KEY } from 'src/shared/decorators/roles.decorator';
import { PermissionService } from 'src/modules/permission/permission.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly permissionService: PermissionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authorizedRoles = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const { user } = context.switchToHttp().getRequest();
    const userRole = user.role;

    const hasRequiredRole = authorizedRoles.some((role) => role === userRole);
    if (!hasRequiredRole) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const method = request.method.toLowerCase();

    const permissionMap = {
      get: 'read',
      post: 'write',
      patch: 'write',
      put: 'write',
      delete: 'delete',
    };

    const requiredPermission = permissionMap[method];

    const allPermissions = await this.permissionService.findAll();

    const permission = allPermissions.find(
      (p) => p.name === requiredPermission,
    );
    return permission ? permission.roles.includes(userRole) : false;
  }
}
