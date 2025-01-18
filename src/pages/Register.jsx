import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Alert, InputAdornment } from '@mui/material';
import { User, Mail, Lock, Phone } from 'lucide-react';

function Register() {
  const [formData, setFormData] = useState({ email: '', password: '', username: '', phone: '' });
  const [confirmPassword, setConfirmPassword] = useState(''); // Confirm Password state
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({ email: '', password: '', username: '', phone: '', confirmPassword: '' });
  const navigate = useNavigate();

  const validate = () => {
    let isValid = true;
    const errors = { email: '', password: '', username: '', phone: '', confirmPassword: '' };

    if (!formData.username) {
      errors.username = 'Username is required';
      isValid = false;
    }

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

    if (!formData.phone) {
      errors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      errors.phone = 'Phone number must be exactly 10 digits';
      isValid = false;
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
      isValid = false;
    } else if (confirmPassword !== formData.password) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
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
          <Typography component="h1" variant="h5" gutterBottom>
            Register
          </Typography>
          {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={onChange}
              error={!!formErrors.username}
              helperText={formErrors.username}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <User />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={onConfirmPasswordChange}
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone Number"
              id="phone"
              value={formData.phone}
              onChange={onChange}
              error={!!formErrors.phone}
              helperText={formErrors.phone}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Phone />
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
              Register
            </Button>
          </Box>
          <Typography variant="body2" color="textSecondary" align="center">
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#1976d2' }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Container>
    </div>
  );
}

export default Register;
