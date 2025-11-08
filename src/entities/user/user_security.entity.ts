import {
    Entity,
    Column,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_security')
export class UserSecurity {
    @PrimaryColumn({
        name: 'user_id',
        type: 'bigint',
        unsigned: true,
    })
    userId: number;

    @OneToOne(() => User, (user) => user.security, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id',
    })
    user: User;

    @Column({ name: 'password_hash', type: 'varchar', length: 255, nullable: true })
    passwordHash: string | null;

    @Column({ name: 'mfa_enabled', type: 'tinyint', default: () => '0' })
    mfaEnabled: number;

    @Column({
        name: 'mfa_type',
        type: 'enum',
        enum: ['totp', 'sms', 'email'],
        nullable: true,
    })
    mfaType: 'totp' | 'sms' | 'email' | null;

    @Column({ name: 'mfa_secret', type: 'varbinary', length: 256, nullable: true })
    mfaSecret: Buffer | null;

    @Column({
        name: 'failed_attempts',
        type: 'int',
        unsigned: true,
        default: () => '0',
    })
    failedAttempts: number;

    @Column({ name: 'locked_until', type: 'timestamp', nullable: true })
    lockedUntil: Date | null;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

}