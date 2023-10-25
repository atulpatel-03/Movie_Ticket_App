import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import CustomIcon from './CustomIcon';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: SPACING.space_36,
    paddingHorizontal: SPACING.space_36,
  },
  back_icon: {
    backgroundColor: COLORS.Orange,
    padding: 7,
    borderRadius: BORDERRADIUS.radius_25,
    width: 34,
    height: 34,
  },
  header_text: {
    color: COLORS.White,
    alignSelf: 'center',
    fontSize: FONTSIZE.size_20,
    fontWeight: '500',
  },
  empty_container: {
    marginLeft: 20,
  },
});

interface Props {
  goback_functionality: any;
  icon_name: string;
  header_name: string;
}

const Header = ({goback_functionality, icon_name, header_name}: Props) => {
  const handle_press = () => {
    goback_functionality();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back_icon} onPress={handle_press}>
        <CustomIcon
          name={icon_name}
          size={FONTSIZE.size_20}
          color={COLORS.White}
        />
      </TouchableOpacity>
      <Text style={styles.header_text}>{header_name}</Text>
      <View style={styles.empty_container} />
    </View>
  );
};

export default Header;
