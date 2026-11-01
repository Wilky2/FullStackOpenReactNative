import { useParams } from "react-router-native";
import RepositoryItem from "../RepositoryItem";
import useRepository from "../../hooks/useRepository";
import { View } from "react-native-web";
import Text from '../Text';

const RepositoryDetail = () => {
    
    let { repositoryId } = useParams();

    const { repository, loading } = useRepository(repositoryId);    

    if(loading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View>
            <RepositoryItem repository={repository} isNotRepositoryDetail={false}/>
        </View>
    )
};

export default RepositoryDetail;