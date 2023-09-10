import { useEffect, useState } from 'react';
import './App.css';
import { CircularProgress, Typography } from '@mui/material';
import useFetch from './hooks/useFetch';
import { compareCards } from './helpers/compareCards';
import Navbar from './components/NavBar';

const AppContainer = () => {
  const [cards, setCards] = useState([]);
  const [showCards, setShowCards] = useState([]);
  const [queensCards, setQueensCards] = useState([]);
  const [sortCards, setSortCards] = useState(null);
  const [message, setMessage] = useState('');
  const [clickEnabled, setClickEnabled] = useState(true);

  const apiUrl = 'https://deckofcardsapi.com/api/deck/new/draw/?count=52';
  const { data, error, loading, fetchData } = useFetch();

  useEffect(() => {
    fetchData(apiUrl);
  }, []);

  useEffect(() => {
    if (data && data.cards) {
      setCards(data.cards);
    } else if (error) {
      setMessage('Error');
    }
  }, [data, error]);

  useEffect(() => {
    if (queensCards.length === 4) {
      setSortCards(showCards.sort(compareCards));
    }
  }, [queensCards]);

  if (loading)
    return (
      <CircularProgress
        color='inherit'
        size={'10rem'}
        sx={{ display: 'flex', margin: '0 auto', marginTop: '10rem' }}
      />
    );

  const handleShowCard = (card) => {
    if (queensCards.length === 4) return;
    if (card.code.charAt(0) === 'Q') {
      setQueensCards([...queensCards, card]);
    }

    setShowCards([...showCards, card]);
  };

  const handleNewGame = () => {
    setQueensCards([]);
    setShowCards([]);
    setMessage('');
    setSortCards(null);
    fetchData(apiUrl);
  };

  const handleClick = (card) => {
    if (clickEnabled) {
      handleShowCard(card);
      setClickEnabled(false);

      setTimeout(() => {
        setClickEnabled(true);
      }, 1000);
    }
  };

  return (
    <>
      <Navbar
        handleOnClick={() => handleNewGame()}
        queens={queensCards.length}
      />
      {message && (
        <Typography
          variant='h4'
          color='white'
          align='center'
          sx={{ marginTop: '2rem' }}
        >
          You found the queens in {sortCards.length} moves
        </Typography>
      )}

      {sortCards ? (
        <div className='container'>
          {sortCards.map((card, index) => (
            <div key={card.code}>
              <img
                src={card.image}
                alt={`Card ${index}`}
                style={{
                  marginTop: card.code.charAt(0) === 'Q' && '1rem',
                  marginLeft: index === 0 && '0rem',
                }}
                className='sort'
              />
            </div>
          ))}
        </div>
      ) : (
        <div className='container'>
          {cards.map((card, index) => (
            <div
              key={card.code}
              onClick={
                showCards.includes(card) || !clickEnabled
                  ? null
                  : () => handleClick(card)
              }
            >
              {
                <img
                  className={showCards.includes(card) ? 'face-up' : 'reverse'}
                  style={{ width: '14rem', marginLeft: index === 0 && '0rem' }}
                  src={
                    showCards.includes(card) ? card.images.png : '/reverso.jpg'
                  }
                  alt={`Card ${index}`}
                />
              }
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AppContainer;
