import * as fake from '@ngneat/falso';
import { Profile } from "@prisma/client";

export const fakeModels = {
	profile: (): Profile => {
		const email = fake.randEmail();
		return {
			id: fake.randUuid(),
			email: email,
			first_name: fake.randFirstName(),
			last_name: fake.randLastName(),
			picture_url: `https://i.pravatar.cc/150?u=${email}`,
			phone: fake.randPhoneNumber(),
			updated_at: new Date(),
			created_at: new Date(),
		}
	}
}