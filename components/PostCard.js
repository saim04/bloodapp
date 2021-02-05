import React , {useContext} from 'react'
import { View, Text , TouchableOpacity } from 'react-native'
import  Ionicons from 'react-native-vector-icons/Ionicons'
import { Container , Card , UserImg ,
    UserInfo , UserInfoText , UserName , 
    PostTime , PostText , PostImg , 
    InteractionWrapper,Interaction , InteractionText,
    Divider
} 
from '../styles/FeedStyles'
import { AuthContext } from '../navigation/AuthProvider'

const PostCard = ({item}) => {
    const { user , logout } = useContext(AuthContext)

    const likeIcon = item.liked ? 'heart' : 'heart-outline'
    const likeIconColor = item.liked ? '#2e64e5' : '#333'

    let likeText;
    let commentText

    if(item.likes == 1){
        likeText = '1 Like' 
    }else if(item.likes > 1){
        likeText = `${item.likes} Likes`
    }else {
        likeText = 'Like'
    }
    if(item.comments == 1){
        commentText = '1 Comment' 
    }else if(item.comments > 1){
        commentText = `${item.comments} Comments`
    }else {
        commentText = 'Comment'
    }

    return (
            <Card>
                <UserInfo>
                    <View style={{backgroundColor:'#e51433',padding:10,borderRadius:50,}}>
                        <Text style={{color:'#fff'}}>{item.bloodGroup.toUpperCase()}</Text>
                    </View>
                    <UserInfoText>
                        <UserName>{item.userEmail}</UserName>
                        {/* <PostTime>{item.postTime.toString()}</PostTime> */}
                    </UserInfoText>
                </UserInfo> 
                <PostText>{item.address}</PostText>
                
                <InteractionWrapper>
                    <Interaction active={item.liked}>
                        <Ionicons name={likeIcon} size={25} color={likeIconColor} />
                        <InteractionText active={item.liked}>{likeText}</InteractionText>
                    </Interaction>
                    <Interaction>
                        <Ionicons name='md-chatbubble-outline' size={25} />
                        <InteractionText>{commentText}</InteractionText>
                    </Interaction>
                    {user.uid === item.userId ?
                    <Interaction>
                        <Ionicons name='md-trash-outline' size={25} />
                    </Interaction>
                    : null
                    }
                </InteractionWrapper>
            </Card>
    )
}

export default PostCard;
