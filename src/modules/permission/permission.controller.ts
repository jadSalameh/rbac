import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@Controller('permissions')
@ApiTags('Permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new permission' })
  @ApiResponse({ status: 201, description: 'The permission has been successfully created.' })
  @ApiBody({ type: CreatePermissionDto })
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }
  @Get()
  @ApiOperation({ summary: 'Get all permissions' })
  @ApiResponse({ status: 200, description: 'Returns an array of permissions.' })
  findAll() {
    return this.permissionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a permission by ID' })
  @ApiResponse({ status: 200, description: 'Returns the permission with the specified ID.' })
  @ApiResponse({ status: 404, description: 'Permission not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the permission', type: 'string' })
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a permission by ID' })
  @ApiResponse({ status: 200, description: 'The permission has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Permission not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the permission', type: 'string' })
  @ApiBody({ type: UpdatePermissionDto })
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a permission by ID' })
  @ApiResponse({ status: 200, description: 'The permission has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Permission not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the permission', type: 'string' })
  remove(@Param('id') id: string) {
    return this.permissionService.remove(id);
  }
}
