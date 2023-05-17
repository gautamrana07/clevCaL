import React, {useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  Text,
  Button,
  ActivityIndicator,
  Image
} from 'react-native';
import {fetchCurrencyLatest, convertCurrencyAPI} from './api';

const App = () => {
  const [currencyList, setCurrencyList] = useState([]);
  const [open, setOpen] = useState(false);
  const [targetOpen, setTargetOpen] = useState(false);
  const [sourceAmount, setSourceAmount] = useState('0');
  const [sourceCurrency, setSourceCurrency] = useState('');
  const [targetAmount, setTargetAmount] = useState('0');
  const [targetCurrency, setTargetCurrency] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCurrencyLatest().then(list => setCurrencyList(list));
  }, []);

  const convertCurrency = (amount, sourceCurrency, targetCurrency) => {
    setLoading(true);
    convertCurrencyAPI(amount, sourceCurrency, targetCurrency).then(data => {
      const {rates} = data;
      setTargetAmount(String(rates[targetCurrency]));
      setLoading(false);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Currency Converter</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Source Amount</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={value => setSourceAmount(value)}
              value={sourceAmount}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.dropdownContainer}>
            <View style={styles.dropdownWrapper}>
              <Text style={styles.label}>Select Source Currency</Text>
              <DropDownPicker
                containerStyle={styles.dropdown}
                style={styles.dropdownStyle}
                dropDownStyle={styles.dropdownList}
                onChangeText={value => setSourceCurrency(value)}
                open={open}
                value={sourceCurrency}
                items={currencyList.map(currency => ({
                  label: currency,
                  value: currency,
                }))}
                setOpen={setOpen}
                setValue={setSourceCurrency}
              />
            </View>
            <View style={styles.dropdownWrapper}>
              <Text style={styles.label}>Select Target Currency</Text>
              <DropDownPicker
                containerStyle={styles.dropdown}
                style={styles.dropdownStyle}
                dropDownStyle={styles.dropdownList}
                onChangeText={value => setTargetCurrency(value)}
                open={targetOpen}
                value={targetCurrency}
                items={currencyList.map(currency => ({
                  label: currency,
                  value: currency,
                }))}
                setOpen={setTargetOpen}
                setValue={setTargetCurrency}
              />
            </View>
          </View>
      
          <Button
            onPress={() =>
              convertCurrency(sourceAmount, sourceCurrency, targetCurrency)
            }
            title="Convert"
            color="black"
          />
          {loading ? (
            <ActivityIndicator color="black" size="large" />
          ) : (
            <View style={styles.resultContainer}>
              <Text style={styles.resultLabel}>Target Amount</Text>
              <TextInput
                style={styles.resultText} 
                editable={false}
                value={targetAmount}
              />
            </View>
          )}
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
  mainContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333333',
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    color: 'black',
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 230,
  },
  dropdownWrapper: {
    flex: 1,
    marginRight: 10,
  },
  dropdown: {
    height: 40,
  },
  dropdownStyle: {
    backgroundColor: '#ffffff',
    borderColor: '#cccccc',
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  resultContainer: {
    marginTop: 20,
  },
  resultLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333333',
  },
  resultText: {
    height: 40,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    color:'black'
  },
});

export default App;
