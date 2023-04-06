import { PartialType } from '@nestjs/swagger';
import { CreateMaterialCategoryDto } from './create-material-category.dto';

export class UpdateMaterialCategoryDto extends PartialType(CreateMaterialCategoryDto) {}
