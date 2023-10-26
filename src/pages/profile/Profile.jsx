import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Orders from '../../components/Orders';
import {
  getProfileApi,
  updateProfileApi,
} from '../../redux/reducer/userReducer';

const Profile = () => {
  const { profile } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  console.log(profile);

  useEffect(() => {
    dispatch(getProfileApi());
  }, []);

  const frm = useFormik({
    initialValues: {
      email: profile?.email || '',
      name: profile?.name || '',
      phone: profile?.phone || '',
      gender: profile?.gender.toString() || 'true',
    },
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .trim()
        .required('Email cannot be blank!')
        .email('Email is invalid!'),

      name: yup.string().trim().required('Name cannot be blank!'),
      phone: yup
        .string()
        .trim()
        .required('Phone number cannot be blank!')
        .matches(
          /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/,
          'Phone number is not valid!'
        ),
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(updateProfileApi(values));
      dispatch(getProfileApi());
    },
  });
  return (
    <section className="profile">
      <h1 className="profile__title my-4 py-3 ps-3">Profile</h1>
      <div className="profile__info info">
        <div className="row">
          <div className="col-md-3 col-sm-12 d-flex justify-content-center">
            <div className="info__avatar">
              <img src={profile?.avatar || './img/avatar.png'} alt="avatar" />
            </div>
          </div>
          <div className="col-md-9 col-sm-12 ">
            <form className="info__form" onSubmit={frm.handleSubmit}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="f-left">
                    <div className="f-input">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="email"
                        value={frm.values.email}
                        onChange={frm.handleChange}
                        onBlur={frm.handleBlur}
                        disabled
                      />
                      {frm.touched.email && frm.errors.email && (
                        <p className="f-error" id="emailError">
                          {frm.errors.email}
                        </p>
                      )}
                    </div>
                    <div className="f-input">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        placeholder="name"
                        value={frm.values.name}
                        onChange={frm.handleChange}
                        onBlur={frm.handleBlur}
                      />
                      {frm.touched.name && frm.errors.name && (
                        <p className="f-error" id="nameError">
                          {frm.errors.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="f-right">
                    <div className="f-input">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="text"
                        id="phone"
                        placeholder="phone"
                        value={frm.values.phone}
                        onChange={frm.handleChange}
                        onBlur={frm.handleBlur}
                      />
                      {frm.touched.phone && frm.errors.phone && (
                        <p className="f-error" id="phoneError">
                          {frm.errors.phone}
                        </p>
                      )}
                    </div>
                    <div className="f-radio">
                      <div className="content">
                        <span className="gender-label">Gender</span>
                        <div className="gender">
                          <div className="male">
                            <input
                              type="radio"
                              name="gender"
                              id="male"
                              value={true}
                              checked={frm.values.gender === 'true'}
                              onChange={frm.handleChange}
                            />
                            <label htmlFor="male">Male</label>
                          </div>
                          <div className="female">
                            <input
                              type="radio"
                              name="gender"
                              id="female"
                              value={false}
                              checked={frm.values.gender === 'false'}
                              onChange={frm.handleChange}
                            />
                            <label htmlFor="female">Female</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="btn-submit">
                      <button id="submitRegister" type="submit">
                        update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Orders orders={profile?.ordersHistory} />
    </section>
  );
};

export default Profile;
