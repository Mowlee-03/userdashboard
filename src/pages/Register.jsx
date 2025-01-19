import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Snackbar, InputAdornment, Tooltip, Alert } from '@mui/material';
import { User, Mail, Lock, Phone, Info, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { SIGNUP_USER } from '../auth/api';

function Register() {
  const [formData, setFormData] = useState({ email: '', password: '', username: '', phone: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({ email: '', password: '', username: '', phone: '', confirmPassword: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const passwordRequirements = {
    minLength: 6,
    hasNumber: /\d/.test(formData.password),
    hasLowerCase: /[a-z]/.test(formData.password),
    hasUpperCase: /[A-Z]/.test(formData.password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
  };

  const getPasswordStrength = () => {
    const metRequirements = Object.values(passwordRequirements).filter(Boolean).length;
    if (metRequirements <= 1) return 'Very Weak';
    if (metRequirements === 2) return 'Weak';
    if (metRequirements === 3) return 'Medium';
    if (metRequirements === 4) return 'Strong';
    return 'Very Strong';
  };

  const passwordTooltip = (
    <div className="space-y-1 p-2">
      <p className="font-semibold">Password must contain:</p>
      <ul className="list-disc pl-4 space-y-1">
        <li className={formData.password.length >= 6 ? 'text-green-500' : 'text-red-500'}>
          At least 6 characters
        </li>
        <li className={/\d/.test(formData.password) ? 'text-green-500' : 'text-red-500'}>
          At least one number
        </li>
        <li className={/[a-z]/.test(formData.password) ? 'text-green-500' : 'text-red-500'}>
          At least one lowercase letter
        </li>
        <li className={/[A-Z]/.test(formData.password) ? 'text-green-500' : 'text-red-500'}>
          At least one uppercase letter
        </li>
        <li className={/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-green-500' : 'text-red-500'}>
          At least one special character
        </li>
      </ul>
      <p className="mt-2">
        Strength: <span className="font-semibold">{getPasswordStrength()}</span>
      </p>
    </div>
  );

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
    } else {
      if (formData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
        isValid = false;
      }
      if (!/\d/.test(formData.password)) {
        errors.password = 'Password must contain at least one number';
        isValid = false;
      }
      if (!/[a-z]/.test(formData.password)) {
        errors.password = 'Password must contain at least one lowercase letter';
        isValid = false;
      }
      if (!/[A-Z]/.test(formData.password)) {
        errors.password = 'Password must contain at least one uppercase letter';
        isValid = false;
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
        errors.password = 'Password must contain at least one special character';
        isValid = false;
      }
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
      const response = await axios.post(SIGNUP_USER, formData);
      setSnackbar({ open: true, message: 'Registered successfully!', severity: 'success' });
      setTimeout(()=>{
        navigate('/login');  
      },1000)
      
    } catch (error) {
      setSnackbar({ open: true, message: error.response.data.message, severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={onChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" className="space-x-1">
                    <Tooltip title={passwordTooltip} arrow placement="bottom">
                      <div className="cursor-help">
                        <Info className="text-gray-500" />
                      </div>
                    </Tooltip>
                    <div 
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff className="text-gray-500" />
                      ) : (
                        <Eye className="text-gray-500" />
                      )}
                    </div>
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
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={onConfirmPasswordChange}
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <div 
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="text-gray-500" />
                      ) : (
                        <Eye className="text-gray-500" />
                      )}
                    </div>
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
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 10); 
                setFormData({ ...formData, phone: value });
              }} 
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
              inputProps={{
                inputMode: "numeric",
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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        message={snackbar.message}
        severity={snackbar.severity}
        sx={{ top: 0 }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Register;