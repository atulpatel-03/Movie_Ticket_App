import {useState, useEffect} from 'react';
import _ from 'lodash';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';

import {
  movie_details,
  movie_cast_details,
  base_image_path,
} from '../api/apicalls';
import {
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
  BORDERRADIUS,
} from '../theme/theme';
import Header from '../components/Header';
import CustomIcon from '../components/CustomIcon';
import CastCard from '../components/CastCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
    paddingBottom: SPACING.space_32,
  },
  loading_indicator_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background_img: {
    width: '100%',
    aspectRatio: 3 / 1.5,
  },
  linear_gradient: {
    height: '100%',
  },
  poster_style: {
    height: 300,
    width: 200,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  details_vieew: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  runtime_view: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SPACING.space_15,
  },
  runtime_text: {
    color: COLORS.White,
    marginLeft: 4,
    alignItems: 'center',
    fontSize: FONTSIZE.size_12,
  },
  movie_title: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_24,
    paddingTop: SPACING.space_8,
    fontFamily: FONTFAMILY.poppins_medium,
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
  tagline: {
    color: COLORS.White,
    fontWeight: '300',
    fontSize: FONTSIZE.size_12,
    fontStyle: 'italic',
  },
  rating_container: {
    flexDirection: 'row',
    marginVertical: SPACING.space_10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_18,
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
  description_view: {
    flexDirection: 'row',
  },
  dates: {
    flexDirection: 'row',
    marginVertical: SPACING.space_10,
  },
  release_date: {
    fontWeight: '500',
    color: COLORS.White,
    gap: SPACING.space_12,
    fontSize: FONTSIZE.size_12,
    marginHorizontal: 4,
    marginLeft: SPACING.space_8,
  },
  info_container: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_12,
    fontWeight: '300',
    paddingHorizontal: SPACING.space_18,
  },
  cast_heading: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_20,
    fontWeight: '600',
    marginVertical: SPACING.space_10,
  },
  container_gap: {
    gap: SPACING.space_24,
  },
  cast_container: {
    paddingHorizontal: SPACING.space_18,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  seat_btn: {
    backgroundColor: COLORS.Orange,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_8,
    borderRadius: BORDERRADIUS.radius_20,
    marginVertical: SPACING.space_8,
    width: 130,
  },
  seat_text: {
    fontSize: FONTSIZE.size_12,
    fontWeight: '500',
    color: COLORS.White,
    textAlign: 'center',
  },
});

const movie_details_fun = async (movie_id: any) => {
  try {
    let response = await axios.get(movie_details(movie_id));
    return response.data;
  } catch (error) {
    console.log(' something went wrong in movie_details_fun ', error);
  }
};

const movie_case_details_fun = async (movie_id: any) => {
  try {
    let response = await axios.get(movie_cast_details(movie_id));
    return response.data;
  } catch (error) {
    console.log(' something went wrong in movie_case_details_fun ', error);
  }
};

const MovieDetailScreen = ({navigation, route}: any) => {
  const [is_loading, set_is_loading] = useState<boolean>(false);
  const [movie_details, set_movie_details] = useState<any>(undefined);
  const [movie_cast_details, set_movie_cast_details] = useState<any>(undefined);

  const movie_id = route.params.movie_id;

  const handle_goback = () => {
    navigation.goBack();
  };

  useEffect(() => {
    set_is_loading(true);
    const get_movies_data = async () => {
      const movie_details_data = await movie_details_fun(movie_id);
      set_movie_details(movie_details_data);

      const movie_cast_details_data = await movie_case_details_fun(movie_id);
      set_movie_cast_details(movie_cast_details_data);
    };

    get_movies_data();

    set_is_loading(false);
  }, []);

  const format_date = (input_date: string) => {
    const [year, month, day] = _.split(input_date, '-');

    const month_names = {
      '01': 'January',
      '02': 'February',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December',
    };

    const formatted_date = `${day} ${month_names[month]} ${year}`;

    return formatted_date;
  };

  const handle_seat_select = () => {
    navigation.push('SeatBooking', {
      background_image: base_image_path('w780', movie_details?.backdrop_path),
      poster_image: base_image_path('original', movie_details?.poster_path),
    });
  };

  if (is_loading) {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Header
          goback_functionality={handle_goback}
          icon_name="close"
          header_name="movie Detail"
        />
        <View style={styles.loading_indicator_container}>
          <ActivityIndicator color={COLORS.Orange} size="large" />
        </View>
      </View>
    );
  }

  const hr = Math.floor(movie_details?.runtime / 60);
  const min = movie_details?.runtime % 60;
  const release_date = format_date(movie_details?.release_date);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ScrollView bounces={false} showsHorizontalScrollIndicator={false}>
        <ImageBackground
          source={{uri: base_image_path('w780', movie_details?.backdrop_path)}}
          style={styles.background_img}>
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Black]}
            style={styles.linear_gradient}>
            <Header
              goback_functionality={handle_goback}
              icon_name="close"
              header_name=""
            />
          </LinearGradient>
        </ImageBackground>
        <View style={styles.background_img} />
        <View>
          <Image
            style={styles.poster_style}
            source={{
              uri: base_image_path('w780', movie_details?.poster_path),
            }}
          />
        </View>
        <View style={styles.details_vieew}>
          <View style={styles.runtime_view}>
            <CustomIcon
              name="clock"
              size={FONTSIZE.size_16}
              color={COLORS.WhiteRGBA50}
            />
            <Text style={styles.runtime_text}>
              {hr}h {min}m
            </Text>
          </View>
          <View>
            <Text style={styles.movie_title}>
              {movie_details?.original_title}
            </Text>
          </View>
          <View style={styles.genre_container}>
            {_.map(movie_details?.genres.slice(0, 4), (item: any) => {
              return (
                <View style={styles.genre_box} key={item.id}>
                  <Text style={styles.genre_text}>{item.name}</Text>
                </View>
              );
            })}
          </View>
          <View>
            <Text style={styles.tagline}>{movie_details?.tagline}</Text>
          </View>
        </View>
        <View style={styles.description_view}>
          <View style={styles.rating_container}>
            <CustomIcon
              name="star"
              color={COLORS.Yellow}
              style={styles.start_icon}
            />
            <Text style={styles.rating_number}>
              {_.round(movie_details?.vote_average, 1)} (
              {movie_details?.vote_count})
            </Text>
          </View>
          <View style={styles.dates}>
            <Text style={styles.release_date}>{release_date}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.info_container}>{movie_details?.overview}</Text>
        </View>
        <View style={styles.cast_container}>
          <Text style={styles.cast_heading}>Top Cast</Text>
          <FlatList
            horizontal
            data={movie_cast_details?.cast}
            keyExtractor={(item: any) => item.id}
            contentContainerStyle={styles.container_gap}
            renderItem={({item, index}) => {
              return (
                <CastCard
                  card_width={50}
                  image_link={base_image_path('w185', item.profile_path)}
                  name={item.original_name}
                />
              );
            }}
          />
        </View>

        <TouchableOpacity style={styles.btn} onPress={handle_seat_select}>
          <View style={styles.seat_btn}>
            <Text style={styles.seat_text}>Select Seats</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MovieDetailScreen;
