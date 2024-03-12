import React from 'react';
import { Typography, Box, Grid, Container, Button } from '@mui/material';
import Image from 'next/image';
import thelogo from '../../Assets/finallogo.png';
import facebook from '../../Assets/facebook.png';
import google from '../../Assets/google.png';
import image from '../../Assets/insta.png';
import youtube from '../../Assets/youtube.png';
import twitter from '../../Assets/twitter.png';
import android from '../../Assets/android.png';
import apple from '../../Assets/apple.png';

function Footerlist() {
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: 'black', color: 'white', py: 4 }}>
      <Grid container justifyContent="space-between" alignItems="flex-start">
        <Grid item xs={12} md={4} display="flex" flexDirection="column" alignItems="center">
          <Box marginTop={{ xs: 2, md: 0 }}>
            <Image src={thelogo} alt="Logo" width={150} height={100} />
          </Box>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography variant="h6" fontWeight="700">Company</Typography>
          <Typography variant="body2"><a href="/help">Help</a></Typography>
          <Typography variant="body2"><a href="/contact">Contact us</a></Typography>
          <Typography variant="body2"><a href="/about">About us</a></Typography>
          <Typography variant="body2"><a href="/about">TheFreshEats</a></Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography variant="h6" fontWeight="700">Policies</Typography>
          <Typography variant="body2"><a href="/contact">FAQs</a></Typography>
          <Typography variant="body2"><a href="/about">Privacy Policies</a></Typography>
          <Typography variant="body2"><a href="/about">Terms and Conditions</a></Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography variant="h6" fontWeight="700">Follow us</Typography>
          <Box display="flex" flexDirection="row">
            <Image src={facebook} alt="Facebook Logo" width={40} height={40} style={{ marginRight: 2 }} />
            <Image src={google} alt="Google Logo" width={40} height={40} style={{ marginRight: 2 }} />
          </Box>
          <Box display="flex" flexDirection="row" marginTop={1}>
            <Image src={image} alt="Instagram Logo" width={40} height={40} style={{ marginRight: 2 }} />
            <Image src={youtube} alt="YouTube Logo" width={40} height={40} />
          </Box>
          <Box display="flex" flexDirection="row" marginTop={1}>
            <Image src={twitter} alt="Twitter Logo" width={40} height={40} />
          </Box>
        </Grid>
        <Grid item xs={12} md={2} display="flex" flexDirection="column" alignItems="center">
          <Button color="inherit" variant="outlined" sx={{ width: '100%', textTransform: 'none', marginTop: 2 }}>
            <Image src={android} alt="Android Logo" width={25} height={25} style={{ marginRight: 1 }} />
            Get the Android app
          </Button>
          <Button color="inherit" variant="outlined" sx={{ width: '100%', textTransform: 'none', marginTop: 2 }}>
            <Image src={apple} alt="Apple Logo" width={25} height={25} style={{ marginRight: 1 }} />
            Get the iOS app
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'center', fontSize: '14px' }}>
          Terms of use &nbsp; · &nbsp; Privacy Policy &nbsp; · &nbsp; Refund Policy &nbsp; · &nbsp; Free Trial Policy
        </Grid>
      </Grid>
    </Container>
  );
}

export default Footerlist;
