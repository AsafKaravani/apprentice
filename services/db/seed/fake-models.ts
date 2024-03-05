import * as fake from '@ngneat/falso';
import { Profile, Organization, Group,GroupMember, OrganizationMember, Exam, Question  } from "@prisma/client";
import { group } from 'console';

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
	},

	organization: (): Organization => {
		const email = fake.randEmail();
		return {
			id: fake.randUuid(),
			name: fake.randCompanyName(),
			email: email,
			phone: fake.randPhoneNumber(),
			description: fake.randParagraph(),
			picture_url: `https://picsum.photos/seed/${email}/200/300`,
			website: fake.randUrl(),
			updated_at: new Date(),
			created_at: new Date(),
		}
	},

	group: (): Group => {
		return {
			id: fake.randUuid(),
			name: fake.randCompanyName(),
			email: fake.randEmail(),
			phone: fake.randPhoneNumber(),
			picture_url: fake.randUrl(),
			website: fake.randUrl(),
			description: fake.randParagraph(),
			updated_at: new Date(),
			created_at: new Date(),
		}
	},

	question_MultipleChoice: (examId: string): Question => {
		return {
			id: fake.randUuid(),
			question: fake.randParagraph(),
			type: 'MULTIPLE_CHOICE',
			options: [],
			correct_options: [],

			boolean_expected_answer: null,
			expected_answer: null,
			image_url: null,
			exam_id: examId,

			updated_at: new Date(),
			created_at: new Date(),
		}
	},

	question_TrueFalse: (examId: string): Question => {
		return {
			id: fake.randUuid(),
			question: fake.randParagraph(),
			type: 'TRUE_FALSE',
			boolean_expected_answer: null,
			
			options: [],
			correct_options: [],
			expected_answer: null,
			image_url: null,

			exam_id: examId,

			updated_at: new Date(),
			created_at: new Date(),
		}
	},

	question_FreeText: (examId: string): Question => {
		return {
			id: fake.randUuid(),
			question: fake.randParagraph(),
			type: 'FREE_TEXT',
			expected_answer: null,
			options: [],
			correct_options: [],
			boolean_expected_answer: null,
			image_url: null,

			exam_id: examId,

			updated_at: new Date(),
			created_at: new Date(),
		}
	}

}