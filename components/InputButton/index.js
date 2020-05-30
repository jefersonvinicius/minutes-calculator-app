import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function InputButton({
  value,
  iconName,
  placeholder,
  onPress,
  disabled = false,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      disabled={disabled}>
      <View style={styles.iconContainer}>
        <Icon name={iconName} size={20} color={value ? '#444' : '#888'} />
      </View>
      <View style={styles.separator} />
      {value ? (
        <Text style={styles.value}>{value}</Text>
      ) : (
        <Text style={styles.placeholder}>{placeholder}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    color: '#888',
    marginLeft: 10,
    flex: 1,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
  },
  separator: {
    width: 0.5,
    height: 30,
    backgroundColor: '#444',
    marginHorizontal: 2.5,
  },
  value: {
    color: '#444',
    marginLeft: 5,
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    minHeight: 50,
    borderRadius: 10,
    borderColor: '#888',
  },
});
