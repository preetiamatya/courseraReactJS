import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


class DishDetail extends Component {
  constructor(props) {
    super(props);

  }
  renderDish(dish) {
    if(dish!= null) {
      return (
        <div className="col-12 col-md-5 m-1">
          <Card>
              <CardImg width="100%" src = {dish.image} alt={dish.name}/>
              <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
              </CardBody>
          </Card>
          </div>
      );

    }
    else {
      return(
        <div class="null"></div>
      );
    }
  }
  renderComments(dish){
    console.log("comments"+ dish);
  if(dish!= null) {
    return (
      <div>
        <h4>Comments</h4>
        {dish.comments.map(function(object, i){
               return (
                  <ul class="list-unstyled">
                   <li>{dish.comments[i].comment}</li>
                   <li> -- {dish.comments[i].author},&nbsp;
                   {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(dish.comments[i].date)))}
                   </li>
                 </ul>
               );
        })}
      </div>
    );

  }
  else {
    return(
      <div></div>
    );
  }
  }

  render() {
    const dish = this.props.dish;
    console.log(dish);
    if(dish!= null) {


      return (
        <div class="container">
          <div className="row">
            {this.renderDish(dish)}
            <div className="col-12 col-md-5 m-1">
              {this.renderComments(dish)}
            </div>
          </div>
        </div>
      );
    } else {
      return(
        <div></div>
      );
    }
  }

}
export default DishDetail;
