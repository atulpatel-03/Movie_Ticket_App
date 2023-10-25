import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import _ from 'lodash';

import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import CustomIcon from './CustomIcon';

const styles = StyleSheet.create({
  card_container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  card_title: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
    textAlign: 'center',
    fontSize: FONTSIZE.size_24,
  },
  image_style: {
    height: 350,
    width: 250,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_12,
  },
  rating_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.space_10,
  },
  rating_number: {
    color: COLORS.White,
    gap: SPACING.space_12,
    fontSize: FONTSIZE.size_12,
    marginHorizontal: 4,
  },
  start_icon: {
    fontSize: FONTSIZE.size_16,
    gap: SPACING.space_12,
  },
  genre_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: SPACING.space_15,
    gap: SPACING.space_12,
    flexWrap: 'wrap',
  },
  genre_box: {
    borderWidth: 1,
    borderColor: COLORS.WhiteRGBA50,
    borderRadius: BORDERRADIUS.radius_10,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  genre_text: {
    color: COLORS.WhiteRGBA75,
    fontSize: FONTSIZE.size_10,
    fontFamily: FONTFAMILY.poppins_regular,
  },
});

const genres: any = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentry',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystry',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

interface Props {
  title: string;
  image_link: any;
  card_width: number;
  movie_id: number;
  card_function: any;
  vote_average: number;
  vote_count: number;
  genre_ids: any;
}

const MovieCard = ({
  title,
  image_link,
  card_width,
  movie_id,
  card_function,
  vote_average,
  vote_count,
  genre_ids,
}: Props) => {
  return (
    <TouchableOpacity onPress={() => card_function(movie_id)}>
      <View style={[styles.card_container, {maxWidth: card_width}]}>
        <Image style={[styles.image_style]} source={{uri: image_link}} />
        <View style={styles.rating_container}>
          <CustomIcon
            name="star"
            color={COLORS.Yellow}
            style={styles.start_icon}
          />
          <Text style={styles.rating_number}>
            {vote_average} ({vote_count})
          </Text>
        </View>
        <Text style={styles.card_title}>{title}</Text>
        <View style={styles.genre_container}>
          {_.map(genre_ids, (item: any) => {
            return (
              <View style={styles.genre_box}>
                <Text style={styles.genre_text}>{genres[item]}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;
