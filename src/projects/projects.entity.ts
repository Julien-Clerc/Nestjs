import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { User } from "src/users/user.entity";
import { Investment } from "src/investments/investments.entity";

@Entity()
export class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    description: string

    @Column('decimal', { precision: 10, scale:2 })
    budget: number

    @Column()
    category: string

    @ManyToOne(() => User, user => user.projects)
    owner: User;

    @ManyToMany(() => Investment, investment => investment.projects)
    @JoinTable()
    investments: Investment[]
}