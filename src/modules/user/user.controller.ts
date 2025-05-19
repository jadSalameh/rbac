import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/auth/auth/role.enum';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.OWNER)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: "Update a user's role" })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({ type: UpdateUserRoleDto })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden - User does not belong to the same organization or cannot change their own role.',
  })
  async editRole(
    @Req() req: any,
    @Param('id') id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    if (req.user.id === id) {
      throw new ForbiddenException('you cannot change your own role');
    }

    const userOrganizationId = req.user.organization.id;

    return this.userService.updateRole(
      id,
      updateUserRoleDto.role!,
      userOrganizationId,
    );
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.OWNER)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID (Admin or owner only)' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden - User does not belong to the same organization or cannot delete themselves.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async remove(@Req() req: any, @Param('id') id: string) {
    if (req.user.id === id) {
      throw new ForbiddenException('you cannot delete yourself');
    }

    const userOrganizationId = req.user.organization.id;

    return this.userService.remove(id, userOrganizationId);
  }
}
