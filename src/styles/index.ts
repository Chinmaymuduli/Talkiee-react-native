import {COLORS} from '../configs';
import {StyleSheet} from 'react-native';
export {default as LoginStyles} from './LoginStyles';

// other styles
export const flexStyles = StyleSheet.create({
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
  },
  flexStart: {
    justifyContent: 'flex-start',
  },
  flexBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export const GlobalStyles = StyleSheet.create({
  // disabled button
  disabledButton: {
    backgroundColor: '#ccc',
    color: '#fff',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  m_t_10: {
    marginTop: 10,
  },
  text_center: {
    textAlign: 'center',
  },
  // shadow
  commonShadow: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    elevation: 5,
  },
  darkShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  flex_1_bgPrimary: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
  },
  actionBtn: {
    backgroundColor: COLORS.primary,
    padding: 15,
    justifyContent: 'center',
    width: '50%',
  },
  actionBtnText: {
    color: COLORS.textWhite,
    fontSize: 15,
    alignSelf: 'center',
  },
  // outline
  actionBtnOutline: {
    backgroundColor: 'transparent',
    borderColor: COLORS.primary,
    borderWidth: 1,
    padding: 15,
  },
  actionBtnOutlineText: {
    color: COLORS.primary,
    fontSize: 15,
    alignSelf: 'center',
  },
});
