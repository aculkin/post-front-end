import { useState } from 'react'
import { message, Card, Avatar, Modal } from 'antd'
import {
	LikeOutlined,
	DislikeOutlined,
	EditOutlined,
	DeleteOutlined
} from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'

const { Meta } = Card

import { EditPostForm } from '../EditPost'
import { deletePostThunk } from '../../redux/posts'

export const PostPreview = ({ post }) => {
	const dispatch = useDispatch()
	const [deleteVisible, setDeleteVisible] = useState(false)
	const [editVisible, setEditVisible] = useState(false)
	const currentUser = useSelector((state) => state.auth?.user)
	const { id: postId, title, content, date_posted, date_updated, author } = post
	const { id: authorId, name, email } = author

	const afterDelete = () => {
		message.success('Post deleted successfully')
	}

	const handleDelete = () => {
		dispatch(deletePostThunk(postId, afterDelete))
	}

	const notMyPostActions = [
		<LikeOutlined key='like' />,
		<DislikeOutlined key='dislike' />
	]

	const myPostActions = [
		<EditOutlined key='edit' onClick={() => setEditVisible(true)} />,
		<DeleteOutlined key='delete' onClick={() => setDeleteVisible(true)} />
	]

	return (
		<>
			<Modal
				title='Are you sure you want to delete this post?'
				visible={deleteVisible}
				onOk={handleDelete}
				onCancel={() => setDeleteVisible(false)}
				okText='Delete Post'
				cancelText='Cancel'
			>
				<p>Once this post is deleted you will not be able to recover it.</p>
			</Modal>
			<Modal
				footer={null}
				title='Edit Post'
				visible={editVisible}
				onCancel={() => setEditVisible(false)}
			>
				<EditPostForm post={post} closeModal={() => setEditVisible(false)} />
			</Modal>
			<Card
				style={{ maxWidth: 800 }}
				actions={
					currentUser?.id === authorId ? myPostActions : notMyPostActions
				}
			>
				<Meta
					avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
					title={`${name} - ${title}`}
					description={content}
				/>
			</Card>
		</>
	)
}

export default PostPreview
