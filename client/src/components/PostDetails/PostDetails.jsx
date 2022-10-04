import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';

import { getPost, getPostBySearch } from '../../actions/posts';
import useStyles from './styles';

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();


  useEffect(() => {
    dispatch(getPost(id));
  }, [id])



  useEffect(() => {
    if(post) {
      dispatch(getPostBySearch({ search: 'none', tags: post?.tags.join(',')}));
    }
  }, [post])




  if(!post) return null;

  const openPost =(_id) => history.push(`/posts/${_id}`);

  if(isLoading) {
    return ( 
    <Paper elevation={6} className={classes.loadingPaper}>
      <CircularProgress size="7em" />
    </Paper>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id === post._id);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div classname={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottum variant="h6" color="textSecondary" component="h2">{post.tags}</Typography>
          <Typography gutterBottum variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by scrub: {post.name} </Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()} </Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>CHAT DERN SURE SOON</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>COMMENT DERN SURE SOON</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div>
          <img className={classes.media} src={post.selectedFile || `https://i.imgur.com/GA5JN7h.jpeg`} alt={post.title} />
        </div>
      </div>

      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}

    </Paper>
  );
};

export default PostDetails;