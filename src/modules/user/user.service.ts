import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user.entity';
import { Role } from 'src/shared/enum/role.enum';
import { OrganizationService } from '../organization/organization.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private organizationService: OrganizationService,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: ['organization'],
    });
    if (!user) {
      throw new NotFoundException(`User with Email ${email} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const organization = await this.organizationService.findOne(
      createUserDto.organizationId,
    );

    const user = this.usersRepository.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: createUserDto.password,
      role: createUserDto.role,
      organization: organization,
    });

    return this.usersRepository.save(user);
  }

  async remove(id: string, userOrganizationId: string): Promise<User> {
    const userToRemove = await this.usersRepository.findOne({
      where: { id },
      relations: ['organization'],
    });

    if (!userToRemove) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (userToRemove.organization.id !== userOrganizationId) {
      throw new ForbiddenException(
        'You can only delete users from your own organization',
      );
    }

    await this.usersRepository.delete(id);
    return userToRemove;
  }

  async updateRole(
    id: string,
    role: Role,
    userOrganizationId: string,
  ): Promise<User> {
    const userToUpdate = await this.usersRepository.findOne({
      where: { id },
      relations: ['organization'],
    });

    if (!userToUpdate) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (userToUpdate.organization.id !== userOrganizationId) {
      throw new ForbiddenException(
        'You can only edit roles of users in your own organization',
      );
    }

    userToUpdate.role = role;
    return this.usersRepository.save(userToUpdate);
  }
}
