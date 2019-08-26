import React, { Component, useState, useEffect } from 'react';

const App = () => {
  //state
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("react");
  const [url, setUrl] = useState("http://hn.algolia.com/api/v1/search?query=react");
  const [loading, setLoading] = useState(false);
  
  //fetch news
  const fetchNews = () => {
    //set loading true
    setLoading(true);
    fetch(url)
    .then(result => result.json())
    .then(data => (setNews(data.hits), setLoading(false)))
    .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchNews();
  }, [url]);

  const handleChange = e => {
    setSearchQuery(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`);
  }

  const showLoading = () => (
      loading ? <h3>Loading... </h3> : ""
    )

  const searchForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="text" value={searchQuery} onChange={handleChange}/>
      <button>Search</button>
    </form>
  )

  const showNews = () => news.map((n,i) => <p key={i}> {n.title} </p>)

  return(
    <div>
      <h2>FistBump News Dashboard</h2>
      <p>All the latest technology news at your finger tips.</p>
      {showLoading()}
      {searchForm()}
      {showNews()}
    </div> 
    );
};




// const App = () => {
//   const [count,setCount] = useState(0);

//   const increment = () => {
//     setCount(count + 1);
//   };

//   useEffect(() => {
//     document.title = `Clicked ${count} times.`
//   })

//   return(
//       <div>
//         <h2>Counter App</h2>
//         <br/>
//         <button onClick={increment}>Clicked {count} times.</button>
//       </div>

//     )
// }

// class App extends Component {
//     state={
//       count:0
//     }

//     increment = () => {
//       this.setState({
//         count : this.state.count + 1
//       })
//     }

//     componentDidMount(){
//       document.title = `Clicked ${this.state.count} times.`
//     }

//     componentDidUpdate(){
//       document.title = `Clicked ${this.state.count} times.`
//     }

//     render(){
//       return(
//         <div>
//         <h2>Counter App. </h2>
//         <br/>
//         <button onClick={this.increment}>
//           Clicked {this.state.count} times.
//         </button>
//         </div>
//       );
//     }
// }

export default App;
