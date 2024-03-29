/// <reference types="vite/client" />

interface ImportMetaEnv {
	// SERVER
	readonly VITE_SERVER_ENDPOINT: string;

	// HASURA
	readonly VITE_HASURA_GQL_ENDPOINT: string;

	// FIREBASE
	readonly VITE_FB_API_KEY: string;
	readonly VITE_FB_AUTH_DOMAIN: string;
	readonly VITE_FB_PROJECT_ID: string;
	readonly VITE_FB_STORAGE_BUCKET: string;
	readonly VITE_FB_MESSAGING_SENDER_ID: string;
	readonly VITE_FB_APP_ID: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
