import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'users' })
export class UsersEntity {

    @PrimaryColumn({ type: 'bigint', nullable: false })
    id: number;

    @Column({ name: 'name', type: 'character varying', length: 200 })
    name: string;

    @Column({ name: 'segment', type: 'character varying', length: 50 })
    segment: string;
}

