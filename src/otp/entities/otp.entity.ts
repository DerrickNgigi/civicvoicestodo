import { Entity, Column, CreateDateColumn,
    PrimaryGeneratedColumn, UpdateDateColumn,} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
    enum Status {
        new = 'new',
        used = 'used',
    }
@Entity()
    


export class Otp {
    // otp contains the following columns: email, otp, new/used createdAt, updatedAt
    @PrimaryGeneratedColumn('uuid')
    otpId: string;

    @Column({ nullable: false })
    @ApiProperty({
        description: 'The email of the user',
        type: String,
        example: 'janedoe@gmail.com',
    })
    email: string;

    @Column({ nullable: true })
    @ApiProperty({
        description: 'The otp of the user',
        type: String,
        example: '123456',
    })
    otp: string;

    @Column({ nullable: true })
    @ApiProperty({
        description: 'The status of the otp',
        type: String,
        example: 'new',
    })
    status: Status;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
 }
