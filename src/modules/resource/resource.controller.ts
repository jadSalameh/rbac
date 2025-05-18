import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Resources')
@Controller('resources')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

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

  @Get()
  @ApiOperation({ summary: 'Get all resources' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of resources.',
  })
  findAll() {
    return this.resourceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a resource by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the resource with the given ID.',
  })
  @ApiResponse({ status: 404, description: 'Resource not found.' })
  @ApiParam({ name: 'id', description: 'ID of the resource to retrieve' })
  findOne(@Param('id') id: string) {
    return this.resourceService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a resource by ID' })
  @ApiResponse({
    status: 200,
    description: 'The resource has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({ status: 404, description: 'Resource not found.' })
  @ApiParam({ name: 'id', description: 'ID of the resource to update' })
  @ApiBody({ type: UpdateResourceDto })
  update(
    @Param('id') id: string,
    @Body() updateResourceDto: UpdateResourceDto,
  ) {
    return this.resourceService.update(id, updateResourceDto);
  }

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
}
