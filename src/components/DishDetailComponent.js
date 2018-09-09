import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

  function RenderDish({dish}) {
    /*user defined compononent, dish in the form of props*/
    if(dish!= null) {
      return (
        <div className="col-12">
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
  function RenderComments({comments}){
  if(comments!= null) {
    return (
      <div>
        <h4>Comments</h4>
        {comments.map(function(object, i){
              return (
                 <ul class="list-unstyled">
                  <li>{comments[i].comment}</li>
                  <li> -- {comments[i].author},&nbsp;
                  {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments[i].date)))}
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

  const DishDetail = (props) =>  {
    const dish = props.dish;
    console.log(dish);
    if(dish!= null) {
      return (
        <div className="container">
        <div className="row">
            <Breadcrumb>
                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                       <h3>{props.dish.name}</h3>
                       <hr />
                   </div>
               </div>
               <div className="row">
                   <div className="col-12 col-md-5 m-1">
                       <RenderDish dish={props.dish} />
                   </div>
                   <div className="col-12 col-md-5 m-1">
                       <RenderComments comments={props.comments} />
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

export default DishDetail;
