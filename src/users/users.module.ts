import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { CreateNewUserMiddleware } from '../middleware/validators/users/createNewUser';
import { Heimdall } from '../middleware/heimdall';
import { IsAdmin } from '../middleware/isAdmin';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGOURL),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],

  providers: [UsersService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Heimdall, IsAdmin, CreateNewUserMiddleware).forRoutes(
      { path: 'users', method: RequestMethod.POST },
      // { path: 'users/login', method: RequestMethod.ALL },
    );
  }
}
// imports: [
//   ConfigModule.forRoot(),
//   MongooseModule.forRoot(process.env.MONGOURL),
//   UsersModule,
// ],
// controllers: [AppController],
// providers: [AppService],
// })
