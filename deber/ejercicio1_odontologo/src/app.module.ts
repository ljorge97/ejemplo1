import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { OdontologosModule } from './odontologos/odontologos.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:['.env.development'],
      isGlobal:true
    }) ,
    MongooseModule.forRoot(process.env.URI_CONEXION),
    OdontologosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
