import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { UserService } from 'src/user/user.service';


@Injectable()
export class TodoService {
  private readonly emailtransporter: nodemailer.Transporter;
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private userService: UserService
  ) { 
this.emailtransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10), // Convert to integer
  secure: process.env.SMTP_SECURE === 'true', // Convert to boolean
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // Your SparkPost API key from .env
  },
});
  }

  // send on mail for any update
  async sendMail(email: string, todo: Todo): Promise<void> {
    try {
      await this.emailtransporter.sendMail({
        from: 'fe61c97bc6-0a5e64@inbox.mailtrap.io',
        to: email,
        subject: 'Your Todo has been updated',
        text: `Your Todo ${todo.title} has been updated`,
        html: `<p>Your Todo <strong>${todo.description}</strong> </p>`,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  async getEmail(userId){
    const user = await this.userService.findOne(userId)
    const email = user.email
    return email

  }
  
  async create(createTodoDto: CreateTodoDto) {
    const newTodo = this.todoRepository.create(createTodoDto);
    // get the email of the user from id
    const email = await this.getEmail(createTodoDto.user)
    // send email 
    await this.sendMail(email, newTodo)
    return this.todoRepository.save(newTodo);
  }

  findAll() {
    return this.todoRepository.find();
  }

  findOne(todoId: string): Promise<Todo> {
    return this.todoRepository.findOne({ where: { todoId } });
  }

  async update(todoId:string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    await this.todoRepository.update({ todoId }, updateTodoDto);
    const email = await this.getEmail(updateTodoDto.user)
    // send email 
    const updatedTodo = await this.todoRepository.findOne({ where: { todoId } });
    await this.sendMail(email, updatedTodo);
    return this.todoRepository.findOne({ where: { todoId } });
  }

  async remove(todoId: string) {
    await this.todoRepository.delete({ todoId });
    return `Todo ${todoId} has been deleted`;
  }
}
