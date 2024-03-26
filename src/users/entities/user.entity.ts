import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import UpdateUserDto from '../dto/update-user.dto';
import CreateUserDto from '../dto/create-user.dto';

@Entity('accounts')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  update(dto: UpdateUserDto) {
    Object.assign(this, dto);
  }

  static of(dto: CreateUserDto): User {
    const user = new User();
    Object.assign(user, dto);
    return user;
  }
}
