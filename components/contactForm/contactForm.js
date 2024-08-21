"use client";
import { useReducer, useState, useEffect } from "react";

const initialState = {
  data: {
    fullName: { value: "", isTouched: false, error: "" },
    postcode: { value: "", isTouched: false, error: "" },
    addressNumber: { value: "", isTouched: false, error: "" },
    cityName: { value: "", isTouched: false, error: "" },
    phoneNumber: { value: "", isTouched: false, error: "" },
    email: { value: "", isTouched: false, error: "" },
  },
  formError: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD_VALUE":
      return {
        ...state,
        data: {
          ...state.data,
          [action.field]: {
            ...state.data[action.field],
            value: action.value,
            isTouched: true,
            error: action.error || "",
          },
        },
      };
    case "VALIDATE_FORM":
      return {
        ...state,
        data: action.errors,
        formError: action.formError,
      };
    default:
      return state;
  }
}

export default function ContactForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function validateField(fieldName, value) {
    let error = "";

    switch (fieldName) {
      case "fullName":
      case "postcode":
      case "addressNumber":
      case "cityName":
        if (!value) error = "This field cannot be empty.";
        break;

      case "phoneNumber":
        if (!value) {
          error = "Phone number is required.";
        } else if (value.length < 10 || value.length > 15) {
          error = "Phone number must be between 10 and 15 digits.";
        }
        break;

      case "email":
        if (!value) {
          error = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Email is invalid.";
        }
        break;

      default:
        break;
    }

    return error;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    const error = validateField(name, value);
    dispatch({ type: "SET_FIELD_VALUE", field: name, value, error });
  }

  function handleSubmit(e) {
    e.preventDefault();

    let formError = false;
    const errors = { ...state.data };

    Object.keys(errors).forEach((key) => {
      const error = validateField(key, errors[key].value);
      if (error) formError = true;
      errors[key] = {
        ...errors[key],
        isTouched: true,
        error,
      };
    });

    dispatch({ type: "VALIDATE_FORM", errors, formError });

    if (!formError) {
      console.log("Form submitted successfully:", state.data); // Proceed with form submission ???? maybe add a confirmation here
    } else {
      console.log("Form submission failed:", state.data);
    }
  }

  return (
    <>
      <h2 className="designBooking-title">Design Booking</h2>
      <form className="designBooking-form" onSubmit={handleSubmit}>
        <fieldset className="designBooking-fieldset">
          <legend className="designBooking-legend">
            Personal Information:
          </legend>
          <div className="designBooking-container">
            <label className="designBooking-label">
              Full Name
              <input
                type="text"
                name="fullName"
                value={state.data.fullName.value}
                onChange={handleChange}
              />
              {state.data.fullName.error && (
                <p className="errorMessage">{state.data.fullName.error}</p>
              )}
            </label>
            <label className="designBooking-label">
              Postcode
              <input
                type="text"
                name="postcode"
                value={state.data.postcode.value}
                onChange={handleChange}
              />
              {state.data.postcode.error && (
                <p className="errorMessage">{state.data.postcode.error}</p>
              )}
            </label>
            <label className="designBooking-label">
              House/Flat Number and Street Name
              <input
                type="text"
                name="addressNumber"
                value={state.data.addressNumber.value}
                onChange={handleChange}
              />
              {state.data.addressNumber.error && (
                <p className="errorMessage">{state.data.addressNumber.error}</p>
              )}
            </label>
            <label className="designBooking-label">
              City
              <input
                type="text"
                name="cityName"
                value={state.data.cityName.value}
                onChange={handleChange}
              />
              {state.data.cityName.error && (
                <p className="errorMessage">{state.data.cityName.error}</p>
              )}
            </label>
          </div>
        </fieldset>

        <fieldset className="designBooking-fieldset">
          <legend className="designBooking-legend">Contact Information:</legend>
          <div className="designBooking-container">
            <label className="designBooking-label">
              Phone Number
              <input
                type="text"
                name="phoneNumber"
                value={state.data.phoneNumber.value}
                onChange={handleChange}
              />
              {state.data.phoneNumber.error && (
                <p className="errorMessage">{state.data.phoneNumber.error}</p>
              )}
            </label>
            <label className="designBooking-label">
              Email Address
              <input
                type="email"
                name="email"
                value={state.data.email.value}
                onChange={handleChange}
              />
              {state.data.email.error && (
                <p className="errorMessage">{state.data.email.error}</p>
              )}
            </label>
          </div>
        </fieldset>

        <button className="designBooking-button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
