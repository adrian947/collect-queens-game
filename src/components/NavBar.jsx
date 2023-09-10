import { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box, Modal } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Navbar = ({ handleOnClick, queens }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <AppBar position='static' sx={{ background: 'transparent' }}>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Collect the Queens
          </Typography>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Queens founds: {queens}
          </Typography>
          <Button color='inherit' onClick={handleOnClick}>
            New Game
          </Button>
          <Button color='inherit' onClick={handleOpen}>
            Rules
          </Button>
        </Toolbar>
      </AppBar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            sx={{ textAlign: 'center' }}
          >
            Collect the Queens
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            The objective of the game is to collect all the QUEEN cards from
            each of the four suits (Hearts, Diamonds, Clubs, and Spades) of a
            deck of cards. To do this, you must use the provided deck of cards.
            At the end, the sorted deck and the achieved result will be
            displayed.
            <Typography color='error'>
              You must not draw more than 1 card per second.
            </Typography>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

Navbar.propTypes = {
  handleOnClick: PropTypes.func,
  queens: PropTypes.number,
};

export default Navbar;
