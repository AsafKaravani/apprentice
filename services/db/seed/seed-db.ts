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
	const profiles = await db.profile.createMany({data: arrayOf(10, fakeModels.profile)})	
	console.log('Profiles created:', profiles.count);

	// Create 3 organizations
	console.log('Creating organizations...');
	const organizations = await db.organization.createMany({data: arrayOf(3, fakeModels.organization)})
	console.log('Organizations created:', organizations.count);

	// Create 5 groups
	console.log('Creating groups...');
	const groups = await db.group.createMany({data: arrayOf(5, fakeModels.group)})

	// Create 5 group members
	console.log('Creating group members...');
	const groupMembers = await db.groupMember.createMany({data: [{
		group_id: 'asd',
		profile_id: 'asd',
	}]})

	

})();


async function clearDb() {
	const allProperties = Reflect.ownKeys(Object.getPrototypeOf(db))
	const modelNames = allProperties.filter(x => x != "constructor" && x != "on" && x != "connect" && x != "runDisconnect" && x != "disconnect")
	let modelName: any;
	for (modelName of modelNames) {
		console.log('Deleting', modelName);
		const model: any = db[modelName];
		if (model.deleteMany)
			model.deleteMany()
	}
}