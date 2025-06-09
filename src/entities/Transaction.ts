import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  description: string;

  @Column("int")
  amount: number;

  @Column("text")
  paymentType: string;

  @Column({ type: "date" })
  transactionDate: Date; 
}
