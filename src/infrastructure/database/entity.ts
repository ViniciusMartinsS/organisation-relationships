import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Organisation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;
}
