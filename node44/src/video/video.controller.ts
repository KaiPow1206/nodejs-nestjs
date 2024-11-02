import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Header, Res, HttpStatus, Headers, Req, UseGuards, UseInterceptors, UploadedFile, UploadedFiles} from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto, FilesUpLoadDto, FileUpLoadDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import e, { Request, Response } from 'express';
import { VideoDto } from './dto/video.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiHeader, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { getStorageOptions } from 'src/shared/upload.service';
import { CloudinaryUpLoadService } from 'src/shared/cloudUpload.service';
@ApiTags('Video') // chia cụm api
@Controller('video') //http://localhost:8080/video/
export class VideoController {
  constructor(
    private readonly videoService: VideoService,
    private readonly cloundUpLoadService: CloudinaryUpLoadService
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post("/create-video")
  async create(
    @Body() createVideoDto: CreateVideoDto,
    @Res() res: Response
): Promise<Response<VideoDto>> {
    let newVideo= await this.videoService.create(createVideoDto);
    return res.status(HttpStatus.CREATED).json(newVideo);
  }

  @Get("/get-videos")
  @ApiQuery({name: "page", required: false, type:Number})
  @ApiQuery({name: "size", required: false, type:Number})
  @ApiQuery({name: "keyword", required: false, type:String})
  @ApiHeader({name: "token", required: false})
  @ApiResponse({status:HttpStatus.OK,description:"Get list video successful"})
  @ApiResponse({status:HttpStatus.INTERNAL_SERVER_ERROR,description:"Internal Server"})
  async findAll(
    @Query('page') page: string,
    @Query('size') size: string,
    @Query('keyword') keyword: string,
    @Res() res: Response,
    @Headers("token") token: string,
    @Req() req:Request
  ): Promise<Response <VideoDto[]>> {
    try {
      // return res.status(HttpStatus.OK).json({page,size,keyword,token});
      // return this.videoService.findAll();
      // Format datatype cho page và size
      // toán tử 3 ngôi
      const formatPage = page ? Number(page) : 1;
      const formatSize = size ? Number(size) : 10;
      let videos = await this.videoService.findAll(formatPage,formatSize,keyword);
      return res.status(HttpStatus.OK).json(videos);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
   
  }

  @Post('/upload-thumbnail')
  // decorator cho swagger
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type: FileUpLoadDto,
    required:true
  })
  // decorator cho nest
  @UseInterceptors(FileInterceptor('hinhAnh',{storage:getStorageOptions("videos")}))
  uploadThumbnail(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response
  ){
    return res.status(HttpStatus.OK).json(file);
  }

  @Post('/upload-thumbnail-cloud')
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type: FileUpLoadDto,
    required:true
  })
  @UseInterceptors(FileInterceptor('hinhAnh'))
  async upLoadThumbnailCloud(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response
  ){
    try {
      const result = await this.cloundUpLoadService.upLoadImage(file,'videos')
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.log(error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Upload failed"});
    }
  }

  @Post('/upload-multi-thumbnails')
  // decorator cho swagger
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type: FilesUpLoadDto,
    required:true
  })
  @UseInterceptors(FilesInterceptor('hinhAnh',20,{storage:getStorageOptions("videos")}))
  upLoadMultipleThumbnail(
    @UploadedFiles() files : Express.Multer.File[],
    @Res() res: Response
  ){
    return res.status(HttpStatus.OK).json(files);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videoService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoService.remove(+id);
  }
}
