import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UsersEntity } from "../users/users.entity";

@Entity({ name: 'extracts' })
export class ExtractsEntity {

    @PrimaryColumn({ type: 'int', nullable: false })
    id: number

    @Column({name: 'created_at', type: 'timestamp', nullable: false})
    created_at: Date 

    @Column({name: 'pages_process', type: 'bigint', nullable: false })
    pages_process: string

    @Column({name: 'doc_type', type: 'character varying', length: 100, nullable: false})
    doc_type: string
    
    @ManyToOne(() => UsersEntity, user => user.id)
    @JoinColumn({ name: 'user_id' })
    user_id: UsersEntity;

}