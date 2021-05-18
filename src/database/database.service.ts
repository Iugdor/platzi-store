import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { Document } from 'mongoose';
import { FilterDto } from 'src/common/filter-dto';

@Injectable()
export class DatabaseService<T extends Document, C, F extends FilterDto> {
  private readonly modelName: string;
  constructor(private readonly dataModel: Model<T>) {
    for (const modelName of Object.keys(dataModel.collection.conn.models)) {
      if (dataModel.collection.conn.models[modelName] === this.dataModel) {
        this.modelName = modelName;
        break;
      }
    }
  }

  async findAll(params?: F, filters?: FilterQuery<T>) {
    if (params) {
      const { limit, offset } = params;
      return await this.dataModel
        .find(filters)
        .skip(offset * limit)
        .limit(limit)
        .exec();
    }
    return await this.dataModel.find().exec();
  }

  async findOne(id: string) {
    const model = this.dataModel.findById(id).exec();
    if (!model) {
      throw new NotFoundException(`#${this.modelName} #${id} not found`);
    }
    return model;
  }

  create(data: C) {
    const newCategory = new this.dataModel(data);
    return newCategory.save();
  }

  update(id: string, updateQuery: UpdateQuery<T>) {
    const model = this.dataModel
      .findByIdAndUpdate(id, updateQuery, { new: true })
      .exec();
    if (!model) {
      throw new NotFoundException(`#${this.modelName} #${id} not found`);
    }
    return model;
  }

  remove(id: string) {
    return this.dataModel.findByIdAndDelete(id);
  }
}
