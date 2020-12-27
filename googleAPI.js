var api = axios.create({
   baseURL: `https://www.googleapis.com/books/v1/volumes?q=network:keyes&key=AIzaSyAJCvXCsLnmb80kKlTytLBQehjHHZS-Okg`
})

var api2;

var updated = false;

class App extends React.Component {


    render() {
       return (
          <div id="body">
             <Header/>
             <Content/>
             <Footer/>
          </div>
       );
    }
 }

class Header extends React.Component {
    render() {
       return (
          <header>
             <div id="logo">
                  <h1>Google API</h1>
             </div>
             <input id="myInput" name="recherche"/>
             <button id="recherche">Recherche</button>
          </header>
       );
    }
}

 class Content extends React.Component {
   
    render() {
       return (
          <div id="middle">
               <div id="content">
                  <BookList/>
               </div>
          </div>

       );
    }
 }

 class Footer extends React.Component {
    render() {
       return (
          <footer id="footer">
             <h2>Content</h2>
             <p>The content text!!!</p>
          </footer>
       );
    }
 }

class BookList extends React.Component {
      state = {
         books: []
      }


      componentDidMount() { 
         setInterval(function(){
            console.log("ok");
            if (!updated){
               api.get('').then(res => {
                  console.log(res.data.items)
                  this.setState({books: res.data.items})
                  updated = true;
               })
            }
         }.bind(this), 1000);
      }


      render(){
         return (
            <div id="bookList">
               {this.state.books.slice(0,9).map(book => 
                  <div id="liste" key = {book.id}>
                     {!book.volumeInfo.imageLinks?<img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1344267978l/6431838.jpg"></img>
                     :<img src={book.volumeInfo.imageLinks.thumbnail}></img>}
                     <div class="info">
                        <h4 id="titre" key = {book.id}>{book.volumeInfo.title}</h4>
                        {!book.volumeInfo.description ? <p class="description"> Description non Disponible</p>
                        :<p class="description">{book.volumeInfo.description.slice(0,200)}...</p>}
                     </div>
                     
                  </div>
               )}


            </div>
         )
      }
 }

 ReactDOM.render(
    <App />,
    document.getElementById('root')
   );



function ok(){
   axios.get('https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyAJCvXCsLnmb80kKlTytLBQehjHHZS-Okg').then(res => {
     console.log(res.data.items[0].volumeInfo.imageLinks.thumbnail);
     console.log(res.data.items[0].volumeInfo.title);
   });
}

var buttonRecherche = document.getElementById("recherche");

buttonRecherche.addEventListener("click", recherche);


function recherche() {
   var inputValue = document.getElementById("myInput").value;
   api = axios.create({
      baseURL: `https://www.googleapis.com/books/v1/volumes?q=`+ inputValue+`:keyes&key=AIzaSyAJCvXCsLnmb80kKlTytLBQehjHHZS-Okg`
   })

   updated = false;

}


   