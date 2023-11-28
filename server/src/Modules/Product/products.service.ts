import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/products.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './DTO/createProduct.dto';
import { UpdateProductDto } from './DTO/updateProduct.dto';
import { log } from 'console';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // get all
  async getAllProducts(): Promise<Product[]> {
    try {
      return await this.productRepository.find();
    } catch (error) {
      throw new Error('Unable to fetch products');
    }
  }

  // filter by category
  async filterByCategory(
    category: string,
    pageNumber: number,
    pageSize: number,
  ) {
    const skip = pageNumber ? (pageNumber - 1) * pageSize : 0;

    const query = this.productRepository
      .createQueryBuilder('product')
      .select([
        'product.product_id',
        'product.name',
        'product.number',
        'product.title',
        'product.price',
        'product.sale',
        'product.img',
        'category.name',
        'category.description',
      ])
      .innerJoin('product.category', 'category')
      .where('category.name = :category', { category });

    if (pageNumber && pageSize) {
      query.take(pageSize).skip(skip);
    }

    const [data, count] = await Promise.all([
      query.getMany(),
      this.productRepository.count({
        where: { category: { name: category } },
      }),
    ]);

    return { data, length: count };
  }

  // Phân trang
  async getPaginatedProducts(
    pageIndex: number,
    pageNumber: number,
  ): Promise<{ data: Product[]; length: number }> {
    try {
      const query = this.productRepository
        .createQueryBuilder('product')
        .select([
          'product.product_id',
          'product.name',
          'product.number',
          'product.title',
          'product.price',
          'product.sale',
          'product.img',
        ])
        .leftJoinAndSelect('product.category', 'category');

      const data = await query
        .take(pageNumber)
        .skip((pageIndex - 1) * pageNumber)
        .getMany();

      const length = await this.productRepository.count();

      return { data, length };
    } catch (error) {
      throw new Error('Unable to fetch paginated products');
    }
  }

  // Get product by id
  async getProductById(id: number) {
    try {
      const queryBuilder = this.productRepository.createQueryBuilder('product');
      queryBuilder
        .leftJoinAndSelect('product.category', 'category')
        .where('product.product_id = :id', { id });

      const product = await queryBuilder.getOne();
      return product;
    } catch (error) {
      throw new Error('Unable to fetch product');
    }
  }

  // Create product
  async createProduct(productData: CreateProductDto): Promise<any> {
    try {
      const newProduct = await this.productRepository.create(productData);
      await this.productRepository.save(newProduct);
      return { message: 'Create product success' };
    } catch (error) {
      throw new Error('Create product error');
    }
  }

  // Update product
  // async updateProduct(id: number, updatedData: UpdateProductDto): Promise<any> {
  //   console.log(id);

  //   try {
  //     await this.productRepository.update(id, updatedData);
  //     return { message: 'Update product success' };
  //   } catch (error) {
  //     console.log(error);

  //     throw new Error('Update not success');
  //   }
  // }

  async updateProduct(id: number, data: UpdateProductDto) {
    console.log(id, data);

    // try {
    await this.productRepository.update(id, data);

    //   return {
    //     message: 'Update product success',
    //   };
    // } catch (error) {
    //   throw error;
    // }
  }

  // Delete product
  async deleteProduct(id: number): Promise<string> {
    try {
      await this.productRepository.delete(id);
      return 'Delete successful';
    } catch (error) {
      throw new Error('Delete not successful');
    }
  }
}
