import { styles } from '@/styles/auth.styles'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Fontisto from '@expo/vector-icons/Fontisto';
import { COLORS } from '@/constants/themes';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import { enableLayoutAnimations } from "react-native-reanimated";
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useSSO } from '@clerk/clerk-expo';

enableLayoutAnimations(false);


export default function Login() {
    const rotate = useSharedValue(0);

    useEffect(() => {
        rotate.value = withRepeat(withTiming(360, { duration: 2000 }), -1);
    }, []); // Chỉ chạy một lần sau khi component mount

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotate.value}deg` }],
    }));
    const { startSSOFlow } = useSSO()
    const router = useRouter()
    const handleSignInWithGoogle = async () => {
        try {
            const { createdSessionId, setActive } = await startSSOFlow({ strategy: "oauth_google" })
            if (setActive && createdSessionId) {
                setActive({ session: createdSessionId })
                router.replace('/(tabs)')
            }
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };
    const handleSignInWithFacebook = async () => {
        try {
            const { createdSessionId, setActive } = await startSSOFlow({ strategy: "oauth_facebook" })
            if (setActive && createdSessionId) {
                setActive({ session: createdSessionId })
                router.replace('/(tabs)')
            }
        } catch (error) {
            console.error('Error signing in with Facebook:', error);
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.brandSection}>
                <Animated.View style={[styles.logoContainer, animatedStyle]} >
                    <Fontisto name="earth" size={40} color={COLORS.primary} />
                </Animated.View>
                <Text style={styles.appName}>SociallApp</Text>
                <Text style={styles.tagline}>Connect with friends</Text>
            </View>

            {/* logo */}
            <View style={styles.illustrationContainer}>
                <Image source={require('../../assets/images/logoSocialApp.png')}
                    style={styles.illustration}
                    resizeMode='contain' />
            </View>

            {/* button */}
            <View style={styles.loginSection}>
                <TouchableOpacity style={styles.googleButton}
                    activeOpacity={0.8}
                    onPress={handleSignInWithGoogle}>
                    <View style={styles.googleIconContainer}>
                        <Fontisto name="google" size={24} color={COLORS.primary} />
                    </View>
                    <Text style={styles.googleButtonText}>Sign in with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.facebookbutton}
                    activeOpacity={0.8}
                    onPress={handleSignInWithFacebook}>
                    <View style={styles.googleIconContainer}>
                        <FontAwesome6 name="facebook" size={24} color={COLORS.white} />
                    </View>
                    <Text style={styles.fbButtonText}>Sign in with Facebook</Text>
                </TouchableOpacity>
                <Text style={styles.termsText} >
                    By signing in, you agree to our Terms of Service and Privacy Policy
                </Text>
            </View>
        </View>


    )
}