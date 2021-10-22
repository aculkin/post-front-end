import { Card, Avatar } from 'antd'
import {
	LikeOutlined,
	DislikeOutlined,
	EditOutlined,
	DeleteOutlined
} from '@ant-design/icons'
import { useSelector } from 'react-redux'

const { Meta } = Card

const notMyPostActions = [
	<LikeOutlined key='like' />,
	<DislikeOutlined key='dislike' />
]

const myPostActions = [
	<EditOutlined key='edit' />,
	<DeleteOutlined key='delete' />
]

export const PostPreview = ({ post }) => {
	const currentUser = useSelector((state) => state.auth?.user)
	const { title, content, date_posted, date_updated, author } = post
	const { id, name, email } = author
	console.log(currentUser)
	return (
		<Card
			style={{ maxWidth: 800 }}
			actions={currentUser?.id === id ? myPostActions : notMyPostActions}
		>
			<Meta
				avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
				title={`${name} - ${title}`}
				description={content}
			/>
		</Card>
	)
}

export default PostPreview
