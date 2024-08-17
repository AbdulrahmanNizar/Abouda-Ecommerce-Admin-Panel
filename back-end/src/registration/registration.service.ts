import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Registration } from './registration.model';
import { SuccessResponseObjectDto } from '../dto/SuccessResponseObjectDto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto as SignUpUserDto } from './dto/SignUpUserDto';
import { LoginUserDto } from './dto/LoginUserDto';
import { ValidateUserToken } from './dto/ValidateUserToken';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<Registration>,
    private jwtService: JwtService,
  ) {}

  async signup(requestInfo: SignUpUserDto): Promise<SuccessResponseObjectDto> {
    // checking if the username valid or no
    const checkTheUserName = await this.userModel.find({
      username: requestInfo.username,
    });

    if (checkTheUserName.length > 0) {
      throw new HttpException('The username is already exist', 400);
    } else {
      // generate a salt for the hashed password, and hash the new user's password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(requestInfo.password, salt);

      // add the new user to the database
      const newUser = new this.userModel({
        username: requestInfo.username,
        email: requestInfo.email,
        password: hashedPassword,
        online: true,
      });
      await newUser.save();

      // generate a jwt token for the new user
      const jwtToken = this.jwtService.sign({ id: newUser._id });

      // done
      return {
        successMessage: 'User created successfully',
        statusCode: 201,
        data: { token: jwtToken, userId: newUser._id },
      };
    }
  }

  async login(requestInfo: LoginUserDto): Promise<SuccessResponseObjectDto> {
    // checking if the user exist or no
    const userExists = await this.userModel.find({ email: requestInfo.email });

    if (userExists.length > 0) {
      // comparing the passwords
      const comparedPassword: boolean = await bcrypt.compare(
        requestInfo.password,
        userExists[0].password,
      );
      if (comparedPassword == true) {
        // generating new jwt token for the user
        const jwtToken = this.jwtService.sign({ id: userExists[0]._id });

        // done
        return {
          successMessage: 'Logged in successfully',
          statusCode: 200,
          data: { token: jwtToken, userId: userExists[0]._id },
        };
      } else {
        throw new HttpException('Wrong email or password', 400);
      }
    } else {
      throw new HttpException('Wrong email or password', 400);
    }
  }

  validateTheAuthToken(
    requestInfo: ValidateUserToken,
  ): SuccessResponseObjectDto | void {
    // verfiying the user token
    try {
      const tokenVerify = this.jwtService.verify(requestInfo.token, {
        secret: 'aboudasecretkey2010510',
      });

      // done
      return {
        successMessage: 'Token verifyed',
        statusCode: 200,
      };
    } catch (err) {
      // return an error if the token was not valid
      throw new HttpException(err, 400);
    }
  }
}
