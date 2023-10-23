import {useState, useEffect} from 'react';
import _ from 'lodash';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import LinearGradient from 'react-native-linear-gradient';
import DashedLine from 'react-native-dashed-line';

import Header from '../components/Header';
import {COLORS, SPACING, BORDERRADIUS, FONTSIZE} from '../theme/theme';
import CustomIcon from '../components/CustomIcon';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  ticket_container: {
    alignItems: 'center',
    marginTop: SPACING.space_32,
  },
  poster_image: {
    width: 270,
    height: 400,
    borderTopLeftRadius: BORDERRADIUS.radius_25,
    borderTopRightRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  loading_indicator_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linear_gradient: {
    height: '100%',
  },
  ticket_details: {
    backgroundColor: COLORS.Orange,
    paddingHorizontal: SPACING.space_20,
    width: 270,
    borderBottomLeftRadius: BORDERRADIUS.radius_25,
    borderBottomRightRadius: BORDERRADIUS.radius_25,
    paddingBottom: SPACING.space_18,
  },
  date_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: SPACING.space_10,
    paddingHorizontal: SPACING.space_24,
    paddingTop: SPACING.space_16,
  },
  date_view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  clock_icon: {
    paddingTop: 4,
    marginBottom: 3,
  },
  time_container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    fontSize: FONTSIZE.size_24,
    fontWeight: '500',
    color: COLORS.White,
    alignSelf: 'center',
  },
  day: {
    fontSize: FONTSIZE.size_10,
    fontWeight: '500',
    lineHeight: 20,
    color: COLORS.White,
    alignSelf: 'center',
  },
  hall_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  hall_text: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_16,
    fontWeight: '500',
    lineHeight: 20,
  },
  hall_value: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_12,
    fontWeight: '400',
    alignSelf: 'center',
    lineHeight: 20,
  },
  seat_container: {
    flexDirection: 'row',
    color: COLORS.White,
    fontSize: FONTSIZE.size_12,
    fontWeight: '400',
    alignSelf: 'center',
    lineHeight: 20,
  },
  barcode_container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SPACING.space_16,
  },
  black_circle: {
    height: 60,
    width: 60,
    borderRadius: 80,
    backgroundColor: COLORS.Black,
  },
});

const TicketScreen = ({navigation, route}: any) => {
  const [is_loading, set_is_loading] = useState<boolean>(false);
  const [ticket_data, set_ticket_data] = useState<any>(route.params);

  const handle_goback = () => {
    navigation.goBack();
  };

  useEffect(() => {
    set_is_loading(true);
    (async () => {
      try {
        const ticket = await EncryptedStorage.getItem('ticket');
        if (ticket !== undefined && ticket !== null) {
          set_ticket_data(JSON.parse(ticket));
        }
      } catch (error) {
        console.error('Something went wrong while getting Data', error);
        set_is_loading(false);
      }
    })();
    set_is_loading(false);
  }, []);

  if (ticket_data !== route.params && route.params != undefined) {
    set_ticket_data(route.params);
  }

  if (is_loading || ticket_data == undefined) {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Header
          goback_functionality={handle_goback}
          icon_name="close"
          header_name="My Tickets"
        />
        <View style={styles.loading_indicator_container}>
          <ActivityIndicator color={COLORS.Orange} size="large" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Header
        goback_functionality={handle_goback}
        icon_name="close"
        header_name="My Tickets"
      />
      <View style={styles.ticket_container}>
        <ImageBackground
          source={{uri: ticket_data?.ticket_image}}
          style={styles.poster_image}>
          <LinearGradient
            colors={[COLORS.OrangeRGBA0, COLORS.Orange]}
            style={styles.linear_gradient}
          />
        </ImageBackground>

        <View style={styles.ticket_details}>
          <DashedLine dashLength={8} dashThickness={1} />
          <View
            style={[
              styles.black_circle,
              {position: 'absolute', top: -30, left: -30},
            ]}
          />
          <View
            style={[
              styles.black_circle,
              {position: 'absolute', top: -30, right: -30},
            ]}
          />
          <View style={styles.date_container}>
            <View style={styles.date_view}>
              <Text style={styles.date}>{ticket_data?.date.date}</Text>
              <Text style={styles.day}>{ticket_data?.date.day}</Text>
            </View>

            <View style={styles.time_container}>
              <View style={styles.clock_icon}>
                <CustomIcon
                  name="clock"
                  size={FONTSIZE.size_24}
                  color={COLORS.White}
                />
              </View>
              <Text style={styles.day}>{ticket_data?.time}</Text>
            </View>
          </View>
          <View style={styles.hall_container}>
            <View>
              <Text style={styles.hall_text}>Hall</Text>
              <Text style={styles.hall_value}>02</Text>
            </View>
            <View>
              <Text style={styles.hall_text}>Row</Text>
              <Text style={styles.hall_value}>04</Text>
            </View>
            <View>
              <Text style={styles.hall_text}>Seats</Text>
              <Text style={styles.seat_container}>
                {_.map(
                  ticket_data?.seat_array,
                  (item: number, index: number, arr: number) => {
                    return item + (index == _.size(arr) - 1 ? '' : ',');
                  },
                )}
              </Text>
            </View>
          </View>
          <View style={styles.barcode_container}>
            <Image source={require('../assets/image/barcode.png')} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default TicketScreen;
