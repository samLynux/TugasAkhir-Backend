import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { HasPemission } from 'src/permission/has-permission.decorator';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
    constructor(private roleService:RoleService){

    }
    @Get()
    @HasPemission('roles')
    async all(){
        return this.roleService.all();
    }


    @Get(':id')
    @HasPemission('roles')
    async get(@Param('id') id: number){
        return this.roleService.findOne({id}, ['permissions']);
    }

    @Post()
    @HasPemission('roles')
    async create(
        @Body('name') name: String,
        @Body('permissions') ids: number[]
    ){
        return this.roleService.create({
            name,
            permissions: ids.map(id => ({id}))
        });
    }

    @Put(':id')
    @HasPemission('roles')
    async update(
        @Param('id') id : number,
        @Body('name') name: String,
        @Body('permissions') ids: number[]

    ){

        await this.roleService.update(id, {name})

        const role = await this.roleService.findOne(id);
        return this.roleService.create({
            ...role,
            permissions: ids.map(id => ({id}))
        });
    }

    @Delete(':id')
    @HasPemission('roles')
    async delete(@Param('id') id : number){
        return this.roleService.delete(id);
    }
}
