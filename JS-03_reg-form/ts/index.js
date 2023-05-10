"use strict";

const validationErrors = {
    fname: ["First Name is required"],
    lname: ["Last Name is required"],
    email: ["Email is required", "Email is not valid"],
    pass: ["Password is required", "Password not valid", "Passwords is not equal"],
    'pass-conf' : ["Coformation Password is required", "Password not valid", "Passwords is not equal" ],
    age: ["Age is required", "Too young"],
    date: ["Date is Required", "Enter date between previous week from now"]
}


const passwords = new Set()


class StringValidator {

    isName() {
        
    }
    isEmail(email) {
        const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')
        let emailCheck = email.toLowerCase().trim();
        console.log(regex.test(emailCheck));
        if (emailCheck && regex.test(emailCheck)) {
            
                return true 

            }
        

        return false
    }

    isPass(password) {
        if (password && password.search(/[A-Z]/) !== -1 
            && password.search(/[a-z]/)  !== -1 
            && password.search(/[1-9]/) !== -1
            && password.length >= 8) {    
            return true;
        } else if (password === '') {
            return true;
        }
        return false
    }
    isValueMoreThen(number, limit) {

        return number >= limit
    }

    isRequired(input) {
        const { value, required } = input;
        if (!required) return false
        
        return !!value           
    }

    isDate(value, days) {
        const currentDate = new Date();
        const date = new Date(`${value}T${currentDate.toLocaleTimeString()}`)
        const differ = Math.abs(currentDate.getTime() - date.getTime());
        return new Date(differ).getDate() <= days
    }

    isPasswordsEqual(pass, passConfirm) {
        return pass === passConfirm
    }
}

const validator = new StringValidator();


const setError = (input, index = 0) => {
    const { name, classList } = input
    const [error] = document.getElementsByClassName(`${name} error-message`);
    error.textContent = validationErrors[name][index];
    classList.add("error")
}

const clearError = (input) => {
    const { name, classList } = input
    const [error] = document.getElementsByClassName(`${name} error-message`);
    
    error.textContent = "";
    classList.remove("error");
}

const onBlur = (input) => () => {
    switch (input.type) {
        case 'text':
            validator.isRequired(input) ? clearError(input) : setError(input)
            break;
        case 'email':
            if (!validator.isRequired(input)) {
                setError(input);
                break;
            }

            if (!validator.isEmail(input.value)) {
                setError(input, 1)
                break;
            }
            clearError(input)
            break;
        case "password":
            if (!validator.isRequired(input)) {
                setError(input);
                break;
            }

            if(!validator.isPass(input.value)) {
                setError(input, 1);
                break;
            }
        
            
            passwords.add(input)

            if (passwords.size === 2) {
                const keys = passwords.keys()
                const pass1 = keys.next().value
                const pass2 = keys.next().value
                
                if(!validator.isPasswordsEqual(pass1.value, pass2.value)) {
                    setError(pass1, 2)
                    setError(pass2, 2)
                    break;
                } else {
                    clearError(pass1)
                    clearError(pass2)
                }
            }

            clearError(input)
        case 'number':
        case 'date':
            if(!validator.isRequired(input)){
                setError(input);
                break;
            }
            if (!validator.isDate(input.value, 7)){
                setError(input, 1);
                break;
            };
            clearError(input);


        default:
            break;       

    }
}

const onChange = (input) => () => {
     clearError(input)
}

const realtimeValidation = () => {
    const form = document.getElementById("reg-form")
    const inputs = [...form.getElementsByTagName("input")];
    inputs
        .filter(input => input.required)
        .map(input => {
            input.addEventListener('blur', onBlur(input))
            input.addEventListener("input", onChange(input))
        });
}


const validateForm = event => {
    event.preventDefault();
    const form = event.target;
    const formFields = [...form.elements];
    formFields
        .filter(input => input.required)
        .map(input => {
            validator.isRequired(input) ? clearError(input) : setError(input)

    })  
}
const form = document.getElementById("reg-form").addEventListener('submit', validateForm)

realtimeValidation();

