import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import CustomIcon from './CustomIcon';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.space_36,
    paddingVertical: SPACING.space_24,
    justifyContent: 'space-around',
  },
  header_name: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_16,
    fontWeight: '500',
    lineHeight: 20,
  },
  sub_title: {
    color: COLORS.WhiteRGBA32,
    fontSize: FONTSIZE.size_12,
    lineHeight: 20,
  },
  icon_container: {
    flex: 0.8,
  },
  heading_container: {
    flex: 5,
  },
  arrow_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

interface Props {
  icon_name: string;
  header_name: string;
  sub_heading: string;
  sub_title: string;
}

const AccountComp = ({
  icon_name,
  header_name,
  sub_heading,
  sub_title,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon_container}>
        <CustomIcon
          name={icon_name}
          color={COLORS.White}
          size={FONTSIZE.size_24}
        />
      </View>
      <View style={styles.heading_container}>
        <Text style={styles.header_name}>{header_name}</Text>
        <Text style={styles.sub_title}>{sub_heading}</Text>
        <Text style={styles.sub_title}>{sub_title}</Text>
      </View>
      <View style={styles.arrow_container}>
        <CustomIcon
          name="arrow-right"
          color={COLORS.White}
          size={FONTSIZE.size_20}
        />
      </View>
    </View>
  );
};

export default AccountComp;
