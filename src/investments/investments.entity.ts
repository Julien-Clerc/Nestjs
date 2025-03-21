import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "src/users/user.entity";
import { Project } from '../projects/projects.entity'

@Entity()
export class Investment {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => User, user => user.investments)
    investor: User;

    @ManyToOne(() => Project, project => project.investments)
    projects: Project;

    @Column('decimal', {precision: 10, scale: 2})
    amount: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date: Date;
}