import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/shared/enum/role.enum';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { OrganizationAccessGuard } from 'src/shared/guards/organizationAccess.guard';

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiTags('Resources')
@Controller('resources')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @UseGuards(RolesGuard, OrganizationAccessGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create a new resource' })
  @ApiResponse({
    status: 201,
    description: 'The resource has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiBody({ type: CreateResourceDto })
  create(@Body() createResourceDto: CreateResourceDto) {
    return this.resourceService.create(createResourceDto);
  }

  @UseGuards(RolesGuard, OrganizationAccessGuard)
  @Roles(Role.OWNER, Role.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a resource by ID' })
  @ApiResponse({
    status: 200,
    description: 'The resource has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Resource not found.' })
  @ApiParam({ name: 'id', description: 'ID of the resource to delete' })
  remove(@Param('id') id: string) {
    return this.resourceService.remove(id);
  }

  @UseGuards(RolesGuard, OrganizationAccessGuard)
  @Roles(Role.OWNER, Role.ADMIN)
  @Get('organization/:organizationId')
  @ApiOperation({ summary: 'Get all resources of an organization' })
  @ApiResponse({
    status: 200,
    description:
      'Returns an array of resources belonging to the specified organization.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - User does not belong to the organization.',
  })
  @ApiResponse({ status: 404, description: 'Organization not found.' })
  @ApiParam({ name: 'organizationId', description: 'ID of the organization' })
  findAllByOrganization(@Param('organizationId') organizationId: string) {
    return this.resourceService.findAllByOrganization(organizationId);
  }
}
