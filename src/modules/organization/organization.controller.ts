import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@Controller('organizations')
@ApiTags('Organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
 @ApiOperation({ summary: 'Create a new organization' })
 @ApiResponse({
    status: 201,
    description: 'The organization has been successfully created.',
  })
 @ApiResponse({ status: 400, description: 'Invalid input.' })
 @ApiBody({ type: CreateOrganizationDto })
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationService.create(createOrganizationDto);
  }

  @Get()
 @ApiOperation({ summary: 'Retrieve all organizations' })
 @ApiResponse({
    status: 200,
    description: 'Returns an array of organizations.',
  })
 @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.organizationService.findAll();
  }

  @Get(':id')
 @ApiOperation({ summary: 'Retrieve a single organization by ID' })
 @ApiParam({ name: 'id', description: 'ID of the organization to retrieve' })
 @ApiResponse({
    status: 200,
    description: 'Returns the organization with the specified ID.',
  })
 @ApiResponse({ status: 404, description: 'Organization not found.' })
 @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string) {
    return this.organizationService.findOne(id);
  }

  @Patch(':id')
 @ApiOperation({ summary: 'Update an organization by ID' })
 @ApiParam({ name: 'id', description: 'ID of the organization to update' })
 @ApiResponse({
    status: 200,
    description: 'The organization has been successfully updated.',
  })
 @ApiResponse({ status: 400, description: 'Invalid input.' })
 @ApiResponse({ status: 404, description: 'Organization not found.' })
 @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationService.update(id, updateOrganizationDto);
  }

  @Delete(':id')
 @ApiOperation({ summary: 'Delete an organization by ID' })
 @ApiParam({ name: 'id', description: 'ID of the organization to delete' })
 @ApiResponse({
    status: 200,
    description: 'The organization has been successfully deleted.',
  })
 @ApiResponse({ status: 404, description: 'Organization not found.' })
 @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string) {
    return this.organizationService.remove(id);
  }
}
