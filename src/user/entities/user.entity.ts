import {
    Entity, Column, CreateDateColumn,
    PrimaryGeneratedColumn, UpdateDateColumn,
    OneToMany,
    JoinColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Todo } from 'src/todo/entities/todo.entity';
@Entity()

export class User { 
    @PrimaryGeneratedColumn('uuid')
    userId: string;
    
    @Column({ nullable: false })
    @ApiProperty({
        description: 'The email of the user',
        type: String,
        example: 'janedoe@gmail.com',
    })
    email: string;

    @Column({ nullable: false })
    @ApiProperty({
        description: 'The name of the user',
        type: String,
        example: 'Jane Doe',
    })
    name: string;

    @Column({ nullable: false })
    @ApiProperty({
        description: 'The phone number of the user',
        type: String,
        example: '08012345678',
    })
    phone: string;

    @Column({ nullable: false })
    @ApiProperty({
        description: 'The password of the user',
        type: String,
        example: 'password',
    })
    password: string;

    @OneToMany(() => Todo, todo => todo.todoId, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
        
    @JoinColumn({
        name: 'todo', referencedColumnName: 'todoId'
    })
    todo: Todo[];

    @CreateDateColumn()
    createdAt: Date;
        
    @UpdateDateColumn()
    updatedAt: Date;
}

