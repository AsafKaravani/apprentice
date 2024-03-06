import { PrismaClient } from "@prisma/client";
import { fakeModels } from "./fake-models";
import { arrayOf } from "./utils";

const db = new PrismaClient();
db.$connect();

(async () => {
	
	
	console.log('Clearing database');
	
	const totalDeleted = await clearDb();
	console.log('Total deleted:', totalDeleted);
	
	
	console.log('Seeding database...');

	console.log('Creating profiles...');
	const profiles = await db.profile.createMany({data: arrayOf(10, fakeModels.profile)})	
	console.log('Profiles created:', profiles.count);

	console.log('Creating organizations...');
	const organizations = await db.organization.createMany({data: arrayOf(3, fakeModels.organization)})
	console.log('Organizations created:', organizations.count);

	console.log('Creating groups...');
	const groups = await db.group.createMany({data: arrayOf(5, fakeModels.group)})
	console.log('Groups created:', groups.count);


})();


async function clearDb() {
	const allProperties = Object.keys(db)
	const modelNames = allProperties.filter(x => {
		if (x.toString().startsWith('$') || x.toString().startsWith('_')) return false;
		
		// @ts-expect-error Making checks in the line above, there is no way to create typing for props that are table names
		return db[x].deleteMany
	})
	let totalDeleted = 0;
	let modelName: any;
	for (modelName of modelNames) {
		console.log('Deleting', modelName);
		const model: any = db[modelName];
		if (model.deleteMany) {
			const deleted = await model.deleteMany()
			totalDeleted += deleted.count;
			console.log('Deleted', deleted.count, modelName);
		}
	}

	return totalDeleted;
}