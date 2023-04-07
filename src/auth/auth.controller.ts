/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-12-24 17:19:09
 * @LastEditTime: 2021-12-28 11:04:05
 * @Description: 登录控制器
 */
import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AdminLoginDto } from './dto/adminl.login.dto';
import { WebLoginDto } from './dto/web.login.dto';
import { apiSucceed, ApiSucceedResult } from '@app/common/ResponseResultModel';
import { LoginResultDto } from './dto/login.result.dto';
import { User } from '@app/db/modules/user.model';
import { WebRegisterDto } from './dto/web.register.dto';
import { UserService } from 'src/user/user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from './dto/file-upload.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MaterialService } from 'src/material/material.service';
import { CreateMaterialDto } from 'src/material/dto/create-material.dto';
import { isValidObjectId } from 'mongoose';
import { Get } from '@nestjs/common/decorators';
import { AdminService } from 'src/admin/admin.service';
import { CurrentUser } from './current-user.decorator';
import { AdminDocument } from '@app/db/modules/admin.model';

@ApiTags('登录')
@Controller('auth')
export class AuthController {
  // 注入
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private materialService: MaterialService,
    private adminService: AdminService,
  ) {}

  @ApiOperation({ summary: '管理站--登录' })
  @Post('admin/login')
  @UseGuards(AuthGuard('admin-local'))
  async adminLogin(
    @Body() dto: AdminLoginDto,
    @Req() req: any,
  ): Promise<ApiSucceedResult<LoginResultDto>> {
    // 生成token
    const accessToken = this.jwtService.sign({
      email: req.user.email,
      id: String(req.user._id),
    });
    const data: LoginResultDto = {
      email: req.user.email,
      name: req.user.name,
      accessToken,
    };
    return apiSucceed(data);
  }

  @Get('admin/getUserInfo')
  @UseGuards(AuthGuard('admin-jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取管理端登录人信息' })
  async getUserInfo(@CurrentUser() user: AdminDocument) {
    const id: string = String(user._id);
    const res = await this.adminService.findOne(id)
    return apiSucceed(res);
  }
  

  @ApiOperation({ summary: 'web站--会员登录' })
  @Post('web/login')
  @UseGuards(AuthGuard('web-local'))
  async webLogin(
    @Body() dto: WebLoginDto,
    @Req() req: any,
  ): Promise<ApiSucceedResult<LoginResultDto>> {
    // 生成token
    const accessToken = this.jwtService.sign({
      email: req.user.email,
      id: String(req.user._id),
    });
    const data: LoginResultDto = {
      email: req.user.email,
      name: req.user.name,
      accessToken,
    };
    return apiSucceed(data);
  }

  // web端注册
  @Post('web/register')
  @ApiOperation({ summary: 'web站--注册' })
  async portalRegister(
    @Body() registerDto: WebRegisterDto,
  ): Promise<ApiSucceedResult<User>> {
    const user = await this.userService.create(registerDto);
    return apiSucceed(user);
  }

  @Post('uploadImage/:id')
  @ApiOperation({ summary: '图片上传' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads/images',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 10).toString(10))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', description: '文件分类id', required: false })
  @ApiBody({
    description: '图片上传',
    type: FileUploadDto,
  })
  async uploadImage(@UploadedFile() file, @Req() req, @Param('id') id: string) {
    console.log(id, '参数')
    const domain = `${req.protocol}://${req.headers.host}`;
    const url = `${domain}/${file.path.replaceAll('\\', '/')}`;
    const data: CreateMaterialDto = {
      name: file.originalname,
      path: file.path.replaceAll('\\', '/'),
      url,
      type: 'image',
    };
    if (isValidObjectId(id)) {
      data.cid = id;
    }
    await this.materialService.create(data);
    return apiSucceed(data);
  }

  @Post('uploadVideo/:id')
  @ApiOperation({ summary: '视频上传' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads/videos',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 10).toString(10))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', description: '文件分类id', required: false })
  @ApiBody({
    description: '视频上传',
    type: FileUploadDto,
  })
  async uploadVideo(@UploadedFile() file, @Req() req, @Param('id') id: string) {
    const domain = `${req.protocol}://${req.headers.host}`;
    const url = `${domain}/${file.path.replaceAll('\\', '/')}`;
    const data: CreateMaterialDto = {
      name: file.originalname,
      path: file.path.replaceAll('\\', '/'),
      url,
      type: 'image',
    };
    if (isValidObjectId(id)) {
      data.cid = id;
    }
    await this.materialService.create(data);
    return apiSucceed(data);
  }
}
