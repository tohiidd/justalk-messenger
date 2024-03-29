"use client";

import {useState} from "react";
import {Box, CircularProgress, FormControl, FormControlLabel, IconButton} from "@mui/material";
import {FormButton} from "components/Ui/Buttons";
import {Input} from "components/Ui/Inputs";
import {
  BpCheckBox,
  DangerAlert,
  ErrorLabel,
  FormSubtitle,
  FormTitle,
  Label,
  SuccessAlert,
  visibleIconStyles,
} from "components/Ui/Form";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useFormik} from "formik";
// import {useRouter} from "next/navigation";
import Link from "next/link";
import {loginSchema} from "utils/formikSchemas";
import {useLogin} from "hooks/useUser";
import {useRouter} from "next/navigation";
import {useAuthContext} from "context/AuthContext";

interface IValues {
  username: string;
  password: string;
  rememberMe: boolean;
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const {replace} = useRouter();

  const {setCredentials} = useAuthContext();

  const [login, {data, error}] = useLogin();

  const onSubmit = async (values: IValues) => {
    const user = {username: values.username, password: values.password, rememberMe: values.rememberMe};

    const res = await login({variables: user});

    if (res) {
      const {access_token: token, user} = res.data.login;
      setCredentials(token, user);
      replace("/");
    }
  };

  const {values, errors, handleChange, handleBlur, handleSubmit, isSubmitting, touched} = useFormik({
    initialValues: {
      username: "",
      password: "",
      rememberMe: true,
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Box textAlign="center" mb={4}>
        <FormTitle variant="h1">Welcome Back</FormTitle>
        <FormSubtitle sx={{mt: "4px !important"}}>Sign in to continue with JusTalk.</FormSubtitle>
      </Box>
      {error && <DangerAlert>{error.message}</DangerAlert>}
      {data && <SuccessAlert>Login User Successfully!</SuccessAlert>}
      <Box sx={{mt: "4px"}}>
        <FormControl sx={{width: "100%", mt: 2}}>
          <Label>Username</Label>
          <Input
            type="text"
            placeholder="Enter Username"
            id="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors?.username && touched?.username ? "error" : ""}
          />
          {errors?.username && touched?.username && <ErrorLabel>{errors?.username}</ErrorLabel>}
        </FormControl>
        <FormControl sx={{width: "100%", mt: 2, a: {fontSize: ".8rem", color: "common.grey200", fontWeight: 500}}}>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Label>Password</Label>
            <Link href="#">Forget password?</Link>
          </Box>
          <Box sx={{position: "relative", display: "flex", alignItems: "center"}}>
            <Input
              sx={{width: "100%", paddingRight: "30px"}}
              type={showPassword ? "text" : "Password"}
              placeholder="Enter Password"
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors?.password && touched?.password ? "error" : ""}
            />
            <IconButton sx={visibleIconStyles} onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Box>
          {errors?.password && touched?.password && <ErrorLabel>{errors?.password}</ErrorLabel>}
        </FormControl>
      </Box>
      <Box>
        <FormControlLabel
          control={<BpCheckBox onChange={handleChange} value={values.rememberMe} id="rememberMe" defaultChecked />}
          label="Remember me "
          sx={{
            mb: 2,
            mt: 1,
            "& .MuiTypography-root": {color: "common.black", fontSize: ".8rem", fontWeight: 500},
          }}
        />
      </Box>
      <Box>
        <FormButton type="submit">
          {isSubmitting ? <CircularProgress sx={{color: "#fff"}} size={30} /> : "Login"}
        </FormButton>
      </Box>
      <Box>
        <FormSubtitle>
          Don&apos;t have an account?<Link href="/sign-up"> Register</Link>
        </FormSubtitle>
      </Box>
    </form>
  );
}
