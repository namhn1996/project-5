import { Order } from 'src/Modules/Order/entity/order.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({
  name: 'users',
})
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  users_id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    // unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false, //có thể null hay không
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: 0,
  })
  role: number;

  @Column({
    type: 'varchar',
    default: '0',
  })
  status: string;

  @OneToMany(() => Order, (order) => order.user)
  order: Order[];
}
