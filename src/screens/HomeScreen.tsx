import {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import axios from 'axios';

import {
  upcoming_movies,
  popular_movies,
  now_playing_movies,
  base_image_path,
} from '../api/apicalls';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';
import SearchBar from '../components/SearchBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';

interface Props {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  loading_indicator_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  search_bar_input: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_36,
    marginBottom: SPACING.space_18,
  },
  flatlist_container: {
    gap: SPACING.space_28,
    marginHorizontal: SPACING.space_28,
  },
});

const {width, height} = Dimensions.get('window');

const upcoming_movies_fun = async () => {
  try {
    let response = await axios.get(upcoming_movies);
    return response.data.results;
  } catch (error) {
    console.log(' something went wrong in upcoming_movies ', error);
  }
};

const now_playing_movies_fun = async () => {
  try {
    let response = await axios.get(now_playing_movies);
    return response.data.results;
  } catch (error) {
    console.log(' something went wrong in now_playing_movies_fun ', error);
  }
};

const popular_movies_fun = async () => {
  try {
    let response = await axios.get(popular_movies);
    return response.data.results;
  } catch (error) {
    console.log(' something went wrong in popular_movies_fun ', error);
  }
};

const HomeScreen = ({navigation}: any) => {
  const [is_loading, set_is_loading] = useState(false);
  const [upcoming_movies_list, set_upcoming_movies_list] =
    useState<any>(undefined);
  const [popular_movies_list, set_popular_movies_list] =
    useState<any>(undefined);
  const [now_playing_movies_list, set_now_playing_movies_list] =
    useState<any>(undefined);

  const search_functionality = (search_text: string) => {
    navigation.navigate('Search', {
      search_text: search_text,
    });
    console.log(search_text);
  };

  useEffect(() => {
    set_is_loading(true);
    async function get_data() {
      const upcoming = await upcoming_movies_fun();
      set_upcoming_movies_list(upcoming);

      const nowplaying = await now_playing_movies_fun();
      set_now_playing_movies_list([
        {id: 'dummy1'},
        ...nowplaying,
        {id: 'dummy2'},
      ]);

      const popular = await popular_movies_fun();
      set_popular_movies_list(popular);
    }
    get_data();
    set_is_loading(false);
  }, []);

  const handle_selected_movie = (id: number) => {
    navigation.push('MovieDetail', {
      movie_id: id,
    });
  };

  if (is_loading) {
    return (
      <ScrollView style={styles.container} bounces={false}>
        <StatusBar hidden />
        <View style={styles.search_bar_input}>
          <SearchBar search_functionality={search_functionality} />
        </View>

        <View style={styles.loading_indicator_container}>
          <ActivityIndicator color={COLORS.Orange} size="large" />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      <StatusBar hidden />
      <View style={styles.search_bar_input}>
        <SearchBar search_functionality={search_functionality} />
      </View>
      <CategoryHeader>Now Playing</CategoryHeader>
      <FlatList
        horizontal
        bounces={false}
        data={now_playing_movies_list}
        keyExtractor={item => item.id}
        contentContainerStyle={[styles.flatlist_container]}
        snapToInterval={width * 0.7 + SPACING.space_4}
        decelerationRate={0}
        renderItem={({item, index}) => {
          if (!item.original_title) {
            return (
              <View
                style={{
                  width: (width - (width * 0.7 + SPACING.space_36 * 2)) / 2,
                }}
              />
            );
          }
          return (
            <MovieCard
              card_function={handle_selected_movie}
              card_width={width * 0.7}
              title={item.original_title}
              image_link={base_image_path('w780', item.poster_path)}
              movie_id={item.id}
              vote_average={item.vote_average}
              vote_count={item.vote_count}
              genre_ids={item.genre_ids.slice(1, 4)}
            />
          );
        }}
      />
      <CategoryHeader>Popular</CategoryHeader>
      <FlatList
        horizontal
        bounces={false}
        data={popular_movies_list}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatlist_container}
        renderItem={({item, index}) => {
          return (
            <SubMovieCard
              card_function={handle_selected_movie}
              card_width={width / 3}
              title={item.original_title}
              image_link={base_image_path('w342', item.poster_path)}
              movie_id={item.id}
            />
          );
        }}
      />
      <CategoryHeader>Upcoming</CategoryHeader>
      <FlatList
        horizontal
        bounces={false}
        data={upcoming_movies_list}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatlist_container}
        renderItem={({item, index}) => {
          return (
            <SubMovieCard
              card_function={handle_selected_movie}
              card_width={width / 3}
              title={item.original_title}
              image_link={base_image_path('w342', item.poster_path)}
              movie_id={item.id}
            />
          );
        }}
      />
    </ScrollView>
  );
};

export default HomeScreen;
