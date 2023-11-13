import {StyleSheet} from 'react-native';

import {
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
  BORDERRADIUS,
} from '../../theme/theme';

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

export default styles;
