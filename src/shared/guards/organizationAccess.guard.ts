import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { OrganizationService } from 'src/modules/organization/organization.service';

@Injectable()
export class OrganizationAccessGuard implements CanActivate {
  constructor(private organizationService: OrganizationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const requestedOrganizationId = request.params.organizationId;
    const userOrganizationId = user?.organization?.id;

    if (!requestedOrganizationId) {
      return false;
    }

    if (!userOrganizationId) {
      throw new ForbiddenException('User does not belong to an organization.');
    }

    if (userOrganizationId === requestedOrganizationId) {
      return true;
    }

    const requestedOrganization = await this.organizationService.findOne(
      requestedOrganizationId,
    );

    if (
      requestedOrganization?.parent?.id &&
      userOrganizationId === requestedOrganization.parent.id
    ) {
      return true;
    }

    throw new ForbiddenException(
      'You do not have access to resources in this organization.',
    );
  }
}
