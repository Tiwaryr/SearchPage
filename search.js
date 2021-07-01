import './App.css';
import axios from 'axios';
import React from 'react';


class Search {

	constructor( props ) {
        super( props );
    
        this.state = {
            query: '',
            loading: false,
            message: '',
        };
        this.cancel = '';
    }
    
    
      @param {int} updatedPageNo 
      @param {String} query 
     
     
    fetchSearchResults = (updatedPageNo = '', query ) => {
    
        const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : '';
    
        // By default the limit of results is 20
        const searchUrl = `https://api.github.com/search/repositories?q={query}{&page,per_page,sort,order}`;
    
        if (this.cancel) {
            // Cancel the previous request before making a new request
            this.cancel.cancel();
        }
        // Create a new CancelToken
        this.cancel = axios.CancelToken.source();
    
        axios
            .get(searchUrl, {
                cancelToken: this.cancel.token,
            })
            .then((res) => {
                const resultNotFoundMsg = !res.data.hits.length
                    ? 'There are no more search results. Please try a new search.'
                    : '';
    
                this.setState({
                    results: res.data.hits,
                    message: resultNotFoundMsg,
                    loading: false,
                });
            })
            .catch((error) => {
                if (axios.isCancel(error) || error) {
                    this.setState({
                        loading: false,
                        message: 'Failed to fetch results.Please check network',
                    });
                }
            });
    };
    handleOnInputChange = (event) => {
        const query = event.target.value;
                this.setState({ query, loading: true, message: ''  } );
    };
    

	render() {
		return (
			<div className="container">
				{/*Heading*/}
				<h2 className="heading">Live Search: React Application</h2>

				{/*Search Input*/}
				<label className="search-label" htmlFor="search-input">
					<input
						type="text"
						value=""
						id="search-input"
						placeholder="Search..."
                        onChange={this.handleOnInputChange}
					/>
					<i className="fa fa-search search-icon"/>
				</label>
				
			</div>
			)
	}
}

export default Search;