import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      repolist: [],
      input: '',
      loading: false
    }
  }

  handleInput = e => {
    this.setState({
      input: e.target.value
    })
  }

  searchRepo = (e) => {
    e.preventDefault();
    const self = this
    const searchInput = this.state.input
    const searchApi = 'https://api.github.com/search/repositories?q=' + searchInput

    this.setState({
      loading: true
    })

    fetch(searchApi)
      .then(res => {
        res.json()
          .then(function (data) {
            self.setState({
              repolist: data.items,
              loading: false
            })
          });
      })
      .catch(function (err) {
        throw (err)
      });
  }



  render() {
    const { repolist, loading, input } = this.state

    const btnDis = !input ?
      <button type="submit" className="btn btn-sm btn-primary mb-2" disabled>search</button>
      : <button type="submit" className="btn btn-sm btn-primary mb-2">search</button>

    return (
      <div className="App" >
        <div className="container">
          {/* input card */}
          <div className="card">
            <div className="card-header text-white bg-primary">
              Git Repo search Filter
            </div>
            <div className="card-body">
              <form className="form-inline" onSubmit={this.searchRepo}>
                <div className="form-group mx-sm-3 mb-2">
                  <input type="text" className="form-control" id="input" placeholder="search repo..." onChange={this.handleInput} />
                </div>
                {btnDis}
              </form>
            </div>
          </div>
          {/* repo card */}
          <div className="card repo-card">
            <div className="card-header text-white bg-primary">
              Git Repo search Filter
            </div>
            <div className="card-body">
              <div className="row">
                {
                  repolist.length > 0 &&
                  repolist.map(repo => {
                    return (
                      <div className="col-sm-4" key={repo.id}>
                        <div className="card user-card">
                          <div className="card-body">
                            <img className="avatar" src={repo.owner.avatar_url} alt="user" />
                            <div className="user-name">{repo.name}</div>
                            <div className="repo-deatils">
                              <a href="true" className="badge badge-light m-2">{repo.stargazers_count}</a>
                              <a href="true" className="badge badge-light">{repo.forks}</a>
                              <a href="true" className="badge badge-light m-2">{repo.open_issues}</a>
                            </div>
                            <div className="repo-desc">
                              {repo.description}
                            </div>
                          </div>
                          <div className="card-footer">
                            VIEW PROFILE
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
                {
                  repolist.length === 0 && loading === true ?
                    <h6>loading...</h6> : ''
                }
                {
                  repolist.length === 0 && loading === false ?
                    <h6>There is no repos. Please Search Repositories...</h6>
                    : ''
                }
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default App;
