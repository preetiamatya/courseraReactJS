import React, { Component } from 'react';
import {
  Card, CardImg, CardText, CardBody, CardTitle,
  Button, Modal, ModalHeader, ModalBody, Label, Row, Col
} from 'reactstrap';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
const required = (val) => val && val.length;
const maxLength = (len) => val => !(val) || (val.length <= len);
const minLength = (len) => val => (val) && (val.length >= len);

function RenderDish({ dish }) {
  /*user defined compononent, dish in the form of props*/
  if (dish != null) {
    return (
      <div className="col-12">
        <FadeTransform
          in
          transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
          }}>
          <Card>
            <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </FadeTransform>
      </div>
    );
  }
  else {
    return (
      <div class="null"></div>
    );
  }
}

function RenderComments({ comments, postComment, dishId }) {
  console.log("render comments debug" + dishId);
  if (comments != null) {
    return (
      <div>
        <h4>Comments</h4>
        <Stagger in>
          {comments.map(function (object, i) {
            return (
              <Fade in>
                <div>

                  <ul class="list-unstyled" key={comments[i].id}>


                    <li>{comments[i].comment}
                      <p> -- {comments[i].author},&nbsp;
                    {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comments[i].date)))}
                      </p>
                    </li>


                  </ul>




                </div>
              </Fade>
            );
          })}
        </Stagger>
        <CommentForm comments={comments} dishId={dishId} postComment={postComment} />

      </div>
    );
  }
  else {
    return (
      <div>
      </div>
    );
  }

}
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
      isModalOpen: false

    };
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
  handleSubmit(values) {
    this.toggleModal();
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
  }
  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
          </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group" md={12} >
                <Label htmlFor="Rating" md={12} >Rating</Label>
                <Col md={12}>
                  <Control.select model=".rating" id="rating" className="form-control">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author" md={12}>Your Name</Label>
                <Col md={12}>
                  <Control.text model=".author" id="author" name="author"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required, minLength: minLength(3), maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" md={12}>Comment</Label>
                <Col md={12}>
                  <Control.textarea model='.comment' id="comment" name="comment" rows="6" className="form-control" />
                </Col>
              </Row>
              <Button type="submit" className="bg-primary" color="primary">Submit</Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>

    )

  }


}

const DishDetail = (props) => {
  const dish = props.dish;
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />{/*Show loading spinner*/}
        </div>
      </div>

    );
  }
  else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>
            {props.errMess}
          </h4>
        </div>
      </div>

    );

  }
  else if (dish != null) {
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

            <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id} />





          </div>
        </div>

      </div>
    );

  } else {
    return (
      <div></div>
    );
  }
}




export default DishDetail;
