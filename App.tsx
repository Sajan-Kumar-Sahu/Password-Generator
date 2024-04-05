import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

//Form Validation
import * as Yup from 'yup';
import {Formik} from 'formik';

import BouncyCheckbox from 'react-native-bouncy-checkbox';
import SplashScreen from 'react-native-splash-screen';

const userSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be atleast 4 characters')
    .max(16, 'Should be atmost 16 characters')
    .required('Length is required')
});

const App = () => {
  const [password, SetPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitchars = '0123456789';
    const specialChars = '~!@#$%^&*_';

    if (upperCase) {
      characterList += upperCaseChars;
    }
    if (lowerCase) {
      characterList += lowerCaseChars;
    }
    if (numbers) {
      characterList += digitchars;
    }
    if (symbols) {
      characterList += specialChars;
    }

    const passwordResult = createPassword(characterList, passwordLength);
    SetPassword(passwordResult);
    setIsPasswordGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPasswordState = () => {
    SetPassword('');
    setIsPasswordGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };
  
  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.appContainer}>
      <StatusBar backgroundColor={'#F5BCBA'} barStyle={'dark-content'} />
      <SafeAreaView>
        <View style={styles.formContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Password Generator</Text>
          </View>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={userSchema}
            onSubmit={values => {
              generatePasswordString(+values.passwordLength);
            }}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View style={styles.instructionContainer}>
                  <Text style={styles.instructionText}>Please Enter a password length between 4 and 16.</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length:</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>

                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Ex. 8"
                    placeholderTextColor={'#777E8B'}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Lower Case</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={lowerCase}
                    onPress={() => setLowerCase(!lowerCase)}
                    fillColor="#2B2B52"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Upper Case</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={upperCase}
                    onPress={() => setUpperCase(!upperCase)}
                    fillColor="#2B2B52"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Numbers</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor="#2B2B52"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Symbols</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="#2B2B52"
                  />
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity
                    style={styles.primaryBtn}
                    disabled={!isValid}
                    onPress={() => handleSubmit()}>
                    <Text style={styles.primaryBtnTxt}>Generate</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPasswordState();
                    }}>
                    <Text style={styles.secondaryBtnTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPasswordGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Password:</Text>
            <Text style={styles.description}>Long press to copy password</Text>
            <Text selectable={true} style={styles.generatedPassword}>
              {password}
            </Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#F5BCBA',
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    backgroundColor: '#2B2B52',
    justifyContent: 'center',
    marginBottom: 15,
    borderRadius: 50,
    borderColor: 'magenta',
    borderWidth: 2,
  },
  title: {
    color: '#EA7773',
    fontSize: 32,
    fontWeight: 'bold',
    padding: 8,
  },
  instructionContainer:{
    marginVertical:20,
  },
  instructionText:{
    fontSize:16,
    color:'#3e0500',
    fontWeight:'bold',

  },
  subTitle: {
    color: '#EA7773',
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#EA7773',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heading: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 8,
    width: '20%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    fontWeight:'500'
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 12,
    borderColor: 'magenta',
    borderWidth: 2,
  },
  cardElevated: {
    backgroundColor: '#2B2B52',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    color: 'cyan',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
});
export default App;
