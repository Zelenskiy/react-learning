import { Component } from 'react';

interface SearchButtonProps {
  onClick: () => void;
}

class SearchButton extends Component<SearchButtonProps> {
  render() {
    return <button onClick={this.props.onClick}>Search</button>;
  }
}

export default SearchButton;
