const valid = ({ fullname, username, email, password, confirmPassword }) => {
  const err = {};

  if (!fullname) {
    err.fullname = "Please add your full name";
  } else if (fullname.length > 25) {
    err.fullname = "Length should be less than 25 charaters";
  }
  if (!username) {
    err.username = "Please add your username";
  } else if (username.trim().length > 25) {
    err.fullname = "Length should be less than 25 charaters";
  }

  if (!email) {
    err.email = "Please add your email";
  } else if (!validateEmail(email)) {
    err.email = "Invalid email";
  }

  if (!password) {
    err.password = "Please add your password";
  } else if (password.length < 6) {
    err.password = "Length must be greater than 6 charaters";
  }

  if (password !== confirmPassword) {
    err.confirmPassword = "Confirm password should be match";
  }
  return {
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
}

export default valid;
