import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const port = parseInt(process.env.PORT || process.env.SERVER_PORT) || 5559;

	const config = new DocumentBuilder()
		.setTitle('Apprentice')
		.setDescription('API description')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);
	
	await app.listen(port);
	console.log(`Application is running on port: ${port}`);	
	
}
bootstrap();
