import { BackTop, Space, Row } from 'antd'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { SideNavLayout } from '../../Layouts/SideNavLayout'
import { PostPreview, NewPost } from '../../Components'
import { loadPostsThunk } from '../../redux/posts'

export const DashboardOutline = () => {
	const dispatch = useDispatch()
	const postsToDisplay = useSelector((state) => state.posts)

	useEffect(() => dispatch(loadPostsThunk()), [dispatch])

	return (
		<SideNavLayout>
			<BackTop />
			<Row>
				<Space>
					<h1>Feed</h1>
					<NewPost />
				</Space>
			</Row>
			<Space direction='vertical'>
				{postsToDisplay.map((post) => (
					<PostPreview key={post.id} post={post} />
				))}
			</Space>
		</SideNavLayout>
	)
}

export default DashboardOutline
