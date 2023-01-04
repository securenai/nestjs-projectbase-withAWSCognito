import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Query,
  Param,
} from '@nestjs/common';

// DTOs for validation
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UsersService } from './users.service';

// Custom Interceptor for Serialization
import {
  Serialize,
  SerializeInterceptor,
} from 'src/interceptors/serialize.interceptor';
import { UserDTO } from './dtos/users.dto';
import { AuthService } from './auth.service';

// Nest recommended approach (not the best solution - I implemented custom interceptors (DTOs) for flexibility
// @UseInterceptors(ClassSerializerInterceptor) // removes password in response if Exclude() decorator was
// included in the entity creation

// using my recommended approach
@Serialize(UserDTO) // can also be applied per request handler method, right now its global for the entire controller
@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  // using the nestjs decorator Body and our custom DTO to makes sure email and password is validated
  createUser(@Body() body: CreateUserDTO) {
    const { name, email, password } = body;

    this.authService.signUp(email, name, password);
  }

  // remember that everything coming from requests are strings - we need to parse them into numbers ourselves
  @Get('/user/:id')
  findUser(@Param('id') id: string) {
    console.log('Finding user...');
    return this.usersService.findOne(parseInt(id));
  }

  @Get('/findAllUsers')
  findAllUsers(@Query('email') email: string) {
    console.log('email:', email);
    return this.usersService.find(email);
  }

  @Delete('/user/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/updateUser/:id')
  // updates an existing user
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    this.usersService.update(parseInt(id), body);
    return { status: 200, msg: 'User updated!' };
  }
}
