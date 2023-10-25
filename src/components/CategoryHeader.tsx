import {Text, View, StyleSheet} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';

const styles = StyleSheet.create({
  title: {
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.White,
    paddingHorizontal: SPACING.space_28,
    paddingBottom: SPACING.space_16,
  },
});

const CategoryHeader = ({children}: any) => {
  return <Text style={styles.title}>{children}</Text>;
};

export default CategoryHeader;
