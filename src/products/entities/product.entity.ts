import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('text', {
    unique: true,
  })
  title: string;

  @Column('float', {
    default: 0,
  })
  price: number;

  @Column('text', {
    nullable: true,
  })
  description: string;

  @Column('text', {
    unique: true,
  })
  slug: string;

  @Column('int', {
    default: 0,
  })
  stock: number;

  @Column('text', {
    array: true,
  })
  sizes: string[];

  @Column('text')
  gender: string;

  @Column('text',{
    array: true,
    default: []
  })
  tags: string[];
  //images

  @BeforeInsert()
  checkSlugInsert() {
    this.slug = this.title
      .toLocaleLowerCase()
      .toLocaleLowerCase()
      .replaceAll(' ', '-')
      .replaceAll("'", '');
  }

  @BeforeUpdate()
  checkSlugInsert() {
    this.slug = this.slug
      .toLocaleLowerCase()
      .toLocaleLowerCase()
      .replaceAll(' ', '-')
      .replaceAll("'", '');
  }
}
