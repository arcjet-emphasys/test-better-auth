import {Component, ComponentProps, ElementType} from "react";

export const SUPPORTED_OAUTH_PROVIDERS = ["google", "github"] as const;
export type SupportedOAuthProvider = (typeof SUPPORTED_OAUTH_PROVIDERS)[number];



//export const SUPPORTED_OAUTH_PROVIDER_DETAILS :Record<SupportedOAuthProvider, {name : string, icon : ElementType<ComponentProps<"svg">>}> = {}

/*
DATABASE_URL=postgresql://neondb_owner:npg_RPom1CrKpYy3@ep-orange-queen-agbl40c0-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require


// Better Auth
BETTER_AUTH_SECRET=4JjjmZyi83zvoLgXG1ZWT1PUiGZfZAlQ
BETTER_AUTH_URL=http://localhost:3000 # Base URL of your app

ARCJET_API_KEY=ajkey_01kdqc8d0ee94838fhxh9kscqs

//Google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

//Github
GITHUB_CLIENT_ID=Ov23lirHbSxOAzi0Nzke
GITHUB_CLIENT_SECRET=b8ec629710c689cd8ce3ec1a2eb751ae6f1973a8
 */