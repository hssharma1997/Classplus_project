import React from 'react';
import ModalImage from "react-modal-image";



class search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: [],
            searchtext: '',
        }
        this.handleChange = this.handleChange.bind(this)
    }

    
    componentDidMount() {
        fetch('https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=f0609f9cb2d27b920c345e3ac052518d&per_page=100&safe-search=1&format=json&nojsoncallback=?')
            .then(function (response) {

                return response.json();
            })
            .then(function (j) {
                
                let picArray = j.photos.photo.map((pic) => {
                    var srcpath = 'https://live.staticflickr.com/' + pic.server + '/' + pic.id + '_' + pic.secret ;
                   
                    return (
                        <ModalImage
                        small={srcpath +'.jpg'}
                        large={srcpath+'_b.jpg'}
                        alt="Recent_images"
                      />/*https://www.npmjs.com/package/react-modal-image*/
                      
                    )
                }

                )
                this.setState({
                    picture: picArray
                });
            }.bind(this))
    }




    handleChange(event) {
        this.setState({ searchtext: event.target.value }, () => {
            var tag = this.state.searchtext
          
            if (tag !== "") {
                fetch('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f0609f9cb2d27b920c345e3ac052518d&tags=' + tag + '&per_page=100&safe_search=1&format=json&nojsoncallback=1')
                    .then(function (response) {

                        return response.json();
                    })
                    .then(function (j) {

                        let picArray = j.photos.photo.map((pic) => {
                            var srcpath = 'https://live.staticflickr.com/' + pic.server + '/' + pic.id + '_' + pic.secret;

                            return (
                                <ModalImage 
                                small={srcpath +'.jpg'}
                                large={srcpath+'_b.jpg'}
                                alt={this.state.searchtext}
                              />
                            )
                        }

                        )
                       
                        this.setState({
                            picture: picArray
                        });
                    }.bind(this))
            }



        }
        )
    }






    render() {
        const mystyle={
            display:'grid',
            gridTemplateColumns:'1fr 1fr 1fr 1fr'
        }
        const st={
            backgroundColor:'grey',
            textAlign:'center',
            position:'fixed',
            top:0,
            display:'block',
            width:'100%',
            padding:5,
        }
        return (
            <div>
               
                <div style={st}>
                <h2>Search Photos</h2>
                    <div class="input-group">
                        <input type="search"  class="form-control rounded " placeholder="Search" aria-label="Search"
                            aria-describedby="search-addon" name="searchtext" value={this.state.searchtext} onChange={this.handleChange} />
                        
                    </div>
                    </div>
                <br/>
                <p style={mystyle}>{this.state.picture}</p>
            </div>
        )
    }
}

export default search
