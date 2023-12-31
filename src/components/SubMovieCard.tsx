import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

const styles = StyleSheet.create({
  card_container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  card_title: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
    lineHeight: SPACING.space_20,
  },
  image_style: {
    height: 200,
    width: 125,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_12,
  },
});

interface Props {
  title: string;
  image_link: any;
  cardWidth: number;
}

const SubMovieCard = ({title, image_link, cardWidth}: Props) => {
  return (
    <TouchableOpacity>
      <View style={[styles.card_container, {maxWidth: cardWidth}]}>
        <Image style={[styles.image_style]} source={{uri: image_link}} />
        <Text style={styles.card_title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SubMovieCard;
