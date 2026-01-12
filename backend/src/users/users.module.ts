import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { AdminBootstrapService } from './admin-bootstrap/admin-bootstrap.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, AdminBootstrapService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
