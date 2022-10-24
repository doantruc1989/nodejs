import { timeStamp } from "console";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { category } from "./category";

@Entity()
export class post {
    @PrimaryGeneratedColumn()
    "id": number

    @Column()
    "title": string

<<<<<<< HEAD
    @Column({
        type: "text"
    })
    "content": string

    @Column({
        type: "text"
    })
    "contentFull": string

=======
    @Column()
    "content": string

>>>>>>> 7ae84adc41d199bc6f1c5ba9c1f415cec5b5d7d7
    @Column()
    "path": string

    @Column({
        type: "timestamp"
    })
    "time": string

    @ManyToOne(() => category, (category) => category.posts)
    "categories" : category[]
};