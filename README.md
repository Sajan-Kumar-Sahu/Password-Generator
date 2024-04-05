# Password Generator Application
<p>This Application generates password for the user according to his/her preference.</p>

<p>In this project we will get to learn about different npm packages and their uses inside the application.</p>

## List of Npm packages used in this project
* [**Yup**](https://www.npmjs.com/package/yup)
    ```
    //Form Validation
    import * as Yup from 'yup';
    
    const userSchema = Yup.object().shape({
    passwordLength:Yup.number()
    .min(4,'Should be atleast 4 characters')
    .max(16,'Should be atmost 16 characters')
    .required('Length is required')
  })
  ``` 
* [**Formik**](https://formik.org/)
   * npm install formik --save
   
* [**Bouncy checkbox**](https://www.npmjs.com/package/react-native-bouncy-checkbox)
   * npm i react-native-bouncy-checkbox
