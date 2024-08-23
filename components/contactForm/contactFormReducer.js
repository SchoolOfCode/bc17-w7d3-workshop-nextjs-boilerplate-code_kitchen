"use client";
import { useState, useEffect, useReducer } from "react";

const initialState = {
  data: {
    fullName: { value: "", isValid: true },
    postCode: { value: "", isValid: true },
    address: { value: "", isValid: true },
    city: { value: "", isValid: true },
    phone: { value: "", isValid: true },
    email: { value: "", isValid: true },
  },
  status: "Submit",
  disabled: "",
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
          },
        },
      };
    case "INPUT_CHECKED":
      if (state.data[action.field].value) {
        return {
          ...state,
          data: {
            ...state.data,
            [action.field]: {
              ...state.data[action.field],
              isValid: true,
            },
          },
        };
      } else {
        return {
          ...state,
          data: {
            ...state.data,
            [action.field]: {
              ...state.data[action.field],
              isValid: false,
            },
          },
        };
      }

    case "SUBMIT_STATUS":
      return {
        ...state,
        status: "Submitting",
      };
    case "SUCCESS_STATUS":
      return {
        ...state,
        status: "Submitted",
      };
    case "ERROR_STATUS":
      return {
        ...state,
        status: "Failed to submit",
      };
    case "DISABLE_SUBMIT":
      console.log("submit");
      return {
        ...state,
        disabled: "disabled",
      };
    default:
      return state;
  }
}

export default function ContactForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [postcodeStatus, setPostcodeStatus] = useState(200);

  async function getPostcode() {
    fetch(`https://api.postcodes.io/postcodes/${state.data.postCode.value}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("print dataStatus", data.status);
        setPostcodeStatus(data.status);
      });
  }

  function handleChange(e) {
    if (e.target.name === "email" && !/\S+@\S+\.\S+/.test(e.target.value)) {
      return;
    }
    if (e.target.name === "phone" && !/^\d+$/.test(e.target.value)) {
      return;
    }
    // if the return-status is different from 200 return... else dispatch "set_field_value"
    dispatch({
      type: "SET_FIELD_VALUE",
      field: e.target.name,
      value: e.target.value,
    });
  }

  function handleTouch(e) {
    getPostcode();
    console.log(postcodeStatus);
    if (!state.data[e.target.name.value]) {
      dispatch({
        type: "INPUT_CHECKED",
        field: e.target.name,
        value: false,
      });
    } else {
      console.log("true");
      dispatch({
        type: "INPUT_CHECKED",
        field: e.target.name,
        value: true,
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch({ type: "VALIDATE_FORM" });

    // button status

    dispatch({
      type: "SUBMIT_STATUS",
    });

    setTimeout(() => {
      if (
        !state.data.fullName.value ||
        !state.data.postCode.value ||
        !state.data.address.value ||
        !state.data.city.value ||
        !state.data.phone.value ||
        !state.data.email.value
      ) {
        dispatch({
          type: "ERROR_STATUS",
        });
      } else {
        dispatch({
          type: "SUCCESS_STATUS",
        });
        dispatch({
          type: "DISABLE_SUBMIT",
        });
      }
    }, 2000);
  }

  return (
    <>
      <h2 className="designBooking-title">Design Booking</h2>
      <form className="designBooking-form">
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
                // value={state.data.fullName.value}
                onChange={(event) => {
                  handleChange(event);
                }}
                onBlur={(event) => {
                  handleTouch(event);
                }}
              />
              {!state.data.fullName.isValid && (
                <span>the input is not valid</span>
              )}
            </label>
            <label className="designBooking-label">
              Postcode
              <input
                type="text"
                name="postCode"
                onChange={(event) => {
                  handleChange(event);
                }}
                onBlur={(event) => {
                  handleTouch(event);
                }}
              />
              {postcodeStatus !== 200 && <span>the postcode is not valid</span>}
            </label>

            <label className="designBooking-label">
              Address
              <input
                type="text"
                name="address"
                onChange={(event) => {
                  handleChange(event);
                }}
                onBlur={(event) => {
                  handleTouch(event);
                }}
              />
              {!state.data.address.isValid && (
                <span>the input is not valid</span>
              )}
            </label>

            <label className="designBooking-label">
              City
              <input
                type="text"
                name="city"
                onChange={(event) => {
                  handleChange(event);
                }}
                onBlur={(event) => {
                  handleTouch(event);
                }}
              />
              {!state.data.city.isValid && <span>the input is not valid</span>}
            </label>
          </div>
        </fieldset>
        <fieldset className="designBooking-fieldset">
          <legend className="designBooking-legend">Contact Information:</legend>
          <div className="designBooking-container">
            <label className="designBooking-label">
              Phone
              <input
                type="text"
                name="phone"
                onChange={(event) => {
                  handleChange(event);
                }}
                onBlur={(event) => {
                  handleTouch(event);
                }}
              />
              {!state.data.phone.isValid && (
                <span>The phone number is not valid</span>
              )}
            </label>
            <label className="designBooking-label">
              Email
              <input
                type="text"
                name="email"
                onChange={(event) => {
                  handleChange(event);
                }}
                onBlur={(event) => {
                  handleTouch(event);
                }}
              />
              {!state.data.email.isValid && <span>the email is not valid</span>}
            </label>
          </div>
        </fieldset>
        <button
          className="designBooking-button"
          type="submit"
          value="submit"
          onClick={handleSubmit}
          disabled={state.disabled}
        >
          {state.status}
        </button>
        {state.status === "Submitting" && (
          <span className="submitting">Submitting... 🔄</span>
        )}
        {state.status === "Submitted" && (
          <span className="pass">Submitted ✅</span>
        )}
        {state.status === "Failed to submit" && (
          <span className="fail">Failed to submit ❌</span>
        )}
      </form>
    </>
  );
}
