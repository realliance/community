import { Controller, Request, Get, UseGuards, Param, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GroupsService } from './group.service';
import { Group } from './group.entity';
import { AdminRoute } from 'src/admin/admin.decorator';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { AdminGuard } from 'src/admin/admin.guard';

@Controller()
export class GroupController {
  constructor(private groupService: GroupsService, private userService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('groups/:id')
  getById(@Param() params: any): Promise<Group> {
    return this.groupService.findOneBy({ id: params.id });
  }

  @Get('groups')
  getAll(): Promise<Group[]> {
    return this.groupService.findAll();
  }

  @Post('groups')
  @AdminRoute()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  createGroup(@Body() newGroup: Omit<Group, 'id'>): Promise<Group> {
    return this.groupService.create(newGroup);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('groups/:id/members')
  groupMembers(@Param() params: any): Promise<User[]> {
    return this.groupService.findOneBy({ id: params.id }).then((group) => group.users);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('groups/:id/join')
  join(@Request() req, @Param() params: any): Promise<void> {
    return this.groupService.findOneBy({ id: params.id })
        .then((group) => {
            const groups = [...req.user.groups, group];
            return this.userService.updateUser(req.user.id, { groups: groups });
        });
  }
}