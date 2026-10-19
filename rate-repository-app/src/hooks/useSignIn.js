import { useMutation } from "@apollo/client/react";
import { AUTHENTICATE } from "../graphql/mutations";

const useSignIn = () => {
    const [authenticate, result] = useMutation(AUTHENTICATE);

    const signIn = async ({ username, password }) => {
        const { data } = await authenticate({ variables: { username, password } });
        return data;
    };

    return [signIn, result];
};

export default useSignIn;
