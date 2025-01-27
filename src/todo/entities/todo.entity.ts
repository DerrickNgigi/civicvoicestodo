import {
    Entity, Column, CreateDateColumn,
    PrimaryGeneratedColumn, UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

// status Enum { Pending, Done }
// category Enum { Home, Work, School, Others }

enum Status {
    Pending = 'Pending',
    Done = 'Done',
}

enum Category {
    Home = 'Home',
    Work = 'Work',
    School = 'School',
    Others = 'Others',
}

@Entity()
    // Her are the category of the todo
    // title category description time status date
export class Todo { 
    @PrimaryGeneratedColumn('uuid')
    todoId: string;
    
    @Column({ nullable: false })
    @ApiProperty({
        description: 'The title of the todo',
        type: String,
        example: 'Clean the house',
    })
    title: string;
    
    @Column({ nullable: false })
    @ApiProperty({
        description: 'The category of the todo',
        type: String,
        example: 'Home',
    })
    category: Category;
    
    @Column({ nullable: false })
    @ApiProperty({
        description: 'The description of the todo',
        type: String,
        example: 'Clean the house',
    })
    description: string;
    
    @Column({ nullable: false })
    @ApiProperty({
        description: 'The time of the todo',
        type: String,
        example: '12:00',
    })
    time: string;
    
    @Column({ nullable: false })
    @ApiProperty({
        description: 'The status of the todo',
        type: String,
        example: 'Pending',
    })
    status: Status;
    
    @Column({ nullable: false })
    @ApiProperty({
        description: 'The date of the todo',
        type: String,
        example: '2021-06-30',
    })
    date: string;

    @ManyToOne(() => User, (user: User) => user.todo, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        eager: true,
    })
    @ApiProperty({
        description: 'The user that owns the todo',
        type: String,
        example: 'bd57ffa6-be4a-4134-8f85-50979f9815af'
    })
        
    @JoinColumn()
    user: User["userId"];
    
    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;

}
