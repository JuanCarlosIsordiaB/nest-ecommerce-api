import { Injectable } from '@nestjs/common';
import { initialData } from './data/seed-data';


@Injectable()
export class SeedService {
 

  async runSeed(){
    this.insertNewProduct()
    return 'SEED EXECUTED'
  }

  private async insertNewProduct(){
    await this.productsService.deleteAllProducts();


    const products = initialData.products;
    const insertPromises = [];


    products.forEach(product => {
      insertPromises.push(this.productsServices.create(product))
    });


    await Promise.all(insertPromises);



    return 'DONE'
  }
}
