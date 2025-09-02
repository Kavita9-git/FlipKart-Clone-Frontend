import { Platform } from "react-native";

//FOR EMULATOR OR SIMULATOR DEVICE
export const BASE_URL  = Platform.OS == 'android' ?
'http://192.168.29.201:8080' :
'http://192.168.29.201:8080';