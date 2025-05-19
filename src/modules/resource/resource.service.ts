import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from '../entities/resource.entity';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { User } from '../entities/user.entity';
import { Organization } from '../entities/organization.entity';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  findAll(): Promise<Resource[]> {
    return this.resourceRepository.find();
  }

  findAllByOrganization(organizationId: string): Promise<Resource[]> {
    return this.resourceRepository.find({
      where: { organization: { id: organizationId } },
      relations: ['organization'],
    });
  }

  async findOne(id: string): Promise<Resource> {
    const resource = await this.resourceRepository.findOne({ where: { id } });
    if (!resource) {
      throw new NotFoundException(`Resource with ID ${id} not found`);
    }
    return resource;
  }

  async create(createResourceDto: CreateResourceDto): Promise<Resource> {
    const user = await this.userRepository.findOne({
      where: { id: createResourceDto.userId },
    });
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createResourceDto.userId} not found`,
      );
    }

    const organization = await this.organizationRepository.findOne({
      where: { id: createResourceDto.organizationId },
    });
    if (!organization) {
      throw new NotFoundException(
        `Organization with ID ${createResourceDto.organizationId} not found`,
      );
    }

    const resource = this.resourceRepository.create({
      data: createResourceDto.data,
      user,
      organization,
    });

    return this.resourceRepository.save(resource);
  }

  async update(
    id: string,
    updateResourceDto: UpdateResourceDto,
  ): Promise<Resource> {
    const resource = await this.findOne(id);
    this.resourceRepository.merge(resource, updateResourceDto);
    return this.resourceRepository.save(resource);
  }

  async remove(id: string): Promise<void> {
    const result = await this.resourceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Resource with ID ${id} not found`);
    }
  }
}
