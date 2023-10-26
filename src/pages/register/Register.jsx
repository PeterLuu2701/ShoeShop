import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { registerApi } from '../../redux/reducer/userReducer';

const Register = () => {
  const [passwordType, setPasswordType] = useState({
    password: true,
    confirmPassword: true,
  });

  const newUser = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const frm = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phone: '',
      gender: true,
    },
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .trim()
        .required('Email cannot be blank!')
        .email('Email is invalid!'),
      password: yup
        .string()
        .trim()
        .required('Password cannot be blank!')
        .min(6, 'Password must be between 6 - 10 characters!')
        .max(10, 'Password must be between 6 - 10 characters!'),
      passwordConfirm: yup
        .string()
        .trim()
        .required('Confirm password cannot be blank!')
        .oneOf([yup.ref('password')], 'Passwords must match'),
      name: yup.string().trim().required('Name cannot be blank!'),
      phone: yup
        .string()
        .trim()
        .required('Phone number cannot be blank!')
        .matches(
          /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/,
          'Phone number is not valid!'
        ),
      // password:yup.string().required('Password cannot be blank!').min(6,'tên lỗi').max(32,'tên lỗi').test('regex','tên lỗi')
    }),
    onSubmit: (values) => {
      dispatch(registerApi(values));
    },
  });
  return (
    <section className="register">
      <div className="container">
        <h1 className="register__title">Register</h1>
        <form className="register__form rForm" onSubmit={frm.handleSubmit}>
          <div className="row">
            <div className="col-lg-6">
              <div className="rForm__left">
                <div className="rForm__input">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="email"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                  />
                  {frm.touched.email && frm.errors.email && (
                    <p className="rForm__error" id="emailError">
                      {frm.errors.email}
                    </p>
                  )}
                </div>
                <div className="rForm__input">
                  <label htmlFor="password">Password</label>
                  <input
                    type={passwordType.password ? 'password' : 'text'}
                    id="password"
                    placeholder="password"
                    autoComplete="off"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                  />
                  <span
                    onClick={() =>
                      setPasswordType({
                        ...passwordType,
                        password: !passwordType.password,
                      })
                    }
                  >
                    <i className="fa-solid fa-eye" />
                  </span>
                  {frm.touched.password && frm.errors.password && (
                    <p className="rForm__error" id="passwordError">
                      {frm.errors.password}
                    </p>
                  )}
                </div>
                <div className="rForm__input">
                  <label htmlFor="passwordConfirm">Password confirm</label>
                  <input
                    type={passwordType.confirmPassword ? 'password' : 'text'}
                    id="passwordConfirm"
                    placeholder="password confirm"
                    autoComplete="off"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                  />
                  <span
                    onClick={() =>
                      setPasswordType({
                        ...passwordType,
                        confirmPassword: !passwordType.confirmPassword,
                      })
                    }
                  >
                    <i className="fa-solid fa-eye" />
                  </span>
                  {frm.touched.passwordConfirm &&
                    frm.errors.passwordConfirm && (
                      <p className="rForm__error" id="passwordConfirmError">
                        {frm.errors.passwordConfirm}
                      </p>
                    )}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="rForm__right">
                <div className="rForm__input">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="name"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                  />
                  {frm.touched.name && frm.errors.name && (
                    <p className="rForm__error" id="nameError">
                      {frm.errors.name}
                    </p>
                  )}
                </div>
                <div className="rForm__input">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    placeholder="phone"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                  />
                  {frm.touched.phone && frm.errors.phone && (
                    <p className="rForm__error" id="phoneError">
                      {frm.errors.phone}
                    </p>
                  )}
                </div>
                <div className="rForm__radio">
                  <div className="content">
                    <span className="gender-label">Gender</span>
                    <div className="gender">
                      <div className="male">
                        <input
                          type="radio"
                          name="gender"
                          id="male"
                          value={true}
                          onChange={frm.handleChange}
                          defaultChecked
                        />
                        <label htmlFor="male">Male</label>
                      </div>
                      <div className="female">
                        <input
                          type="radio"
                          name="gender"
                          id="female"
                          value={false}
                          onChange={frm.handleChange}
                        />
                        <label htmlFor="female">Female</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btn-submit">
                  <button id="submitRegister" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
