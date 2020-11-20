import React, { Component } from 'react';
import Card from './CardUI';
import axios from 'axios';
//Card ın içindeki verileri axios  Get ile getirip doldurğum sayfa
class Cards extends Component {
    state = {
        list: []
    }
    componentDidMount() {
        axios.get('https://private-1be47-duguncomapis.apiary-mock.com/companies')
            .then((response) => {
                // handle success
                console.log(response);
                this.setState({
                    list: response.data
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }
    render() {
        return (
            <div className="container-fluid d-flex justify-content-center">
                <div className="row">
                    {this.state.list.map(item => {
                        return (
                            <div key={item.id} className="col-md-6">
                                <Card imgsrc={item.imageUrl} capasityCount={"Max. " + item.listingDataBrief[0].value} personCount={"Min. Yemekli " + item.listingDataBrief[1].value} place={item.district.name} hotelName={item.name} starCount={item.score} commentCount={item.commentCount} />
                            </div>)
                    })}
                </div>
            </div>
        );
    }
}
export default Cards;