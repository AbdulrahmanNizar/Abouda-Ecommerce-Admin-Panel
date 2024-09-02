import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Color } from './colors.model';

@Injectable()
export class ColorsService {
  constructor(
    @InjectModel('Color') private readonly colorModel: Model<Color>,
  ) {}
}
