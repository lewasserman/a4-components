'use strict';

const e = React.createElement;

export default class BookForm extends React.Component {
    constructor(props) {
        super(props);
        // this.state = { liked: false };
    }

    submit = function( e ) {
        // prevent default form action from being carried out
        e.preventDefault()

        const ftitle = document.querySelector( '#ftitle' ),
                fauthor = document.querySelector( '#fauthor' ),
                fyear = document.querySelector( '#fyear' ),
                frating = document.querySelector( '#frating' ),
                json = { title: ftitle.value, author: fauthor.value, year: fyear.value, rating: frating.value },
                body = JSON.stringify( json )

        // console.log(`submit body: ${body}`);
        fetch( '/submit', {
            method:'POST',
            body 
        })
        .then( function( response ) {
            // do something with the reponse 
            // console.log( `submit response:` );
            // console.log(response);
            // return response;
            return response.json()
        })
        .then( function( json ) {
            console.log(json)

            // const element = document.createElement('tr')
            // element.innerHTML = `<td>${json[0].title}</td><td>${json[0].author}</td><td>${json[0].year}</td><td>${json[0].rating}</td><td>${json[0].rank}</td>`
            // // element.innerText = json.title
            // // document.body.appendChild(element)
            // document.querySelector('table').appendChild(element)

            var newTable = document.createElement('table')
            var tableText = '<table><tr><th>Title</th><th>Author</th><th>Release Year</th><th>Rating</th><th>Rank</th></tr>'
            var i = 0
            while (json[i]!=undefined) {
            tableText +='<tr><td>'
            tableText += json[i].title
            tableText += '</td><td>'
            tableText += json[i].author
            tableText += '</td><td>'
            tableText += json[i].year
            tableText += '</td><td>'
            tableText += json[i].rating
            tableText += '</td><td>'
            tableText += json[i].rank
            tableText += '</td></tr>'
            i++
            }
            tableText += '</table>'
            newTable.innerHTML = tableText
            document.querySelector('table').remove()
            document.body.appendChild(newTable)
        })

        return false
    }

    render() {
        // if (this.state.liked) {
        //     return 'You liked this.';
        // }

        // Display a "Like" <button>
        return (
            <div className="enterForm">
                <h2>Enter Your Book Below</h2>
                <form>
                    <label htmlFor="ftitle">Title:</label>
                    <input type='text' id='ftitle' />
                    <label htmlFor="fauthor">Author (First Last):</label>
                    <input type='text' id='fauthor' />
                    <label htmlFor="fyear">Release Year:</label>
                    <input type='text' id='fyear' />
                    <label htmlFor="frating">Rating (1-5):</label>
                    <input type='text' id='frating' />
                    <button id="submit" onClick={submit}>Submit</button>
                </form>
            </div>
        );
    }
}

const domContainer = document.querySelector('#body_container');
ReactDOM.render(<BookForm />, domContainer);

// export default BookForm;