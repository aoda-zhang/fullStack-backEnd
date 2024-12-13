import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import SharedModule from '@shared/shared.module'
import EmailModule from 'src/Email/email.module'
import PDFModule from 'src/PDF/PDF.module'
import getConfigs from './config'
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [getConfigs],
            envFilePath: '.env',
            isGlobal: true,
            cache: true
        }),
        SharedModule,
        EmailModule,
        PDFModule
    ],
    providers: []
})
export class AppModule {}
