import { useMutation } from "@apollo/client/react";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
    const [createReview, result] = useMutation(CREATE_REVIEW);

    const create = async ({ ownerName, rating, repositoryName, review }) => {
        const { data } = await createReview({ variables: { ownerName, rating, repositoryName, review } });
        return data;
    };

    return [create, result];
};

export default useCreateReview;
