import axios from 'axios';
import React from 'react';
import './App.css';
import Card from './components/card.component';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      link: "https://pokeapi.co/api/v2/pokemon/",
      obj: {},
      page: 0,
      searchField: "",
    }
  }
  async work(link) {
    const getDetails = async (name) => {
      try {
        const details = await (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)).data
        return details;
      } catch (e) {
        console.log('some err1')
      }
    }
    const getAll = async (link) => {
      try {
        const res = await axios.get(link)
        const allPoks = res.data.results;
        this.setState({ obj: res.data })
        const finalDetails = await allPoks.map(pk => {
          const some = getDetails(pk.name)
          return some;
        })
        const anotherShit = Promise.all(finalDetails)
        anotherShit.then(res => {
          this.setState({ data: res })
        })
      } catch (e) {
        console.log("some err", e)
      }
    }
    getAll(link);
  }
  componentDidMount() {
    this.work(this.state.link)
  }
  prev = () => {
    let { page } = this.state;
    let prev = this.state.obj.previous;
    if (page >= 1 && page <= 56) {
      this.setState({ page: page - 1, link: prev }, () => {
        this.work(this.state.link)
      })
    }
  }
  next = () => {
    let { page } = this.state;
    let { next } = this.state.obj;
    if (page >= 0 && page < 54) {
      this.setState({ page: page + 1, link: next }, () => {
        this.work(this.state.link)
      })
    }
  }
  changeHandle = e =>{
    this.setState({ searchField: e.target.value })
  }
  render() {
    const { data, searchField } = this.state;
    const filterData = data.filter(each => (each.name.toLowerCase().includes(searchField.toLowerCase())))
    return (
      <div className="app">
        <div className="search-bar">
          <input onChange={this.changeHandle} className="search" type="text"/>
        </div>
        <div className='allCards'>
          {
            filterData.map(each => {
              return <Card key={each.id} res={each} />
            })
          }
        </div>
        <button onClick={this.prev}>Prev</button>
        <button onClick={this.next}>Next</button>
      </div>
    )
  }
}

export default App;
