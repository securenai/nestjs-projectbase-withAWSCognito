import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
} from 'typeorm';
import { Exclude } from 'class-transformer';

// all the properties that a user would have, and that we would want to store in the database
@Entity() // tells TypeORM to make sure it creates a TABLE called User
export class User {
  @PrimaryGeneratedColumn() // look at the table of users and add the column "id"
  id: number;

  @Column() // same here, column "name" that can hold strings (VARCHAR in sql)
  email: string;

  @Column()
  name: string;

  @Column() // same here, column "name" that can hold strings (VARCHAR in sql)
  // Nest recommended approach but not the best - I implemented custom interceptors (DTOs) for flexibility
  // @Exclude() // excludes this property when nestjs converts the entity to json behind the scenes
  password: string;

  // typeORM Hooks for handling debugging / testing
  // this only works if you create an entity instance before saving to DB
  @AfterInsert()
  logInsert() {
    console.log('New user created with id:', this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log('New user removed with id:', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('New user updated with id:', this.id);
  }
}
