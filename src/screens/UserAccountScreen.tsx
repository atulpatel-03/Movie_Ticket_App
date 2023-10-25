import {Text, View, StyleSheet, Image} from 'react-native';

import {COLORS, FONTSIZE, SPACING} from '../theme/theme';
import Header from '../components/Header';
import AccountComp from '../components/AccountComp';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  profile_pic: {
    marginTop: SPACING.space_36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile_img: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  name: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_16,
    marginTop: SPACING.space_12,
    alignSelf: 'center',
  },
  account_container: {
    marginTop: SPACING.space_28,
  },
});

const UserAccountScreen = ({navigation}: any) => {
  const handle_goback = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header
        icon_name="close"
        header_name="My Profile"
        goback_functionality={handle_goback}
      />
      <View style={styles.profile_pic}>
        <Image
          source={require('../assets/image/avatar.png')}
          style={styles.profile_img}
        />
        <Text style={styles.name}>John Doe</Text>
      </View>
      <View style={styles.account_container}>
        <AccountComp
          icon_name="user"
          header_name="Account"
          sub_heading="Edit Profile"
          sub_title="Change Password"
        />
        <AccountComp
          icon_name="setting"
          header_name="Settings"
          sub_heading="Theme"
          sub_title="Permissions"
        />
        <AccountComp
          icon_name="dollar"
          header_name="Offers & Refferrals"
          sub_heading="Offer"
          sub_title="Refferrals"
        />
        <AccountComp
          icon_name="info"
          header_name="About"
          sub_heading="About Movies"
          sub_title="more"
        />
      </View>
    </View>
  );
};

export default UserAccountScreen;
