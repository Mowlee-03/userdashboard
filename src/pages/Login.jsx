import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../auth/authProvider';
import { Container, Box, Typography, TextField, Button, Alert, InputAdornment } from '@mui/material';
import { Mail, Lock } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });
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

    try {
      // const token = {
      //   email: "mowlee@gmail.com",
      //   username: "mowleeshwaran",
      // };
      navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const accuracy=position.coords.accuracy
      console.log(accuracy);
      
        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
        if (accuracy > 50) {
          console.log('Location accuracy is not sufficient. Trying again...');
          // Optionally request the location again or alert the user
        }
      }, function(error) {
        console.error('Error getting location:', error.message);
      }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });

      // login(token);
      // navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };
  const apiKey = 'AIzaSyCJIxs65no49mgT-ghvWADzXNq5JZyd6qA';  // Replace with your API key

function getAddressFromCoordinates(latitude, longitude) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'OK') {
        const address = data.results[0].formatted_address;
        console.log('Address:', address);
      } else {
        console.log('Error fetching address:', data.status);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


  return (
    <div className='w-full bg-blue-800'>
      <Container component="main" maxWidth="sm" className=" min-h-screen flex items-center justify-center">
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
          {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
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
            >
              Login
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
    </div>
  );
}

export default Login;
