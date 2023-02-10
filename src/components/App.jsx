import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { getApiImages } from '../services/services';
import ImageGallery from './ImageGallery/ImageGallery';
import { Dna } from 'react-loader-spinner';
import Button from './Button/Button';

class App extends Component {
  state = {
    searchQuery: '',
    items: [],
    page: 1,
    loadMore: false,
    loading: false,
    error: '',
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page, loadMore } = this.state;

    if (loadMore || searchQuery !== prevState.searchQuery) {
      try {
        this.setState({ loading: true, loadMore: false });

        const { data } = await getApiImages(searchQuery, page);

        this.setState(prevState => ({
          items: [...prevState.items, ...data.hits],
        }));
      } catch ({ message }) {
        this.setState({ error: message });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  getValue = searchQuery => {
    this.setState({
      items: [],
      page: 1,
      searchQuery,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: (prevState.page += 1),
      loadMore: !prevState.loadMore,
    }));
  };

  render() {
    const { items, loading, error } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.getValue} />
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

        {Boolean(items.length) && <Button loadMore={this.loadMore} />}
      </>
    );
  }
}

export default App;
