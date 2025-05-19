import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BelongsToOrganizationGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assuming user is attached by AuthGuard
    const organizationIdFromParam = request.params.id;

    if (
      user &&
      user.organization &&
      user.organization.id === organizationIdFromParam
    ) {
      return true;
    }

    return false;
  }
}
