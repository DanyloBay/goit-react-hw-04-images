import { useState, useEffect } from 'react';

import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import fetchPhotos from 'components/API/Api';

import '../App.scss';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!searchQuery) {
        return;
      }
      try {
        setStatus('pending');
        const { totalHits, hits } = await fetchPhotos(searchQuery, page);
        setData(prevData => [...prevData, ...hits]);
        setShowBtn(page < Math.ceil(totalHits / 12));
        setStatus('resolved');
      } catch (error) {
        setError(error);
        setStatus('rejected');
        console.log(error.message);
      }
    };
    fetchData();
  }, [searchQuery, page]);

  const incrementPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSearchSubmit = query => {
    setSearchQuery(query);
    setPage(1);
    setData([]);
    setShowBtn(false);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearchSubmit} />
      <div className="container">
        <ImageGallery dataImages={data} />
        {showBtn && <Button onClick={incrementPage} />}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && (
          <div className="info">
            Перепрошуємо за не зручності, але за вашим запитом нічого не
            знайдено
          </div>
        )}
      </div>
    </>
  );
};
