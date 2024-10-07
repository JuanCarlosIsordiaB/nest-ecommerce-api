import { Injectable } from '@nestjs/common';


@Injectable()
export class SeedService {
 

  async runSeed(){
    this.insertNewProduct()
    return 'SEED EXECUTED'
  }

  private async insertNewProduct(){
    await this.productsService.deleteAllProducts()



    return 'DONE'
  }
}
