import { ObjectType, Field } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert} from "typeorm";
import bcrypt from 'bcrypt';
@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: Number;

    @Field()
    @Column({ unique: true })
    username!: String;

    @Field()
    @Column({ unique: true })
    email!: String;

    @Column()
    password!: String;

    @Field(()=> String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(()=> String)
    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10);
    }

}