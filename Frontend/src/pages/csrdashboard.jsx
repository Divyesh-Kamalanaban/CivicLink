import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Avatar,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  CurrencyRupee as CurrencyRupeeIcon,
  LocationOn as LocationIcon,
  Category as CategoryIcon,
  Work as WorkIcon
} from '@mui/icons-material';
import { useCSRContext } from '../context/csrContext';

const CSRDashboard = () => {
  const { csrIssues, loading, error, createCSRIssue, fetchCSRIssues } = useCSRContext();
  const [newIssue, setNewIssue] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    priority: 'Medium',
    budget: '',
    estimatedCompletionDate: ''
  });
  const [activeTab, setActiveTab] = useState('issues');

  const categories = [
    "Education",
    "Healthcare",
    "Environment",
    "Infrastructure",
    "Social Welfare",
    "Public Safety",
    "Cultural Heritage",
    "Economic Development"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCSRIssue(newIssue);
      setNewIssue({
        title: '',
        description: '',
        category: '',
        location: '',
        priority: 'Medium',
        budget: '',
        estimatedCompletionDate: ''
      });
      setActiveTab('issues');
    } catch (err) {
      console.error('Error creating issue:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIssue(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    fetchCSRIssues();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        CSR Management Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Left Column - Issue Creation Form */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Button 
                  variant={activeTab === 'create' ? 'contained' : 'text'}
                  onClick={() => setActiveTab('create')}
                  sx={{ mr: 2 }}
                >
                  Create Issue
                </Button>
                <Button 
                  variant={activeTab === 'issues' ? 'contained' : 'text'}
                  onClick={() => setActiveTab('issues')}
                >
                  View Issues
                </Button>
              </Box>

              {activeTab === 'create' ? (
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={newIssue.title}
                    onChange={handleInputChange}
                    required
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={newIssue.description}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
                    required
                    sx={{ mb: 2 }}
                  />

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={newIssue.category}
                      onChange={handleInputChange}
                      required
                    >
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={newIssue.location}
                    onChange={handleInputChange}
                    required
                    sx={{ mb: 2 }}
                  />

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Priority</InputLabel>
                    <Select
                      name="priority"
                      value={newIssue.priority}
                      onChange={handleInputChange}
                      required
                    >
                      <MenuItem value="Low">Low</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="High">High</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    label="Budget"
                    name="budget"
                    value={newIssue.budget}
                    onChange={handleInputChange}
                    type="number"
                    required
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CurrencyRupeeIcon />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Estimated Completion Date"
                    name="estimatedCompletionDate"
                    value={newIssue.estimatedCompletionDate}
                    onChange={handleInputChange}
                    type="date"
                    required
                    sx={{ mb: 2 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ mt: 2 }}
                  >
                    Create Issue
                  </Button>
                </form>
              ) : (
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                    Active Issues
                  </Typography>
                  
                  <List sx={{ width: '100%' }}>
                    {csrIssues.filter(i => i.status === 'Pending' || i.status === 'In Progress').map((issue) => (
                      <Paper key={issue._id} elevation={2} sx={{ mb: 2 }}>
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                              <WorkIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={issue.title}
                            secondary={
                              <>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                  display="block"
                                  sx={{ mb: 1 }}
                                >
                                  {issue.description}
                                </Typography>
                                <Chip 
                                  icon={<CategoryIcon />} 
                                  label={issue.category} 
                                  size="small" 
                                  sx={{ mr: 1 }}
                                />
                                <Chip 
                                  icon={<LocationIcon />} 
                                  label={issue.location} 
                                  size="small" 
                                  sx={{ mr: 1 }}
                                />
                                <Chip 
                                  label={issue.priority} 
                                  size="small" 
                                  color={issue.priority === 'High' ? 'error' : issue.priority === 'Medium' ? 'warning' : 'success'}
                                  sx={{ mr: 1 }}
                                />
                                <Box sx={{ mt: 1 }}>
                                  <Typography variant="caption">
                                    Budget: ₹{issue.budget}
                                  </Typography>
                                  <Typography variant="caption" display="block">
                                    Estimated Completion: {new Date(issue.estimatedCompletionDate).toLocaleDateString()}
                                  </Typography>
                                </Box>
                              </>
                            }
                          />
                        </ListItem>
                      </Paper>
                    ))}
                  </List>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Completed Issues */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Completed Issues
              </Typography>
              <List sx={{ width: '100%' }}>
                {csrIssues.filter(i => i.status === 'Completed').map((issue) => (
                  <Paper key={issue._id} elevation={2} sx={{ mb: 2 }}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'success.main' }}>
                          <CheckCircleIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={issue.title}
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                              display="block"
                              sx={{ mb: 1 }}
                            >
                              {issue.description}
                            </Typography>
                            <Chip 
                              icon={<CategoryIcon />} 
                              label={issue.category} 
                              size="small" 
                              sx={{ mr: 1 }}
                            />
                            <Chip 
                              icon={<LocationIcon />} 
                              label={issue.location} 
                              size="small" 
                              sx={{ mr: 1 }}
                            />
                            <Box sx={{ mt: 1 }}>
                              <Typography variant="caption">
                                Completed on: {new Date(issue.actualCompletionDate).toLocaleDateString()}
                              </Typography>
                            </Box>
                          </>
                        }
                      />
                    </ListItem>
                  </Paper>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CSRDashboard;