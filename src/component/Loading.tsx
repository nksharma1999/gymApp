import {ActivityIndicator, StyleSheet, View, useColorScheme} from 'react-native';

export const Loading = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
      backgroundColor: isDarkMode?'black':'white'
    },
  });
  return (
    <View style={[styles.container, styles.horizontal]}>
      {/* <ActivityIndicator /> */}
      {/* <ActivityIndicator size="large" /> */}
      {/* <ActivityIndicator size="small" color="#0000ff" /> */}
      <ActivityIndicator size="large" color={isDarkMode?'white':'black'} />
    </View>
  );
};


