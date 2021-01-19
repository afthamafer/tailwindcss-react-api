import React from 'react';
import firebase from '../firebase';

class TodoList extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            items: []
        };

    }

    componentDidMount() {
        // uitvoeren nadat component gemount is  
        this.refreshList()
    }

    // functie die data uit database haalt
    async refreshList() {
        const db = firebase.firestore();

        // items ophalen
        const data = await db.collection('spells').get().then((data) => {
            // dit uitvoeren wanneer het resultaat binnenkomt:

            // 1. lege array aanmaken
            var dbItems = [];

            // 2. documenten uit firestore loopen
            data.forEach(doc => {
                // 3. elk resultaat toevoegen aan array
                dbItems.push(doc.data().name)
            })

            // 4. state updaten (this.state.items updaten naar nieuwe lijst => react update vervolgens de weergave)
            this.setState({ items: dbItems })
        })
    }


    render() {
        return <div>
            <h2 className="text-3xl font-semibold leading-6 text-center">Takenlijst</h2>
            <br></br><br></br>
            <ul>
                {this.state.items.map((item) => <li key={item.toString()}>{item}</li>)}
            </ul>
            <br></br><br></br>
        </div>;
    }
}

export default TodoList