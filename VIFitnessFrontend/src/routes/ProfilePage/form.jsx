import React from "react";
import { useForm } from "react-hook-form";
import { Box, Typography, Divider, TextField, Button} from "@mui/material";
import GoogleButton from "../../components/socialsButton/GoogleButton";
import StravaButton from "../../components/socialsButton/StravaButton";


export default function ProfileSettings() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };


  return (
    <Box 
      sx={{ 
        maxWidth: 1200,
        width: '100%', 
        p: 3, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-start' 
      }}
    >

      {/* Profile Setting Section */}
      <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'left', fontSize: '2.2rem' }}>
        Profile Setting
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'left', fontSize: '1.25rem' }}>
        Edit your setting here
      </Typography>
      <Divider sx={{ my: 2, width: '100%' }} />

      {/* Form for Profile Settings */}
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>

      {/* Username Field */}
      <Typography variant="subtitle1" sx={{ fontSize: '1.1rem' }}>Username</Typography>
      <TextField
        size="small"
        fullWidth
        variant="outlined"
        margin="normal"
        {...register("username")}
        error={!!errors.username}
        helperText={errors.username?.message}
        sx={{ width: '200%', marginTop: 1, marginBottom: 2}} 
      />

      {/* Age Field */}
      <Typography variant="subtitle1" sx={{ fontSize: '1.1rem' }}>Age</Typography>
      <TextField
        size="small" 
        fullWidth
        variant="outlined"
        margin="normal"
        type="number"
        {...register("age")}
        error={!!errors.age}
        helperText={errors.age?.message}
        sx={{ width: '200%', marginTop: 1, marginBottom: 2}} 
      />

        {/* Weight Field */}
        <Typography variant="subtitle1" sx={{ fontSize: '1.1rem' }}>Weight (kg)</Typography>
        <TextField
          size="small"
          fullWidth
          variant="outlined"
          margin="normal"
          type="number"
          {...register("weight")}
          error={!!errors.weight}
          helperText={errors.weight?.message}
          sx={{ width: '200%', marginTop: 1, marginBottom: 2}} 
        />

        {/* Height Field */}
        <Typography variant="subtitle1" sx={{ fontSize: '1.1rem' }}>Height (cm)</Typography>
        <TextField
          size="small"
          fullWidth
          variant="outlined"
          margin="normal"
          type="number"
          {...register("height")}
          error={!!errors.height}
          helperText={errors.height?.message}
          sx={{ width: '200%', marginTop: 1 }} 
        />

        {/* Update Profile Button */}
        <Button
          type="submit"
          variant="contained"
          sx={{ 
            mt: 1, 
            mb: 1, 
            width: '202px',
            backgroundColor: 'rgb(205, 213, 224)',
            color: 'rgb(32, 41, 58)',
          }}
        >
          Update Profile
        </Button>
      </Box>


      <Divider sx={{ my: 2, width: '100%' }} />


      {/* Change Password Section */}
      <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'left', fontSize: '2.0rem' }}>
        Change Password
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ width: '100%' }}>

        {/* Current Password Field */}
        <Typography variant="subtitle1" sx={{ fontSize: '1.1rem' }}>Current Password</Typography>
        <TextField
          size="small"
          fullWidth
          variant="outlined"
          margin="normal"
          {...register("currentPassword")}
          error={!!errors.currentPassword}
          helperText={errors.currentPassword?.message}
          sx={{ width: '62.5%', marginTop: 1, marginBottom: 2}}
        />

        {/* New Password Field */}
        <Typography variant="subtitle1" sx={{ fontSize: '1.1rem' }}>New Password</Typography>
        <TextField
          size="small"
          fullWidth
          variant="outlined"
          margin="normal"
          {...register("newPassword")}
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
          sx={{ width: '62.5%', marginTop: 1, marginBottom: 2}}
        />

        {/* Confirm New Password Field */}
        <Typography variant="subtitle1" sx={{ fontSize: '1.1rem' }}>Confirm New Password</Typography>
        <TextField
          size="small"
          fullWidth
          variant="outlined"
          margin="normal"
          {...register("confirmNewPassword")}
          error={!!errors.confirmNewPassword}
          helperText={errors.confirmNewPassword?.message}
          sx={{ width: '62.5%', marginTop: 1, marginBottom: 2}}
        />

        {/* Update Password Button */}
        <Box sx={{ display: 'block', width: '100%', marginTop: 1 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ 
              width: '202px', 
              backgroundColor: 'rgb(205, 213, 224)',
              color: 'rgb(32, 41, 58)', 
            }}
          >
            Update Password
          </Button>
        </Box>
      </Box>


      <Divider sx={{ my: 2, width: '100%' }} />


      {/* Connect Section */}
      <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'left', fontSize: '2.0rem' }}>
        Connect
      </Typography>
      <GoogleButton>
        Connect with Google
      </GoogleButton>
      <StravaButton >
        Connect with Strava
      </StravaButton>
    </Box>
  );
}