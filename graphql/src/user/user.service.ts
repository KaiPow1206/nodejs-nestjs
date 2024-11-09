import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import {PrismaClient} from '@prisma/client';

@Injectable()
export class UserService {
  prisma =new PrismaClient();
  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
  }

  async findAll() {
    return await this.prisma.users.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.users.findFirst({
      where:{user_id:Number(id)}
    }) ;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
