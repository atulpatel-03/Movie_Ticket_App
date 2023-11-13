import {Text, View, StyleSheet, Image} from 'react-native';

import {BORDERRADIUS, COLORS, FONTSIZE} from '../theme/theme';

const styles = StyleSheet.create({
  card_container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card_title: {
    fontSize: FONTSIZE.size_8,
    color: COLORS.White,
    textAlign: 'center',
    paddingTop: 8,
  },
  image_style: {
    height: 70,
    width: 45,
    borderRadius: BORDERRADIUS.radius_25,
  },
});

interface Props {
  name: string;
  image_link: any;
  card_width: number;
}

const CastCard = ({name, image_link, card_width}: Props) => {
  return (
    <View style={[styles.card_container, {maxWidth: card_width}]}>
      <Image style={[styles.image_style]} source={{uri: image_link}} />
      <Text style={styles.card_title}>{name}</Text>
    </View>
  );
};

export default CastCard;
