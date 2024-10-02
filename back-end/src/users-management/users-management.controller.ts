import { Controller, Get, Param, Res } from '@nestjs/common';
import { UsersManagementService } from './users-management.service';
import { GetUserInformationDto } from './dto/GetUserInformationDto';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { GetUserSuggestionDto } from './dto/GetUserSuggestionDto';

@Controller('users-management')
export class UsersManagementController {
  constructor(
    private readonly usersManagementService: UsersManagementService,
  ) {}

  @Get('/getUserInfo/:username')
  async getUserInfo(
    @Param() getUserInformationDto: GetUserInformationDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(200)
      .json(
        await this.usersManagementService.getUserInfo(getUserInformationDto),
      );
  }

  @Get('/getUserNameSuggestion/:username')
  async getUserNameSuggestion(
    @Param() getUserNameSuggestionDto: GetUserSuggestionDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(200)
      .json(
        await this.usersManagementService.getUserNameSuggestion(
          getUserNameSuggestionDto,
        ),
      );
  }
}
