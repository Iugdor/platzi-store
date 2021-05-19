import {
  IsMongoId,
  IsNotEmpty,
  IsDate,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger'; // 👈 use OmitType

export class CreateOrderDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly customer: string;

  @IsDate()
  @IsNotEmpty()
  readonly date: Date;

  @IsArray()
  @IsNotEmpty()
  readonly products: string[];
}

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['products']),
) {}

export class AddProductsToOrderDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  readonly productsIds: string[];
}
