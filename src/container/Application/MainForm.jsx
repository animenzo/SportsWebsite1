import { useReducer } from "react";
import FormInputGroup from "./FormInputGroup";
import {
  FormActionTypes,
  FormInitialState,
  formReducer,
  FormSettings
} from "../../hooks/formReducer.js";
import Button from "./Button";
import { validateInput } from '../../utils/utils';

const MainForm = () => {
  const [state, dispatch] = useReducer(formReducer, FormInitialState);
  const { form, current_step, errors } = state;
  const { maxStep } = FormSettings;
  const showResetButton = Object.values(form).filter(v => v)[0];

  const handleInputChange = evt => {
    const { name, value } = evt.target;
    dispatch({
      type: FormActionTypes.ADD_DATA,
      payload: {
        [name]: value
      }
    });
  };

  const handleAvatarInputChange = evt => {
    const { name, files } = evt.target;
    if (!files[0]) return;

    const reader = new FileReader();
    reader.onload = e => {
      evt.target.parentElement.querySelector('img').src = e.target.result;
    };
    reader.readAsDataURL(files[0]);

    dispatch({
      type: FormActionTypes.ADD_DATA,
      payload: { [name]: files[0] }
    });
  };

  const goToPreviousStep = () => {
    dispatch({
      type: FormActionTypes.FORM_PREV_STEP
    });
  };

  const handleErrors = () => {
    const errorsObj = { ...errors };
    let fields = null;

    switch (current_step) {
      case 1:
        fields = ['username', 'email', 'password'];
        break;
      case 2:
        fields = ['firstname', 'lastname', 'phone'];
        break;
      case 3:
        fields = ['age', 'dob', 'role'];
        break;
      default:
    }

    fields.forEach(field => {
      const result = validateInput(form[field], field);
      if (result.status) delete errorsObj[field];
      else errorsObj[field] = result.msg;
    });

    dispatch({
      type: FormActionTypes.FORM_ERROR,
      payload: { ...errorsObj }
    });

    return Object.keys(errorsObj).length === 0;
  };

  const goToNextStep = () => {
    const status = handleErrors();
    if (!status) return;

    dispatch({
      type: FormActionTypes.FORM_NEXT_STEP
    });
  };

  const handleSubmitForm = evt => {
    evt.preventDefault();
    const status = handleErrors();
    if (!status) return;

    const formData = { ...form }; // Collect all data from the form state
    console.log("Submitted Data: ", formData);

    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }).then(result => {
      console.warn("result", result);
    });

    alert('Application submitted');
  };

  const renderCurrentStepJSX = () => {
    switch (current_step) {
      case 1:
        const { username = '', email = '', password = '', avatar = '' } = form;
        const { username: usernameError, email: emailError, password: passwordError } = errors;

        return (
          <>
            <FormInputGroup
              title="Username"
              type="text"
              name="username"
              id="username"
              value={username}
              inputCls="w-full"
              error={usernameError}
              onChangeHandler={handleInputChange}
            />
            <FormInputGroup
              title="Email"
              type="email"
              name="email"
              id="email"
              value={email}
              inputCls="w-full"
              error={emailError}
              onChangeHandler={handleInputChange}
            />
            <FormInputGroup
              title="Password"
              type="password"
              name="password"
              id="password"
              value={password}
              inputCls="w-full"
              error={passwordError}
              onChangeHandler={handleInputChange}
            />
            <FormInputGroup
              title="Profile Picture"
              type="file"
              name="avatar"
              id="avatar"
              value={avatar}
              inputCls={`w-full ${avatar ? 'input-icon' : ''}`}
              onChangeHandler={handleAvatarInputChange}
            >
              {avatar && <img src="" className="avatar" alt="avatar" />}
            </FormInputGroup>
          </>
        );

      case 2:
        const { firstname = '', lastname = '', phone = '' } = form;
        const { firstname: firstNameError, lastname: lastNameError, phone: phoneError } = errors;

        return (
          <>
            <FormInputGroup
              title="First Name"
              type="text"
              name="firstname"
              id="firstname"
              value={firstname}
              inputCls="w-full"
              error={firstNameError}
              onChangeHandler={handleInputChange}
            />
            <FormInputGroup
              title="Last Name"
              type="text"
              name="lastname"
              id="lastname"
              value={lastname}
              inputCls="w-full"
              error={lastNameError}
              onChangeHandler={handleInputChange}
            />
            <FormInputGroup
              title="Phone"
              type="tel"
              name="phone"
              id="phone"
              value={phone}
              inputCls="w-full"
              error={phoneError}
              onChangeHandler={handleInputChange}
            />
          </>
        );

      case 3:
        const { age = '', dob = '', role = '', certificate = '' } = form;
        const { age: ageError, dob: dobError, role: roleError } = errors;

        return (
          <>
            <FormInputGroup
              title="Age"
              type="number"
              name="age"
              id="age"
              value={age}
              inputCls="w-full"
              error={ageError}
              onChangeHandler={handleInputChange}
            />
            <FormInputGroup
              title="Date of Birth"
              type="date"
              name="dob"
              id="dob"
              value={dob}
              inputCls="w-full"
              error={dobError}
              onChangeHandler={handleInputChange}
            />
            <FormInputGroup
              title="Role"
              type="text"
              name="role"
              id="role"
              value={role}
              inputCls="w-full"
              error={roleError}
              onChangeHandler={handleInputChange}
            />
            <FormInputGroup
              title="Certificates (if any)"
              type="file"
              name="certificate"
              id="certificate"
              value={certificate}
              inputCls={`w-full ${certificate ? 'input-icon' : ''}`}
              onChangeHandler={handleAvatarInputChange}
            >
              {certificate && <img src="" className="certificate" alt="certificate" />}
            </FormInputGroup>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <h2 className="heading">Register Now</h2>
      <form onSubmit={handleSubmitForm}>
        {renderCurrentStepJSX()}
        <div className="form-footer">
          <div className="step-info">
            {current_step} of {maxStep}
          </div>
          <div className="action-cta">
            {showResetButton && (
              <Button
                type="button"
                text="Reset"
                clsName="btn btn-outline"
                onClickHandler={() => dispatch({ type: FormActionTypes.FORM_RESET })}
              />
            )}
            {current_step > 1 && (
              <Button
                type="button"
                text="Previous"
                clsName="btn btn-outline"
                onClickHandler={goToPreviousStep}
              />
            )}
            {current_step < maxStep && (
              <Button
                type="button"
                text="Next"
                clsName="btn"
                onClickHandler={goToNextStep}
              />
            )}
            {current_step === maxStep && (
              <Button
                type="submit"
                text="Submit"
                clsName="btn"
              />
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default MainForm;
