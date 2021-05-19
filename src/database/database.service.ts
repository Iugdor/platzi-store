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

  findAll(options?: {
    params?: F;
    filters?: FilterQuery<T>;
    modelsToPopulate?: (keyof T)[];
  }) {
    if (!options) return this.dataModel.find();

    const { params, filters, modelsToPopulate } = options;
    let query = this.dataModel.find(filters);
    if (params) {
      const { limit, offset } = params;
      query = query.skip(offset * limit).limit(limit);
    }
    if (modelsToPopulate && modelsToPopulate.length > 0) {
      modelsToPopulate.forEach((model) => (query = query.populate(model)));
    }
    return query.exec();
  }

  async findOne(id: string) {
    const model = await this.dataModel.findById(id).exec();
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
