import { Platform } from "react-native";

//FOR EMULATOR OR SIMULATOR DEVICE
export const BASE_URL  = Platform.OS == 'android' ?
'https://flipkart-clone-backend-8b5e.onrender.com' :
'https://flipkart-clone-backend-8b5e.onrender.com';