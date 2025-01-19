import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../auth/authProvider';
import { Container, Box, Typography, TextField, Button, Alert, InputAdornment, Snackbar, CircularProgress } from '@mui/material';
import { Mail, Lock } from 'lucide-react';
import axios from 'axios';
import { LOGIN_USER } from '../auth/api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarSuccessOpen, setSnackbarSuccessOpen] = useState(false);
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
  const [snackbarErrorMessage, setSnackbarErrorMessage] = useState('');

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const validate = () => {
    let isValid = true;
    const errors = { email: '', password: '' };

    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email address';
      isValid = false;
    }

    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const getPosition = () =>
        new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            (error) => {
              reject(error);
            }
          );
        });

      const { latitude, longitude } = await getPosition();
      setLatitude(latitude);
      setLongitude(longitude);

      const response = await axios.post(LOGIN_USER, {
        ...formData,
        latitude,
        longitude,
      });

      login(response.data.authToken);
      setSnackbarSuccessOpen(true);
      
      setTimeout(()=>{
        navigate("/");
      },500)
    } catch (error) {
      if (error.response) {
        setSnackbarErrorMessage(error.response.data.message);
      } else {
        setSnackbarErrorMessage('Failed to get location or login');
      }
      setSnackbarErrorOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarSuccessClose = () => {
    setSnackbarSuccessOpen(false);
  };

  const handleSnackbarErrorClose = () => {
    setSnackbarErrorOpen(false);
  };

  return (
    <div className='w-full bg-blue-800'>
      <Container component="main" maxWidth="sm" className="min-h-screen flex items-center justify-center">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography textAlign={"center"} fontWeight={700} component="h1" variant="h5" gutterBottom>
            Welcome Back !! <br />Login To Continue
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={onChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Mail />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={onChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          </Box>
          <Typography variant="body2" color="textSecondary" align="center">
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#1976d2' }}>
              Register
            </Link>
          </Typography>
        </Box>
      </Container>
      <Snackbar
        open={snackbarSuccessOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarSuccessClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarSuccessClose} severity="success" sx={{ width: '100%' }}>
          Login successful
        </Alert>
      </Snackbar>
      <Snackbar
        open={snackbarErrorOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarErrorClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarErrorClose} severity="error" sx={{ width: '100%' }}>
          {snackbarErrorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
