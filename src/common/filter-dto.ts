import { IsOptional, IsPositive, Min } from 'class-validator';

export class FilterDto {
  @IsOptional()
  @IsPositive()
  readonly limit: number;

  @IsOptional()
  @Min(0)
  readonly offset: number;
}
