import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  //patron repositorio
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const producto = this.productRepository.create(createProductDto);

      await this.productRepository.save(producto);

      return producto;
    } catch (error) {
      console.log(error);
      this.handleErrorExceptions(error);
    }
  }

  //Paginar
  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const productos = this.productRepository.find({
      take: limit,
      skip: offset,
      //TODO: reallciones
    });
    return productos;
  }

  async findOne(id: string) {
    let product: Product;

    if (isUUID(id)) {
      product = await this.productRepository.findOneBy({ id });
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder();
      product = await queryBuilder
        .where(`UPPER(title) =:title or slug =: slug`, {
          title: id.toUpperCase(),
          slug: id.toLowerCase(),
        })
        .getOne();
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({
      id,
      ...updateProductDto, // busca por id y cambia todas las propiedades
    });

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    try {
      await this.productRepository.save(product);
    } catch (error) {
      console.log(error)
      this.handleErrorExceptions(error);
    }
    return product;
  }

  async remove(id: number) {
    const product = this.findOne(id);
    await this.productsService.remove(product);
  }

  private handleErrorExceptions(error: any) {
    if ((error = '23505')) {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
  }
}
