import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class BlacklistToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    token: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    expiresAt: Date;
}