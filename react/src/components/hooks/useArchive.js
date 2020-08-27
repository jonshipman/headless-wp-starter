import { gql, useQuery } from "@apollo/client";

import { FragmentSeo } from "../elements/Seo";
import { FragmentPost } from "./useSingle";
import usePagination, {
  FragmentPageInfo,
  getPageInfo,
  useNavigation,
} from "./usePagination";

const QUERY = gql`
  query ArchiveHook($first: Int, $last: Int, $after: String, $before: String) {
    posts(
      first: $first
      last: $last
      after: $after
      before: $before
      where: { status: PUBLISH, hasPassword: false }
    ) {
      edges {
        node {
          ...postInfo
        }
      }
      pageInfo {
        ...edgePageInfo
      }
    }
  }
  ${FragmentPageInfo}
  ${FragmentSeo}
  ${FragmentPost}
`;

const useArchive = () => {
  const { variables, goNext, goPrev } = usePagination();

  const { data, loading, error } = useQuery(QUERY, {
    variables,
    errorPolicy: "all",
  });

  const edges = data?.posts?.edges?.length ? data.posts.edges : [];
  const { endCursor, hasNextPage, hasPreviousPage, startCursor } = getPageInfo(
    data?.posts?.pageInfo
  );

  const { prev, next } = useNavigation({
    endCursor,
    startCursor,
    goNext,
    goPrev,
  });

  return {
    edges,
    loading,
    error,
    next,
    prev,
    hasNextPage,
    hasPreviousPage,
  };
};

export default useArchive;