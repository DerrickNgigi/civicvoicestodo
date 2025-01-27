import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiBody({
    type: CreateTodoDto,
    description: 'Json structure for todo object',
  })
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all todo' })
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':todoId')
  @ApiOperation({ summary: 'Get a todo by id' })
  findOne(@Param('todoId') todoId: string) {
    return this.todoService.findOne(todoId);
  }

  @Patch(':todoId')
  @ApiOperation({ summary: 'Update a todo by id' })
  update(@Param('todoId') todoId: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(todoId, updateTodoDto);
  }

  @Delete(':todoId')
  remove(@Param('todoId') todoId: string) {
    return this.todoService.remove(todoId);
  }
}
