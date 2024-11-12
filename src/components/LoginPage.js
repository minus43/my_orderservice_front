import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  Grid,
  TextField,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/UserContext';
import { jwtDecode } from 'jwt-decode';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { onLogin } = useContext(AuthContext);

  const doLogin = async () => {
    const loginData = {
      email,
      password,
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/user/doLogin`,
        loginData,
      );
      const token = res.data.result.token;
      const id = res.data.result.id;
      const role = jwtDecode(token).role;
      onLogin(token, id, role);
      navigate('/');
    } catch (e) {
      console.log(e);
      const errorMessage = e.response?.data?.statusMessage || '로그인 실패';
      alert(errorMessage);
    }
  };

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardHeader title='로그인' style={{ textAlign: 'center' }} />
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                doLogin();
              }}
            >
              <TextField
                label='Email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin='normal'
                required
              />
              <TextField
                label='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin='normal'
                required
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button color='secondary' fullWidth>
                    비밀번호 변경
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type='submit'
                    color='primary'
                    variant='contained'
                    fullWidth
                  >
                    로그인
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>

      {/* 비밀번호 변경 모달 */}
      {/* <Dialog open={resetPassword} onClose={() => setResetPassword(false)}>
        <ResetPasswordModal handleClose={() => setResetPassword(false)} />
      </Dialog> */}
    </Grid>
  );
};

export default LoginPage;
