import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StoreManagement } from 'src/stores-management/stores-management.model';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    @InjectModel('Store') private readonly storeModel: Model<StoreManagement>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const storeInDB = await this.storeModel.find({
        _id: request.body.storeId,
      });
      let foundTheUserInAdmins: boolean = false;

      for (let i = 0; i < storeInDB[0].storeAdmins.length; i++) {
        if (storeInDB[0].storeAdmins[i] == request.body.userId) {
          foundTheUserInAdmins = true;
        }
      }

      if (foundTheUserInAdmins == true) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }
}
