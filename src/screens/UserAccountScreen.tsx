import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface Props {}

const styles = StyleSheet.create({
  container: {},
});

const UserAccountScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default UserAccountScreen;
