import {useState} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from 'react-native';
import axios from 'axios';

import SearchBar from '../components/SearchBar';
import {COLORS, SPACING} from '../theme/theme';
import {search_movies, base_image_path} from '../api/apicalls';
import SearchedMovieCard from '../components/SearchedMovieCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  loading_indicator_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 600,
  },

  search_bar_input: {
    marginHorizontal: SPACING.space_18,
    marginTop: SPACING.space_36,
    marginBottom: SPACING.space_18,
  },
  flatlist_container: {
    gap: SPACING.space_28,
    marginHorizontal: SPACING.space_24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const {width, height} = Dimensions.get('window');

const SearchScreen = ({navigation, route}: any) => {
  const [is_loading, set_is_loading] = useState(false);
  const [searched_movies_list, set_searched_movies_list] =
    useState<any>(undefined);

  const handle_selected_movie = (id: number) => {
    navigation.push('MovieDetail', {
      movie_id: id,
    });
  };

  const search_functionality = async (search_text: string) => {
    set_is_loading(true);

    let response = await axios.get(search_movies(search_text));
    const searched_movies = response.data.results;

    set_searched_movies_list(searched_movies);
    set_is_loading(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {is_loading ? (
        <View style={styles.loading_indicator_container}>
          <ActivityIndicator color={COLORS.Orange} size="large" />
        </View>
      ) : (
        <FlatList
          numColumns={2}
          bounces={false}
          ListHeaderComponent={
            <View style={styles.search_bar_input}>
              <SearchBar search_functionality={search_functionality} />
            </View>
          }
          data={searched_movies_list}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatlist_container}
          renderItem={({item, index}) => {
            return (
              <SearchedMovieCard
                card_function={handle_selected_movie}
                card_width={width / 2 - SPACING.space_12 * 2}
                title={item.original_title}
                image_link={base_image_path('w342', item.poster_path)}
                movie_id={item.id}
              />
            );
          }}
        />
      )}
    </View>
  );
};

export default SearchScreen;
