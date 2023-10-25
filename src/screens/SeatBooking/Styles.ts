import {StyleSheet} from 'react-native';
import {COLORS, SPACING, FONTSIZE, BORDERRADIUS} from '../../theme/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
    paddingBottom: SPACING.space_32,
  },
  background_img: {
    width: '100%',
    aspectRatio: 3 / 1.5,
  },
  linear_gradient: {
    height: '100%',
  },
  screen_text: {
    color: COLORS.WhiteRGBA32,
    fontSize: FONTSIZE.size_12,
    alignSelf: 'center',
    lineHeight: 20,
  },
  outer_seat_container: {},
  inner_seats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seat: {
    padding: SPACING.space_8,
  },
  icon_style: {
    color: COLORS.White,
  },
  seat_status_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: SPACING.space_16,
    paddingHorizontal: SPACING.space_32,
  },
  seat_status: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  status_text: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_10,
    paddingLeft: 4,
  },
  show_date_container: {
    flex: 1,
  },
  show_dates: {
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_10,
    height: 80,
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  date_text: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_24,
    fontWeight: '500',
  },
  day_text: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_10,
    alignSelf: 'center',
    paddingTop: 8,
  },
  selected_date: {
    backgroundColor: COLORS.Orange,
    borderRadius: 35,
  },
  time: {
    color: COLORS.WhiteRGBA75,
    fontSize: FONTSIZE.size_14,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.WhiteRGBA50,
    borderRadius: 18,
    alignItems: 'center',
    overflow: 'hidden',
  },
  time_box: {
    marginRight: SPACING.space_12,
    flex: 1,
    marginHorizontal: 8,
  },
  selected_time: {
    backgroundColor: COLORS.Orange,
    height: 35,
    borderRadius: 18,
    overflow: 'hidden',
  },
  time_container: {
    marginVertical: 16,
  },
  buy_ticket_btn: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: SPACING.space_18,
  },
  total_price_text: {
    color: COLORS.WhiteRGBA50,
    fontSize: FONTSIZE.size_14,
    alignSelf: 'center',
  },
  total_price: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_24,
    fontWeight: '500',
    alignSelf: 'center',
  },
  footer_btn: {
    paddingHorizontal: SPACING.space_16,
    paddingVertical: 8,
    backgroundColor: COLORS.Orange,
    borderRadius: BORDERRADIUS.radius_20,
  },
});

export default styles;
