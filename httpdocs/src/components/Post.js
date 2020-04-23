import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import { Helmet } from "react-helmet";
import gql from 'graphql-tag';

/**
 * GraphQL post query that takes a post slug as a filter
 * Returns the title, content and author of the post
 */
const POST_QUERY = gql`
  query PostQuery($filter: String!) {
    postBy(slug: $filter) {
      title
      content
      author {
        nickname
      }
      seo {
        title
        metaDesc
      }
    }
  }
`;

/**
 * Fetch and display a Post
 */
class Post extends Component {
  state = {
    post: {
      title: '',
      content: '',
      author: {
        nickname: '',
      },
      seo: {
        title: '',
        metaDesc: ''
      }
    },
  };

  componentDidMount() {
    this.executePostQuery();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      this.executePostQuery();
    }
  }

  /**
   * Execute post query, process the response and set the state
   */
  executePostQuery = async () => {
    const { match, client } = this.props;
    const filter = match.params.slug;
    const result = await client.query({
      query: POST_QUERY,
      variables: { filter },
    });
    const post = result.data.postBy;
    this.setState({ post });
  };

  render() {
    const { post } = this.state;

    if ( null !== post ) {
      return (
        <>
          <Helmet>
            <title>{page.seo.title}</title>
            <meta name="description" content={page.seo.metaDesc}/>
          </Helmet>
          <div className={`content mh4 mv4 w-two-thirds-l center-l post-${post.id} post-type-post`}>
            <h1>{post.title}</h1>
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}
            />
          </div>
        </>
      );
    } else {
      return (
        <div className={`content mh4 mv4 w-two-thirds-l center-l is-404 post-type-post`}>
          <h1 className="tc mv5 f1">404!</h1>
        </div>
      );
    }
  }
}

export default withApollo(Post);
