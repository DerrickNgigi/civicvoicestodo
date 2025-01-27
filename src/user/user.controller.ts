import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    type: CreateUserDto,
    description: 'Json structure for user object',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get a user by id' })
  findOne(@Param('userId') userId: string) {
    return this.userService.findOne(userId);
  }

  @Patch(':userId')
  @ApiOperation({ summary: 'Update a user by id' })
  update(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Delete a user by id' })
  remove(@Param('userId') userId: string) {
    return this.userService.remove(userId);
  }
}
