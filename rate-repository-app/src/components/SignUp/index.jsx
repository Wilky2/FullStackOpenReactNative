import useSignUp from "../../hooks/useSignUp";
import { useNavigate } from "react-router";
import SignUpForm from "./SingUpForm";

const SignUp = () => {

  const [signUp] = useSignUp();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const data = await signUp({ username, password });
      console.log(data);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignUpForm onSubmit={onSubmit} />
  );
};

export default SignUp;