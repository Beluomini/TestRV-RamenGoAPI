import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProteinDto } from './dto/create-protein.dto';
import { UpdateProteinDto } from './dto/update-protein.dto';
import { PrismaService } from 'src/PrismaService';

@Injectable()
export class ProteinsService {
  constructor(private prisma: PrismaService) {}

  create(createProteinDto: CreateProteinDto) {
    const protein = this.prisma.protein.create({
      data: createProteinDto,
    });
    return protein;
  }

  findAll(apiKey) {
    if (apiKey !== process.env.API_KEY) {
      throw new ForbiddenException('x-api-key header missing');
    }
    return this.prisma.protein.findMany();
  }

  findOne(id: string) {
    const protein = this.prisma.protein.findFirst({
      where: {
        id: id,
      },
    });
    if (!protein) {
      throw new NotFoundException(`Protein with id ${id} not found`);
    }
    return protein;
  }

  update(id: string, updateProteinDto: UpdateProteinDto) {
    const protein = this.prisma.protein.findFirst({
      where: {
        id: id,
      },
    });
    if (!protein) {
      throw new NotFoundException(`Protein with id ${id} not found`);
    }
    const newProtein = this.prisma.protein.update({
      where: { id: id },
      data: updateProteinDto,
    });
    return newProtein;
  }

  remove(id: string) {
    const protein = this.prisma.protein.findFirst({
      where: {
        id: id,
      },
    });
    if (!protein) {
      throw new NotFoundException(`Protein with id ${id} not found`);
    }
    return this.prisma.protein.delete({
      where: { id: id },
    });
  }
}
