import { GluestackUIProvider } from "@/src/components/ui/gluestack-ui-provider";
// import '@/src/translations';
import "@/global.css";
import { SafeAreaView } from "@/src/components/ui/safe-area-view";
import { Paths } from "@/src/navigation/paths";
import BottomTab from "@/src/screens/home/bottom-tab";
import { DefaultTheme, NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Sentry from '@sentry/react-native';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React from "react";
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
        mutations: {
            retry: false,
        },
    },
});
const Stack = createStackNavigator();

let defaultTheme: "dark" | "light" = "light";

type ThemeContextType = {
    colorMode?: "dark" | "light";
    toggleColorMode?: () => void;
};
export const ThemeContext = React.createContext<ThemeContextType>({
    colorMode: "light",
    toggleColorMode: () => { },
});
// export default MainAppComponent;
Sentry.init({
    dsn: "https://288ee0afb1a0bbcbe260d9ac91824952@o4507099450572800.ingest.us.sentry.io/4508646962888704",
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
});
export default Sentry.wrap(MainAppComponent);
function MainAppComponent() {
    //throw new Error("My first Sentry error!");

    const [colorMode, setColorMode] = React.useState<"dark" | "light">(
        defaultTheme
    );
    const toggleColorMode = async () => {
        setColorMode((prev) => (prev === "light" ? "dark" : "light"));
    };
    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: '#FFFFFF',
            primary: '#FFFFFF',
        },
    };

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
                <GluestackUIProvider mode={colorMode}>
                    <SafeAreaView
                        style={{
                            flex: 1,
                            backgroundColor: colorMode === "light" ? "#FFFFFF" : "#171717",
                        }}
                    >
                        {
                            <NavigationIndependentTree>
                                <NavigationContainer theme={MyTheme} /*i18nIsDynamicList={true}*/>
                                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                                        <Stack.Screen component={BottomTab} name={Paths.Home} />
                                    </Stack.Navigator >
                                </NavigationContainer >
                            </NavigationIndependentTree >
                        }
                    </SafeAreaView >
                </GluestackUIProvider >
            </ThemeContext.Provider >
        </QueryClientProvider >
    );
}