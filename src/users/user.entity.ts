import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { Exclude } from "class-transformer";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column({nullable: true})
    firstname: string;

    @Column({nullable: true})
    lastname: string;

    @Column({
        type: 'enum',
        enum: ['entrepreneur', 'investor', 'admin'],
        default: 'entrepreneur',
    })
    role: string

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createAt: Date;
}