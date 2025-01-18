import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { 
  LayoutDashboard, 
  Home, 
  UserCircle, 
  LogOut, 
  Menu,
  X
} from 'lucide-react';
import { AuthContext } from '../auth/authProvider';
import { Dialog ,DialogTitle,DialogContent,Box,DialogActions,Button,} from '@mui/material';

const Layout=()=> {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const handleLogoutClick = () => {
    setOpenLogoutModal(true);
  };

  const handleModalClose = () => {
    setOpenLogoutModal(false);
  };

  const handleConfirmLogout = () => {
    setOpenLogoutModal(false);
    handleLogout();
  };


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-200 ease-in-out`}>
        <div className="h-full flex flex-col">
          {/* Profile Section */}
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              {/* Check if user has avatar, otherwise show the UserCircle icon */}
              {user?.avatar ? (
                <img src={user.avatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
              ) : (
                <UserCircle className="w-10 h-10" />
              )}
              <div>
                <h3 className="font-semibold">{user?.username || 'User'}</h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4">
            <Link to="/" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link to="/properties" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
              <Home className="w-5 h-5" />
              <span>Properties</span>
            </Link>
            <Link to="/profile" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
              <UserCircle className="w-5 h-5" />
              <span>Profile</span>
            </Link>
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogoutClick}
            className="p-4 flex items-center space-x-2 hover:bg-red-600  mt-4 transition-all hover:text-white"
          >
            <LogOut className="w-6 h-6" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`lg:ml-64 min-h-screen transition-all duration-200 ${
        isSidebarOpen ? 'ml-64' : 'ml-0'
      }`}>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
      <Dialog
        open={openLogoutModal}
        onClose={handleModalClose}
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '12px',
            boxShadow: 24,
          },
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', color: '#3f51b5' }}>
          Confirm Logout
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center' }}>
            <p className="text-lg text-gray-700">
              Are you sure you want to log out? You’ll be redirected to the login page.
            </p>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            onClick={handleModalClose}
            color="primary"
            sx={{
              fontWeight: 'bold',
              color: '#1976d2',
              '&:hover': { backgroundColor: '#e3f2fd' },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmLogout}
            color="secondary"
            sx={{
              fontWeight: 'bold',
              color: '#d32f2f',
              '&:hover': { backgroundColor: '#f8d7da' },
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Layout;