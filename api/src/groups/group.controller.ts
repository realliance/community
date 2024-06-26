import {
  Controller,
  Request,
  Get,
  UseGuards,
  Param,
  Post,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GroupsService } from './group.service';
import { Group, NewGroup } from './group.entity';
import { AdminRoute } from 'src/admin/admin.decorator';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { AdminGuard } from 'src/admin/admin.guard';
import { GetByIdParameter } from 'src/utils/types';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiParamOptions,
} from '@nestjs/swagger';

const groupIdParam: ApiParamOptions = {
  name: 'id',
  required: true,
  type: 'string',
  description: 'Group Id',
};

@Controller()
export class GroupController {
  constructor(
    private groupService: GroupsService,
    private userService: UsersService,
  ) { }

  @Get('groups/:id')
  @ApiParam(groupIdParam)
  @ApiBearerAuth()
  async getById(@Param() params: GetByIdParameter): Promise<Group> {
    const group = await this.groupService.findOneBy({ id: params.id });
    // For public route, exclude user information
    return { ...group, users: undefined };
  }

  @Get('groups')
  getAll(): Promise<Group[]> {
    return this.groupService.findAll();
  }

  @Post('groups')
  @AdminRoute()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @ApiBody({
    required: true,
    type: NewGroup,
    description: 'New Group, can omit id',
  })
  createGroup(@Body() newGroup: Omit<Group, 'id'>): Promise<Group> {
    return this.groupService.create(newGroup);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('groups/:id/members')
  @ApiBearerAuth()
  @ApiParam(groupIdParam)
  groupMembers(@Param() params: GetByIdParameter): Promise<User[] | undefined> {
    return this.groupService
      .findOneBy({ id: params.id })
      .then((group) => group?.users);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('groups/:id/join')
  @ApiBearerAuth()
  @ApiParam(groupIdParam)
  async join(
    @Request() req,
    @Param() params: GetByIdParameter,
  ): Promise<Group> {
    const id = req.user.sub;

    if (!id) {
      throw new Error('User session not found, cannot join group');
    }

    const user = await this.userService.findOneBy({ id });
    const group = await this.groupService.findOneBy({ id: params.id });
    if (group.users.find((user) => user.id === user.id)) {
      return group;
    }

    group.users = group.users ?? [];
    group.users.push(user);

    return this.groupService.updateGroup(group);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('groups/:id/leave')
  @ApiBearerAuth()
  @ApiParam(groupIdParam)
  async leave(
    @Request() req,
    @Param() params: GetByIdParameter,
  ): Promise<Group> {
    const id = req.user.sub;

    if (!id) {
      throw new Error('User session not found, cannot leave group');
    }

    const user = await this.userService.findOneBy({ id });
    const group = await this.groupService.findOneBy({ id: params.id });
    const index = group.users.findIndex((user) => user.id === user.id);

    if (user && index !== -1) {
      group.users.splice(index, 1);
      return this.groupService.updateGroup(group);

    }

    throw new Error('User does not exist in group');
  }
}
