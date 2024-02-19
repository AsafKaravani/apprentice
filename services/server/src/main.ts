import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const port = parseInt(process.env.PORT || process.env.SERVER_PORT) || 3000;
	await app.listen(port);
	console.log(`Application is running on port: ${port}`);	
	
}
bootstrap();
