import {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import CustomIcon from './CustomIcon';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

const styles = StyleSheet.create({
  search_container: {
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_24,
    borderWidth: 2,
    borderColor: COLORS.WhiteRGBA15,
    borderRadius: BORDERRADIUS.radius_20,
    flexDirection: 'row',
  },
  input: {
    width: '90%',
    color: COLORS.White,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  search_icon: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.space_8,
  },
});

interface Props {
  search_functionality: any;
}

const SearchBar = ({search_functionality}: Props) => {
  const [search_text, set_search_text] = useState<string>('');

  const handle_change = (text: string) => {
    set_search_text(text);
  };

  const handle_press = () => {
    search_functionality(search_text);
  };

  return (
    <View style={styles.search_container}>
      <TextInput
        style={styles.input}
        placeholder="Search your Movies..."
        value={search_text}
        placeholderTextColor={COLORS.WhiteRGBA32}
        onChangeText={handle_change}
      />
      <TouchableOpacity style={styles.search_icon} onPress={handle_press}>
        <CustomIcon
          name="search"
          size={FONTSIZE.size_20}
          color={COLORS.Orange}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
