import React, {useState} from 'react';
import _ from 'lodash';
import {
  Text,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import EncryptedStorage from 'react-native-encrypted-storage';
import Toast from 'react-native-simple-toast';

import Header from '../../components/Header';
import {COLORS} from '../../theme/theme';
import CustomIcon from '../../components/CustomIcon';
import styles from './Styles';

const time_array: string[] = [
  '10:30',
  '12:20',
  '14:30',
  '15:30',
  '19:00',
  '21:00',
];

const generate_date = () => {
  const date = new Date();
  let weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  let show_days = [];

  for (let i = 0; i < 7; i++) {
    let temp_date = new Date(
      date.getTime() + i * 24 * 60 * 60 * 1000,
    ).getDate();
    let temp_day =
      weekdays[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()];
    let temp_days = {
      date: temp_date,
      day: temp_day,
    };

    show_days.push(temp_days);
  }

  return show_days;
};

const generate_seats = () => {
  let num_row = 8;
  let num_column = 3;
  let row_array = [];
  let start = 1;

  for (let i = 0; i < num_row; i++) {
    let column_array = [];
    for (let j = 0; j < num_column; j++) {
      let seatObject = {
        number: start,
        taken: Boolean(Math.round(Math.random())),
        selected: false,
      };
      column_array.push(seatObject);
      start++;
    }

    if (i === 0 || i === 5) {
      num_column = 5;
    }
    if (i === 1 || i === 4) {
      num_column = 7;
    }
    if (i === 2 || i === 3) {
      num_column = 9;
    }
    if (i === 6) {
      num_column = 3;
    }

    row_array.push(column_array);
  }
  return row_array;
};

const SeatBookingScreen = ({navigation, route}: any) => {
  const [date_array, set_date_array] = useState<any[]>(generate_date());
  const [selected_date_index, set_selected_date_index] = useState<any>();
  const [price, set_price] = useState<number>(0);
  const [two_d_seat_array, set_two_d_seat_rray] = useState<any[][]>(
    generate_seats(),
  );
  const [selected_seat_array, set_selected_seat_array] = useState([]);
  const [selected_time_index, set_selected_time_index] = useState<any>();

  const background_image = route.params.background_image;
  const poster_image = route.params.poster_image;

  const handle_goback = () => {
    navigation.goBack();
  };

  const handle_select_seats = (
    index: number,
    subindex: number,
    seat_number: number,
  ) => {
    if (!two_d_seat_array[index][subindex].taken) {
      let array: any = [...selected_seat_array];
      let temp = [...two_d_seat_array];
      temp[index][subindex].selected = !temp[index][subindex].selected;

      if (!array.includes(seat_number)) {
        array.push(seat_number);
        set_selected_seat_array(array);
      } else {
        const tempindex = array.indexOf(seat_number);
        if (tempindex > -1) {
          array.splice(tempindex, 1);
          set_selected_seat_array(array);
        }
      }
      set_price(array.length * 5.0);
      set_two_d_seat_rray(temp);
    }
  };

  const handle_selected_date = (date: any) => {
    set_selected_date_index(date);
  };

  const handle_selected_time = (time: string) => {
    set_selected_time_index(time);
  };

  const handle_seat_book = async () => {
    if (
      selected_seat_array.length !== 0 &&
      time_array[selected_time_index] !== undefined &&
      date_array[selected_date_index] !== undefined
    ) {
      try {
        await EncryptedStorage.setItem(
          'ticket',
          JSON.stringify({
            seatArray: selected_seat_array,
            time: time_array[selected_time_index],
            date: date_array[selected_date_index],
            ticket_image: poster_image,
          }),
        );
      } catch (error) {
        console.error(
          'Something went Wrong while storing in BookSeats Functions',
          error,
        );
      }
      navigation.navigate('Ticket', {
        seatArray: selected_seat_array,
        time: time_array[selected_time_index],
        date: date_array[selected_date_index],
        ticketImage: route.params.PosterImage,
      });
    } else {
      Toast.showWithGravity(
        'Please Select Seats, Date and Time of the Show',
        Toast.SHORT,
        Toast.TOP,
      );
    }
  };

  return (
    <ScrollView bounces={false} style={styles.container}>
      <StatusBar hidden />
      <ImageBackground
        source={{uri: background_image}}
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
      <Text style={styles.screen_text}>Screen this side</Text>
      <View style={styles.outer_seat_container}>
        {_.map(two_d_seat_array, (item, index) => {
          return (
            <View style={styles.inner_seats}>
              {_.map(item, (subitem, subindex) => {
                return (
                  <TouchableOpacity
                    key={subitem.number}
                    style={styles.seat}
                    onPress={() =>
                      handle_select_seats(index, subindex, subitem.number)
                    }>
                    <CustomIcon
                      name="seat"
                      style={[
                        styles.icon_style,
                        subitem.taken && {color: COLORS.Grey},
                        subitem.selected && {color: COLORS.Orange},
                      ]}
                      size={24}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </View>
      <View style={styles.seat_status_container}>
        <View style={styles.seat_status}>
          <CustomIcon name="radio" color={COLORS.White} size={18} />
          <Text style={styles.status_text}>Available</Text>
        </View>
        <View style={styles.seat_status}>
          <CustomIcon name="radio" color={COLORS.Grey} size={18} />
          <Text style={styles.status_text}>Taken</Text>
        </View>
        <View style={styles.seat_status}>
          <CustomIcon name="radio" color={COLORS.Orange} size={18} />
          <Text style={styles.status_text}>Selected</Text>
        </View>
      </View>
      <ScrollView
        horizontal
        style={styles.show_date_container}
        showsHorizontalScrollIndicator={false}>
        {_.map(date_array, (item, index) => {
          return (
            <TouchableOpacity
              style={[
                styles.show_dates,
                selected_date_index === item && styles.selected_date,
              ]}
              onPress={() => handle_selected_date(item)}>
              <Text style={styles.date_text}>{item.date}</Text>
              <Text style={styles.day_text}>{item.day}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <ScrollView
        horizontal
        style={styles.time_container}
        showsHorizontalScrollIndicator={false}>
        {_.map(time_array, (item, index) => {
          return (
            <TouchableOpacity
              style={[
                styles.time_box,
                selected_time_index === item && styles.selected_time,
              ]}
              onPress={() => handle_selected_time(item)}>
              <Text style={styles.time}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.total_price_text}>Total Price</Text>
          <Text style={styles.total_price}>$ {price}.00</Text>
        </View>
        <TouchableOpacity style={styles.footer_btn} onPress={handle_seat_book}>
          <Text style={styles.buy_ticket_btn}>Buy Tickets</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SeatBookingScreen;
