import Firebase from "../../config/firebase.config";
import { Alert } from "react-native";

const dayIsConclused = async (data, userId) => {
    let conclused = false;
    try{
        const result = await Firebase.database()
            .ref('Atividades')
            .child(userId)
            .child(data).get();
        const dados = result.val();
        for(let key in dados){
            conclused = dados[key].concluido;
            if(!conclused){
                break;
            }
        }
    }catch(err){
        Alert.alert('Erro, contate o administrador do sistema!', err.toString());
    }
    return conclused;
}

export {dayIsConclused};