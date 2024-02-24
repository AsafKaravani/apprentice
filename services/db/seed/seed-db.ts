import { PrismaClient } from "@prisma/client";
import { fakeModels } from "./fake-models";
import { arrayOf } from "./utils";

const db = new PrismaClient();
db.$connect();

(async () => {
	console.log('Seeding database...');
	
	// Clear the table
	const deleted = await db.profile.deleteMany();
	console.log('Deleted profiles:', deleted.count);

	// Create 10 profiles
	console.log('Creating profiles...');
	const res = await db.profile.createMany({data: arrayOf(10, fakeModels.profile)})	
	console.log('Profiles created:', res.count);

})();
