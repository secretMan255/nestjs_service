import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        unsigned: true,
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 64,
        nullable: false,
    })
    username: string | null;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    email: string | null;

    @Column({
        name: 'email_norm',
        type: 'varchar',
        length: 255,
        nullable: true,
        insert: false,
        update: false,
        select: false,
    })
    emailNorm?: string | null;

    @Column({
        type: 'varchar',
        length: 32,
        nullable: true,
    })
    phone: string | null;

    @Column({
        name: 'phone_norm',
        type: 'varchar',
        length: 32,
        nullable: true,
        insert: false,
        update: false,
        select: false,
    })
    phoneNorm?: string | null;

    @Column({
        type: 'tinyint',
        default: () => '1',
    })
    status: number;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
    })
    updatedAt: Date;

    @Column({
        name: 'last_login_at',
        type: 'timestamp',
        nullable: true,
    })
    lastLoginAt: Date | null;

    @Column({
        name: 'last_login_ip',
        type: 'varchar',
        length: 45,
        nullable: true,
    })
    lastLoginIp: string | null;

    @Column({
        name: 'display_name',
        type: 'varchar',
        length: 128,
        nullable: true,
    })
    displayName: string | null;
}