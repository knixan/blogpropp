import { createAuthClient } from "better-auth/react";


export const authClient = createAuthClient({
	baseUrl: "/api/auth",
	fetchOptions: { credentials: "include" },
});
