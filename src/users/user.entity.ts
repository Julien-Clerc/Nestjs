import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Exclude } from "class-transformer";
import { Interest } from '../interests/interests.entity';
import { Project } from "src/projects/projects.entity";
import { Investment } from "src/investments/investments.entity";

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

    @ManyToMany(() => Interest, interest => interest.users)
    @JoinTable({name: "user_interests"})
    interests: Interest[];

    @OneToMany(() => Project, project => project.owner)
    projects: Project[];

    @OneToMany(() => Investment, investement => investement.investor)
    investments: Investment[];
}