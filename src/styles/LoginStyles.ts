import { COLORS } from '../configs';
import { StyleSheet } from 'react-native';

const LoginStyles = StyleSheet.create({
  root: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'flex-start',
  },
  sendOtpButton: {
    marginTop: 10,
    padding: 12,
    textAlign: 'center',
    borderRadius: 5,
    shadowOffset: { height: 2, width: 2 }, // IOS
    shadowOpacity: 5, // IOS
    shadowRadius: 5, //IOS
    elevation: 5, // Android
    height: 55,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.fadeBlack,
  },
  skipNowAction: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 30,
    marginRight: 30,
  },
  otpTextInput: {
    backgroundColor: COLORS.textWhite,
    borderBottomWidth: 0,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 8,
    borderRadius: 5,
  },
  signup: {
    marginTop: 3,
    padding: 12,
    textAlign: 'center',
    borderRadius: 5,
    shadowOffset: { height: 2, width: 2 }, // IOS
    shadowOpacity: 5, // IOS
    shadowRadius: 5, //IOS
    elevation: 5, // Android
    // height: 55,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.fadeBlack,
  },
});

export default LoginStyles;
