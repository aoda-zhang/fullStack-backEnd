import { ValidationPipe, VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import helmet from 'helmet'
import { AppModule } from './app.module'
import { EnvConstant } from '@shared/constants/constant'

const currentENV = process.env.NODE_ENV
async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        bufferLogs: true
    })
    const port = app.get(ConfigService).get('http.port') ?? 8081
    const microServiceOption = app.get(ConfigService).get('microService')

    app.connectMicroservice(
        {
            transport: microServiceOption?.transport ?? 0,
            options: {
                host: microServiceOption?.host,
                port: microServiceOption?.port
            }
        },
        // Apply the main app config to the microservice
        { inheritAppConfig: true }
    )

    await app.startAllMicroservices()
    // Version control like v1 v2
    app.enableVersioning({
        type: VersioningType.URI
    })
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true
        })
    )
    app.use(helmet())

    await app
        .listen(port, () => {
            ;[EnvConstant.dev, EnvConstant.uat].includes(currentENV?.toUpperCase()) &&
                console.log(`Successfully run at http://localhost:${port}`)
        })
        .catch((error) => {
            console.error(`Application run failed with issue :${error}`)
        })
}
bootstrap()
