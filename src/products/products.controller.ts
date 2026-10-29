import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';

import { NATS_SERVICE } from '../config/index.js';
import { PaginationDto } from '../common/index.js';
import { CreateProductDto, UpdateProductDto } from './dto/index.js';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) { }

  @Post()
  createProduct(@Body() body: CreateProductDto) {
    return this.client.send({ cmd: 'create_product' }, body).pipe(
      catchError((error) => { throw new RpcException(error) })
    );
  }

  @Get()
  findAllProducts(
    @Query() paginationDto: PaginationDto
  ) {
    return this.client.send({ cmd: 'find_all_products' }, paginationDto).pipe(
      catchError((error) => { throw new RpcException(error) })
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const product = await firstValueFrom(this.client.send({ cmd: 'find_one_product' }, { id }));
      return product;
    } catch (error: any) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductDto
  ) {
    return this.client.send({ cmd: 'update_product' }, { id, ...body }).pipe(
      catchError((error) => { throw new RpcException(error) })
    );
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'remove_product' }, { id }).pipe(
      catchError((error) => { throw new RpcException(error) })
    );
  }
}
