import React, {useState, useCallback, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format, differenceInMinutes, isAfter} from 'date-fns';
import InputButton from './components/InputButton';
import AnimatedNumber from './components/AnimatedNumber';

export default function App() {
  const [initialDatePickerVisible, setInitialDatePickerVisible] = useState(
    false,
  );
  const [finalDatePickerVisible, setFinalDatePickerVisible] = useState(false);

  const [initialTimePickerVisible, setInitialTimePickerVisible] = useState(
    false,
  );
  const [finalTimePickerVisible, setFinalTimePickerVisible] = useState(false);

  const [initialDate, setInitialDate] = useState(null);
  const [finalDate, setFinalDate] = useState(null);
  const [initialTime, setInitialTime] = useState(null);
  const [finalTime, setFinalTime] = useState(null);

  const [timeResult, setTimeResult] = useState(0);
  const timeResultHolder = useRef(0);

  const isCanCalculeTime = useCallback(() => {
    return initialTime && initialDate && finalDate && finalTime;
  }, [finalDate, finalTime, initialDate, initialTime]);

  const isFinalInputsAvaible = useCallback(() => {
    return initialTime && initialDate;
  }, [initialDate, initialTime]);

  const calculateTime = useCallback(() => {
    if (!isCanCalculeTime()) {
      Alert.alert('Aviso', 'Tenha certeza de ter preenchido todos os campos!');
      return;
    }

    const initial = new Date(
      initialDate.getFullYear(),
      initialDate.getMonth(),
      initialDate.getDate(),
      initialTime.getHours(),
      initialTime.getMinutes(),
    );
    const final = new Date(
      finalDate.getFullYear(),
      finalDate.getMonth(),
      finalDate.getDate(),
      finalTime.getHours(),
      finalTime.getMinutes(),
    );

    if (isAfter(initial, final)) {
      Alert.alert(
        'Aviso',
        'Tenha certeza que a data final seja maior que a inicial para realizar o calculo!',
      );
      return;
    }

    const time = differenceInMinutes(final, initial);
    timeResultHolder.current = time;
    setTimeResult(time);
  }, [finalDate, finalTime, initialDate, initialTime, isCanCalculeTime]);

  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        <Text style={styles.resultMinutesResult}>
          <AnimatedNumber from={0} to={timeResult} />
        </Text>
        <Text style={styles.minutesLabel}>Minutos</Text>
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.label}>Data inicial:</Text>
        <View style={styles.inputsContainer}>
          <InputButton
            value={initialDate ? format(initialDate, "'Dia' dd/MM/yyyy") : null}
            onPress={() => setInitialDatePickerVisible(true)}
            placeholder="__/__/__"
            iconName="calendar"
          />
          <View style={styles.marginHorizontal} />
          <InputButton
            value={initialTime ? format(initialTime, "'às' HH:mm") : null}
            onPress={() => setInitialTimePickerVisible(true)}
            placeholder="hh:mm"
            iconName="clock-outline"
          />
        </View>

        <Text
          style={[styles.label, {opacity: isFinalInputsAvaible() ? 1 : 0.4}]}>
          Data final:
        </Text>
        <View
          style={[
            styles.inputsContainer,
            {opacity: isFinalInputsAvaible() ? 1 : 0.4},
          ]}>
          <InputButton
            value={finalDate ? format(finalDate, "'Dia' dd/MM/yyyy") : null}
            onPress={() => setFinalDatePickerVisible(true)}
            placeholder="__/__/__"
            iconName="calendar"
            disabled={!isFinalInputsAvaible()}
          />
          <View style={styles.marginHorizontal} />

          <InputButton
            value={finalTime ? format(finalTime, "'às' HH:mm") : null}
            onPress={() => setFinalTimePickerVisible(true)}
            placeholder="hh:mm"
            iconName="clock-outline"
            disabled={!isFinalInputsAvaible()}
          />
        </View>

        <TouchableOpacity
          onPress={calculateTime}
          style={[
            styles.calculateButton,
            {backgroundColor: isCanCalculeTime() ? '#208EF4' : '#888'},
          ]}>
          <Text style={styles.calculeText}>Calcular Tempo</Text>
        </TouchableOpacity>
      </View>

      {initialDatePickerVisible && (
        <DateTimePicker
          value={initialDate ?? new Date()}
          onChange={event => {
            console.log(event);
            setInitialDatePickerVisible(false);
            if (event.type === 'dismissed') {
              return;
            }
            setInitialDate(new Date(event.nativeEvent.timestamp));
          }}
        />
      )}
      {initialTimePickerVisible && (
        <DateTimePicker
          value={initialTime ?? new Date()}
          mode="time"
          onChange={event => {
            console.log(event);
            setInitialTimePickerVisible(false);
            if (event.type === 'dismissed') {
              return;
            }
            setInitialTime(new Date(event.nativeEvent.timestamp));
          }}
        />
      )}
      {finalDatePickerVisible && (
        <DateTimePicker
          value={finalDate ?? new Date()}
          minimumDate={initialDate}
          onChange={event => {
            setFinalDatePickerVisible(false);
            if (event.type === 'dismissed') {
              return;
            }
            setFinalDate(new Date(event.nativeEvent.timestamp));
          }}
        />
      )}
      {finalTimePickerVisible && (
        <DateTimePicker
          value={finalTime ?? new Date()}
          mode="time"
          minimumDate={initialTime}
          onChange={event => {
            setFinalTimePickerVisible(false);
            if (event.type === 'dismissed') {
              return;
            }
            setFinalTime(new Date(event.nativeEvent.timestamp));
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#208EF4',
  },
  resultContainer: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  minutesLabel: {
    fontSize: 12,
    color: '#eee',
    marginTop: -5,
  },
  resultMinutesResult: {
    color: '#fff',
    fontSize: 38,
  },
  innerContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
    flex: 1,
  },
  inputsContainer: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
    marginBottom: 3,
  },
  marginHorizontal: {
    marginHorizontal: 2.5,
  },
  calculateButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  calculeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
