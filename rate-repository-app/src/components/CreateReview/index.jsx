import useCreateReview from "../../hooks/useCreateReview";
import { useNavigate } from "react-router";
import CreateReviewForm from "./CreateReviewForm";

const CreateReview = () =>  {

  const [create] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, review } = values;
    try {
      const data = await create({ ownerName, repositoryName, rating: parseInt(rating, 10), review });
      console.log(data);
      navigate('/' + data.createReview.repositoryId);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <CreateReviewForm onSubmit={onSubmit} />
  );
};

export default CreateReview;