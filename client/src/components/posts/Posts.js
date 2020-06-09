import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import Spinner from "../../components/layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

/**
 * This component handles the display of the Forums page shows the current posts and to post a new one
 */
const Posts = ({ getPosts, post: { posts, loading } }) => {
  // calls when the page is loaded, fetches the posts from the api and puts it into the state
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    // Load
    <Fragment>
      <h1 className="large text-primary">Forums</h1>
      <p className="lead">
        <i className="fas fa-dragon">
          {" "}
          Community forums welcomes you, talk about games in here
        </i>
      </p>
      <Link to="/add-post" className="btn btn-primary">
        <i className="fas fa-pen"> New post</i>
      </Link>
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
