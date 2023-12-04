import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsersEntity } from "../users/users.entity";

@Entity({ name: 'data' })
export class DataEntity {

    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number

    @ManyToOne(() => UsersEntity, user => user.id)
    @JoinColumn({ name: 'user_id' })
    user_id: UsersEntity;

    @Column({name: 'cardValueID', type: 'character varying', length: 100, nullable: false})
    cardValueID: string;

    @Column({name: 'chartType', type: 'character varying', length: 30, nullable: false})
    chartType: string;

    @Column({name: 'selectedOptions', type: 'text', array: true, nullable: false})
    selectedOptions: string[];

    @Column({name: 'startDate', type: 'date', nullable: false})
    startDate: Date;

    @Column({name: 'endDate', type: 'date', nullable: false})
    endDate: Date;

    @Column({name: 'aggregate', type: 'character varying', length: 30, nullable: true})
    aggregate: string;

    @Column({name: 'timeGrouping', type: 'character varying', length: 30, nullable: false })
    timeGrouping: string

    @Column({name: 'specificFilter', type: 'text', nullable: false})
    specificFilter: string
    
}