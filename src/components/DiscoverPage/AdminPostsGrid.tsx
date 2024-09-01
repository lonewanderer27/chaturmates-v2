import AdminPostCardLoader from '../../loaders/AdminPostCardLoader';
import { GroupPostType, GroupType } from '../../types';

import AdminPostCard from './AdminPostCard';
import Slider from "react-slick";

const AdminPostsGrid = (props: {
  group?: GroupType;
  posts?: GroupPostType[];
  isLoading?: boolean;
}) => {
  return (
    <Slider className='mx-[-10px]' infinite={true} autoplay autoplaySpeed={2500} dots appendDots={(dots) => {
      return (
        <div className='mt-[-20px]'>
          {dots}
        </div>
      )
    }}>
      {(props.posts && !props.isLoading) ?
        props.posts.map((post) => (
          <AdminPostCard key={post.id} group={props.group} post={post} />
        )) : (
          Array.from({ length: 6 }).map((_, i) => (
            <AdminPostCardLoader key={i} />
          ))
        )}
    </Slider>
  )
}

export default AdminPostsGrid