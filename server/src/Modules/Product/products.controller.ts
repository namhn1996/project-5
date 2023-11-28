import { CreateProductDto } from './DTO/createProduct.dto';
import { UpdateProductDto } from './DTO/updateProduct.dto';
import { ProductsService } from './products.service';
import {
  Controller,
  Body,
  Get,
  Param,
  Post,
  Put,
  Patch,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';

@Controller('/api/v1/products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) {}

  @Get()
  async getAllProducts() {
    try {
      const products = await this.ProductsService.getAllProducts();
      return { message: 'GET ALL', rows: products };
    } catch (error) {
      return { error: 'Internal Server Error' };
    }
  }

  // filter by category
  @Get('/category')
  async filterByCategory(
    @Query('category') category: string,
    @Query('page_index') pageIndex: number,
    @Query('page_number') pageNumber: number,
  ) {
    return this.ProductsService.filterByCategory(
      category,
      pageIndex,
      pageNumber,
    );
  }

  // Phân trang
  @Get('/pagination')
  async getPaginatedProducts(
    @Query('page_index') pageIndex: number,
    @Query('page_number') pageNumber: number,
  ) {
    try {
      const parsedPageIndex = Number(pageIndex);
      const parsedPageNumber = Number(pageNumber);
      const result = await this.ProductsService.getPaginatedProducts(
        parsedPageIndex,
        parsedPageNumber,
      );
      return { message: 'GET ALL', data: result.data, length: result.length };
    } catch (error) {
      return { error: 'Internal Server Error' };
    }
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    try {
      const productId = parseInt(id, 10);
      const product = await this.ProductsService.getProductById(productId);
      if (!product) {
        return { message: 'Product not found' };
      }
      return product;
    } catch (error) {
      return { error: 'Internal Server Error' };
    }
  }

  // Create product
  @Post()
  async createProduct(@Body() productData: CreateProductDto) {
    try {
      const result = await this.ProductsService.createProduct(productData);
      return result;
    } catch (error) {
      return { error: 'Internal Server Error' };
    }
  }

  // Update product
  @Put(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    console.log(id);
    console.log(updateProductDto);

    return await this.ProductsService.updateProduct(id, updateProductDto);
  }

  // Delete product
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    try {
      const productId = parseInt(id, 10);
      const result = await this.ProductsService.deleteProduct(productId);
      return { message: result };
    } catch (error) {
      return { message: 'Delete not successful' };
    }
  }
}
