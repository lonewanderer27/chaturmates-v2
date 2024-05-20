import { GroupPostType, GroupType } from '../../types';

import AdminPostCard from './AdminPostCard';
import Slider from "react-slick";

const AdminPostsGrid = (props: {
  group?: GroupType & {
    group_posts: GroupPostType[]
  }
  posts?: GroupPostType[];
}) => {
  return (
      <Slider className='mx-[-10px] my-5' infinite={true} autoplay autoplaySpeed={2500} dots appendDots={(dots) => {
        return (
          <div className='mt-[-20px]'>
            {dots}
          </div>
        )
      }}>
        {props.posts &&
          props.posts.map((post) => (
            <AdminPostCard key={post.id} group={props.group} post={post} />
          ))}
      </Slider>
  )
}

export default AdminPostsGrid