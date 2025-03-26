
import { ConvexProviderWithClerk } from "convex/react-clerk";
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { ConvexReactClient } from "convex/react"

const convex = new ConvexReactClient(process.env.VITE_CONVEX_URL as string)
if (!publishableKey) {
    throw new Error(
        'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
    )
}
export default function ClerkAndConvexProvider({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache} >
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <ClerkLoaded>
                    {children}
                </ClerkLoaded>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}