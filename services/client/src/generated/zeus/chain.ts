import { Chain, Thunder, ZeusScalars } from './index';


export const scalars: any = ZeusScalars({
	timestamp: {
		decode: (e: unknown) => new Date(e as string),
		encode: (e: unknown) => {
			console.log('e: unknown = ', e, typeof e);

			if (e === '') {
				console.log('e === ""');

				return undefined;
			}
			return (e as Date)?.toISOString ? `"${(e as Date)?.toISOString()}"` : null;
		}
	},
	float8: {
		decode: (e: unknown) => parseFloat(e as string),
		encode: (e: unknown) => e as string
	},
	jsonb: {
		decode: (e: unknown) => JSON.parse(e as string),
		encode: (e: unknown) => removeQuotesFromKeys(JSON.stringify(e))
	}
});

const removeQuotesFromKeys = (stringifiedJson: string) => stringifiedJson.replace(/"([^"]+)":/g, '$1:');

export const chain = Thunder(async (query) => {
	const response = await fetch(
		import.meta.env.VITE_HASURA_GQL_ENDPOINT,
		{
			body: JSON.stringify({ query }),
			method: 'POST',
			headers: {
			},
		},
	);

	if (!response.ok) {
		return new Promise((resolve, reject) => {
			response
				.text()
				.then((text) => {
					try {
						reject(JSON.parse(text));
					} catch (err) {
						reject(text);
					}
				})
				.catch(reject);
		});
	}

	const json = await response.json();

	return json.data;
});
