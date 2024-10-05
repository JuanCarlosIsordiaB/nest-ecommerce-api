import { IsArray, IsIn, IsInt, IsOptional, IsPositive, IsString, MinLength } from "class-validator";



//como debe lucir la informacion en la parte de la insercion
export class CreateProductDto {

    @IsString()
    @MinLength(1)
    title: NamedCurve;
    
    @IsInt()
    @IsPositive()
    @IsOptional()
    price?: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    slug?:string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @IsString({each: true})
    @IsArray()
    sizes: string[];

    @IsIn(['men', 'women','unisex'])
    gender: string;

    @IsString({each: true})
    @IsArray()
    tags: string[]
    
}
