import React from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box,
  Tab,
  Tabs
} from '@mui/material';
import { 
  BarChart, 
  LineChart, 
  PieChart 
} from '@mui/x-charts';
import { Home, Building, TrendingUp, Users, Award, MapPin } from 'lucide-react';

function Dashboard() {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const propertyData = [
    { type: 'Residential', count: 150 },
    { type: 'Commercial', count: 75 },
    { type: 'Industrial', count: 45 },
    { type: 'Land', count: 30 },
  ];

  const monthlyData = [
    { month: 'Jan', sales: 120 },
    { month: 'Feb', sales: 140 },
    { month: 'Mar', sales: 180 },
    { month: 'Apr', sales: 160 },
    { month: 'May', sales: 200 },
    { month: 'Jun', sales: 220 },
  ];

  const blogPosts = [
    {
      title: "Record-Breaking Property Sales in 2024",
      date: "March 1, 2024",
      excerpt: "Our company achieved unprecedented success with $2B in sales..."
    },
    {
      title: "Award-Winning Customer Service",
      date: "February 15, 2024",
      excerpt: "Recognized as the top real estate agency for customer satisfaction..."
    }
  ];

  const achievements = [
    {
      title: "Best Real Estate Agency 2024",
      description: "Awarded by Real Estate Excellence Awards"
    },
    {
      title: "100,000+ Happy Customers",
      description: "Milestone achieved in February 2024"
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Overview" />
        <Tab label="Analytics" />
        <Tab label="Reports" />
      </Tabs>

      {tabValue === 0 && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography color="textSecondary" gutterBottom>
                      Total Properties
                    </Typography>
                    <Home />
                  </Box>
                  <Typography variant="h5">300</Typography>
                  <Typography variant="body2" color="textSecondary">
                    +20% from last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography color="textSecondary" gutterBottom>
                      Total Sales
                    </Typography>
                    <TrendingUp />
                  </Box>
                  <Typography variant="h5">$2.4M</Typography>
                  <Typography variant="body2" color="textSecondary">
                    +15% from last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography color="textSecondary" gutterBottom>
                      Active Listings
                    </Typography>
                    <Building />
                  </Box>
                  <Typography variant="h5">120</Typography>
                  <Typography variant="body2" color="textSecondary">
                    +5% from last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography color="textSecondary" gutterBottom>
                      Customer Satisfaction
                    </Typography>
                    <Users />
                  </Box>
                  <Typography variant="h5">98%</Typography>
                  <Typography variant="body2" color="textSecondary">
                    +2% from last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Monthly Sales
                  </Typography>
                  <LineChart
                    xAxis={[{ data: monthlyData.map(item => item.month), scaleType: 'band' }]}
                    series={[{ data: monthlyData.map(item => item.sales), area: true }]}
                    height={300}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Property Types
                  </Typography>
                  <PieChart
                    series={[
                      {
                        data: propertyData.map(item => ({ id: item.type, value: item.count, label: item.type })),
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30 },
                      },
                    ]}
                    height={300}
                    
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Latest Blog Posts
                  </Typography>
                  {blogPosts.map((post, index) => (
                    <Box key={index} sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                      <MapPin size={20} style={{ marginRight: '8px', marginTop: '4px' }} />
                      <Box>
                        <Typography variant="subtitle1">{post.title}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {post.date}
                        </Typography>
                        <Typography variant="body2">{post.excerpt}</Typography>
                      </Box>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Pride Moments
                  </Typography>
                  {achievements.map((achievement, index) => (
                    <Box key={index} sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                      <Award size={20} style={{ marginRight: '8px', marginTop: '4px' }} />
                      <Box>
                        <Typography variant="subtitle1">{achievement.title}</Typography>
                        <Typography variant="body2">{achievement.description}</Typography>
                      </Box>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Property Statistics
                  </Typography>
                  <BarChart
                    xAxis={[{ scaleType: 'band', data: propertyData.map(item => item.type) }]}
                    series={[{ data: propertyData.map(item => item.count) }]}
                    height={300}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}

      {tabValue === 1 && (
        <Typography variant="h6">Analytics Content (To be implemented)</Typography>
      )}

      {tabValue === 2 && (
        <Typography variant="h6">Reports Content (To be implemented)</Typography>
      )}
    </Box>
  );
}

export default Dashboard;

