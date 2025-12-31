import {Component, ComponentProps, ElementType} from "react";

export const SUPPORTED_OAUTH_PROVIDERS = ["google", "github"] as const;
export type SupportedOAuthProvider = (typeof SUPPORTED_OAUTH_PROVIDERS)[number];



export const SUPPORTED_OAUTH_PROVIDER_DETAILS :Record<SupportedOAuthProvider, {name : string, icon : ElementType<ComponentProps<"svg">>}> = {}