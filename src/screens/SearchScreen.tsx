import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {},
});

const SearchScreen = ({navigation, route}: any) => {
  const para = route.params.search_text;

  console.log(para);
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default SearchScreen;
