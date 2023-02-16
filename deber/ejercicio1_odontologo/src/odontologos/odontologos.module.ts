import { Module } from '@nestjs/common';
import { OdontologosController } from './odontologos.controller';
import { OdontologosService } from './odontologos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ODONTOLOGOS } from '../common/models/odontologos.models';
import { OdontologosSchema } from './schema/odontologos.schema';

@Module({
  imports:[
    MongooseModule.forFeatureAsync([{
      name:ODONTOLOGOS.name,
      useFactory:()=>{
        return OdontologosSchema;
      }
    }])
  ],
  controllers: [OdontologosController],
  providers: [OdontologosService]
})
export class OdontologosModule {}
