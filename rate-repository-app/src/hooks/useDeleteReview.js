import { useMutation } from "@apollo/client/react";
import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async (id) => {
    const reviewId = typeof id === "object" && id !== null && id.id ? id.id : id;
    const { data } = await mutate({ variables: { id: reviewId } });
    return data;
  };

  return [deleteReview, result];
};

export default useDeleteReview;
