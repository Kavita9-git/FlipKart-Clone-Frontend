import { registerRootComponent } from 'expo';
import { Text, TextInput } from 'react-native';
import App from './App';

import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

// Configure reanimated logging
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

// Fix typo: allowFontScaling (was allwoFontScaling)
if (Text.defaultProps) {
  Text.defaultProps.allowFontScaling = false;
} else {
  Text.defaultProps = { allowFontScaling: false };
}

if (TextInput.defaultProps) {
  TextInput.defaultProps.allowFontScaling = false;
} else {
  TextInput.defaultProps = { allowFontScaling: false };
}


registerRootComponent(App);

