import {useEffect, useState} from 'react';
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

interface Props {}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.Black,
  },
  loading_indicator_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll_view_container: {
    flex: 1,
  },
  search_bar_input: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_36,
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
      set_now_playing_movies_list(nowplaying);

      const popular = await popular_movies_fun();
      set_popular_movies_list(popular);
    }
    get_data();
    set_is_loading(false);
  }, []);

  console.log(upcoming_movies_list);

  if (is_loading) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scroll_view_container}>
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
    <ScrollView
      style={styles.container}
      bounces={false}
      contentContainerStyle={styles.scroll_view_container}>
      <StatusBar hidden />
      <View style={styles.search_bar_input}>
        <SearchBar search_functionality={search_functionality} />
      </View>
      <CategoryHeader>Now Playing</CategoryHeader>
      <CategoryHeader>Popular</CategoryHeader>
      <FlatList
        horizontal
        data={popular_movies_list}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatlist_container}
        renderItem={({item, index}) => {
          return (
            <SubMovieCard
              cardFunction={() => {
                navigation.push('MovieDetail', {
                  movie_id: item.id,
                });
              }}
              card_width={width / 3}
              title={item.original_title}
              image_link={base_image_path('w342', item.poster_path)}
            />
          );
        }}
      />
      <CategoryHeader>Upcoming</CategoryHeader>
    </ScrollView>
  );
};

export default HomeScreen;
