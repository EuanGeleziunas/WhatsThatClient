// import React, { Component } from 'react';
// import {
//   View,
//   TextInput,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import { BiErrorCircle } from 'react-icons/bi';
// import { brandStyles } from '../src/styles/brandStyles';
// import BrandButton from './brandButton';

// class SignUp extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       firstName: '',
//       lastName: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//       error: '',
//       submitted: false,
//     };

//     this.onPressButton = this.onPressButton.bind(this);
//   }

//   onPressButton() {
//     console.log('Button is clicked');

//     this.setState({ submitted: true });
//     this.setState({ error: '' });

//     if (this.isFormValid()) {
//       this.signUpRequest();
//     }
//   }

//   isFormValid() {
//     console.log('state before checking all fields', this.state);

//     const emailValidator = require('email-validator');

//     const PASSWORD_REGEX = new RegExp(
//       '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
//     );

//     if (
//       !this.state.firstName ||
//       !this.state.lastName ||
//       !this.state.email ||
//       !this.state.password ||
//       !this.state.confirmPassword
//     ) {
//       this.setState({ error: 'All fields required!' }, () => {
//         console.log('state after checking all fields', this.state);
//         return false;
//       });
//     } else if (!emailValidator.validate(this.state.email)) {
//       this.setState({ error: 'Must enter a valid email' }, () => {});
//       return false;
//     } else if (!PASSWORD_REGEX.test(this.state.password)) {
//       this.setState({ error: 'Password is not strong enough' }, () => {});
//       return false;
//     } else if (this.state.password !== this.state.confirmPassword) {
//       this.setState({ error: 'Passwords do not match' }, () => {});
//       return false;
//     } else {
//       console.log('Form Validation Passed', this.state);
//       return true;
//     }
//   }

//   signUpRequest = async () => {
//     const requestBody = {
//       first_name: this.state.firstName,
//       last_name: this.state.lastName,
//       email: this.state.email,
//       password: this.state.password,
//     };

//     return fetch('http://localhost:3333/api/1.0.0/user', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(requestBody),
//     })
//       .then((response) => {
//         if (response.status === 201) {
//           return response.json();
//         } else if (response.status === 400) {
//           this.setState(
//             { error: 'Account with this email already exists' },
//             () => {},
//           );
//           throw response;
//         } else {
//           this.setState(
//             { error: 'Something went wrong. Please try again' },
//             () => {},
//           );
//           throw response;
//         }
//       })
//       .then((responseJson) => {
//         console.log('User created with ID: ', responseJson);
//         this.props.navigation.navigate('Login');
//       })
//       .catch((error) => {
//         throw error;
//       });
//   };

//   render() {
//     const navigation = this.props.navigation;
//     const error = this.state.error;
//     return (
//       <View style={styles.container}>
//         <View style={styles.titleContainer}>
//           <Text style={styles.title}>WhatsThat</Text>
//           <Text style={styles.subTitle}>Sign Up</Text>
//         </View>
//         <View style={styles.signUpContainer}>
//           {error ? (
//             <View style={styles.errorContainer}>
//               <BiErrorCircle style={styles.errorIcon} />
//               <Text style={styles.errorText}>{this.state.error}</Text>
//             </View>
//           ) : null}
//           <View style={styles.formItem}>
//             <TextInput
//               placeholder="Enter first name"
//               onChangeText={(firstName) => this.setState({ firstName })}
//               value={this.state.firstName}
//               style={styles.formInput}
//             />
//           </View>
//           <View style={styles.formItem}>
//             <TextInput
//               placeholder="Enter last name"
//               onChangeText={(lastName) => this.setState({ lastName })}
//               value={this.state.lastName}
//               style={styles.formInput}
//             />
//           </View>
//           <View style={styles.formItem}>
//             <TextInput
//               placeholder="Enter email"
//               onChangeText={(email) => this.setState({ email })}
//               value={this.state.email}
//               style={styles.formInput}
//             />
//           </View>
//           <View style={styles.formItem}>
//             <TextInput
//               placeholder="Enter password"
//               onChangeText={(password) => this.setState({ password })}
//               value={this.state.password}
//               secureTextEntry
//               style={styles.formInput}
//             />
//           </View>
//           <View style={styles.formItem}>
//             <TextInput
//               placeholder="Confirm password"
//               onChangeText={(confirmPassword) =>
//                 this.setState({ confirmPassword })
//               }
//               value={this.state.confirmPassword}
//               secureTextEntry
//               style={styles.formInput}
//             />
//           </View>
//           <View style={styles.formItem}>
//             <BrandButton text="Sign Up" onPress={this.onPressButton} />
//             <View style={styles.signInRedirectContainer}>
//               <Text style={styles.signInText}>Already have an account?</Text>
//               <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//                 <Text style={styles.signInLink}> Sign in</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: brandStyles.whiteSmoke,
//     flex: 1,
//     paddingVertical: 10,
//     paddingHorizontal: 40,
//   },
//   titleContainer: {
//     flexBasis: '15%',
//     justifyContent: 'center',
//   },
//   title: {
//     color: brandStyles.orange,
//     fontSize: 25,
//   },
//   subTitle: {
//     color: brandStyles.orange,
//     fontSize: 18,
//   },
//   signUpContainer: {
//     flexBasis: '85%',
//     width: '100%',
//     justifyContent: 'space-around',
//   },
//   errorContainer: {
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderStyle: 'solid',
//     borderColor: brandStyles.red,
//     backgroundColor: brandStyles.pink,
//     paddingVertical: 10,
//     paddingHorizontal: brandStyles.textInputPadding,
//   },
//   errorIcon: {
//     color: brandStyles.red,
//     fontSize: 16,
//     textTransform: 'uppercase',
//     marginRight: 5,
//   },
//   errorText: {
//     color: brandStyles.red,
//     fontSize: 16,
//     textTransform: 'uppercase',
//     marginLeft: 5,
//   },
//   formItem: {
//     width: '100%',
//   },
//   formLabel: {
//     fontSize: 15,
//     color: brandStyles.orange,
//   },
//   formInput: {
//     height: 40,
//     borderColor: '#E0E0E0',
//     borderWidth: 1,
//     borderRadius: 5,
//     backgroundColor: '#E8E8E8',
//     color: '#696969',
//     paddingLeft: brandStyles.textInputPadding,
//   },
//   signInRedirectContainer: {
//     marginTop: 20,
//     flexDirection: 'row',
//     flexWrap: 'nowrap',
//     justifyContent: 'center',
//   },
//   signInLink: {
//     color: brandStyles.orange,
//   },
// });

// export default SignUp;
