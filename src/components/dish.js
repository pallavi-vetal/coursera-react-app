import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class Dishdetail extends Component {

    constructor(props) {
        super(props);
    }

    renderDish(dish) {

        return(
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                </CardBody> 
            </Card> 
        );  
    };

    renderComments(dish) {

        const commentlist = dish.comments.map((comment) => {
            return (
                <div>
                    <br></br>
                    <li key={comment.id}>{comment.comment}</li>
                    <li key={comment.id}>-- {comment.author}, {comment.date}</li>
                </div>
            );
        });

        return (
            <div>
                <h4>Comments</h4>
                <ul className = "list-unstyled">
                    {commentlist}
                </ul>
            </div>
        );
    }

    render() {

        return (
            <div className = "row">
                <div className='col-12 col-md-5 m-1'>
                    {this.renderDish(this.props.dishdetail)}
                </div>
                <div className='col-12 col-md-5 m-1'>
                    {this.renderComments(this.props.dishdetail)}
                </div>
            </div>
        );
    }

}
 
export default Dishdetail;

