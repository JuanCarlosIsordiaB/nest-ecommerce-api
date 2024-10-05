import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

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
  findAll() {
    const productos = this.productRepository.find({});
    return productos;
  }

  findOne(id: string) {
    
    return this.productRepository.findOneBy({id})
    
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: number, ) {
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
