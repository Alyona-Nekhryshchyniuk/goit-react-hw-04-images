import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import { getApiImages } from '../services/services';
import ImageGallery from './ImageGallery/ImageGallery';
import { Dna } from 'react-loader-spinner';
import Button from './Button/Button';
import { useState, useEffect } from 'react';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!searchQuery) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await getApiImages(searchQuery, page);
        setItems(prevItems => [...prevItems, ...data.hits]);
      } catch ({ message }) {
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, searchQuery]);

  const getValue = searchQuery => {
    setItems([]);
    setPage(1);
    setSearchQuery(searchQuery);
  };

  const loadMoreFn = () => {
    setPage(prevPage => (prevPage += 1));
  };

  return (
    <>
      <Searchbar onSubmit={getValue} />
      {error && <p className="error">{error}</p>}
      {loading ? (
        <Dna
          visible={true}
          height="180"
          width="180"
          ariaLabel="dna-loading"
          wrapperStyle={{
            marginLeft: '50%',
            transform: 'translate(-50%)',
            marginTop: 150,
          }}
        />
      ) : (
        <ImageGallery items={items} />
      )}

      {Boolean(items.length) && <Button loadMoreFn={loadMoreFn} />}
    </>
  );
};

export default App;
