import { Body, Controller, Post, Res } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { CreateUserDto as SignUpUserDto } from './dto/SignUpUserDto';
import { LoginUserDto } from './dto/LoginUserDto';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { ValidateUserToken } from './dto/ValidateUserToken';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post('/signup')
  async signup(
    @Body() createUserDto: SignUpUserDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res.status(201).json(await this.registrationService.signup(createUserDto));
  }

  @Post('/login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res.status(200).json(await this.registrationService.login(loginUserDto));
  }

  @Post('/validateTheAuthToken')
  validateTheAuthToken(
    @Body() validateUserToken: ValidateUserToken,
    @Res() res,
  ): SuccessResponseObjectDto | void {
    res
      .status(200)
      .json(this.registrationService.validateTheAuthToken(validateUserToken));
  }
}
