import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { post } from "./post";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column()
  category: string;

  @OneToMany(() => post, (post) => post.categories)
  "posts": post[];
}
