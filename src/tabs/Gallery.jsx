import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    isLoading: false,
    isShowButton: false,
    photo: [],
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        const {
          photos,
          page: currentPage,
          per_page,
          total_results,
        } = await ImageService.getImages(query, page);

        this.setState(prevState => ({
          photo: [...prevState.photo, ...photos],
          isShowButton: currentPage < Math.ceil(total_results / per_page),
        }));
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmit = q => {
    this.setState({ query: q, photo: [], page: 1 });
  };

  render() {
    const { photo, isShowButton, isLoading } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        <Grid>
          {photo.length > 0 &&
            photo.map(({ id, avg_color, alt, src: { large } }) => (
              <GridItem key={id}>
                <CardItem color={avg_color}>
                  <img src={large} alt={alt} />
                </CardItem>
              </GridItem>
            ))}
        </Grid>
        {photo.length === 0 && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        {isShowButton && (
          <Button
            disabled={isLoading}
            onClick={() =>
              this.setState(prevState => ({ page: prevState.page + 1 }))
            }
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </Button>
        )}
      </>
    );
  }
}
